import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "Email is Required."],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Password is Required."],
  },
  firstName: {
    type: String,
    require: false,
  },
  lastName: {
    type: String,
    require: false,
  },
  image: {
    type: String,
    require: false,
  },
  color: {
    type: Number,
    require: false,
  },
  profileSetup: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const model = this;

  if (model) {
    
    if (!model.isModified("password")) return next();

    try {
      try {
        // Generate salt (rounds can be changed, 10 is common)
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the generated salt
        model.password = await bcrypt.hash(model.password, salt);

        next(); // Proceed with saving the user document
      } catch (error) {
        next(error); // Pass the error to the next middleware (or error handler)
      }
    } catch (err) {
      next(err);
    }
  }
});

const User = mongoose.model("User", userSchema);

export default User;
