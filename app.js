const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 3001;

const cors = require("cors");
app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));



// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userInfo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to userInfo database');
}).catch((err) => {
  console.error('Error connecting to userInfo database:', err);
});


const registrationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobileNumber: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: Number,
  },
  gender: String,
  email: String,
  password: String,
});

const Registration = mongoose.model("Registration", registrationSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API endpoints
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
    address: { street, city, state, zipcode },
    gender,
    email,
    password,
  });

  registration.save((err, result) => {
    if (err) {
      console.error("Error saving registration:", err);
      res
        .status(500)
        .json({ error: "An error occurred while saving the data." });
    } else {
      console.log("Registration saved:", result);
      res.status(201).json({ message: "Registration successful!" });
    }
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

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://apis.google.com"],
      // Add other directives as needed
    },
  })
);

const path = require('path');

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });  
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
