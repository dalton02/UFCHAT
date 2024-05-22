package server

import(
	"fmt" 
	"net/http"
	"api_journal/service"
	"strconv"
	"os"
	"io"
)

func routeGetArticle(response http.ResponseWriter,request *http.Request){

		if(request.Method=="GET"){

			query := request.URL.Query()
			id := query.Get("id")

			num, err := strconv.Atoi(id)
        	if err != nil {
            	fmt.Println("Id ",id," invalida:",err)
            	return
        	}

			service.GetArticle(db,num)

		
		}
}

func routePostArticle(response http.ResponseWriter,request *http.Request){

		if(request.Method=="POST"){

			body := request.Body
			fmt.Println(body)
		
		}
}


func uploadHandler(response http.ResponseWriter, request *http.Request) {
   
    if request.Method != http.MethodPost {
        http.Error(response, "Método não permitido", http.StatusMethodNotAllowed)
        return
    }

    file, _, err := request.FormFile("image")
    if err != nil {
        http.Error(response, "Erro ao receber o arquivo", http.StatusInternalServerError)
        return
    }
    defer file.Close()
	
	dst, err := os.Create("/resources/images/" + "teste.jpeg")
	if err != nil {
		http.Error(response, "Erro ao criar o arquivo", http.StatusInternalServerError)
		return
	}
	
	defer dst.Close()
	if _, err := io.Copy(dst, file); err != nil {
		http.Error(response, "Erro ao copiar o conteúdo do arquivo", http.StatusInternalServerError)
		return
	}

}


func doNothing(w http.ResponseWriter, r *http.Request){}


