const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    confirmPassword:{
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "public/images/profile-picture-default-png.png",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },
    favorite: [],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
