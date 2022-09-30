const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/conductor.model');
const app = express();

 
  
  app.get('/conductor', function (req, res) {

      let desde = req.query.desde || 0;
      let hasta = req.query.hasta || 100;

    Usuario.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, usuarios) =>{
       if(err) {
           return res.status(400).json({
               ok: false,
               msg: 'Ocurrio un error al momento de consultar',
               err 
           });
       } 

       res.json({
           ok:true,
           msg: 'Lista de usuarios obtenida con exito',
           conteo: usuarios.length,
           usuarios
       });
    });
  });

  app.get('/conductor/:email', function (req, res) {

    let idusuario = req.params.email;
  Usuario.findOne({email: idusuario})
  .exec((err, usuarios) =>{
     if(err) {
         return res.status(400).json({
             ok: false,
             msg: 'Ocurrio un error al momento de consultars',
             err 
         });
     } 

     res.json({
         ok:true,
         msg: 'usuario obtenida con exito',
         conteo: usuarios.length,
         usuarios
     });
  });
});
  
  app.post('/conductor', function (req, res) {
    let body = req.body;
    let usr = new Usuario({
        //_id: req.body._id,
        nombre: body.nombre,
        apellidos: req.body.apellidos,
        email: body.email,
        direccion: body.direccion,
        curp: body.curp,
        password: body.password,
        placa: body.placa,
        marca: body.marca,
        modelo: body.modelo
    });

    usr.save((err, usrDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Usuario insertado con exito',
            usrDB
        });
    });
  });
  
  app.put('/usuario/:id', function (req, res) {
    let id = req.params.id
    let body = _.pick(req.body,['nombre','apellidos','email']);

    Usuario.findByIdAndUpdate(id, body, { new:true, runValidators: true, context: 'query' }, (err, usrDB) =>{
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al actualizar',
                err
            });
        }

        res.json({
            ok:true,
            msg: 'Usuario actualizado con exito',
            usuario: usrDB
        });
    });
  });
  
  app.delete('/conductor/:id', function (req, res) {
     let id = req.params.id;

      Usuario.deleteOne({ _id: id }, (err, usuarioBorrado) =>{
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al intentar de eliminar el usuario',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Usuario eliminado con exito',
            usuarioBorrado
        });
      });
      /*let id =  req.params.id;

      Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al intentar de eliminar el usuario',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Usuario eliminado con exito',
            usrDB
        });
      });*/
  });

module.exports = app;