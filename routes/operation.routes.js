const router = require("express").Router();
const Vinyl = require("../models/Vinyl.model");
const User = require("../models/User.model");
const Operation = require("../models/Operation.model");
const isTokenValid = require("../middlewares/isTokenValid");

//POST /api/operation/create/:vinylId Enviar data a la BD

router.post("/create/:vinylId", isTokenValid, async (req, res, next) => {
  //nos traemos la Id de comprador, es el que tiene la sesión iniciada

  const buyerId = req.payload._id;
  console.log(buyerId);
  // nos traemos la id del viniloi que quiere comprar a través del parámetro diñámico que nos da la URL
  const vinylId = req.params.vinylId;
  console.log(vinylId);

  try {
    //llamamos a la DB para comprobar que no existe ninguna otra operación registrada con esta id del vinilo
    const operationFound = await Operation.findOne({
      product: req.params.vinylId,
    });

    // SI la operación no existe

    // 1. llama a la DB y dame el objeto del vinilo
    // 2. llama a la DB y dame el objeto del userBuyer
    // 3. ve a la BD y crea una operación con la data obtenida

    if (operationFound === null) {
      
      const vinylObj = await Vinyl.findById(vinylId)
     
      const buyerObj = await User.findById(buyerId);

      const operationObj = await Operation.create({
        product: vinylObj._id,
        buyerUser: buyerObj,
        sellerUser: vinylObj.sellerUser,
        totalPrice: vinylObj.price,
      });
      res.json(operationObj);
    } else {
      res.status(400).json({ errorMessage: "La operación ya existe" });
      return;
    }

    // console.log('ver repuesta', operationObj)
  } catch (error) {
    next(error);
  }
});


// GET /api/operation/:operationId esta ruta envía el objeto de la operación creada al FE

router.get("/:operationId", isTokenValid, async (req, res, next) => {
  // accedemos a la Id de la operación
  const operationId = req.params.operationId;
  try {
    //llamamos a la BD a través de la Id diñámica para obtener toda la data de la operación y accedemos a las propiedades relacionadas con el populate
    const operation = await Operation.findById(operationId)
      .populate("product")
      .populate("buyerUser")
      .populate("sellerUser");

    

    res.json(operation);
  } catch (error) {
    next(error);
  }
});

//GET /api/operation/allOperations esta ruta renderiza todas las operaciones
router.get("/allOperations/all", isTokenValid, async (req, res, next) => {
    try {
      const operations = await Operation.find()
        .populate("product")
        .populate("buyerUser")
        .populate("sellerUser");
        console.log(operations);
      res.json(operations);
    } catch (error) {
      next(error);
    }
  });

router.post("/update-on-sale/:vinylId", isTokenValid, async (req, res, next) => {
  try {
    const vinylObj = await Vinyl.findByIdAndUpdate(
      req.params.vinylId,
      {
        onSale: false,
      },
      { new: true }
    );
    res.json('onSale actualizado')
  } catch (error) {
    next(error)
  }
})

router.delete("/delete/:operationId", isTokenValid, async (req, res, next) => {
  try {
    await Operation.findByIdAndDelete(req.params.operationId)
    res.json('operación borrada')
  } catch (error) {
    next(error)
  }
})
module.exports = router;
