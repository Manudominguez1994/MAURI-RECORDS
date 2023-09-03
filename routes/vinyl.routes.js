const router = require("express").Router();
const Vinyl = require('../models/Vinyl.model');


const isTokenValid = require ("../middlewares/isTokenValid");

//POST => /vinyl/create
router.post('/create', isTokenValid, async (req, res, next) => {
try {
   const {title, 
    artist, 
    image, 
    description, 
    price, 
    stateConservation,
    genre} = req.body

//const title = req.body.title

    console.log('necesito ver este objeto', req.payload)
    const sellerUser = req.payload._id
    console.log(sellerUser)

    const response = await Vinyl.create({title, 
        artist, 
        image, 
        description, 
        price, 
        sellerUser, 
        stateConservation,
        genre})
    console.log('vinilo creado', response)

} catch (error) {
    next(error)
}
})

// //GET /vinyl/genre
// router.get('/genre', (req, res, next) => {
//     console.log("quiero ver enum", Vinyl.schema.path('genre'.enumValues))
//     res.json(Vinyl.schema.path('genre'.enumValues))
// })



module.exports = router;