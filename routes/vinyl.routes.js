const router = require("express").Router();
const Vinyl = require("../models/Vinyl.model");
const User = require("../models/User.model");
const isTokenValid = require ("../middlewares/isTokenValid");

//POST => /vinyl/create
router.post("/create", isTokenValid, async (req, res, next) => {
  try {
    const {
      title,
      artist,
      image,
      description,
      price,
      stateConservation,
      genre,
    } = req.body;

    // console.log("necesito ver este objeto", req.payload);
    const sellerUser = req.payload._id;
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
router.get("/allVinyls", isTokenValid, async (req, res, next)=>{
    try {
       const response = await Vinyl.find()
        //  console.log(response); 
         res.json(response)
    } catch (error) {
        next(error)
    }
})
//GET => /api/vinyl/:vinylId
router.get("/:vinylId", isTokenValid, async (req, res, next) => {
    console.log(req.params.vinylId,"req.paramasssssssssssssssssssssssssss");
    try {
        const response = await Vinyl.findById(req.params.vinylId)
        .populate("sellerUser")
         console.log(response)
         res.json(response)
    } catch (error) {
        next(error)
    }
});

//PUT => /api/vinyl/:vinylId
router.put("/:vinylId", isTokenValid, async (req, res, next) => {
const { title, artist, image, description, price, stateConservation, genre } = req.body
    try {
        const response = await Vinyl.findByIdAndUpdate(req.params.vinylId, {
            title,
            artist,
            image,
            description,
            price,
            stateConservation,
            genre
        }, {new:true})

        // console.log(response)
        res.json(response)

    } catch (error) {
        next(error)
    }
   
})

//DELETE => /api/vinyl/:vinylId
router.delete("/:vinylId", isTokenValid, async (req, res, next) => {
    try {
        await Vinyl.findByIdAndDelete(req.params.vinylId)
        await User.findByIdAndUpdate(req.payload._id, {
            $pull: { favorite: req.params.vinylId }
          });
        res.json('Vinilo eliminado')
    } catch (error) {
        next(error)
    }
})




//GET /vinyl/genre
// router.get('/genre', (req, res, next) => {
//     console.log("quiero ver enum", Vinyl.schema.path('genre'.enumValues))
//     res.json(Vinyl.schema.path('genre'.enumValues))
// })

//  ! Hola Manueh PROBANDO

module.exports = router;
