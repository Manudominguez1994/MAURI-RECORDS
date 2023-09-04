const { Schema, model } = require("mongoose");
const vinylSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://res.cloudinary.com/dausfjvtt/image/upload/v1693846294/Mauri%20Records/hjxxv73hlhgbq7ncljqv.png",
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    sellerUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    stateConservation: {
      type: String,
      enum: ["Como Nuevo", "Buen estado", "Algo desgastado", "Muy Desgastado"],
    },
    onSale: {
      type: Boolean,
      default: true
    },
    genre: {
      type: String,
      enum: ["Rock", "Pop", "Hip-Hop", "Jazz", "Electronica", "Soul", "Reagge","Otros"],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Vinyl = model("Vinyl", vinylSchema);

module.exports = Vinyl;
