package server

type ImageResponse struct{
		Url string 
}
type MessageResponse struct{
		Message string
}

type ArticlePost struct{
	Title string
	Content string
	Author_id int
	Tags []string
}

type Comment struct {
	Id            int       `json:"id"`
	User_id        int       `json:"user_id"`
	Article_id 	int 	`json:"article_id"`
	Content       string    `json:"content"`
	Parent_comment int       `json:"parent_comment"`
	Send_at        string    `json:"send_at"`
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
