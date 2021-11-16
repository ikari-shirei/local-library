const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
})

AuthorSchema.virtual('name').get(() => {
  let lifetime_string = ''
  this.date_of_birth
    ? (lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
        DateTime.DATE_MED
      ))
    : ''

  lifetime_string += ' - '

  this.date_of_death
    ? (lifetime_string += DateTime.fromJSDate(
        this.date_of_death
      ).toLocaleString(DateTime.DATE_MED))
    : ''

  return lifetime_string
})

AuthorSchema.virtual('url').get(() => {
  return '/catalog/author/' + this.id
})

module.exports = mongoose.model('Author', AuthorSchema)
