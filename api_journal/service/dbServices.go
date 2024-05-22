package service

import (
    "database/sql"
    "fmt"
    "github.com/lib/pq"
    "api_journal/util"
   
)

type Article struct{
	Id int
	Title string
	Content string
	Author_id int
	Tags_id []int
}
 
func GetArticle(db *sql.DB,id int) (article Article){
	rows, err := db.Query("SELECT * FROM articles where id=$1",id)
	if (err != nil){
		fmt.Println("Erro na query: ",err)
		return
	}
	defer rows.Close()

	for !rows.Next(){
		err = fmt.Errorf("Nenhum artigo encontrado com o ID: %d", id)
		return
	}

	var stringToInt []string
        
    if err := rows.Scan(&article.Title, &article.Content, &article.Author_id,pq.Array(&stringToInt),&article.Id); err != nil {
    		fmt.Println("Erro ao escanear linha:", err)
    		return
    }
	article.Tags_id = util.ArrayToInt(stringToInt)
	fmt.Println(article)
    
    return article
}

func WriteArticle(db *sql.DB,title string,content string,author_id int,tags_id []int){
	convertedString := util.ArrayToString(tags_id)
	result, err := db.Exec("INSERT INTO articles (title,content,author_id,tags_id) VALUES($1,$2,$3,$4)",title,content,author_id,convertedString)
	
	if(err!=nil){
		panic(err.Error())
	
	}
	rowsAffected,err:= result.RowsAffected()
	
	if(err!=nil){
		panic(err.Error())
	}
	fmt.Println(rowsAffected)
}