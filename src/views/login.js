import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can perform further actions like sending the data to a server
    // for login, validation, etc.
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="registration-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <div className="container mt-5">
              <h2 className="mb-5">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mb-3">
                  Login {/* Change this label from "Register" to "Login" */}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;