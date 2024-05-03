const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Importez votre fichier JSON Swagger ici
const port = 3000;
const version = 'v1';
const router = require('./routes/routes');
const app = express();
const db = require('./db/dbconnect')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`/api/${version}`, router);

// Middleware pour afficher la documentation Swagger
app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

db.sync().then(() => {
  console.log('DBConnect est synchronisé')
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})