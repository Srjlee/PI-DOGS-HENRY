const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {    
    id: {
      type: DataTypes.UUID,      
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.STRING,
      allowNull: false

    },
    peso: {
      type: DataTypes.STRING,
      allowNull: false

    },
    años_de_vida:{
      type: DataTypes.STRING,     

    },
    imagen: {
      type: DataTypes.STRING,
      
    }


  }, {
    timestamps: false
  });
};
