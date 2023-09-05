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
    type: Number,
 
  },
  valoration:{
    type: String
  }
},
{
  // this second object adds extra properties: `createdAt` and `updatedAt`
  timestamps: true,
});

const Operation = model("Operation", operationSchema);

module.exports = Operation;
