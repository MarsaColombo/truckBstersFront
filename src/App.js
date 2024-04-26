import React, { useState } from "react";
import { Router } from "react-router-dom";
import "./App.css";
import EtBrowser from "./icons/browser.js";
import Scheduler from "./components/sheduler.jsx";

function App() {
  const [formData, setFormData] = useState({
    company: "",
    gender: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    startTime: "",
    truck: "",
    licensePlate: "",
    promoCode: "",
    service: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      startTime: selectedDateRange,

    }));
  };

  const handleSendDateRange = (dateRange) => {
    setSelectedDateRange(dateRange);
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmitPersonalInfo = (event) => {
    event.preventDefault();
    const { company, gender, firstname, lastname, email, phone } = formData;
    if (!company || !gender || !firstname || !lastname || !email || !phone) {
      alert("Please fill in all the fields");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleSubmitTruckInfo = (event) => {
    event.preventDefault();
    console.log("formData", formData);
    const { truck, licensePlate, promoCode, service } = formData;
    if (!truck || !licensePlate || !promoCode || !service) {
      alert("Please fill in all the fields");
      return;
    }

    const requestBody = {
      startTime: selectedDateRange.start,
      endTime: selectedDateRange.start,
      client: {
        gender: formData.gender,
        firstname: formData.firstname,
        lastname: formData.lastname,
        company: formData.company,
        email: formData.email,
        phone_number: formData.phone,
        promo_code: formData.promoCode,
      },
    };

    fetch("http://localhost:5000/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          alert("Appointment successfully created");
        } else {
          alert("An error occurred while creating the appointment");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <body className="AppBody">
      <div className="AppHeaderContainer">
        <header className="AppHeader">
          <p className="HeaderLogo">
            <EtBrowser />
          </p>
        </header>
      </div>

      {currentStep === 1 && (
        <div className="PersonnalInfoForm">
          <div className="FormContainer">
            <h1 className="text-2xl font-bold mb-6">Personal Info</h1>
            <form onSubmit={handleSubmitPersonalInfo}>
              <div className="mb-4">
                <label htmlFor="gender"> Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="FormSelect"
                >
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </select>
                <label htmlFor="first_name" className="FormLabel">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className="FormInput"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="last_name" className="FormLabel">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  className="FormInput"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="FormLabel">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="FormInput"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="FormLabel">
                  Phone
                </label>
                <input
                  type="string"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="FormInput"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="company" className="FormLabel">
                  Entreprise
                </label>
                <input
                  type="string"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="FormInput"
                />
              </div>
              <button type="submit" className="FormButton">
                Next
              </button>
            </form>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="CalendarContainer">
          <Scheduler onSendDateRange={handleSendDateRange} />
          <button
            type="button"
            className="FormButton"
            onClick={handlePreviousStep}
          >
            Previous
          </button>
        </div>
      )}

      {currentStep === 3 && selectedDateRange && (
        <div className="TruckInfoForm">
          <form onSubmit={handleSubmitTruckInfo}>
            <div className="mb-4">
              <label htmlFor="truck" className="FormLabel">
                Truck
              </label>
              <input
                type="string"
                id="truck"
                name="truck"
                value={formData.truck}
                onChange={handleChange}
                required
                className="FormInput"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="licencePlate" className="FormLabel">
                License Plate
              </label>
              <input
                type="string"
                id="licencePlate"
                name="licencePlate"
                value={formData.licencePlate}
                onChange={handleChange}
                required
                className="FormInput"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="promoCode" className="FormLabel">
                Code Promo
              </label>
              <input
                type="string"
                id="promoCode"
                name="promoCode"
                value={formData.promoCode}
                onChange={handleChange}
                required
                className="FormInput"
              />
            </div>
            <div className="mb-4 flex justify-around items-center">
              <label htmlFor="service"> Service</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="FormSelect"
              >
                <option value="Diesel">Diesel</option>
                <option value="Carbone">Mrs</option>
                <option value="Lol">Ms</option>
                <option value="Lille">Dr</option>
              </select>
            </div>
            <button type="submit" className="FormButton">
              Submit
            </button>
            <button
              type="button"
              className="FormButton"
              onClick={handlePreviousStep}
            >
              Previous
            </button>
          </form>
        </div>
      )}
    </body>
  );
}

export default App;
