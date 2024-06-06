

import {devEnvironment} from '$lib/api/keys.js';

export const submitImage = async(formData)=> {

        const response = await fetch(devEnvironment.PUBLIC_SERVER_GATEWAY+'/news/sendImage',{
        	method: 'POST',
            body: formData,
            credentials: 'include'
        })
        
        const json = await response.json();
        
        if(!response.ok){
        	console.log(json.Message);
        	return;
        }

        return `![Descrição da imagem](${devEnvironment.PUBLIC_STATIC_NEWSFILE}${json.Url})`;
}

export const submitPost = async(title,content,tags)=> {
	    const data = {
	    	Title:title,
			Content: content,
			Tags: tags
		}
        const response = await fetch(devEnvironment.PUBLIC_SERVER_GATEWAY+'/news/post', {
        	method: 'POST',
            credentials: 'include',
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

export const submitReaction = async(article_id,reaction_type) =>{

    const request = {
        method: 'POST',
        body: JSON.stringify({
            article_id: article_id,
            reaction_type: reaction_type
        }),
        headers:{   
            'Content-Type':'application/json'
        },
        credentials: 'include'
    }
    console.log(request);
    const response = await fetch(devEnvironment.PUBLIC_SERVER_GATEWAY+'/news/react',request)
    const json = await response.json();
    console.log(json.Message);
}