import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
const url = `${import.meta.env.VITE_API}/admin`



const AdminDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/admin/getdata`, {
  //       method: "POST",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch data");
  //     }

  //     const result = await response.json();
  //     console.log("Fetched data:", result);
  //     console.log("Received data structure:", result);

  //     if (result[0] && result[0].ApplyDB && Array.isArray(result[0].ApplyDB)) {
  //       setData(result[0].ApplyDB);
  //     } else {
  //       console.warn("Expected ApplyDB to be an array but got:", result);
  //       setData([]);
  //     }
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/getdata`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const result = await response.json();
      console.log("Fetched data:", result);
  
      // Check if result is an array and handle accordingly
      if (Array.isArray(result)) {
        setData(result); // Directly set the data to the result array
      } else {
        console.warn("Expected an array but got:", result);
        setData([]); // Reset to an empty array if the structure is unexpected
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleDownload = async () => {
    try {
      const response = await fetch(`${url}/download`, {
        method: 'GET',
        credentials: 'include',  // Include credentials if authentication is needed
      });
  
      if (!response.ok) {
        throw new Error("Failed to download file");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'applications.xlsx';  // Filename for the downloaded file
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);  // Clean up the URL object
    } catch (error) {
      console.error("Download error:", error.message);
    }
  };
  

  const handleDelete = async (index) => {
    try {
      const response = await fetch(`${url}/delete/${index}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete item");

      setData(data.filter((_, i) => i !== index));
      setSuccessMessage("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Failed to delete item.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-center text-3xl text-violet-400 mt-5">Admin Dashboard</h1>
      {successMessage && <div className="text-green-500">{successMessage}</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="mt-5 flex flex-col md:flex-row justify-center bg-black text-white text-center p-5">
        <button
          onClick={handleDownload}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Download
          </span>
        </button>
        {data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="border border-gray-600 px-4 py-2">First Name</th>
                  <th className="border border-gray-600 px-4 py-2">Last Name</th>
                  <th className="border border-gray-600 px-4 py-2">Email</th>
                  <th className="border border-gray-600 px-4 py-2">Loan Amount</th>
                  <th className="border border-gray-600 px-4 py-2">Monthly Income</th>
                  <th className="border border-gray-600 px-4 py-2">Address</th>
                  <th className="border border-gray-600 px-4 py-2">Phone</th>
                  <th className="border border-gray-600 px-4 py-2">Loan Purpose</th>
                  <th className="border border-gray-600 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="bg-gray-800">
                    <td className="border border-gray-600 px-4 py-2">{item.firstName}</td>
                    <td className="border border-gray-600 px-4 py-2">{item.lastName}</td>
                    <td className="border border-gray-600 px-4 py-2">{item.email}</td>
                    <td className="border border-gray-600 px-4 py-2">{item.loanAmount}</td>
                    <td className="border border-gray-600 px-4 py-2">{item.income}</td>
                    <td className="border border-gray-600 px-4 py-2">{item.address}</td>
                    <td className="border border-gray-600 px-4 py-2">{item.phone}</td>
                    <td className="border border-gray-600 px-4 py-2">{item.loanPurpose}</td>
                    <td className="border border-gray-600 px-4 py-2">
                      <button
                        onClick={() => {
                          console.log("Item to delete:", item);
                          handleDelete(index);
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No data available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
