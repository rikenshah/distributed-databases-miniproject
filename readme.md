# Search Wiki (A distributed database project)

In this project, a search engine, particularly for Wikipedia has been implemented. User needs to enter the term in the search box for which he requires information from Wikipedia. Another feature of this application is, the user search history is also displayed. 

The project has been hosted here : [Search Wiki](http://searchwiki.herokuapp.com/)

#### Technologies used : 
1. _Nodejs_ : <br>
Nodejs is a server side scripting language for Javascript. 

2. _Mongo DB_ : <br>
Mongo DB is a No SQL database. MongoDB uses JSON-like documents with schemas. 

3. _Express_ : <br>
We have designed this application using Express which is a web framework for Node js. It provides wide range of features for web development using Nodejs

4. _Wikipedia JS_ : <br>
Wikipedia.JS is a small Javascript library for accessing information in Wikipedia articles such as dates, places, abstracts and more. 

5. _Jade_ : <br>
Express used Jade as a templating engine. Jade gives you a powerful new way to write markup, with a number of advantages over plain HTML.

6. _Material_ : <br>
A Responsive front-end framework based on Material design.

#### Steps in setting up the project locally:

1. Install Nodejs, mongoDB on your machine.
2. In the repository you will find 2 folders : Local and Remote. Traverse to the local folder. You will find a file "package.js". This file contains all the node modules that need to be installed before running the application locally. In order to install this modules run the following command in the shell within the local folder :
   
   ```
   npm install
   
   ```
   This command installs all the dependencies mentioned in the "package.js" in a folder called "node_modules"
 
   In order to install any single package and to include that package inside of the dependencies section of your package.json    automatically run the following command 
   ```
   npm install _package-name_ --save 
   
   ```
 3. The application uses mongoDB, so you need to first start the MongoDB server in another shell. The data of the application is stored in the folder named "data"
    ```
    sudo mongod --dbpath _path to the data folder_
    
    ```
    
 4. Now to run the application on the local server, port 3000, add the following code in app.js 
    ```javascript
      app.listen(3000, function () {
         console.log('Example app listening on port 3000!')
      })
    ```
 5. To start the application run the following command in the terminal: 
    ```
    node app.js
    ```
    This starts the application locally at localhost:3000
 

#### Working of the project.

1. The home page : <br>
<kbd>![normal](https://raw.githubusercontent.com/rikenshah/distributed-databases-miniproject/master/ddb_screenshots/1.png)</kbd>

2. The Login panel : <br> 
<kbd>![normal](https://raw.githubusercontent.com/rikenshah/distributed-databases-miniproject/master/ddb_screenshots/2.png)</kbd>

3. The Registrations panel : <br>
<kbd>![normal](https://raw.githubusercontent.com/rikenshah/distributed-databases-miniproject/master/ddb_screenshots/3.png)</kbd>

4. The search Box : <br>
<kbd>![normal](https://raw.githubusercontent.com/rikenshah/distributed-databases-miniproject/master/ddb_screenshots/4.png)</kbd>

5. Search results : <br>
<kbd>![normal](https://raw.githubusercontent.com/rikenshah/distributed-databases-miniproject/master/ddb_screenshots/5.png)</kbd>

6. User search History : <br>
<kbd>![normal](https://raw.githubusercontent.com/rikenshah/distributed-databases-miniproject/master/ddb_screenshots/6.png)</kbd>

#### Contributors 
[Riken Shah](https://github.com/rikenshah/)
[Deesha Shah](https://github.com/deeshashah/)