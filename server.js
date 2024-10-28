// Import the http module
import http from "http";

// Define the hostname and port
const hostname = "127.0.0.1";
const port = 3000;

// Create the server
const server = http.createServer((req, res) => {
  if (req.url === "/ai-response") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    const responseBody = {
      message: "Hello, world",
    };
    res.end(JSON.stringify(responseBody));
  } else {
    res.statusCode = 404;
    res.end("The route was not found");
  }
});

// Make the server listen on the specified port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
