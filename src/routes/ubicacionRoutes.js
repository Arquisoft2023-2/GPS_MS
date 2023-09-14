
const express = require('express');
const router = express.Router();
const app = express();
const ubicacionController = require('../controllers/ubicacionController'); // Reemplaza la ruta con la ubicación correcta de tu controlador
const PlaneSchema = require('../models/Plane');
const FlightSchema = require('../models/Flight');


router.post("/Plane", async (req, res) => {
    const Plane = PlaneSchema(req.body);
    Plane
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

router.get("/Plane", async (req, res) => {
    try {
        const planes = await PlaneSchema.find();
        res.json(planes);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get("/Plane/:plate", async (req, res) => {
    try {
        console.log(req.params.plate);
        const plane = await PlaneSchema.findOne({ Plate: req.params.plate });
        res.json(plane);
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
});

router.put("/Plane/:plate", async (req, res) => {
    try {
        const updatedPlane = await PlaneSchema.findOneAndUpdate(
            { Plate: req.params.plate },
            req.body,
            { new: true }
        );
        res.json(updatedPlane);
    } catch (error) {
        res.json({ message: error });
    }
});



router.delete("/Plane/:plate", async (req, res) => {
    try {
        const removedPlane = await PlaneSchema.findOneAndRemove({ Plate: req.params.plate });
        res.json(removedPlane);
    } catch (error) {
        res.json({ message: error });
    }
});

//RUTAS FLIGHT

router.post("/Flight", async (req, res) => {
    const Flight = FlightSchema(req.body);
    Flight
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

router.get("/Flight", async (req, res) => {
    try {
        const Flight = await FlightSchema.find();
        res.json(Flight);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get("/Flight/:plate", async (req, res) => {
    try {
        const Flight = await FlightSchema.find({ FK_Plate: req.params.plate });
        res.json(Flight);
    } catch (error) {
        res.json({ message: error });
    }
});

router.put("/Flight/:plate", async (req, res) => {
    try {
        const updatedFlight = await FlightSchema.findOneAndUpdate(
            { FK_Plate: req.params.plate },
            req.body,
            { new: true, }
        );
        res.json(updatedFlight);
    } catch (error) {
        res.json({ message: error });
    }
});

router.delete("/Flight/:plate", async (req, res) => {
    const flightPlate = req.params.plate;
    try {
        const deletedFlight = await FlightSchema.findOneAndRemove(flightPlate);
        res.json(deletedFlight);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// Ruta para ejecutar una consulta
router.get('/ejecutar-consulta', async (req, res) => {
  try {
    const { cypherQuery } = req.body;

    // Llama a la función del controlador para ejecutar la consulta
    const result = await ubicacionController.ejecutarConsulta(cypherQuery);

    res.status(200).json({ resultado: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al ejecutar la consulta' });
  }
});

router.post('/crear-nodo', async (req, res) => {
    try {
      const { cypherQuery } = req.body;
  
      // Llama a la función del controlador para ejecutar la consulta de creación de nodo
      const result = await ubicacionController.ejecutarConsulta(cypherQuery);
  
      res.status(200).json({ mensaje: 'Nodo creado con éxito', resultado: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el nodo' });
    }
  });

module.exports = router;
