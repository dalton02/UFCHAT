package server
	
import(
	"fmt" 
	"net/http"
	"api_journal/service"
    "database/sql"
    "github.com/rs/cors"
)


//Quando minusculo, significa que só pode ser acessada no package server
var db *sql.DB


func MainServer(){

	db,_ = service.InitConnection()
	defer db.Close()
    fs := http.FileServer(http.Dir("./resources/images/"))
    http.Handle("/files/", http.StripPrefix("/files/", fs))

	http.HandleFunc("/", routeChunkArticle)
	http.HandleFunc("/get", routeGetArticle)
	http.HandleFunc("/postReactionStatus", routePostReactionStatus)
	http.HandleFunc("/post", routePostArticle)
	http.HandleFunc("/react", routePostReaction)
	http.HandleFunc("/comment", routePostComment)	
	http.HandleFunc("/sendImage", routePostImage)
	
	http.HandleFunc("/favicon.ico", doNothing)

	corsHandler := cors.Default().Handler(http.DefaultServeMux)
	err := http.ListenAndServe(":4020", corsHandler)
	fmt.Println("Server running in port: 4020")
	if(err==nil){
		fmt.Println("Erro no servidor: ",err)
	}

}