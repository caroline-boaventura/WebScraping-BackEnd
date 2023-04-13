const express = require('express');
const router = require('./routes/routes.js');
const connectDatabase = require('./database/db');
const error = require('./middlewares/errorMiddleware');

const PORT = 3001;

const app = express();

connectDatabase();

app.use(express.json());
app.use(router);
app.use(error);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
