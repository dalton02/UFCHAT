package service

import (
    "database/sql"
    "fmt"
    "github.com/lib/pq"
    "encoding/json"
)

type Comment struct {
	Id            int       `json:"id"`
	User_id        int       `json:"user_id"`
	Article_id 	int 	`json:"article_id"`
	Content       string    `json:"content"`
	Parent_comment int       `json:"parent_comment"`
	Send_at        string    `json:"send_at"`
}

type Article struct {
	Id         int       `json:"id"`
	Title      string    `json:"title"`
	Content    string    `json:"content"`
	Author_id   int       `json:"author_id"`
	Tags       string    `json:"tags"`
	Send_at  string       `json:"send_at"`
	Fire_react  int       `json:"fire_react"`
	Heart_react int       `json:"heart_react"`
	Like_react  int       `json:"like_react"`
	Comments   []Comment `json:"comments"`
}


func GetArticle(db *sql.DB,id int) (Article,error){
	var article Article
	var comments []byte
	query := `SELECT  
    CASE 
        WHEN COUNT(c.id) > 0 
            THEN JSON_ARRAYAGG(JSON_BUILD_OBJECT('id', c.id, 'user_id', c.user_id, 'content', c.content, 'parent_comment', c.parent_comment, 'send_at', c.send_at)) 
        ELSE NULL 
    END AS comments,
    a.id,
    a.title,
    a.content,
    a.author_id,
    a.tags,
    a.send_at,
    r.fire_react,
    r.heart_react,
    r.like_react
FROM articles a 
LEFT JOIN comments c ON c.article_id = a.id 
LEFT JOIN reactions r ON r.article_id = a.id
WHERE a.id = $1
GROUP BY a.id, a.title, a.content, a.author_id, a.tags, a.send_at,r.fire_react, r.heart_react, r.like_react`

	rows, err := db.Query(query,id)
	if (err != nil){
		fmt.Println("Erro na query: ",err)
		return article,err
	}
	defer rows.Close()

	for !rows.Next(){
		err = fmt.Errorf("Nenhum artigo encontrado com o ID: %d", id)
		return article,err
	}
        
    if err := rows.Scan(&comments,&article.Id,&article.Title, &article.Content, &article.Author_id,
    &article.Tags,&article.Send_at,&article.Fire_react,&article.Heart_react,&article.Like_react); err != nil {
    		fmt.Println("Erro ao escanear linha:", err)
    		return article,err
    }

    if err := json.Unmarshal(comments, &article.Comments); err != nil {
		fmt.Println("Erro ao deserializar comentários:", err)
		return article, err
	}

	fmt.Println(article)
    
    return article,nil
}

func GetArticleByTitle(db *sql.DB,title string) (Article,error){
	var article Article
	var comments []byte
	query := `SELECT  
    CASE 
        WHEN COUNT(c.id) > 0 
            THEN JSON_ARRAYAGG(JSON_BUILD_OBJECT('id', c.id, 'user_id', c.user_id, 'content', c.content, 'parent_comment', c.parent_comment, 'send_at', c.send_at)) 
        ELSE NULL 
    END AS comments,
    a.id,
    a.title,
    a.content,
    a.author_id,
    a.tags,
    a.send_at,
    r.fire_react,
    r.heart_react,
    r.like_react
FROM articles a 
LEFT JOIN comments c ON c.article_id = a.id 
LEFT JOIN reactions r ON r.article_id = a.id
WHERE a.title = $1
GROUP BY a.id, a.title, a.content, a.author_id, a.tags, a.send_at,r.fire_react, r.heart_react, r.like_react`

	rows, err := db.Query(query,title)
	if (err != nil){
		fmt.Println("Erro na query: ",err)
		return article,err
	}
	defer rows.Close()

	for !rows.Next(){
		err = fmt.Errorf("Nenhum artigo encontrado")
		return article,err
	}
        
    if err := rows.Scan(&comments,&article.Id,&article.Title, &article.Content, &article.Author_id,
    &article.Tags,&article.Send_at,&article.Fire_react,&article.Heart_react,&article.Like_react); err != nil {
    		fmt.Println("Erro ao escanear linha:", err)
    		return article,err
    }

    if(comments==nil){
  		article.Comments = []Comment{};	
    }else{
    	if err := json.Unmarshal(comments, &article.Comments); err != nil {
			fmt.Println("Erro ao deserializar comentários:", err)
			return article,nil
		}
	}

	fmt.Println(article)
    
    return article,nil
}

func GetChunckArticle(db*sql.DB,tam int)([]Article,error){
	var articles []Article
	
	query := `SELECT  
    CASE 
        WHEN COUNT(c.id) > 0 
            THEN JSON_ARRAYAGG(JSON_BUILD_OBJECT('id', c.id, 'user_id', c.user_id, 'content', c.content, 'parent_comment', c.parent_comment, 'send_at', c.send_at)) 
        ELSE '[]'::json  
    END AS comments,
    a.id,
    a.title,
    a.content,
    a.author_id,
    a.tags,
    a.send_at,
    r.fire_react,
    r.heart_react,
    r.like_react
FROM articles a 
LEFT JOIN comments c ON c.article_id = a.id 
LEFT JOIN reactions r ON r.article_id = a.id
GROUP BY a.id, a.title, a.content, a.author_id, a.tags,a.send_at,r.fire_react, r.heart_react, r.like_react
`



	rows, err := db.Query(query)

	if (err != nil){
		fmt.Println("Erro na query: ",err)
		return articles,err
	}
	defer rows.Close()

	for rows.Next(){
		var article Article
		var comments []byte
  		if err := rows.Scan(&comments, &article.Id, &article.Title, &article.Content, &article.Author_id,
			&article.Tags, &article.Send_at, &article.Fire_react, &article.Heart_react, &article.Like_react); err != nil {
			fmt.Println("Erro ao escanear linha:", err)
			return articles, err
		}
		if err := json.Unmarshal(comments, &article.Comments); err != nil {
			fmt.Println("Erro ao deserializar comentários:", err)
			return articles, err
		}
		articles = append(articles,article)
	}
	fmt.Println("Sucesso")
	return articles,nil
}

func WriteArticle(db *sql.DB,title string,content string,author_id int,tags []string)(error){
	fmt.Println(tags)
	_, err := db.Exec("INSERT INTO articles (title,content,author_id,tags,send_at) VALUES($1,$2,$3,$4,NOW())",title,content,author_id,pq.Array(tags))
	
	if(err!=nil){
		fmt.Println("Não foi possivel inserir artigo:",err);
		return err
	}
	
	fmt.Println("Inserido com sucesso")
	return nil
}

func WriteComment(db *sql.DB,article_id int,user_id int,content string,parent_comment int)(error){
	
	var parentComment *int
	
	if parent_comment != 0 {
    	parentComment = &parent_comment
	}
	
	_, err := db.Exec("INSERT INTO comments (article_id,user_id,content,parent_comment,send_at) VALUES($1,$2,$3,$4,NOW())",article_id,user_id,content,parentComment)
	if(err!=nil){
		fmt.Println("Não foi possivel inserir comentario:",err);
		return err
	}
	
	fmt.Println("Inserido com sucesso")
	return nil
}

func SaveImage(db*sql.DB,url string)(error){
	result,err := db.Exec("INSERT INTO images (url,published,created_at) VALUES($1,false,NOW())",url)
	if(err!=nil){
		fmt.Println("Erro na inserção da imagem: ",err)
		return err
	}
	rows,_ := result.RowsAffected()
	fmt.Println(rows)
	return nil
}