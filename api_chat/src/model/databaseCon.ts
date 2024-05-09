import { Sequelize } from 'sequelize';
import {development} from '../objects/environment';

export class SequelizeConnection {
  public seque: Sequelize;

  constructor() {
    this.seque = new Sequelize(development.database,development.username,development.password, {
      host: development.host,
      dialect: 'postgres',
      port: development.port,
      define: {
        timestamps: false // Remove colunas chatas
      },
    });
    this.auth();
  }

  private async auth(): Promise<void> {
    try {
      await this.seque.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}
