
<script>

    export let data ;
    import { afterNavigate, invalidate } from '$app/navigation'
    
    afterNavigate(async({})=>{

        await invalidate('data:sessionID');
        console.log(data)

    });

</script>

<slot></slot>