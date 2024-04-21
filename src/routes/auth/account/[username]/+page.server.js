import { cookieOptions, API_URL } from "$lib/config_front"
import { redirect } from "@sveltejs/kit";

export const actions = {
    logout:({cookies})=>{
        cookies.delete('sessionID',cookieOptions);
        redirect(302,'/')
    }
}

export async function load({cookies,params}){
    let username = await fetch(API_URL+'/user/user-info/'+cookies.get('sessionID')).then((res)=>res.json()).then((res)=>res.username);

    if(username==undefined){
        redirect(302,'/auth/form/login/normal')
    }
    else if(username != params.username){
        redirect(302,'/auth/account/'+username)
    }
}
