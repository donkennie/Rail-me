const mongoose = require('mongoose');

const dotenv = require('dotenv');  

const app = require('./src/app');

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',

    process.env.DATABASE_PASSWORD 
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully Connected to MongoDB');
})
.catch((err ) => { 
    console.log('Error Connecting to MongoDB');
    console.error(err); 
    process.exit(1);
}); 


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);  
});     