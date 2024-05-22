package server
	
import(
	"fmt" 
	"net/http"
	"api_journal/service"
    "database/sql"
)


//Quando minusculo, significa que só pode ser acessada no package server
var db *sql.DB


func MainServer(){

	db,err2 := service.InitConnection()
	 if err2 != nil {
        return
    }

    defer db.Close()

	http.HandleFunc("/", routeGetArticle)
	http.HandleFunc("/post", routePostArticle)
	http.HandleFunc("/sendImage", uploadHandler) //Test only
	http.HandleFunc("/favicon.ico", doNothing)
	
	err := http.ListenAndServe(":4020",nil)
	if(err==nil){
		fmt.Println("Erro no servidor: ",err)
	}

}