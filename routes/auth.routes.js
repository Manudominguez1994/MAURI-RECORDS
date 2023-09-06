const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const isTokenValid = require("../middlewares/isTokenValid");

//POST /api/auth/signup => registrar el usuario
router.post("/signup", async (req, res, next) => {
  const { name, email, password, confirmPassword, city } = req.body;
  
  console.log(req.body);
  //Validaciones:
  //Campos llenos
  if (!name || !email || !password || !confirmPassword || !city) {
    res
    .status(400)
    .json({ errorMessage: "Todos los campos deben estar llenos" });
    return;
  }
  //Contraseñas Correctas
  if (password !== confirmPassword) {
    res.status(400).json({ errorMessage: "Las contraseñas no coinciden" });
    return;
  }
  //Email formato especifico
  const regexEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  if (!regexEmail.test(email)) {
    res.status(400).json({ errorMessage: "Correo con formato incorrecto" });
    return;
  }
  //Contraseña tenga un formato especifico
  const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;;
  if (!regexPassword.test(password, confirmPassword)) {
    res.status(400).json({ errorMessage: "La contraseña tiene que contener Mayuscula,simbolo y numero" });
    return;
  }
  //Usuario no repetido

  try {
    //Encriptar constraseña
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // console.log("pass filter", hashPassword);
    //Crear usuario en la base de datos
    const response = await User.create({
      name,
      email,
      password: hashPassword,
      city,
    });
    // console.log("usuario creado en DB", response);
    res.json("Usuario creado");
  } catch (error) {
    next(error);
  }
});
//POST /api/auth/login => validar las credenciales...aqui creamos la sesion
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body);
  //Todas las validaciones
  try {
    //El usuario exista
    const foundUser = await User.findOne({ email });
    // console.log("usuario buscado",foundUser);
    if (foundUser === null) {
      res.status(400).json({ errorMessage: "Usuario no registrado" });
      return;
    }
    //La contraseña sea correcta
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (isPasswordCorrect === false) {
      res.status(400).json({ errorMessage: "Contraseña no valida" });
      return;
    }
    //Crear la sesion
    //Sistema de tokens
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
    };
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "14d",
    });
    res.json({ authToken });
  } catch (error) {
    next(error);
  }
});
//GET /api/auth/verify => indicar al FE que el usuario esta activo
router.get("/verify", isTokenValid, (req, res, next) => {
  console.log(req.payload);
  res.json(req.payload);
  //! De ahora en adelante, cada vez que usemos el middleware isTokenValid... tendremos asceso a algo llamado req.payload
});
module.exports = router;
