import { API_URL } from "$lib/config_front";
import { fail } from '@sveltejs/kit';
import { formToJson } from "$lib/functions";

// Je déclare cette variable pour que l'username ou l'email de l'user reste affiché si il se trompe de mot de passe

export const actions = {
    submit: async ({request}) => {
        let email='';
        try{
            let userData = await request.formData();
            let reqBody = formToJson(userData);
            let reqBodyJS = JSON.parse(reqBody)
            let res = await fetch(API_URL+'/user/forgotten-password',{
                method : 'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body : reqBody 
            });
            if(!res.ok){
                email = reqBodyJS.email;
                throw new Error(await res.json().then((res)=>res.message))
            }
            return {status:200, message : await res.json().then((res)=>res.message)}
        }catch(err){
            return fail(422,{
                error: err.message,
                email : email
            })
        }
    }
};