<div>

    <form action="?/logout" method="POST">
        <button type="submit">Log Out</button>
    </form>

</div>

<style>
    div{
        margin-top : 100px;
        width: 100%;
        display : flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    form{
        margin-top: 120px;
        display: block;
        width : 250px;
    }
    button{
        width: 100%;
        padding:15px;
        font-size: 2em; 
        font-family : Quicksand;
        background-color: rebeccapurple;
        color:whitesmoke;
        transition : background-color 150ms;
        cursor : pointer;
       
    }
    button:hover{
        background-color: red;
    }
</style>