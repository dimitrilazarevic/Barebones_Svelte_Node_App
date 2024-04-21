import { API_URL, cookieOptions }  from '$lib/config_front';
import { error } from '@sveltejs/kit';

export async function load({cookies,params}){
    let res = 
        await 
        fetch(API_URL+'/user/confirm-registration/'+params.temporary_link);

    if (res.status == 404){
        error(
            404,
            await res.json()
        );
    }else{
        res = await res.json();
        cookies.set('sessionID',res.user.sessionID,cookieOptions);
    }
    return {
        message:res.message
    };
}