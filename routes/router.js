/* jshint esversion: 6*/

//import modules
const express = require("express");
const path = require("path");
const operaciones = require('./operaciones');

//router express object
const router = express.Router();

//routes modules export
module.exports = router;

// Crear midleware
const middleware = function (req, res, next) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let fechaAnio = req.body.Fecha.substring(0, 4);
    for (var i = 0; i < 1; i++) {
        if (i == 0) {
            if (fechaAnio > 1999) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            } else {
                result += Math.round(Math.random() * 10);
            }
        }
        result += Math.round(Math.random() * 10);
    }
    req.middleware = result;
    next();
}

router.get("/", (req, res) => {
    res.render("pages/home", {
        title: "Inicio"
    });
});

router.post("/curp", middleware, (req, res) => {
    const CURP = operaciones.getRFC(req.body) + req.middleware;
    let estado = operaciones.GenerarEstado(req.body.claveEntidad);
    res.render("pages/resultado", {
        title: "Resultado",
        CURP: CURP,
        datos: req.body,
        estado: estado
    });
});

router.get("/about", (req, res) => {
    res.render("pages/about", {
        title: "About"
    });
});

router.get("/contact", (req, res) => {
    res.render("pages/contact", {
        title: "Contact"
    });
});