import { literal, Sequelize, Op, DataTypes } from 'sequelize';
import { MessageAttributes, ConversationAttributes} from '../objects/types';


export class ChatServices {
  private sequelize: Sequelize;
  private message: any; 
  private conversation: any; 

  constructor(sequelize: Sequelize) {

    this.sequelize = sequelize;
    this.message = this.sequelize.define("messages",MessageAttributes);
    this.conversation = this.sequelize.define('conversations', ConversationAttributes);
  }

  sendMessage = async (conversation_id: number, body: string, sender_nick:string,sender_id: number, send_at: Date) => {
    const message1 = await this.message.create({
      conversation_id: conversation_id,
      body: body,
      sender_id: sender_id,
      send_at: send_at,
      sender_nick: sender_nick
    });
  }

  findMessage = async (id: string) => {
    const message1 = await this.message.findOne({ where: { id: `${id}` } });
    return message1;
  }

  createConversation = async (conversation_name: string) => {
  
  }

  addUserInChat = async(user_id:number,chat_id:number) =>{
      
      const chatParticipants = await this.conversation.findByPk(chat_id);
      console.log(chatParticipants.name);
      
      if(chatParticipants.users_id==null)
        chatParticipants.users_id = [];

      chatParticipants.users_id = [...chatParticipants.users_id,user_id];
      await chatParticipants.save();
      return chatParticipants;
  };

  loadChunk = async(conversation_id: number) =>{

    const chunk = await this.message.findAll({
      where: {
        conversation_id: conversation_id
      },
      order: [['send_at', 'ASC']], // Ordena por send_at em ordem crescente (mais antigo para mais recente)
      limit: 300 // Limita a 2 resultados por chunk
    });
    return chunk;
  }

  loadConversations = async(user_id:number)=>{

    const conversations = await this.conversation.findAll({
      where:{
        users_id: {
          [Op.contains]: [user_id]
        }
      }
    });
    return conversations;
  }

  loadConversationDetails = async(id:number)=>{
    const conversation = await this.conversation.findByPk(id);
    return conversation;
  }

}
