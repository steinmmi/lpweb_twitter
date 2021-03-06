# PoliTweet

_Travail réalisé par Mathieu Steinmetz_

Ce projet a été développé dans le cadre de ma Licence Professionelle.

Vous pouvez y accéder en accédant à [**_ce lien_**](http://twitter.mathieusteinmetz.fr) (le chargement peut être long).

---

## Objectifs du projet

PoliTweet a pour objectif de permettre à un politicien ou à son parti politique d'accéder au maximum de données provenant de [Twitter](https://twitter.com).

Un utilisateur doit pouvoir accéder aux tweets voulus de la façon la plus instinctive et logique possible.

Les moyens de recherche et les outils mis à disposition de l'utilisateur doivent être cohérents et profitables pour ce dernier.

---

## Travail réalisé

J'ai souhaité créer un produit minimum viable avec certaines fonctionnalités qui ont pu me sembler intéressantes. J'ai tenté de structurer mon code serveur au mieux possible afin qu'il soit compréhensible, facilement réutilisable et que l'ajout de nouvelles fonctionnalités soit rapide.

Ainsi, cette première version du produit pourra être facilement améliorée, en prenant comme idées celles listées en bas de ce document (_Évolutions possibles_).

Actuellement, l'utilisateur a accès à un panel limité de fonctionnalités.

Il peut :

- Avoir accès à un fil d'actualité en direct sur :
  - un ou plusieurs sujets **_OU_**
  - ses '_twittos_' favoris
- Ajouter à ses favoris :
  - un ou plusieurs '_twittos_' **_ET_**
  - un ou plusieurs tweet
- Accéder aux tendances Françaises
- Rechercher des tweets sur un ou plusieurs sujets, triés par popularité
- Voir le détail :
  - d'un tweet **_ET_**
  - d'un '_twittos_'

Le compte est actuellement unique :

L'ajout d'un tweet aux favoris par un utilisateur ajoutera ce même tweet en favoris pour n'importe quel autre.

Grâce à une communication avec le serveur par _Socket_ uniquement, le fil d'actualité et les favoris sont mis à jour sur tous les appareils connectés en même temps.

Il est donc possible à un grand groupe (ex : une réunnion) de travailler sur le site à plusieurs en temps réel.

---

## Guide utilisateur

### Accès au site

Pour aller sur le site [twitter.mathieusteinmetz.fr](http://twitter.mathieusteinmetz.fr). Faites attention à bien y accéder en http (et non https).

### Page d'accueil

La page d'accueil représente le fil d'actualité en direct. Ici vous pouvez choisir un sujet à suivre en direct. Les boutons _Retweets_ et _Réponses_ permettent, une fois activé, d'enlever les filtres correspondants et, par conséquent, d'avoir accès aux tweets qui sont en fait des retweets et/ou des réponses. Chaque changement de filtre doit être confirmé avec le bouton _Valider_. Chaque sujet doit être séparé d'une virgule (ex: '`Macron, Gilets jaunes, Débat`').

Il est possible de filtrer les tweets par '*twittos*' favoris et non pas par sujet en activant le bouton _Favoris uniquement_.

À chaques tweets, il est possible de l'ajouter en favoris avec l'étoile, d'en voir ses détails avec la loupe, ou de voir les détails du '*twittos*' en cliquant sur son nom.

### Page de favoris

Il est possible d'ajouter des '*twittos*' à ses favoris en les cherchant dans la barre de recherche _Chercher un twittos_, 3 résultats possibles apparaîtront en temps réêl pour l'ajouter à la liste. Pour ce faire il suffit de cliquer dessus, ou de le sélectionner avec les touches fléchées. Ce sont ces tweetos qui seront filtrés pour le fil d'actualité si l'option est activée.

La liste des tweets ajoutés en favoris s'affiche aussi. Il est possible de les retirer de la liste en cliquant à nouveau sur l'étoile.

### Page de recherche

Cette page permet de chercher des tweets sur un sujet en particulier. La différence majeure avec le fil d'actualité est que ces tweets sont trouvés à l'instant T et triés par popularité, alors que le fil d'actualité affiche les nouveaux tweets en temps réel.

### Page des tendances

Il est possible d'accéder aux tendances actuelles de France grâce à cette page.
Lors du clique sur un sujet, vous serez redirigé vers la page de recherche, avec le champ de recherches prérempli.

---

## Détails technique

La partie Front est faite avec _Angular 7_.

La partie Back est faite en _TypeScript_ avec un serveur NodeJs.

La communication Front -> Back se fait grâce à _Socket.io_

---

## Évolutions possibles

Ci-dessous, une liste non-exhaustive d'amélioration possible et d'idées non mises en oeuvre :

- Ajouter un système de multicompte, à chaque compte ses favoris.
  - Par conséquent, pouvoir créer un compte / se connecter.
- Utiliser une base de données pour stocker les favoris (actuellement stockés dans un variable serveur).
- Utilisation de statistiques pour la visualisation des données récupérées
- Suivre le fil d'une conversation en partant d'un tweet '_parent_' (Afficher tout les tweets d'une conversation)
- Résoudre le problème de script bloquant qui rend la page longue à charger.