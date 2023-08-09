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
  mobileNumber: {
    required: true,
    type: String,
    unique: true
  },
  street: String,
  city: String,
  state: String,
  zipcode: String,
  country: String,
  countryCode: String,
  gender: String,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length of the password
  },
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
    country,
    countryCode,
    zipcode,
    gender,
    email,
    password,
  } = req.body;

  // Check if the mobileNumber and email are already registered
  const existingMobileNumber = await Registration.findOne({ mobileNumber });
  const existingEmail = await Registration.findOne({ email });

  if (existingMobileNumber) {
    return res.status(400).json({ error: "Mobile number already registered." });
  }

  if (existingEmail) {
    return res.status(400).json({ error: "Email already registered." });
  }

  if (!isValidEmail(email) || !isValidPassword(password)) {
    console.log("checking email");
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const registration = new Registration({
    firstName,
    lastName,
    mobileNumber,
    street,
    city,
    state,
    country,
    countryCode,
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

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}

// Helper function to validate password
function isValidPassword(password) {
  return password.length >= 6;
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
