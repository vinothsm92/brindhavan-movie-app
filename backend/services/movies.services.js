const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config.json");
const db = require("../helpers/db");
const Movies = db.Movies;
const mongoose = require("mongoose");

//adding movies to db
async function create(moviesParam) {
  //check if Movies exist
  const movies = await Movies.findOne({ email: moviesParam.movieName });
  //validate
  if (movies) throw `This movie already exists: ${moviesParam.movieName}`;

  //create movies obj
  const newMovies = new Movies(moviesParam);
  newMovies.createdBy = mongoose.Types.ObjectId(moviesParam.createdBy);
  newMovies.updatedBy = mongoose.Types.ObjectId(moviesParam.updatedBy);
  await newMovies.save();
}


async function update(moviesParam) {
  const movies = await Movies.findById(moviesParam._id);
  //validate the id and movieName
  if (!movies) throw "movie not found.";
  if (
    movies.movieName.toLowerCase() !== moviesParam.movieName.toLowerCase() &&
    (await Movies.findOne({ movieName: moviesParam.movieName.toLowerCase() }))
  ) {
    throw `${moviesParam.movieName} already exist.`;
  }


  //copy the movies obj
  Object.assign(movies, moviesParam);
  await movies.save();
}

async function Delete(id) {
  const movies = await Movies.findById(id);
  await Movies.findByIdAndRemove(id);
  return movies;
}



async function getMovies(moviesParam) {

  var pageNo = 0;
  var perPage = 5;
  var sort = { _id: 1 }
  sortTitle = ""
  if (moviesParam.pageNo) {
    pageNo = parseInt(moviesParam.pageNo);
  }
  if (moviesParam.sortTitle) {
    sort = { [moviesParam.sortTitle]: moviesParam.sortBy ? moviesParam.sortBy : 1 }
  }

  if (moviesParam.perPage) {
    perPage = parseInt(moviesParam.perPage);
  }
  var skip = perPage * pageNo;
  const movies = await Movies.aggregate([
    {
    $lookup: {
      from: "users", // collection name in db
      localField: "createdBy",
      foreignField: "_id",
      as: "crdeatedBy"
    }
  },
  {
    $lookup: {
      from: "users", // collection name in db
      localField: "updatedBy",
      foreignField: "_id",
      as: "updatedBy"
    }
  },{
    "$project": {
      "_id": 1,
      "movieName": 1,
      "ticketPrice": 1,
      "crdeatedBy.firstName": 1,
      "updatedBy.firstName": 1,
    }
  }, 
  {
    $match: {

      $and: [{
        $or: [{ movieName: { $regex: `.*${moviesParam.filterValue}.*`, $options: 'i' } },
        { "crdeatedBy.firstName": { $regex: `.*${moviesParam.filterValue}.*`, $options: 'i' } },
        { "updatedBy.firstName": { $regex: `.*${moviesParam.filterValue}.*`, $options: 'i' } } ]
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
      totalPages:Math.ceil("$total.count"/perPage),
      data: "$data",
    }
  }])
  return movies;
}

module.exports = {
  create,
  update,
  Delete,
  getMovies
};
