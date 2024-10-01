const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const candidateRoutes = require('./routes/candidateRoute')
const elections = require('./routes/electionRoute');
const votes = require('./routes/voteRoute')
const cors = require('cors');
const fs = require('fs');
const path = require('path');


const app = express();
const port = 5003;  


// Check if 'uploads' folder exists, and create it if it doesn't
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
    fs.mkdirSync(path.join(__dirname, 'uploads'));
  }

app.use(bodyParser.json());
app.use(express.json());

// database connection
mongoose.connect("mongodb://localhost:27017/VOTING_MERN" );  

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');
});



app.use(cors());
app.use('/api/user',userRoutes);
app.use('/api/candidate',candidateRoutes);
app.use('/api/elections', elections);
app.use('/api/votes', votes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})  
