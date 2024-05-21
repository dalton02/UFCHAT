package scrapper

import(

	"fmt"
	"strings" 
    "github.com/gocolly/colly"
  )

func RunScrapper(){

    // Instancia um novo coletor
    c := colly.NewCollector()

    // Define um callback para quando um elemento <a> com href for encontrado
    c.OnHTML("section.twelve", func(e *colly.HTMLElement) {
        e.ForEach("a[href]", func(x int,elem *colly.HTMLElement){

        	link := elem.Attr("href")
        	contains := strings.Contains(link,"https://www.ufca.edu.br/informes/page")

        	if(!contains && link!="https://www.ufca.edu.br"){
        		fmt.Println(link)
        		c.Visit(link)
        	}
        	
        })
    })

    c.OnHTML("div.content.one.column.row", func(e *colly.HTMLElement){
    	fmt.Println(e.Text)
    })	

    // Visita a página inicial do site de exemplo
    c.Visit("https://www.ufca.edu.br/informes/")

}
