var express = require('express')
var router = express.Router()

var ObjectId = require('mongoose').Types.ObjectId
var Session = require('../models/session.js')
var SessionGroup = require('../models/sessionGroup.js')
var User = require('../models/user.js')

router.get('/user/session', async (req, res) => {
  let sessionsGrouped = await Session.aggregate({
    $group: { _id: "$sessionGroupId", children: { $push: "$$ROOT" }}
  })

  for( let i=0; i < sessionsGrouped.length; ++i) {
    let group = sessionsGrouped[i]
    group.sessionGroup = await SessionGroup.findById(ObjectId(group._id))
  }

  res.send(sessionsGrouped)
});

module.exports = router