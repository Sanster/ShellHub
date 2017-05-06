var express = require('express')
var router = express.Router()

var ObjectId = require('mongoose').Types.ObjectId
var Session = require('../models/session.js')
var SessionGroup = require('../models/sessionGroup.js')
var User = require('../models/user.js')

function getSessionsGrouped() {
  let sessionsGrouped = await Session.aggregate({
    $group: { _id: "$sessionGroupId", children: { $push: "$$ROOT" }}
  })

  for( let i=0; i < sessionsGrouped.length; ++i) {
    let group = sessionsGrouped[i]
    group.sessionGroup = await SessionGroup.findById(ObjectId(group._id))
  }

  return sessionsGrouped
}

router.get('/session', async (req, res) => {
  res.send(getSessionsGrouped())
});

router.post('/session', async (req, res) => {
  const testUserId = ObjectId('58f1b1feb3eded6fceed6390')
  const body = req.body

  var session = new Session({
    name: body.name,
    hostIP: body.hostIP,
    hostUser: body.hostUser,
    userId: testUserId,
    sessionGroupId: ObjectId(body.sessionGroupId)
  })

  try {
    await session.save()
    res.send(getSessionsGrouped())
  } catch (error) {
    res.status(500).send(`Internal Server Error: ${error}`)
  }
})

module.exports = router