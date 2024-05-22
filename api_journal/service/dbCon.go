package service

import (
    "database/sql"
    "fmt"
    "github.com/joho/godotenv"
    "os"
    "strconv"
)

func InitConnection()(*sql.DB, error){
    err := godotenv.Load()
    if err != nil {
        panic(err.Error())
    }

    host     :=  os.Getenv("DB_HOST")
    port     :=  os.Getenv("DB_PORT")
    user     :=  os.Getenv("DB_USERNAME")
    password :=  os.Getenv("DB_PASSWORD")
    dbname   :=  os.Getenv("DB_NAME")
    
    num, err := strconv.Atoi(port)
    if err != nil {
        fmt.Println("Erro ao converter string para inteiro:", err)
        return nil,err
    }

    connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, num, user, password, dbname)

    db, err := sql.Open("postgres", connStr)
    
    if err != nil {
        fmt.Println("Erro ao conectar ao banco de dados:", err)
        return nil,err
    }


	 // Verificar se a conexão com o banco de dados está funcionando
    err = db.Ping()
    if err != nil {
        fmt.Println("Erro ao pingar o banco de dados:", err)
        db.Close()
        return nil,err
    }
    
    return db, nil

}