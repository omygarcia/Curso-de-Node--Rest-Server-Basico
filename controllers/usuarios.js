const {response, request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async(req = request,res = response)=>{
    //const {q, nombre, page = 1} = req.query;
    const {limite = 5, desde = 0} = req.query;
    const query = {estado:true};
    /*
    const usuarios = await Usuario.find(query).limit(Number(limite)).skip(Number(desde));
    const total = await Usuario.countDocuments(query);
    */

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).limit(Number(limite)).skip(Number(desde)),
    ]);

    res.json({
        /*msg:'get API - controlador',
        q,
        nombre,
        page,*/
        total,
        usuarios
    });
}

const usuariosPost = async(req,res = response)=>{
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);
    
    await usuario.save();
    res.json({
        //msg:'post API - controlador',
        usuario
    });
}

const usuariosPut = async(req,res = response)=>{
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    //TODO validar contra base de datos
    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        msg:'put API - controlador'+id,
        usuario
    });
}

const usuariosPatch = (req,res = response)=>{
    res.json({
        msg:'patch API - controlador'
    });
}

const usuariosDelete = async(req = request,res = response)=>{
    const {id} = req.params;

    //Eliminación fisica
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    res.json({
        //msg:'delete API - controlador'
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}