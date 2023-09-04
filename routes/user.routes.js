const router = require("express").Router();
const User = require("../models/User.model");
const Vinyl = require("../models/Vinyl.model");
const isTokenValid = require("../middlewares/isTokenValid");

//GET /api/user/myprofile => Renderizamos la informacion del usuario
router.get("/myprofile", isTokenValid, async (req, res, next) => {
  console.log("informacion payload la necesito porfavor", req.payload);
  try {
    const response = await User.findById(req.payload._id).populate("favorite");
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
    res.json("Perfil actualizado")
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
    const user = await User.findById(req.payload._id)
    // const vinylFav = await Vinyl.findById(req.params.vinylId)
    //console.log("este vinilo agregar a favoritos", vinylFav);
    console.log("usuario al que quiero agregar favorito", user);
    if(user.favorite.includes(req.params.vinylId)){
     await  User.findByIdAndUpdate(user._id, {
           $pull: { favorite: req.params.vinylId }
         })
    }else{
      await  User.findByIdAndUpdate(req.payload._id, {
          $addToSet: { favorite: req.params.vinylId }
        })
    }

    console.log(' vinilo en fav')
    // console.log("Este es mi id del vinilo favorito", response);
    res.json("¨Vinilo agregado/borrado de fav");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
