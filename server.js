require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app.js');
const DB = process.env.DB_URL;
const port = process.env.PORT || 8080;
const parishSchema = require('./models/parish.model')


 mongoose.connect(DB).then(conn => {
  console.log(`Successfully connected to MongoDB ... ${DB}`);
})
.catch( err => {
  console.error("Connection error", err);
  process.exit();
});



app.listen(port, () => {console.log(`Listening to port ${port} ... ${process.env.JWT_SECRET_KEY}`)});