# Search Wiki (A distributed database project)

In this project, a search engine, particularly for Wikipedia has been implemented. User needs to enter the term in the search box for which he requires information from Wikipedia. Another feature of this application is, the user search history is also displayed. 

#### Technologies used : 
1. Nodejs
Nodejs is a server side scripting language for Javascript. 

2. Mongo DB
Mongo DB is a No SQL database. MongoDB uses JSON-like documents with schemas. 

3. Express
We have designed this application using Express which is a web framework for Node js. It provides wide range of features for web development using Nodejs

4. Wikipedia JS
Wikipedia.JS is a small Javascript library for accessing information in Wikipedia articles such as dates, places, abstracts and more. 

5. Jade
Express used Jade as a templating engine. Jade gives you a powerful new way to write markup, with a number of advantages over plain HTML.


#### Steps in setting up the project locally:

1. Install Nodejs, mongoDB on your machine.
2. In the repository you will find 2 folders : Local and Remote. Traverse to the local folder. You will find a file "package.js". This file contains all the node modules that need to be installed before running the application locally. In order to install this modules run the following command in the shell within the local folder :

 $ npm install 
 This command installs all the dependencies mentioned in the "package.js" in a folder called "node_modules"
 
 In order to install any single package and to include that package inside of the dependencies section of your package.json  automatically run the following command 
 
 $ npm install _package-name_ --save
 
 3. The application uses mongoDB, so you need to first start the MongoDB server in another shell. The data of the application is stored in the folder named "data"
 
 $ sudo mongod --dbpath _path to the data folder_


 
 
 
 

