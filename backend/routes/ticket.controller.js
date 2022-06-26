const express = require("express");
const router = express.Router();
const moviesServices = require("../services/movies.services");
const Message = require("../helpers/message");
const jwt = require("../helpers/jwt");
const jwtVerify = require("../helpers/jwt.verify");
//routes
router.post("/add", jwtVerify, add);
router.put("/update", jwtVerify, update);
router.delete("/:id", jwtVerify, _delete);
router.post("/getMovies",jwtVerify, getMovies);

module.exports = router;

//route functions

function add(req, res, next) {
  moviesServices
    .create(req.body)
    .then((user) =>
      res.json({
        user: user,
        message: `${req.body.movieName}  ${Message.Add}'`,
      })
    )
    .catch((error) => {
      return next(error)
    });

}

function update(req, res, next) {
  moviesServices
    .update(req.body)
    .then(() =>
      res.json({
        message: `${req.body.movieName} : ${req.body.ticketPrice}  ${Message.update}.`,
      })
    )
    .catch((error) => next(error));
}

function _delete(req, res, next) {
  moviesServices
    .Delete(req.params.id)
    .then((movies) => {

      if (movies != null) {
        return res.json({
          message: `${movies.movieName}  ${Message.delete}.`,
        })
      }

      return res.status(400).json({ message: `${Message.wrongData}` })
    }
    )
    .catch((error) => next(error));
}

function getMovies(req, res, next) {
  moviesServices.getMovies(req.body).then((data) => {

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
    data[0].nextPage = nextPage-1;
    }
    res.json({
      user: data,
      message: `success'`,
    })
  }).catch((error) => next(error));
}




