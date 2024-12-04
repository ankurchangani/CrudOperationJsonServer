import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCrud } from "../../Services/context/crudContext";

const FormWithValidation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const { addDataPost } = useCrud(); 
  const navigate = useNavigate();

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.name || formData.name.length < 3) {
      validationErrors.name = "Name must have at least 3 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      validationErrors.email = "Enter a valid email address.";
    }

    const phoneRegex = /^[0-9]*$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      validationErrors.phone = "Phone must contain only numbers.";
    }

    if (!formData.image) {
      validationErrors.image = "Please enter an image URL.";
    }
    
    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      await addDataPost(formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        image: "",
      });
      navigate("/view");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">User Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded`}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded`}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.image ? "border-red-500" : "border-gray-300"} rounded`}
            placeholder="Enter image URL"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>

        <button type="submit" className="w-full p-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormWithValidation;
