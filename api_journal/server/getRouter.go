package server

import(
	"fmt" 
	"net/http"
	"api_journal/service"
	"strconv"
	"encoding/json"
)

func routeGetArticle(response http.ResponseWriter,request *http.Request){
		if(request.Method!="GET"){
			fmt.Println("Método não permitido: ", http.StatusMethodNotAllowed)
        	return
		}

		query := request.URL.Query()
		id := query.Get("id")
		title := query.Get("title")

		if(id!=""){
			num, err := strconv.Atoi(id)
       		if err != nil {
           		fmt.Println("Id ",id," invalida:",err)
           		return
       		}
       		article,err := service.GetArticle(db,num)	
			if (err!=nil){
				fmt.Println("Erro: ",err)
				response.WriteHeader(http.StatusNotFound)
				jsonData, _ := json.Marshal(MessageResponse{Message:"Artigo não encontrado"})
    			response.Write(jsonData)
    			return
			}
			response.WriteHeader(http.StatusOK)
			jsonData, _ := json.Marshal(article)
    		response.Write(jsonData)
    		return
       }

		if(title!=""){
       		article,err := service.GetArticleByTitle(db,title)	
			if (err!=nil){
				fmt.Println("Erro: ",err)
				response.WriteHeader(http.StatusNotFound)
				jsonData, _ := json.Marshal(MessageResponse{Message:"Artigo não encontrado"})
    			response.Write(jsonData)
				return 
			}
			response.WriteHeader(http.StatusOK)
			jsonData, _ := json.Marshal(article)
    		response.Write(jsonData)
    		return
		}
			
}


func routeChunkArticle(response http.ResponseWriter,request *http.Request){

		if(request.Method!="GET"){
			fmt.Println("Método não permitido: ", http.StatusMethodNotAllowed)
        	return
		}

		offset := request.URL.Query().Get("offset")
		num, err := strconv.Atoi(offset)
        if err != nil {
           	fmt.Println("Id ",offset," invalida:",err)
           	return
        }
        fmt.Println(num)
		articles,err := service.GetChunckArticle(db,num)
		if (err!=nil){
			fmt.Println("Erro: ",err)
		}

		response.WriteHeader(http.StatusOK)
		jsonData, _ := json.Marshal(articles)
    	response.Write(jsonData)
		
}
