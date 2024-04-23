const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postRouter = require('./PostRouter'); 

const dbConnect = require('./dbConnect');
const app = express();
const port = 8080;

// Configure CORS options
const corsOptions = {
  origin: '*', // Consider specifying specific domains in production
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

dbConnect();
// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // this replaces bodyParser.json()

// Connect Post routes
app.use('/api', postRouter);

// Optional: Define additional routes or middleware here

// Catch-all for non-existent routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
