// CS55.13 F23 Week02 Will taylor demo

// load the core node http module
const myhttp = require("http");

// load the core node filesystem (fs) module, using js promises instead of callbacks
// a promise represents eventual completion of asynch operation and its result
const fsPromises = require("fs").promises;

// create a function to respond to http requests
const myRequestListener = function(req, res) {
  // output request url
  console.log(req.url);

  if (req.url === "/") {
    // check request url, if root, return html file
    // special variable __dirname has absolute path of where node code is running
    fsPromises.readFile( __dirname + "/page.html" )
      .then(
        fileContents => {
          // set http response header entry
          res.setHeader("Content-Type", "text/html; charset=UTF-8");
          // return 200 OK http status code
          res.writeHead(200);
          // send back file contents + close response
          res.end(fileContents);
        }
      );
  } else {
    // if request url not root, return json file
    fsPromises.readFile(__dirname + "/data.json")
      .then(fileContents => {
        // set http response header entry
        res.setHeader("Content-Type", "application/json; charset=UTF-8");
        // return 200 OK http status code
        res.writeHead(200);
        res.end(fileContents);
      });
    
  }
};

// create an http server instance
const localNodesServer = myhttp.createServer(myRequestListener);

// define the TCP port and IP address to tell our http server to listen to
const localhost = "127.0.0.1"; // repl.it is going to override this from localhost to your workspace
const nodeport = "3000"; // repl.it is going to override this to use port 443 (SSL https)

// call the listen() method to start listening to http requests
localNodesServer.listen(
  nodeport,
  localhost,
  () => {
    console.log('Server is running and ready to rock and roll!');
  }
);