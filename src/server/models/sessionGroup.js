var mongoose = require('mongoose')
var Schema = mongoose.Schema

var sessionGroupSchema = new Schema({
  name: { type: String, required: true },
  ancestors: { type: [Schema.Types.ObjectId], default: [] },
  parent: { type: Schema.Types.ObjectId, default: null}
})

module.exports = mongoose.model('SessionGroup', sessionGroupSchema)
