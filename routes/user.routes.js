const router = require("express").Router();
const User = require("../models/User.model");
const isTokenValid = require("../middlewares/isTokenValid");

//GET /api/user/myprofile => Renderizamos la informacion del usuario
router.get("/myprofile",isTokenValid, async (req, res, next)=> {
    console.log("informacion payload la necesito porfavor",req.payload);
    try {
        const response = await User.findById(req.payload._id)
        // console.log("estes es mi usuario buscado en la base de datos",response);
        res.json(response)
    } catch (error) {
        next(error)
    }
})
//PUT /api/user/edit => Editar alguna informacion de nuestro perfil
router.put("/editprofile", isTokenValid, async (req, res, next)=>{
    const{name, image, city} = req.body
   
    try {
        await User.findByIdAndUpdate(req.payload._id,{
            name,
            image,
            city
        },{new:true})
       
    } catch (error) {
        next(error)
    }
})
//DELETE /api/user/delete => Borrar cuenta de usuario
router.delete("/deleteprofile", isTokenValid, async (req, res, next) => {

    try { 
    await User.findByIdAndDelete(req.payload._id)
    res.json("Usuario eliminado")
        
    } catch (error) {
        next(error)
    }
})


module.exports = router;

