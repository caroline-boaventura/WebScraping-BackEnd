const express = require('express');
const router = require('./routes/routes.js');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
