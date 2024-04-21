import { API_URL } from "$lib/config_front";
import { fail } from '@sveltejs/kit';
import { formToJson } from "$lib/functions";

const regExpPassword = /^([a-zA-Z0-9!$_-éèêà]{7,14})$/

function checkPassword(password,password2){
    if(password.match(regExpPassword)&&password==password2){
        return true ;
    }else if(!password.match(regExpPassword)){
        throw new Error('Mot de passe invalide : il doit être entre 7 et 14 caractères.')
    }else{
        throw new Error('Les deux mots de passe ne correspondent pas.')
    }
}

export const actions = {
    submit: async ({request}) => {
        let username = '';
        let email = '';
        try{
            let userData = await request.formData();
            let reqBody = formToJson(userData);
            let reqBodyJS = JSON.parse(reqBody);
            username = reqBodyJS.username;
            email = reqBodyJS.email;
            checkPassword(reqBodyJS.password,reqBodyJS.password2);
            let res = await fetch(API_URL+'/user/create-user',{
                method : 'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body : reqBody 
            });
            let user = await res.json();

            if(!res.ok){
                throw new Error(user.message)
            }
            return({status:200,email:email});

        }catch(err){
            return fail(422,{
                error: err.message,
                status : 422,
                username : username,
                email : email
            })
        }
    }
};

export function load(){
    return {regExpPassword};
}