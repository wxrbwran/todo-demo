const express = require('express');
const Attraction = require('../models/attraction');
const Todo = require('../models/Todo');

const router = express.Router();

/* GET users listing. */
router.get('/tours', function(req, res, next) {
  const tours = [
    { id: 0, name: 'Hood River', price: 99.99 },
    { id: 1, name: 'Oregon Coast', price: 149.95 },
  ];
  res.json({
    status: 'success',
    data: tours,
  });
});

router.get('/attractions', function(req, res, next) {
  Attraction.find({ approved: true }, (err, attractions) => {
    if (err) {
      return res.send(500, `Error: ${err.stack}`);
    }
    res.json({
      status: 'success',
      data: attractions.map(attraction => {
        return {
          name: attraction.name,
          id: attraction._id,
          description: attraction.description,
          location: attraction.location,
        };
      }),
    });
  });
});

router.post('/attraction', function(req, res, next) {
  const attraction = new Attraction({
    name: req.body.name,
    description: req.body.description,
    location: {
      lat: req.body.lat,
      lng: req.body.lng,
    },
    history: {
      event: 'created',
      email: req.body.email,
      date: new Date(),
    },
    approved: false,
  });
  attraction.save((err, a) => {
    if (err) {
      res.send(500, `error:${err.stack}`);
    }
    res.json({
      status: 'success',
      data: {
        id: a._id,
      },
    });
  });
});

router.get('/attraction/:id', function(req, res, next) {
  Attraction.findById(req.params.id, (err, attraction) => {
    if (err) {
      return res.send(500, `Error: ${err.stack}`);
    }
    res.json({
      status: 'success',
      data: {
        name: attraction.name,
        id: attraction._id,
        description: attraction.description,
        location: attraction.location,
      },
    });
  });
});

router.post('/add', function (req, res) {
  console.log(req.body);
  if (!!req.body.content) {
    const todo = new Todo({
      content: req.body.content,
      date: Date.now(),
    });
    todo.save(err => {
      if(err) {
        return res.json({
          status: 'fail',
          data: {},
          message: '数据库错误',
          stack: err.stack,
        })
      }
      return res.json({
        status: 'success',
        data: {
          content: req.body.content,
          date: Date.now(),
        },
      })
    })
  } else {
    return res.json({
      status: 'fail',
      data: {},
      message: '内容不能为空!'
    })
  }
});


module.exports = router;
