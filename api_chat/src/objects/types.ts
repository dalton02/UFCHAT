import {literal,DataTypes} from 'sequelize';


//Definindo as tipagens que seram usadas

export const MessageAttributes = {
  id: {
    type: DataTypes.STRING,
    defaultValue: literal('gen_random_uuid()'),
    primaryKey: true
  },
  conversation_id: {
    type: DataTypes.INTEGER, 
  },
  body: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  sender_id: {
    type: DataTypes.INTEGER, 
    allowNull: false
  },
  send_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  sender_nick:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
};

export const ConversationAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE, 
    allowNull: false
  }
}

export const ConversationParticipantsAttributes = {
  chat_id: {
    type: DataTypes.INTEGER, 
    foreignKey: true
  },
  users_id: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false
  }
}


export interface InterfaceMessage {
  conversation_id:number;
  body:string;
  sender_id:number;
  receiver_id:number;
  send_at:string;
}