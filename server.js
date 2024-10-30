import http from "http";
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    "Access-Control-Allow-Headers": "*",
  };
  if (req.url === "/summarize" && req.method === "POST") {
    // Process request
    const parsedBody = await parseRequestBody(req);
    const { text, wordLimit } = parsedBody;
    const prompt = `Please summarize the following text using ${wordLimit} words:\n${text}`;

    // Call Google Gemini
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const geminiResult = await model.generateContent(prompt);

    // Response
    const responseBody = {
      summary: geminiResult.response.text(),
    };
    res.writeHead(200, {
      ...corsHeaders,
      "Content-Type": "application/json",
    });
    res.statusCode = 200;
    res.end(JSON.stringify(responseBody));
  } else if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders);
    res.end();
  } else {
    res.statusCode = 404;
    res.end("The route was not found");
  }
});

// Make the server listen on the specified port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
