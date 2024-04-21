# Que contient ce projet ?

Ce projet contient tout l'essentiel pour créer une appli fullstack avec login, avec Node, Express, Mongoose et Svelte.
Il permet de créer des utilisateurs, de se connecter, de se déconnecter, en assurant la validation des données, et en laissant une grande marge de manoeuvre pour contrôler la mise en page des formulaires définis dans src/lib/styles/form.css.

Les users peuvent être pending (en attente de validation), user ou admin.

Tout ce qui concerne l'authentification et la gestion des users se trouve dans src/routes/auth. Le reste de l'appli donc ne devrait pas utiliser auth.

Dans le détail des fonctionnalités :

Login : 
- redirige vers user/username si déjà logged in.
- message d'erreur personnalisé si on se trompe de mail, username ou mot de passe
- la page user prend en req.param le nom du user et si on essaie d'y accéder en étant quelqu'un d'autre, on est reconduit à sa propre page, ou à la page de login si on est logged out.
- Met en place un cookie sessionID qui grâce à des requêtes fetch assurées en layout dans form et dans routes donne accès aux infos sur l'utilisateur à n'importe quelle page

Register : 
- Vérifie que l'username et le mail n'existent pas déjà
- vérifie que l'adresse mail en est à priori une
- Vérifie que le mot de passe contienne entre 7 et 14 caractères
- Vérifie que les deux mots de passe soient identiques
- Met en place un message d'erreur qui s'enlève dès qu'on recommence à écrire si l'erreur a lieu lors du submit
- Envoie un mail avec lien de confirmation (avant que ce lien soit cliqué, le statut est pending au lieu de user)
- La page de confirmation permet de se rediriger vers l'accueil

Forgotten password :
- permet d'envoyer une adresse mail, et rappelle à quelle adresse le mail a été envoyé
- Donne un formulaire où il faut remplir 2 fois le mot de passe avec la même vérification qu'au register
- Quand le mot de passe est changé, on est instantanément logged in.

Account username :
- A juste un bouton logout

Lors de la navigation :
- Si user connecté, on rafraîchit le cookie dont la durée de vie est précisée en config_front dans lib.

# Commandes :

/src/server :
npm install
npm install mongoose express nodemailer cors dotenv

/src :
npm install
npm install concurrently

# A mettre en place :

/src/server : 
Créer un fichier .env et rentrer les informations qui sont utilisées par config_back.js avec process.env

