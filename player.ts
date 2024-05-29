const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const players = Model.define('jugadores',{
    
    nombre:{
        type:DataTypes.STRING(30),
        //default?
    },

    fechaRegistro:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }, 

    registrar(nombreUsuario:String){
        await Model.create({nombre:nombreUsuario})
    },

    actualizarNombre(nombreUsuario:string, idUsuario:Number){
        await Model.update(
            { nombre: nombreUsuario },
            {
              where: {
                id: idUsuario,
              },
            },
          );

}

)