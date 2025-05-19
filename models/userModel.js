const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [5, "El nombre debe de tener al menos 5 caracteres"],
    maxxlength: 30
  },
  lastName: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: [true, "El correo ya existe"],
    trim: true
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  favourites: {
    type: [ mongoose.Schema.Types.ObjectId ],
    ref: "Movie",
  },

  isActive: {
    type: Boolean,
    default: true
  }
});


userSchema.pre(/^find/, function(next) {
  this.find({ isActive: true });
  this.select('-password');
  next();
});
 
const userModel = mongoose.model("User", userSchema, "user");
 
module.exports = userModel;
 
 