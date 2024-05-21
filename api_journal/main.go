package main

import (
	"fmt"
	"api_journal/scrapper"
)

func main(){
	
	fmt.Println("Iniciando o scrapper...")

	// Chama a função RunScrapper() do pacote scrapper
	scrapper.RunScrapper()

	fmt.Println("Scrapper finalizado.")

}
