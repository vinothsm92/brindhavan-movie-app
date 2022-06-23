const express = require("express");
const router = express.Router();
const bookingServices = require("../services/bookings.services");
const Message = require("../helpers/message");
const jwt = require("../helpers/jwt");
const jwtVerify = require("../helpers/jwt.verify");
//routes
router.post("/add", jwtVerify, add);
router.post("/getBooking",jwtVerify, getbookingDetails);
router.post("/getBookingHistory",jwtVerify,getBookingsHistory)

module.exports = router;

//route functions
function add(req, res, next) {
  bookingServices
    .create(req.body)
    .then((user) =>
      res.json({
        user: user,
        message: ` ${Message.Add}'`,
      })
    )
    .catch((error) => {
      return next(error)
    });

}

//not used
function update(req, res, next) {
  bookingServices
    .update(req.body)
    .then(() =>
      res.json({
        message: `${Message.movieBooking}.`,
      })
    )
    .catch((error) => next(error));
}


//not used

function getbookingDetails(req, res, next){
  bookingServices.getbookingDetails(req.body).then((data) => {
  
      // var pageNo = 0;
      // var perPage = 5;
  
      // if (req.body.pageNo) {
      //   pageNo = parseInt(req.body.pageNo);
      // }
  
      // if (req.body.perPage) {
      //   perPage = parseInt(req.body.perPage);
      // }
      // if (data.length > 0) {
      // var nextPage = Math.ceil(data[0].totalRecords / ((pageNo + 1) * perPage));
      // data[0].nextPage = nextPage-1;
      // }
      res.json({
        user: data,
        message: `success'`,
      })
    }).catch((error) => next(error));
  
}

function getBookingsHistory(req, res, next) {
  bookingServices.getBookingsHistory(req.body).then((data) => {

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
    res.json({
      user: data,
      message: `success'`,
    })
  }).catch((error) => next(error));
}




