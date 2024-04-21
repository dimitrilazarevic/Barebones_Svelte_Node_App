<script>
    import "$lib/styles/form.css"

    export let form;

    let email = '';

    let successMessage = null;

    if (form!=null){
        switch(form.status){
            case 422:
                email = form.email;
                break ;
            case 200:
                successMessage = form.message ;
        }
    }

</script>

<div class="error-container">
    {#if form?.error}
        <p class="error">Erreur : {form.error}</p>
    {:else if successMessage != null}
        <p class="success">{successMessage}</p>
    {/if}
</div>

<form id="login-register-form" method="POST" action="?/submit">

    <label for="email">
        Adresse email :
    </label>
    <input name="email" type="email" bind:value={email} autofocus/>

    <div class="actions-container">
        <button type="submit">Confirmer</button>
    </div>

</form>
