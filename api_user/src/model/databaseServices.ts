import { literal, Sequelize, DataTypes } from 'sequelize';
import { StudentsAttributes } from '../types/type';
import {SequelizeConnection} from './databaseCon'

export class UserServices {
  private sequelize: any;
  private students: any; 

  constructor() {
    this.sequelize = new SequelizeConnection().seque;
    this.students = this.sequelize.define("students",StudentsAttributes);
  }

  addUser = async(matricula:number,fullname:string,nickname:string,curso:string,login:string) => {
    const student = await this.students.create({
      id: matricula,
      nickname: nickname,
      fullname: fullname,
      course: curso,
      login: login
    });
    return student;
  }

  getUserAll = async() =>{
    const student = await this.students.findAll();
    return student;
  }

  getUserById = async(matricula:number) => {
    const student = await this.students.findByPk(matricula);
    return student;
    }
  updateUser = async(nickname:string,matricula:number) =>{
    const student = await this.students.findByPk(matricula);
    if(student==null) throw new Error();
    student.nickname = nickname;
    await student.save();
  }

}
