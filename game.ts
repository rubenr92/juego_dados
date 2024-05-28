const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const jugada = sequelize.define('jugada', {
  id: {
    type: DataTypes.INTEGER,
    unsigned: true,
    autoIncrement: true,
    primaryKey: true,
  },

  dado1: {
    type:DataTypes.INTEGER,
    allowNull: false,
  },

  dado2: {
    type:DataTypes.INTEGER,
    allowNull: false,
  },

  resultado: {
    type: DataTypes.INTEGER // calcular ??
  },

  jugador: DataTypes.STRING(20),  //foreign key

  roll(valor1:Number, valor2:Number, res, id){
    //const dado1 = Math.floor(Math.random() * 6) + 1
    //const dado2 = Math.floor(Math.random() * 6) + 1
    //const res = (dado1 + dado2) == 7 ? 1:0
    this.create({dado1:valor1, dado2:valor2, jugador:id, resultado:res})
    //return res
  },

  playergames(playerId){ //buscar por nombre?
    return Model.findall({where:{jugador:playerId}})
    //añadir porcentaje victorias
  },

  borrarPartidas(playerId){
    Model.destroy({where:{jugador:playerId}})
  },

  ranking(limit=null, order='DESC'){
    return Model.findall({
        attributes:['jugador', [sequelize.fn('COUNT', (sequelize.col('resultado')) / sequelize.fn('SUM', sequelize.col('victoria')))*100,
                    'porcentajeVictorias']], 
        group:'jugador',
        limit: limit,
        order:order})
  },

  /*loser(){
    return this.ranking(1)
  },

  winner(){
    return this.ranking(1, 'ASC')
  },*/
});