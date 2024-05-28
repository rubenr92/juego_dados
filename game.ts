const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const jugada = sequelize.define('jugada', {
  id: {
    type: DataTypes.INTEGER,
    unsigned: true,
    autoIncrement: true,
    primaryKey: true,
  },
  resultado: {
    type:DataTypes.INTEGER,
    allowNull: false,
  },

  jugador: DataTypes.STRING(20),
  victoria: {
    type: DataTypes.INTEGER,
    //get(){ return this.resultado == 7 ? 1:0}
  },

  roll(id){
    const res = (Math.floor(Math.random() * 6) + 1 ) + (Math.floor(Math.random() * 6) + 1 )
    this.create({resultado:res, jugador:id, victoria: res == 7 ? 1:0})
    return res
  },

  playergames(playerId){ //buscar por nombre?
    return Model.findall({where:{jugador:playerId}})
    //añadir porcentaje victorias
  },

  borrarPartidas(playerId){
    Model.destroy({where:{jugador:playerId}})
  }

  ranking(limit=null, order='DESC'){
    return Model.findall({
        attributes:['jugador', [sequelize.fn('COUNT', (sequelize.col('resultado')) / sequelize.fn('SUM', sequelize.col('victoria')))*100,
                    'porcentajeVictorias']], 
        group:'jugador'})
  },

  loser(){
    return this.ranking(1,'ASC')
  },

  winner(){
    return this.ranking(1)
  },
  

});