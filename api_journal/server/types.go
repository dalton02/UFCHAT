package server

type ImageResponse struct{
		Url string 
}
type MessageResponse struct{
		Message string
}

type ArticlePost struct{
	Article_id int `json:"article_id"`
	Title string `json:"title"`
	Content string `json:"content"`
	Author_id int `json:"author_id"`
	Tags []string `json:"tags"`
}

type Comment struct {
	Id            int       `json:"id"`
	User_id        int       `json:"user_id"`
	Article_id 	int 	`json:"article_id"`
	Content       string    `json:"content"`
	Parent_comment int       `json:"parent_comment"`
	Send_at        string    `json:"send_at"`
}

type Reaction struct{
	User_id int `json:"user_id"`
	Article_id int `json:"article_id"`
	Reaction_type int `json:"reaction_type"`
}

type Cookies struct{
	Login string `json:"login"`
	Fullname string `json:"fullname"`
	Id int `json:"id"`
	Nickname string  `json:"nickname"`
	Course string  `json:"course"`
} 

type RequestComment struct{
	Cookies Cookies `json:"cookies"`
	Data Comment `json:"data"`
}

type RequestReaction struct{
	Cookies Cookies `json:"cookies"`
	Data Reaction `json:"data"`
}

type RequestArticle struct{
	Cookies Cookies `json:"cookies"`
	Data ArticlePost `json:"data"`
}

type RequestReactionStatus struct{
	Cookies Cookies `json:"cookies"`
	Data Reaction `json:"data"`
}