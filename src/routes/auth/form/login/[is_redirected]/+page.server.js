import { API_URL, cookieOptions } from "$lib/config_front";
import { redirect, fail } from '@sveltejs/kit';
import { formToJson } from "$lib/functions";

// Je déclare cette variable pour que l'username ou l'email de l'user reste affiché si il se trompe de mot de passe

export const actions = {
    submit: async ({request,cookies}) => {
        let usernameoremail;
        let user ;
        try
        {
            let userData = await request.formData();
            let reqBody = formToJson(userData);
            let reqBodyJS = JSON.parse(reqBody);

            let res = 
            await 
            fetch(API_URL+'/user/login',
            {
                method : 'POST',
                body : reqBody,
                headers : {
                    'Content-Type':'application/json'
                }
            });

            if(!res.ok){
                usernameoremail = reqBodyJS.usernameoremail;
                throw new Error(await res.json().then((res)=>res.message))
            }else
            {
                user = await res.json();
                cookies.set('sessionID',user.sessionID,cookieOptions);
            }
        }catch(err){
            return fail(422,{
                error: err.message,
                usernameoremail : usernameoremail
            })
        }
        redirect(302,'/');
    }
};

export async function load({cookies,params}){
    if(!['normal','redirected','passwordchanged'].includes(params.is_redirected))
    {
        redirect(302,'/login/normal');

    }else if(cookies.get('sessionID')!=null)
    {
        redirect
        (302,
            '/auth/account/'+
            await 
            fetch
            (API_URL+
            '/user/user-info/'+
            cookies.get('sessionID'))
            .then((res)=>res.json())
            .then((res)=>res.username)
        )
    }
    return {
        userIsRedirectedFromCreatePost : (params.isredirected=='redirected'),
        userJustChangedPassword : (params.isredirected=='changedpassword')
    }
}
