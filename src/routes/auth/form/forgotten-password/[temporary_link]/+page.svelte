<script>
    import "$lib/styles/form.css"

    export let form ;
    export let data ;

    let successMessage = null;

    if (form!=null){
        switch(form.status){
            case 200:
                alert('Mot de passe changé avec succès !')
                break;
        }
    }


    let password,password2 ;
    password = password2 = '';
    $: passwordsMatch = password==password2||password.length<7||password2=='' ;
    let passwordIsGood = true ;
    let regExpPassword = data.regExpPassword;
    let submitErrorMessageIsVisible = true ; 

    function hideSubmitErrorMessage(){
        submitErrorMessageIsVisible = false ;
    }
    function checkPasswordValidity(){
        passwordIsGood = password.match(regExpPassword)||password==''
        hideSubmitErrorMessage();
    }

</script>

<div class="error-container">
    {#if form?.error && submitErrorMessageIsVisible}
        <p class="error">Erreur : {form.error}</p>
    {:else if !passwordIsGood} 
        <p class="error">Le mot de passe doit être compris entre 7 et 14 caractères.</p>
    {:else if !passwordsMatch}
        <p class="error">Les deux mots de passe doivent correspondre !</p>
    {:else if successMessage!=null}
        <p class="success">{successMessage}</p>
    {/if}
</div>


<form id="login-register-form" method="POST" action="?/submit">

    <label for='password'>
        Mot de passe :
    </label>
    <input name="password" type="password" bind:value={password} on:keyup={checkPasswordValidity} required/>

    <label for='password2'>
        Répétez le mot de passe :
    </label>
    <input name="password2" type="password" bind:value={password2} on:keyup={hideSubmitErrorMessage} required/>

    <div class="actions-container">
        <button type="submit">Modifier le mot de passse</button>
    </div>

</form>
