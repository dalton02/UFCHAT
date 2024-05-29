package server

import(
	"fmt" 
	"net/http"
	"api_journal/service"
	"os"
	"io"
	"encoding/json"
    "path/filepath"
	"github.com/google/uuid"
	"api_journal/util"
)


func routePostArticle(response http.ResponseWriter,request *http.Request){

		if(request.Method!="POST"){
			fmt.Println("Método não permitido: ", http.StatusMethodNotAllowed)
        	return
		}
		var newArticle ArticlePost
		fmt.Println(request.Body)
		decoder := json.NewDecoder(request.Body)
		err := decoder.Decode(&newArticle)
		if(err!=nil){
			fmt.Println("Erro ao deserializar dados: ",err)
			jsonData, _ := json.Marshal(MessageResponse{Message:"Erro ao deserializar dados"})
    		response.Write(jsonData)
			return
		}
		fmt.Println(newArticle)
	
		err = service.WriteArticle(db,newArticle.Title,newArticle.Content,newArticle.Author_id,newArticle.Tags)
		if(err!=nil){
			fmt.Println("Erro ao inserir artigo",err)
			jsonData, _ := json.Marshal(MessageResponse{Message:"Erro ao inserir artigo no banco"})
    		response.Write(jsonData)
    		return
		}

		response.WriteHeader(http.StatusOK)
		jsonData, _ := json.Marshal(MessageResponse{Message:"Post publicado com sucesso"})
    	response.Write(jsonData)

}


func routePostComment(response http.ResponseWriter,request *http.Request){

		if(request.Method!="POST"){
			fmt.Println("Método não permitido: ", http.StatusMethodNotAllowed)
        	return
		}

		fmt.Println(request.Body)
		var reqData RequestComment
		decoder := json.NewDecoder(request.Body)
		err := decoder.Decode(&reqData)
		
		if(err!=nil){
			fmt.Println("Erro ao deserializar dados: ",err)
			jsonData, _ := json.Marshal(MessageResponse{Message:"Erro ao deserializar dados"})
    		response.Write(jsonData)
			return
		}
		
		err = service.WriteComment(db,reqData.Data.Article_id,reqData.Cookies.Id,reqData.Data.Content,reqData.Data.Parent_comment)
		
		if(err!=nil){
			fmt.Println("Erro ao inserir comentario",err)
			jsonData, _ := json.Marshal(MessageResponse{Message:"Erro ao inserir comentario no banco"})
    		response.Write(jsonData)
    		return
		}

		response.WriteHeader(http.StatusOK)
		jsonData, _ := json.Marshal(MessageResponse{Message:"Post publicado com sucesso"})
    	response.Write(jsonData)

}

func routePostImage(response http.ResponseWriter, request *http.Request) {
   
    if request.Method != http.MethodPost {
        http.Error(response, "Método não permitido", http.StatusMethodNotAllowed)
        fmt.Println("Gotcha!")
        return
    }

	response.Header().Set("Content-Type","application/json")
   
    request.ParseMultipartForm(10 << 20) // Tamanho máximo de 10MB
   	

	fmt.Println("Pronto para verificar arquivo: ",request); 
    
    file, handler,err := request.FormFile("imagem") //Pegando id do input do forms
	
	defer file.Close()
    
    if err!=nil{
   	response.WriteHeader(http.StatusInternalServerError)
    	jsonData, _ := json.Marshal(MessageResponse{Message:"Erro ao receber arquivo"})
    	response.Write(jsonData)
    	return
    }

   
    if(!util.SanatizeFile(file)){
   	response.WriteHeader(http.StatusInternalServerError)
    	jsonData, _ := json.Marshal(MessageResponse{Message:"Arquivo incompativel"})
    	response.Write(jsonData)
    	return
   	}

    randomId := uuid.New().String()

	newFile, err := os.Create("./resources/images/" + randomId + filepath.Ext(handler.Filename))
	defer newFile.Close()
	if err != nil {
   	response.WriteHeader(http.StatusInternalServerError)
    	jsonData, _ := json.Marshal(MessageResponse{Message:"Erro ao criar arquivo"})
    	response.Write(jsonData)
    	return
	}
	
	if _, err := io.Copy(newFile, file); err != nil {
   	response.WriteHeader(http.StatusInternalServerError)
    	jsonData, _ := json.Marshal(MessageResponse{Message:"Erro ao transcrever arquivo"})
    	response.Write(jsonData)
		return
	}
	
	fmt.Println("Enviado com sucesso")

	tmp := fmt.Sprintf("%s%s",randomId,filepath.Ext(handler.Filename))
	
	imgResponse := ImageResponse{
		Url: tmp,
	}

	err = service.SaveImage(db,tmp)
	if(err!=nil){
   	response.WriteHeader(http.StatusInternalServerError)
    	jsonData, _ := json.Marshal(MessageResponse{Message:"Erro ao inserir no banco de imagens"})
    	response.Write(jsonData)
		return
	}

	response.WriteHeader(http.StatusOK)
	jsonData, _ := json.Marshal(imgResponse)
    response.Write(jsonData)
}

func doNothing(w http.ResponseWriter, r *http.Request){}


