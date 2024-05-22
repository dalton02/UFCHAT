package main

import (
	"fmt"
	"api_journal/server"
)

func main(){
	
	fmt.Println("Iniciando o scrapper...")
	server.MainServer()
	fmt.Println("Scrapper finalizado.")

}
