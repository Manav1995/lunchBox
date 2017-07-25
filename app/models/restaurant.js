var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  name: String,
  rating: String,
});

mongoose.model('Restaurant', RestaurantSchema);
