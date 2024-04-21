const { Router } = require('express');
const User = require('../models/User');
const { TRANSPORTER,EMAIL,WEBSITE_URL } = require('../config_back');
const { generateString } = require('../lib/functions')

const router = Router();

//SOMMAIRE :
// I : Créer un utilisateur
// II : Login
// III : Confirmer un utilisateur
// IV : Demander à changer un MDP
// V : Modifier un MDP
// VI : Obtenir les infos (username, status) d'un user à partir de sa session ID

// I : Créer un utilisateur
router.post('/create-user', async (req, res) => {
    try {
        let [userWithSameUsername,userWithSameEmail] = 
        await 
        Promise.all([
            User.findOne(
                {username:req.body.username}
            ),
            User.findOne(
                {email:req.body.email}
            )
        ]);

        if(userWithSameUsername!=null)
        {
            throw new Error("Nom déjà pris !");

        }else if(userWithSameEmail!=null)
        {
            throw new Error("Mail déjà pris !");

        }else
        {
            req.body.confirmationLink = generateString(128);
            let content = 
            '<h1>Bienvenue '+req.body.username+' !</h1>\
            <br/>\
            <p>Nous sommes heureux de vous compter parmi nos utilisateurs.</p>\
            <a href='+WEBSITE_URL+'/auth/confirm-registration/'+req.body.confirmationLink+'>Cliquez sur ce lien pour confirmer votre inscription.</a>';

            const newUser = new User(req.body);
            const postSuccess = await newUser.save();

            if (!postSuccess) {
                throw new error("User pas enregistré.");
            }
            TRANSPORTER.sendMail
            (
                {
                    from : EMAIL,
                    to : req.body.email,
                    subject : 'Confirmez votre inscription',
                    html : content
                },
                (err,info) => {
                    if(err){
                        throw new Error('Mail non existant')
                    }
                }
            )
            res
            .status(200)
            .json(newUser);
        }
    } catch (err) {
        res
        .status(422)
        .json({ message: err.message });
    }
});

// II : Login

router.post('/login',async (req,res)=>{
    try{
        let regExpMail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

        let [userMatchingUsername,userMatchingEmail] = 
        await 
        Promise.all([
            User.findOne(
                {username:req.body.usernameoremail}
            ),
            User.findOne(
                {email:req.body.usernameoremail}
            )
        ]);
        let userMatchingSearch =
        [userMatchingUsername,userMatchingEmail].find((el)=> el != undefined );

        let userExists = (userMatchingSearch != undefined);

        if(!userExists){
            if(req.body.usernameoremail.match(regExpMail))
            {
                throw new Error("Pas d'utilisateur associé à ce mail.")

            }else
            {
                throw new Error("Pas d'utilisateur associé à nom d'utilisateur.")
            }
        }

        if(userMatchingSearch.password==req.body.password)
        {   
            let sessionID = generateString(128);
            userMatchingSearch.sessionID = sessionID ;
            await userMatchingSearch.save();
            res
            .status(200)
            .json(userMatchingSearch);

        }else
        {
            throw new Error("Mauvais mot de passe...")
        }

    }catch(err)
    {
        res
        .status(422)
        .json({ message: err.message });
    }
})

// III : Confirmer un utilisateur
router.get('/confirm-registration/:confirmationLink', async (req, res) => {
    try 
    {
        let user = 
        await 
        User
        .findOneAndUpdate(
            {confirmationLink : req.params.confirmationLink},
            {status : 'user',confirmationLink:null},
            {new : true}
        );
        if(!user){
            throw new Error ('Lien inexistant')
        }
        let sessionID = generateString(128);
        user.sessionID = sessionID ;
        await user.save();
        res
        .status(200)
        .json({
            message : 'Utilisateur confirmé avec succès',
            user : user
        });
    }catch (err) {
        res
        .status(404)
        .json({ message : err.message });
    }
})

// IV : Demander à changer un MDP
router.post('/forgotten-password',async (req,res)=>{
    try{
        let temporaryLink = generateString(128);
        let userMatchingEmail = 
            await 
            User.findOneAndUpdate(
                {email : req.body.email},
                {confirmationLink : temporaryLink}
            );

        if(!userMatchingEmail){
            throw new Error("Pas d'utilisateur associé à ce mail.")
        }

        let content = 
        "<h1>Ce n'est pas grave d'oublier son mot de passe "+userMatchingEmail.username+" !</h1>\
        <br/>\
        <a href="+WEBSITE_URL+"/auth/form/forgotten-password/"+temporaryLink+">Cliquez sur ce lien pour choisir un nouveau mot de passe.</a>";

        TRANSPORTER.sendMail(
            {
                from : EMAIL,
                to : req.body.email,
                subject : 'Réinitialisez votre mot de passe',
                html : content
            },
            (err,info) => {
                if(err){
                    throw new Error('Mail non existant')
                }
            }
        )

        res
        .status(200)
        .json({message : "Un mail contenant un lien pour changer le mot de passe a été envoyé."})

    }catch(err){
        res
        .status(422)
        .json({ message: err.message });
    }
})

// V : Modifier un MDP
router.post('/forgotten-password/:temporaryLink',async (req,res)=>{
    try{
        let userChangingPassword = 
            await 
            User.findOneAndUpdate(
                {confirmationLink:req.params.temporaryLink},
                {password:req.body.password,confirmationLink:null}
            );
    
        if(!userChangingPassword){
            throw new Error("Une erreur s'est produite...")
        }

        let sessionID = generateString(128);
        userChangingPassword.sessionID = sessionID ;
        await userChangingPassword.save();

        res
        .status(200)
        .json(userChangingPassword);

    }catch(err){
        res
        .status(422)
        .json({ message: err.message });
    }
})

// V : Obtenir les infos (username, status) d'un user à partir de sa session ID
router.get('/user-info/:sessionID', async(req,res) => {
    try
    {
        let userInfo = await User.findOne(
            {sessionID:req.params.sessionID},
            'username status'
        );
        if(!userInfo)
        {
            throw new Error("Aucun user ne correspond à l'ID de session")
        }
        res
        .status(200)
        .json(userInfo);

    }catch(err){
        res
        .status(404)
        .json({status:'logged out',message:err.message});
    }
});

module.exports = router;