package main

import "net/http"


func main(){
	
	http.HandleFunc("/HelloWorld",func(response http.ResponseWriter, request *http.Request){
		response.Write([]byte("HelloWorld"));
	})

	http.ListenAndServe(":4020",nil)
}
