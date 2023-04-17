const express = require('express');
const cors = require('cors');
const router = require('./routes/routes.js');
const connectDatabase = require('./database/db');
const error = require('./middlewares/errorMiddleware');

const PORT = 3001;

const app = express();
app.use(cors())
app.use(express.json());

connectDatabase();

app.use(router);
app.use(error);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
