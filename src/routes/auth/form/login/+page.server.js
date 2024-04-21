import { redirect } from '@sveltejs/kit';

export function load(){
    redirect(302,'/auth/form/login/normal')
}