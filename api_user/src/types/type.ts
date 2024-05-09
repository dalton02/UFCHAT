import {literal,DataTypes} from 'sequelize';

export const StudentsAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nickname: {
    type: DataTypes.STRING, // Alterado para 'number', pois 'DataTypes.INTEGER' não é acessível aqui diretamente
    allowNull: false
  },
  fullname: {
    type: DataTypes.STRING, // Alterado para 'string', pois 'DataTypes.STRING' não é acessível aqui diretamente
    allowNull: false
  },
  course: {
    type: DataTypes.STRING, // Alterado para 'string', pois 'DataTypes.STRING' não é acessível aqui diretamente
    allowNull: false
  },
  login: {
    type: DataTypes.STRING, // Alterado para 'string', pois 'DataTypes.STRING' não é acessível aqui diretamente
    allowNull: false
  }
};
