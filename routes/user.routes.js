const router = require("express").Router();
const User = require("../models/User.model");
const Vinyl = require("../models/Vinyl.model");
const isTokenValid = require("../middlewares/isTokenValid");

//GET /api/user/myprofile => Renderizamos la informacion del usuario
router.get("/myprofile", isTokenValid, async (req, res, next) => {
  console.log("informacion payload la necesito porfavor", req.payload);
  try {
    const response = await User.findById(req.payload._id);
    // console.log("estes es mi usuario buscado en la base de datos",response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});
//PUT /api/user/edit => Editar alguna informacion de nuestro perfil
router.put("/editprofile", isTokenValid, async (req, res, next) => {
  const { name, image, city } = req.body;

  try {
    await User.findByIdAndUpdate(
      req.payload._id,
      {
        name,
        image,
        city,
      },
      { new: true }
    );
  } catch (error) {
    next(error);
  }
});
//DELETE /api/user/delete => Borrar cuenta de usuario
router.delete("/deleteprofile", isTokenValid, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.payload._id);
    res.json("Usuario eliminado");
  } catch (error) {
    next(error);
  }
});

//PUT api/user/:vinylId/fav => añadir a favoritos

router.put("/:vinylId/fav", isTokenValid, async (req, res, next) => {
  try {
    const userId = await User.findById(req.payload._id)
    const vinylFav = await Vinyl.findById(req.params.vinylId);
    // console.log("id  de  mi vinilo ", vinylFav._id);
    // console.log("usuario al que quiero agregar favorito", userId);
    if(userId.favorite.includes(vinylFav._id)){
         await User.findByIdAndUpdate(userId, {
            $pull: { favorite: vinylFav._id }
          });
    }else{
        await User.findByIdAndUpdate(userId, {
          $addToSet: { favorite: vinylFav._id }
        });
    }
    // console.log("Este es mi id del vinilo favorito", response);
    // res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
