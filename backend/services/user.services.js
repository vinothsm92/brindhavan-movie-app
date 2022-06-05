const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config.json");
const db = require("../helpers/db");
const User = db.User;

//this will authenticate the user credentials
async function authenticate({ email, password }) {
  //find the user using email

  const user = await User.findOne({ email });
  console.log("user model", user);
  //check the user is active user and approved user

  if(user==null){
    return "Invalid User";
  }
  if (!user.isActive) {
    return "401,user is not Active";
  }
  if (!user.isApproved) {
    return "401,user is not Approved";
  }

  //if user is truthy then sign the token
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret, {
      expiresIn: "7d",
    });
    // console.log("user.toJsoon", ...user.toJSON());
    return { ...user.toJSON(), token };
  }
}
//retrieving all users
async function getAll() {
  return await User.find();
}
//retrieving user using id
async function getById(id) {
  console.log("finding id: ", id);
  return await User.findById(id);
}

async function getAllUsers(userParam) {
  var pageNo = 0;
  var perPage = 5
  sort = { _id: 1 }
  title = ""
  if (userParam.pageNo) {
    pageNo = parseInt(userParam.pageNo);
  }
  if (userParam.title) {
    sort = { [userParam.title]: userParam.sortBy ? userParam.sortBy : 1 }
  }

  if (userParam.perPage) {
    perPage = parseInt(userParam.perPage);
  }
  var skip = perPage * pageNo;


  return await User.aggregate([
    {
      $match: {

        $and: [{
          $or: [{ firstName: { $regex: `.*${userParam.filterValue}.*`, $options: 'i' } },
          { email: { $regex: `.*${userParam.filterValue}.*`, $options: 'i' } }]
        }]
      }
    },
    {

      $facet: {

        "total": [{ "$group": { _id: null, count: { $sum: 1 } } }],

        "data": [{ "$sort": sort }, { "$skip": skip }, { "$limit": perPage }]

      }
    },

    { $unwind: "$total" },

    //output projection
    {
      $project: {
        totalRecords: "$total.count",
        data: "$data"
      }
    }

  ]);
}

//adding user to db
async function create(userParam) {
  //check if user exist
  const user = await User.findOne({ email: userParam.email });
  //validate
  if (user) throw `This email already exists: ${userParam.email}`;

  //create user obj
  const newUser = new User(userParam);
  if (userParam.password) {
    newUser.password = bcrypt.hashSync(userParam.password, 10);
  }

  await newUser.save();
}

async function update(id, userParam) {
  console.log(id, userParam);
  const user = await User.findById(id);
  console.log(user.email, userParam.email);
  //validate the id and email
  if (!user) throw "User not found.";
  if (
    user.email !== userParam.email &&
    (await User.findOne({ email: userParam.email }))
  ) {
    throw `User with email ${userParam.email} already exist.`;
  }

  //convert the password ot hash
  if (userParam.password) {
    userParam.password = bcrypt.hashSync(userParam.password, 10);
  }

  //copy the user obj
  Object.assign(user, userParam);
  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  getAllUsers,
  delete: _delete,

};
