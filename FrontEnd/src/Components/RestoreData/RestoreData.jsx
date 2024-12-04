import React, { useEffect } from "react";
import { useCrud } from "../../Services/context/crudContext";
import { useNavigate } from "react-router-dom";

const RecycleBin = () => {
  const { recycleBin, restoreFromRecycleBin } = useCrud();

  useEffect(() => {
    console.log("Recycle Bin Data:", recycleBin);
  }, [recycleBin]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Recycle Bin</h2>
      {recycleBin.length > 0 ? (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Email</th>
              <th className="px-4 py-2 text-center">Phone</th>
              <th className="px-4 py-2 text-center">Img</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {recycleBin.map((user) => (
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
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => restoreFromRecycleBin(user.id)}
                  >
                    Restore
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center">No items in the recycle bin.</p>
      )}
    </div>
  );
};

export default RecycleBin;
