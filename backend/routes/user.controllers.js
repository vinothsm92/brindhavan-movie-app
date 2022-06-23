const express = require("express");
const router = express.Router();
const userServices = require("../services/user.services");
const Role = require("../helpers/role");
const jwt = require("../helpers/jwt");
const jwtVerify = require("../helpers/jwt.verify")
//routes
router.post("/authenticate", authenticate);
router.post("/register", register);
router.get("/", jwt(Role.Admin), getAll);
router.get("/current", jwt(), getCurrent);
router.post("/getUsers", jwtVerify, getAllUsers);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

//route functions
function authenticate(req, res, next) {
  userServices
    .authenticate(req.body)
    .then((user) => {

      if (user == "Invalid User") {
        res
          .status(400)
          .json({ message: "Username or password is incorrect." });
      }


      if (typeof user != 'object') {
        if (user.split(',')[0] === '401') {
          res
            .status(user.split(',')[0])
            .json({ message: user.split(',')[1] });

        }
      } else {

        user
          ? res.json({ user: user, message: "User logged in successfully" })
          : res
            .status(400)
            .json({ message: "Username or password is incorrect." });
      }
    })
    .catch((error) => next(error));
}

function register(req, res, next) {
  userServices
    .create(req.body)
    .then((user) =>
      res.json({
        user: user,
        message: `User Registered successfully with email ${req.body.email}`,
      })
    )
    .catch((error) => {
      return next(error)
    });
}

function getAll(req, res, next) {
  const currentUser = req.user;

  if (currentUser.role !== Role.Admin) {
    return res.status(401).json({ message: "Not Authorized!" });
  }
  userServices
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  console.log(req);
  userServices
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.status(404)))
    .catch((error) => next(error));
}

function getById(req, res, next) {
  userServices
    .getById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User Not Found!" });
        next();
      }
      return res.json(user);
    })
    .catch((error) => next(error));
}

function getAllUsers(req, res, next) {
  userServices
    .getAllUsers(req.body)
    .then((data) => {
      var pageNo = 0;
      var perPage = 5;

      if (req.body.pageNo) {
        pageNo = parseInt(req.body.pageNo);
      }

      if (req.body.perPage) {
        perPage = parseInt(req.body.perPage);
      }
      if (data.length > 0) {
        var nextPage = Math.ceil(data[0].totalRecords / ((pageNo + 1) * perPage));
        data[0].nextPage = nextPage - 1;
      }
      if (!data) {
        res.status(404).json({ message: "User Not Found!" });
        next();
      }
      return res.json(data);
    })
    .catch((error) => {
      return next(error)
    });
}

function update(req, res, next) {
  userServices
    .update(req.params.id, req.body)
    .then(() =>
      res.json({
        message: `User with id: ${req.params.id} updated successfully.`,
      })
    )
    .catch((error) => next(error));
}

function _delete(req, res, next) {
  userServices
    .delete(req.params.id)
    .then(() =>
      res.json({
        message: `User with id: ${req.params.id} deleted successfully.`,
      })
    )
    .catch((error) => next(error));
}
