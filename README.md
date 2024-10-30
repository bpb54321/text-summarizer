# Text Summarizer

A simple application that uses a GAI service (currently Google Gemini) to summarize text. Based on the Scrimba course [Intro to Claude](https://v2.scrimba.com/claude-ai-c09gsmkso3/~0xf2). Ironically, Claude no longer offers a free tier for its API, which is why the application uses Google Gemini.

## Running the application

Install dependencies.

```
npm install
```

Add a Google Gemini API key to the environment variable `GOOGLE_GEMINI_API_KEY` in the `.env` file (not version controlled).

Run the back-end server

```
npm run start:server
```

Run the front-end application

```
npm run start
```
