const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userInfo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to userInfo database');
}).catch((err) => {
  console.error('Error connecting to userInfo database:', err);
});

// Define the registration schema
const registrationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobileNumber: String,
  street: String,
  city: String,
  state: String,
  zipcode: String,
  gender: String,
  email: String,
  password: String,
});

// Create the Registration model
const Registration = mongoose.model("Registration", registrationSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

// Enable CORS
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
// eslint-disable-next-line no-undef
app.use(cors(corsOptions));

// API endpoint for registering a user
app.post("/registerUser", async (req, res) => {
  console.log("Received data:", req.body);
  const {
    firstName,
    lastName,
    mobileNumber,
    street,
    city,
    state,
    zipcode,
    gender,
    email,
    password,
  } = req.body;

  const registration = new Registration({
    firstName,
    lastName,
    mobileNumber,
    street,
    city,
    state,
    zipcode,
    gender,
    email,
    password,
  });

  try {
    const result = await registration.save();
    console.log("Registration saved:", result);
    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error("Error saving registration:", err);
    res.status(500).json({ error: "An error occurred while saving the data." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
