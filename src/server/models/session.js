var mongoose = require('mongoose')
var Schema = mongoose.Schema

var sessioinSchema = new Schema({
  name: { type: String, required: true },
  hostIP: { type: String, required: true },
  hostUser: { type: String, required: true },
  sshPort: { type: Number, default: 22 },
  authorizedKeys: { type: String, default: '~/.ssh/authorized_keys' },
  userId: { type: Schema.Types.ObjectId, required: true },
  sessionGroupId: { type: Schema.Types.ObjectId, required: true }
})

module.exports = mongoose.model('Session', sessioinSchema)
