package scrapper

import(

	"fmt"
	"strings" 
    "github.com/gocolly/colly"
    "github.com/PuerkitoBio/goquery" 
  )

func RunScrapper(){

    //Instancias de coletores
    enumPageCollector := colly.NewCollector()
    contentPageCollector := colly.NewCollector()

    // Define um callback para quando um elemento <a> com href for encontrado
    contentPageCollector.OnHTML("section.twelve", func(e *colly.HTMLElement) {
        e.ForEach("a[href]", func(x int,elem *colly.HTMLElement){
        	link := elem.Attr("href")
        	contains := strings.Contains(link,"https://www.ufca.edu.br/informes/page")

        	if(!contains && link!="https://www.ufca.edu.br"){
        		fmt.Println(link)
        		contentPageCollector.Visit(link)
        	}
        	
        })
    })

    //Content of each link
    contentPageCollector.OnHTML("div.content.one.column.row", func(e *colly.HTMLElement){
    	fmt.Println(e.Text)
    })	
    enumPageCollector.OnHTML("nav.ui.pagination.menu",func(e *colly.HTMLElement){
  //      e.ForEach("a[href]", func(x int,elem *colly.HTMLElement){
    //        dom,_ := goquery.NewDocument(elelm)
      ///  })
    })
    // Visita a página inicial do site de exemplo
    contentPageCollector.Visit("https://www.ufca.edu.br/informes/")
    enumPageCollector.Visit("https://www.ufca.edu.br/informes/")
}
