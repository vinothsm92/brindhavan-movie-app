const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config.json");
const db = require("../helpers/db");
const Bookings = db.Bookings;
const mongoose = require("mongoose");
const bookings = require("../models/bookings");
const { query } = require("express");
const ObjectId = mongoose.Types.ObjectId;

async function update(bookingParam) {

  const upsert = await Bookings.updateOne({
    movieId: bookingParam.movieId,
    movieDate: bookingParam.movieDate,
    movieTiming: bookingParam.movieTiming,
  }, {
    $set: {
      seatSeletion: bookingParam.seatSeletion,
      movieId: bookingParam.movieId,
      movieDate: bookingParam.movieDate,
      movieTiming: bookingParam.movieTiming,
      createdBy: bookingParam.createdBy,
      updatedBy: bookingParam.updatedBy
    }
  }, {
    upsert: true
  });

  return upsert;
}

async function getBookingsHistory(bookingParam) {

  var pageNo = 0;
  var perPage = 5;
  var sort = { _id: 1 };

  if (bookingParam.pageNo) {
    pageNo = parseInt(bookingParam.pageNo);
  }
  if (bookingParam.sortTitle) {
    sort = { [bookingParam.sortTitle]: bookingParam.sortBy ? bookingParam.sortBy : 1 }
  }

var dateQuery = bookingParam.toDate == "" ?  new Date(bookingParam.fromDate.split('T')[0].trim()) : { 
  $gte: new Date(bookingParam.fromDate.split('T')[0].trim()), 
  $lte: new Date(bookingParam.toDate.split('T')[0].trim()) 
} 

  var match = bookingParam.fromDate != "" ?

    [{ movieId: ObjectId(bookingParam.movieId) },
    { movieTiming: bookingParam.movieTiming },
    { movieDate: dateQuery },
    {
      $or: [
        { "movies.movieName": { $regex: `.*${bookingParam.filterValue}.*`, $options: 'i' } },
        { "crdeatedBy.firstName": { $regex: `.*${bookingParam.filterValue}.*`, $options: 'i' } },
        { "updatedBy.firstName": { $regex: `.*${bookingParam.filterValue}.*`, $options: 'i' } }]
    }]
    :
    [{ movieId: ObjectId(bookingParam.movieId) },
    { movieTiming: bookingParam.movieTiming },
    {
      $or: [
        { "movies.movieName": { $regex: `.*${bookingParam.filterValue}.*`, $options: 'i' } },
        { "crdeatedBy.firstName": { $regex: `.*${bookingParam.filterValue}.*`, $options: 'i' } },
        { "updatedBy.firstName": { $regex: `.*${bookingParam.filterValue}.*`, $options: 'i' } }]
    }]

    console.log(match)


  if (bookingParam.perPage) {
    perPage = parseInt(bookingParam.perPage);
  }
  var skip = perPage * pageNo;
  var query = Bookings.aggregate([
    {
      $lookup: {
        from: "movies", // collection name in db
        localField: "movieId",
        foreignField: "_id",
        as: "movies"
      }
    },
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
    }, {
      "$project": {
        "_id": 1,
        "movieDate": 1,
        "movieTiming": 1,
        "seatSeletion": 1,
        "movieId": 1,
        "movies.movieName": 1,
        "movies.gst": 1,
        "movies.movieImage": 1,
        "movies.serviceCharge": 1,
        "movies.ticketPrice": 1,
        "crdeatedBy.firstName": 1,
        "updatedBy.firstName": 1,
      }
    },
    {
      $match: {

        $and: match
      },
      
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
        totalPages: Math.ceil("$total.count" / perPage),
        data: "$data",
      }
    }])
  const bookings = await query;
  return bookings;
}
async function create(bookingParam) {
  //create booking obj
  const newBookings = new Bookings();
  newBookings.movieId=   bookingParam.movieId;
  newBookings.movieTiming =  bookingParam.movieTiming;
  newBookings.seatSeletion = bookingParam.seatSeletion;
  newBookings.movieDate=   new Date(bookingParam.movieDate.split('T')[0].trim());
  newBookings.createdDate= bookingParam.createdDate ;
  newBookings.udatedDate= bookingParam.udatedDate ;
  newBookings.createdBy = mongoose.Types.ObjectId(bookingParam.createdBy);
  newBookings.updatedBy = mongoose.Types.ObjectId(bookingParam.updatedBy);
  await newBookings.save();
}

async function getbookingDetails(bookingParam) {

  var pageNo = 0;
  var perPage = 5;
  var sort = { _id: 1 }
  if (bookingParam.pageNo) {
    pageNo = parseInt(bookingParam.pageNo);
  }
  if (bookingParam.sortTitle) {
    sort = { [bookingParam.sortTitle]: bookingParam.sortBy ? bookingParam.sortBy : 1 }
  }

  if (bookingParam.perPage) {
    perPage = parseInt(bookingParam.perPage);
  }
  var dateQuery = bookingParam.toDate == "" ? new Date(bookingParam.fromDate.split('T')[0].trim()) : {
    $gte: new Date(bookingParam.fromDate.split('T')[0].trim()),
    $lte: new Date(bookingParam.toDate.split('T')[0].trim())
  }
  var skip = perPage * pageNo;
  var query = Bookings.aggregate([
    {
      $lookup: {
        from: "movies", // collection name in db
        localField: "movieId",
        foreignField: "_id",
        as: "movies"
      }
    },
    {
      $lookup: {
        from: "users", // collection name in db
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy"
      }
    },
    {
      $lookup: {
        from: "users", // collection name in db
        localField: "updatedBy",
        foreignField: "_id",
        as: "updatedBy"
      }
    }, {
      "$project": {
        "_id": 0,
        "movieDate": 1,
        "movieTiming": 1,
        "seatSeletion": 1,
        "movieId": 1,
        "movies.movieName": 1,
        "movies.gst": 1,
        "movies.movieImage": 1,
        "movies.serviceCharge": 1,
        "movies.ticketPrice": 1,
        "createdBy.firstName": 1,
        "updatedBy.firstName": 1,
      }
    },

    {
      $match: {
        $and: [{ movieId: ObjectId(bookingParam.movieId) },
        { movieTiming: bookingParam.movieTiming }, { movieDate: dateQuery },
        {
          $or: [
            { "movies.movieName": { $regex: `.*${bookingParam.filterValue}.*`, $options: 'i' } },
            { "crdeatedBy.firstName": { $regex: `.*${bookingParam.filterValue}.*`, $options: 'i' } },
            { "updatedBy.firstName": { $regex: `.*${bookingParam.filterValue}.*`, $options: 'i' } }]
        }
        ]
      }
    },
    {
      $group: {
        _id: {
          movieTiming: "$movieTiming",
          updatedBy: "$updatedBy",
          createdBy:"$createdBy",
          movies: "$movies", 
          movieDate: "$movieDate"
        },
        seatSeletion: { $push: "$seatSeletion" }
      }
    },
    {
      $project: {
        seatSeletion: {
          $reduce: {
            input: "$seatSeletion",
            initialValue: [],
            in: { $concatArrays: ["$$value", "$$this"] }
          }
        },
        movieTiming: "$_id.movieTiming",
        movies: "$_id.movies",
        createdBy:"$_id.createdBy",
        updatedBy: "$_id.updatedBy",
        movieDate: "$_id.movieDate",
        _id: 0
      }
    }
  ])
  const booking = await query;
  return booking;
}

module.exports = {
  update,
  getBookingsHistory,
  getbookingDetails,
  create
};

