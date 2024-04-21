import { API_URL, cookieOptions } from "$lib/config_front";
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
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
    submit: async ({request,cookies,params}) => {
        try{
            let userData = await request.formData();
            let reqBody = formToJson(userData);
            let reqBodyJS = JSON.parse(reqBody);
            checkPassword(reqBodyJS.password,reqBodyJS.password2);
            
            let res = await fetch(API_URL+'/user/forgotten-password/'+params.temporary_link,
            {
                method : 'POST',
                body : reqBody,
                headers : {
                    'Content-Type':'application/json'
                }
            });

            if(!res.ok){
                throw new Error(await res.json().then((res)=>res.message))
            }

            let user = await res.json();
            cookies.set('sessionID',user.sessionID,cookieOptions);

        }catch(err){
            return fail(422,{
                error: err.message,
                status : 422
            })
        }
        redirect(302,'/');
    }
};

export function load(){
    return {regExpPassword};
}