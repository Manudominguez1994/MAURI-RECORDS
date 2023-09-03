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
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://res.cloudinary.com/dausfjvtt/image/upload/v1693589414/Mauri%20Records/ywcxq9aolbl96745ibeh.jpg"
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    city: String,
    favorite: [{
      type: Schema.Types.ObjectId,
      ref: "Vinyl",
    }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
