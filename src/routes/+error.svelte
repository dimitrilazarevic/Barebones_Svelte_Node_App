<script>
	import { page } from '$app/stores';

</script>

<div>
<h1>{$page.error.message} !</h1>
<h2>Page status : {$page.status}</h2>
<a href='/'>Retour à l'accueil</a> 
</div>

<style>
    div{
        display: grid;
        justify-items: center;
        text-align: center;
        margin : 200px;
    }
</style>