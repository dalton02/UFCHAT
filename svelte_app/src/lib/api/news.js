

import {devEnvironment} from '$lib/api/keys.js';

export const submitImage = async(formData)=> {

        const response = await fetch(`http://localhost:4020/sendImage`,{
        	method: 'POST',
            body: formData
        })
        
        const json = await response.json();
        
        if(!response.ok){
        	console.log(json.Message);
        	return;
        }

        return `![Descrição da imagem](http://localhost:4020/files/${json.Url})`;
}

export const submitPost = async(title,content,author,tags)=> {
	    const data = {
	    	Title:title,
			Content: content,
			Author_id: author,
			Tags: tags
		}
        const response = await fetch('http://localhost:4020/post', {
        	method: 'POST',
        	headers:{	
        		'Content-Type':'application/json'
        	},
            body: JSON.stringify(data)
        })

        const json = await response.json();
        console.log(json.Message);
        
}


export const submitComment = async(article_id,content,parent_comment)=>{        
    const data = {
            article_id: article_id,
            content: content,
            parent_comment: parent_comment
        }

        const response = await fetch(devEnvironment.PUBLIC_SERVER_GATEWAY+'/news/comment', {
            method: 'POST',
            headers:{   
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })

        const json = await response.json();
        console.log(json.Message);
        

}