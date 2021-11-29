var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require("body-parser");
var filename = "./user_data.json";
var queryString = require("query-string");
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(myParser.urlencoded({ extended: true }));
app.use(express.static('./public')); //helps redirect to products page
var session = require('express-session');

app.use(session({secret: "MySecretKey", resave: true, saveUninitialized: true})); 

app.get("/set_cookie", function (request,response){
    my_name = "Rick Kazman";
    response.cookies("My Name", my_name, {maxAge: 30*60*1000}).send("Cookie sent"); //get page
}
);

app.get("/get_cookie", function (request, response) {
    my_cookie_name = request.cookies["My Name"]; //gets name
    response.send("User " + my_cookie_name + " recognized");
}
);

app.get("/use_session", function (request, response) {
    
    response.send("Your session ID is" + request.session.id);
}
);

// tell user how many times they visited
app.get("/", function (request,response){
    if (request.session.page_views){
    response.session.page_views++;
    //FIXXX *********
    //request.send("Welcome back. This is visit #" + request.session.page_views);
    } else {
        request.session.page_views = 1; // puts into a session
        response.send("Welcome to this page for the first time!")
    }
}
);

app.get("/login", function (request, response) {
    // Give a simple login form; at the top of login form
    if(typeof request.session['last_login'] != "undefined"){
        login_time = "Last login was " + request.session["last_login"];// get value from last login from last session, appending to other string
    } else{
        login_time = "First login";
    }
    //saves info that user last logged in
    my_cookie_name = request.cookies["username"];
    str = `<body>
    Login info: ${login_time} by ${my_cookie_name}
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});




if (fs.existsSync(filename)) {
    data = fs.readFileSync(filename, 'utf-8');

    user_data = JSON.parse(data);
    console.log("User_data=", user_data);

    fileStats = fs.statSync(filename);
    console.log("File " + filename + " has " + fileStats.size + " characters");
} else {
    console.log("Enter the correct filename bozo!");
}




//method was post so we grab user & pass from post
app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log("Got a POST to login");
    POST = request.body;

    user_name = POST["username"];
    user_pass = POST["password"];
    console.log("User name=" + user_name + " password=" + user_pass);

    if (user_data[user_name] != undefined) {
        if (user_data[user_name].password == user_pass) { //does the login name match the pass in user data; got 2 bits of data
            // Good login
            request.session['last_login'] = Date(); // sets last_login variable
            response.cookie("username", user_name, {"maxAge": 10*1000});
            request.session['username'] = user_name;
            response.send("Welcome " + user_name);
        } else {
            // Bad login, redirect
            response.send("Sorry bro");// NEED to redirect them to the login page
        }
    } else {
        // Bad username
        response.send("Bad username");
    }

});

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>

<form action="/register" method="POST">`;
    if (request.query["name_err"] == undefined) {
        str += `<input type="text" name="username" size="40" placeholder="enter username" ><br>`;
    } else { //makes info sticky; tells user what they did wrong
        str += `<input type="text" name="username" size="40" placeholder="${request.query['name_err']}">User already exists!"<br>`;
    }

    str += `
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br>
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

app.post("/register", function (request, response) {
    // process a simple register form
    console.log("Got a POST to register");
    POST = request.body;

    user_name = POST["username"];
    user_pass = POST["password"];
    user_email = POST["email"];
    query_response = "";

    // allows user to create a new acc
    if (user_data[user_name] == undefined) {
        console.log("Adding user:" + user_name + user_pass);

        user_data[user_name] = {};
        user_data[user_name].name = user_name;
        user_data[user_name].password = user_pass;
        user_data[user_name].email = user_email;

        data = JSON.stringify(user_data);
        fs.writeFileSync(filename, data, "utf-8");

        response.redirect("login"); //takes user back to login page if incorrect 
    } else {
        query_response += "name_err=" + user_name;
        console.log("Bad request to add user:" + user_name);
        response.redirect("register" + "?" + query_response); //query string makes data sticky so info is saved if user messed up
    }

});

app.listen(8080, () => console.log(`listening on port 8080`));