import React, { useState, useEffect } from "react";
import { useCrud } from "../../Services/context/crudContext";
import { useNavigate, useParams } from "react-router-dom";

const EditData = () => {
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  const { updateAsync, data } = useCrud();
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
  
    const userId = id; 


    const user = data.find((user) => user.id === userId);

    if (user) {
      setUpdateData(user);
    } else {
      console.error("User not found for ID:", id); 
    }
  }, [data, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting data:", updateData);

    
      if (!updateData.id) {
        console.error("ID is missing. Cannot update data.");
        return;
      }

   
      await updateAsync(updateData.id, updateData);
      navigate("/view");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-5">
      <h2 className="text-2xl font-bold mb-6">Edit Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={updateData.name}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={updateData.email}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            value={updateData.phone}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={updateData.image}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditData;
