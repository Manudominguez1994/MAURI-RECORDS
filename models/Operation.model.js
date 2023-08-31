const { Schema, model } = require("mongoose");
const operationSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Vinyl",
  },
  buyerUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  sellerUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  totalPrice:{
    type: Number
  },
  valoration:{
    type: String
  }
});
