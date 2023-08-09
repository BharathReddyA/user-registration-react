import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../App.css";
import countryList from "country-list";
// import countryCallingCodes from "country-codes-list"; // Importing the correct library
// import {
//     Country,
//     getPlanetaryDials,
//     getCountryDialCode,
//     getCountryFlag,
//     getCountryName
// } from "planetary-dials";

const countries = countryList.getData();
// const countryCodes = new countryCallingCodes(); // Creating an instance of the library
// const countryCodes = getCountryDialCode();

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    street: "",
    city: "",
    state: "",
    country: "",
    countryCode: "",
    zipcode: "",
    gender: "Male",
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
  
    try {
      const response = await fetch("http://localhost:3001/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log("Registration successful!");
        alert("Registration successful!");
        navigate.push("/login");
      } else if (response.status === 400) {
        const data = await response.json();
        alert(data.error);
      } else {
        console.error("Registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const isGenderDisabled =
    formData.state === "Male" ||
    formData.state === "Female" ||
    formData.state === "Other";

  return (
    <div className="registration-section mb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <div className="container reg-sec mt-5 p-5">
              <div className="row">
                <div className="col-lg-0"></div>
                <div className="col-lg-0">
                  <h2 className="mb-5">Registration</h2>
                  <form
                    onSubmit={handleSubmit}
                    method="post"
                    action="/registerUser"
                  >
                    <div className="my-4 form-group row">
                      <label className="col-sm-4 col-form-label">
                        First Name:
                      </label>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="form-control text-feild-decorator"
                          required
                        />
                      </div>
                    </div>
                    <div className="my-4 form-group row">
                      <label className="col-sm-4 col-form-label">
                        Last Name:
                      </label>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="form-control text-feild-decorator"
                          required
                        />
                      </div>
                    </div>
                    <div className="my-4 form-group row">
                      <label className="col-sm-4 col-form-label">Street:</label>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          name="street"
                          value={formData.street}
                          onChange={handleChange}
                          className="form-control text-feild-decorator"
                          required
                        />
                      </div>
                    </div>
                    <div className="my-4 form-group row">
                      <label className="col-sm-4 col-form-label">City:</label>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="form-control text-feild-decorator"
                          required
                        />
                      </div>
                    </div>
                    <div className="my-4 form-group row">
                      <label className="col-sm-4 col-form-label">State:</label>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="form-control text-feild-decorator"
                          required
                        />
                      </div>
                    </div>
                    <div className="my-4 form-group row">
                      <label className="col-sm-4 col-form-label">
                        Country:
                      </label>
                      <div className="col-sm-6">
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="form-control text-feild-decorator"
                          required
                        >
                          <option value="selectCountry">Select Country</option>
                          {countries.map((country) => (
                            <option key={country.code} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="my-4 form-group row">
                      <label className="col-sm-4 col-form-label">
                        Zipcode:
                      </label>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          name="zipcode"
                          value={formData.zipcode}
                          onChange={handleChange}
                          className="form-control text-feild-decorator"
                          required
                        />
                      </div>
                    </div>
                    <div className="my-4 from-group row">
                      <label className="col-sm-3 col-form-label">Gender:</label>
                      <div className="col-sm-2">Male</div>
                      <div className="col-sm-1">
                        <input
                          type="radio"
                          value="Male"
                          name="gender"
                          className="form-control"
                          required
                          disabled={isGenderDisabled}
                        />{" "}
                      </div>
                      <div className="col-sm-2">Female</div>
                      <div className="col-sm-1">
                        <input
                          type="radio"
                          value="Female"
                          name="gender"
                          className="form-control"
                          required
                          disabled={isGenderDisabled}
                        />{" "}
                      </div>
                      <div className="col-sm-2">Other</div>
                      <div className="col-sm-1">
                        <input
                          type="radio"
                          value="Other"
                          name="gender"
                          className="form-control"
                          required
                          disabled={isGenderDisabled}
                        />{" "}
                      </div>
                    </div>
                    <div className="my-4 form-group row">
                      <label className="col-sm-4 col-form-label">
                        Mobile Number:
                      </label>
                      {/* <div className="col-sm-2">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleCountryChange}
                          className="form-control text-feild-decorator"
                          required
                        >
                          <option value="selectCountryCode">Select Country Code</option>
                          {countryList.getData().map((country) => (
                            <option key={country.code} value={country.name}>
                              {
                                countryData.callingCodes(country.name)
                                  ?.callingCountries[0]
                              }{" "}
                              ({country.name})
                            </option>
                          ))}
                        </select>
                        {countryList.getData().forEach((country) => {
                          console.log(country.code);
                        })}
                      </div> */}
                      <div className="col-sm-2">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="form-control text-feild-decorator"
                          required
                        >
                          <option value="selectCountryCode">
                            Select Country Code
                          </option>
                          {countries.map((countryCode) => (
                            <option
                              key={countryCode.name}
                              value={countryCode.code}
                            >
                              {countryCode.code}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-sm-4">
                        <input
                          type="text"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          className="form-control text-feild-decorator"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row my-4">
                      <label className="col-sm-4 col-form-label">Email:</label>
                      <div className="col-sm-6">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control text-feild-decorator"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row my-4">
                      <label className="col-sm-4 col-form-label">
                        Password:
                      </label>
                      <div className="col-sm-6">
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="form-control text-feild-decorator"
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary my-4 mt-3">
                      Register
                      <script type="text/javascript">
                        {" "}
                        console.log("Register done");{" "}
                      </script>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
