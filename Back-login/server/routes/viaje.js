const express = require('express');
const _ = require('underscore');
const app = express();
const Viaje = require('../models/viaje');

app.get('/viaje', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 100;

    Viaje.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('categoria', 'descripcion usuario')
    .exec((err, productos) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al listar las productos',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Productos listadas con exito',
            conteo: productos.length,
            productos
        });
    });
});

app.get('/viaje/:email', (req, res) => {
    let idprod = req.params.email;
    Viaje.find({email: idprod})
    .exec((err, productos) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al listar las viajes',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'viajes listadas con exito',
            productos
        });
    });
});

app.post('/viaje', (req, res) =>{
    let pro = new Viaje({
        destino: req.body.destino,
        inicio: req.body.inicio,
        email: req.body.email,
    });

    pro.save((err, proDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un viaje',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Viaje insertado con exito',
            proDB
        });
    });
});

app.put('/viaje/:id', function (req, res) {
    let id = req.params.id
    let body = _.pick(req.body,['nombre','preciouni','categoria']);

    Viaje.findByIdAndUpdate(id, body, { new:true, runValidators: true, context: 'query' }, (err, prodDB) =>{
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al actualizar',
                err
            });
        }

        res.json({
            ok:true,
            msg: 'Producto actualizado con exito',
            productos: prodDB
        });
    });
  });

  app.delete('/viaje/:id', function (req, res) {
    let id = req.params.id;

     Producto.deleteOne({ _id: id }, (err, productoBorrado) =>{
       if(err) {
           return res.status(400).json({
               ok: false,
               msg: 'Ocurrio un error al intentar de eliminar el producto',
               err
           });
       }

       res.json({
           ok: true,
           msg: 'Producto eliminado con exito',
           productoBorrado
       });
    });
});

    

module.exports = app;