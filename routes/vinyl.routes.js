const router = require("express").Router();
const Vinyl = require("../models/Vinyl.model");
const User = require("../models/User.model");
const isTokenValid = require("../middlewares/isTokenValid");

//POST => /vinyl/create
router.post("/create", isTokenValid, async (req, res, next) => {
  const { title, artist, image, description, price, stateConservation, genre } =
    req.body;
  const sellerUser = req.payload._id;

  if (
    !title ||
    !artist ||
    !description ||
    !price ||
    !stateConservation ||
    !genre
  ) {
    res
      .status(400)
      .json({ errorMessage: "Todos los campos deben estar llenos" });
    return;
  }
  if (!image) {
    res
      .status(400)
      .json({ errorMessage: "Se requiere una imagen para vender un vinilo" });
    return;
  }

  try {
    // console.log("necesito ver este objeto", req.payload);
    // console.log(sellerUser)

    const response = await Vinyl.create({
      title,
      artist,
      image,
      description,
      price,
      sellerUser,
      stateConservation,
      genre,
    });
    // console.log('vinilo creado', response)
    res.json(response);
  } catch (error) {
    next(error);
  }
});
//GET => /vinyl/allVinyls
router.get("/allVinyls", isTokenValid, async (req, res, next) => {
  try {
    const response = await Vinyl.find({ onSale: true });
    //  console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});
//GET => /api/vinyl/:vinylId
router.get("/:vinylId", isTokenValid, async (req, res, next) => {
  // console.log(req.params.vinylId, "req.paramasssssssssssssssssssssssssss");
  try {
    const response = await Vinyl.findById(req.params.vinylId).populate(
      "sellerUser"
    );
    // console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//PUT => /api/vinyl/:vinylId
router.put("/:vinylId", isTokenValid, async (req, res, next) => {
  const { title, artist, image, description, price, stateConservation, genre } =
    req.body;
  try {
    const response = await Vinyl.findByIdAndUpdate(
      req.params.vinylId,
      {
        title,
        artist,
        image,
        description,
        price,
        stateConservation,
        genre,
      },
      { new: true }
    );

    // console.log(response)
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//DELETE => /api/vinyl/:vinylId
//! BORRAR DE LOS DEMÁS NO DEL PROPIO
router.delete("/:vinylId", isTokenValid, async (req, res, next) => {
  try {
    const response = await Vinyl.findByIdAndDelete(req.params.vinylId);
    // console.log("vinilo borrado", response);
    await User.updateMany(
      { favorite: req.params.vinylId },
      { $pull: { favorite: req.params.vinylId } }
    );
    res.json("Vinilo eliminado");
  } catch (error) {
    next(error);
  }
});

//GET => /vinyl/allVinyls
router.get("/allVinyls/on-sale", isTokenValid, async (req, res, next) => {
  try {
    const response = await Vinyl.find({
      $and: [{ onSale: true }, { sellerUser: req.payload._id }],
    });
    //  console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
