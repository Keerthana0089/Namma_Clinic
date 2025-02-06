const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 5000;

// MongoDB Atlas connection string
const mongoURI ="mongodb+srv://keerthana992004:Shivuprasad123@nammaclinic.hoo64.mongodb.net/?retryWrites=true&w=majority&appName=nammaclinic"

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Route to handle root URL ("/")node app.js

app.get('/', (req, res) => {
  res.send('Welcome to the Namma Clinic API!');
});

// Example API endpoint to fetch data
app.get('/data', (req, res) => {
  res.json({ message: 'Data fetched successfully!' });
});

// Define Mongoose User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// Create Mongoose User Model
const User = mongoose.model('User', userSchema);

// Example API endpoint to create a new user
app.post('/user', express.json(), (req, res) => {
  const { name, email, age } = req.body;

  // Create a new user
  const newUser = new User({
    name: name,
    email: email,
    age: age,
  });

  newUser.save()
    .then(() => res.json({ message: 'User created successfully!' }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Example API endpoint to fetch all users
app.get('/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});