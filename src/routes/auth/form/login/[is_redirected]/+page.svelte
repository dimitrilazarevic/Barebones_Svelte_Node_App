<script>
    import "$lib/styles/form.css"
    
    export let form;
    export let data ;

    let usernameoremail = '';
    let userIsRedirectedFromCreatePost = data.userIsRedirectedFromCreatePost;

    if(form!=null){
        usernameoremail=form.usernameoremail;
    }

</script>

<div class="error-container">
    {#if form?.error}
        <p class="error">Erreur : {form.error}</p>
    {:else if userIsRedirectedFromCreatePost}
        <p class="error">Vous devez être connecté pour écrire un post</p>
    {:else if data.userJustChangedPassword}
        <p class="success">Mot de passe changé avec succès !</p>
    {/if}
</div>

<form id="login-register-form" method="POST" action="?/submit">

    <label for="usernameoremail">
        Email ou nom d'utilisateur :
    </label>
    <input name="usernameoremail" type="text" bind:value={usernameoremail} autofocus/>

    <label for='password'>
        Mot de passe :
    </label>
    <input name="password" type="password"/>

    <div class="actions-container">
        <a href="/auth/form/register">Première connexion ?</a>
        <button type="submit">Login</button>
        <a href="/auth/form/forgotten-password">Mot de passe oublié ?</a>
    </div>

</form>

