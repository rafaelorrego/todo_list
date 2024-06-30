// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// + Importacion de paquetes y archivos necesarios 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // middleware
const jwtConfig = require('../jwt.config');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Usuario } = require('./models/usuario');

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// + Configuraciones e initializacion
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const app = express(); // Creamos nuestra app

app.set('key', jwtConfig.clave); // Inicializamos el secret para crear el JWT
app.use(express.json()); // Configuracion para manejar solicitudes JSON
// Activamos CORS para todas las solicitudes con la configuracion de arriba.
app.use(
    cors(corsOptions)
  );

const PORT = process.env.PORT || '3001'; 
// Crear una configuracion de cors
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// Middleware verify para la validar el JWT
const verifyToken = (req, res, next) => {
    console.log(`header authorization`, req.headers);
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ error: "No token sent" });
    }

    const secret = app.get('key');

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      req.user = decoded;
      next();
    });
  };

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// + Conexión a la base de datos
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const uri = `mongodb+srv://${process.env.DB_USUARIO}:${process.env.DB_PASSWORD}@${process.env.DB_DOMAIN}/${process.env.DB_NAME}?appName=${process.env.DB_CLUSTER}`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose
  .connect(uri)
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
  })
  .catch((error) => {
    console.error("Error conectando a MongoDB:", error);
  });

// // Define un esquema para las colecciones Usuario y Tarea
// const userSchema = new mongoose.Schema({
//   _id: mongoose.ObjectId,
//   email: String,
//   password: String,
// });

// const taskSchema = new mongoose.Schema({
//   _id: mongoose.ObjectId,
//   name: String,
//   done: Boolean,
//   email: String,
// });

// // Creamos los modelos de las colecciones para poder utilizarlas
// const Usuario = mongoose.model("Usuario", userSchema);
// const Tarea = mongoose.model("Tarea", taskSchema);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// + APIs endpoints
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Ruta para registrar un usuario
app.post("/api/register", async (req, res) => {
  try {
    // Chequeamos si el email existe en nuestra base de datos
    const existingUser = await Usuario.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Creamos el objeto usuario desde el modelo Usuario
    const newUser = new Usuario({
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Ruta para autenticar al usuario y hacer login
app.post("/api/login", async (req, res) => {
  try {
    // Chequeamos si el email existe
    const user = await Usuario.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ error: "El email no existe en nuestra base de datos" });
    }

    // Comparar las contraseñas
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Las contraseñas no son correctas" });
    }

    // Generate JWT token
    const secret = app.get("key");
    const token = jwt.sign({ email: user.email }, secret);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Ruta progetida para traer los detalles del usuario
app.get("/api/user", verifyToken, async (req, res) => {
  try {
    // Fetch user details using decoded token
    const user = await Usuario.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("API del proyecto ToDo List del Bootcamp de ProgramandoPY");
});

// 4- Escucha post (/autenticar) que responda con token a nuestro frontend
app.post('/autenticar', async (req, res) => {
    // El frontend nos va a enviar usuario/contrasenha { user: "user1", pass: "pass2" }
    if(req.body.email) {
        // verificamos que el email exista
        const emailExistente = await Usuario.find({ email: req.body.email });
        if(emailExistente){
            const usuario = req.body.user;
            // TODO: comparar la contrasena recibida con la guardada en la bd
            // usar bcrypt.compare()
            // Crear el token
            const payload = {
                usuario,
                checked: true
            };
            const key = app.get('key');
            try {
                const token = jwt.sign(payload, key);
                res.send({
                    message: 'Token creado',
                    token
                });
            } catch (error) {
                res.send({
                    message: 'Hubo un error'
                })
            }
        } else {
            res.send({message: "El email no existe en nuestros registros"})
        }
        
    } else {
        res.send({message: "No se recibio el user"});
    }
});

// 5- Crear ruta que utilize el token TODO

// Escuchar una solicitud POST desde nuestro frontend en la ruta "/tarea"
app.post("/tarea", verifyToken, (req, res) => {
  console.log("Body de mi request", req.body);
  if (req.body) {
    res.send({ message: `"Recibimos tu tarea.", ${req.body.tarea}` });
  } else {
    res.send({ message: "No recibimos tu tarea" });
  }
});

// Hacemos que nuestra aplicación escuche el puerto que configuramos
// con el metodo listen(puerto, callback)
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
