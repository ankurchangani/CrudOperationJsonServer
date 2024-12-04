import React, { useState, useEffect } from "react";
import { useCrud } from "../../Services/context/crudContext";
import { useNavigate } from "react-router-dom";

const ViewData = () => {
  const { data, getDataAsync, deleteAsync } = useCrud();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredData, setFilteredData] = useState([]);

 
  useEffect(() => {
    getDataAsync();
  }, []);


  useEffect(() => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    setFilteredData(
      data.filter(
        (user) =>
          user.name?.toLowerCase().includes(lowerSearchQuery) ||
          user.email?.toLowerCase().includes(lowerSearchQuery) ||
          user.phone?.toLowerCase().includes(lowerSearchQuery)
      )
    );
  }, [searchQuery, data]);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteAsync(id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">User Data</h2>
      <input
        type="text"
        placeholder="Search by Name, Email, or Phone"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-center">Name</th>
            <th className="px-4 py-2 text-center">Email</th>
            <th className="px-4 py-2 text-center">Phone</th>
            <th className="px-4 py-2 text-center">Img</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover mx-auto"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500 font-semibold">
                No matching records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewData