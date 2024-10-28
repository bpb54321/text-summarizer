// Import the http module
import http from "http";

const parseRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
};

// Define the hostname and port
const hostname = "127.0.0.1";
const port = 3000;

// Create the server
const server = http.createServer(async (req, res) => {
  if (req.url === "/ai-response" && req.method === "POST") {
    const parsedBody = await parseRequestBody(req);
    const { prompt } = parsedBody;
    res.setHeader("Content-Type", "application/json");
    const responseBody = {
      message: prompt,
    };
    res.statusCode = 200;
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
