package util

import (
	"fmt"
	"mime/multipart"
	"net/http"
	"strconv"
	"strings"
    "io"
)


func ArrayToInt(tmpString[]string)(tmpInt[]int){
	var tmp []int
	
	for _, str := range tmpString {
    	num,err:=strconv.Atoi(str)
    	if err != nil {
			fmt.Printf("Erro ao converter %s para inteiro: %v\n", str, err)
			return nil	
		}
		tmp = append(tmp, num)	
    	}
    return tmp
}

func ArrayToString(array []int) string {
    // Converter cada número em uma string
    var strNumbers []string
    
    for _, num := range array {
        strNumbers = append(strNumbers, fmt.Sprintf("%d", num))
    }
    
    numbersString := strings.Join(strNumbers, ",")

    result := fmt.Sprintf("{%s}", numbersString)
    return result
}

func SanatizeFile(file multipart.File) (bool){

    buffer := make([]byte,512)
    _,err := file.Read(buffer) //Lendo 512 bytes iniciais do arquivos, necessario realocação
    if(err!=nil){
        fmt.Println("Erro ao ler arquivo")
        return false
    }
    
    mime := fmt.Sprintf("%s",http.DetectContentType(buffer))
    fmt.Println(mime)
    if(mime!="image/jpeg" && mime!="image/png" && mime!="image/webp"){
        fmt.Println("Not safe file")
        return false
    }

    _,err = file.Seek(0,io.SeekStart)
    if(err!=nil){
        return false
    }
    return true
}
