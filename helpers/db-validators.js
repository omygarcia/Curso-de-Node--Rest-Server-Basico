const role = require("../models/role");
const usuario = require("../models/usuario");

const esRoleValido = async(rol = '')=>{
    const existeRol = await role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const emailExiste = async(correo = '')=>{
    const existeEmail = await usuario.findOne({correo});
    if(existeEmail){
       throw new Error(`El correo: ${correo} ya esta registrado`);
    }
}

const existeUsuarioPorId = async(id)=>{
    const existeUsuario = await usuario.findById(id);
    if(!existeUsuario){
       throw new Error(`El id: ${id} no exite en la db.`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}