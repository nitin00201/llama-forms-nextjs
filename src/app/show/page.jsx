'use client'
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const ApiData = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/questions")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/v1/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setData(data.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("Error deleting item: ", error));
  };

  const handleUpdate = (id) => {
    // Add logic for updating the item
    router.push(`/update/${id}`)
    console.log("Update item with id:", id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Data</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Id</th>
              <th className="border border-gray-400 px-4 py-2">Title</th>
              <th className="border border-gray-400 px-4 py-2">Description</th>
              <th className="border border-gray-400 px-4 py-2">Schema</th>
              <th className="border border-gray-400 px-4 py-2">Options</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-400 px-4 py-2">{item.id}</td>
                <td className="border border-gray-400 px-4 py-2">{item.title}</td>
                <td className="border border-gray-400 px-4 py-2">{item.description}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {Object.keys(item.schema).map((question) => (
                    <div key={question}>
                      Type: {item.schema[question].type}, Required: {item.schema[question].required ? "Yes" : "No"}, Step: {item.schema[question].step}, Enum: {item.schema[question].enum.join(", ")}
                    </div>
                  ))}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {Object.keys(item.options).map((question) => (
                    <div key={question}>
                      Type: {item.options[question].type}, Label: {item.options[question].label}, Required: {item.options[question].required ? "Yes" : "No"}, Enum: {item.options[question].enum.join(", ")}
                    </div>
                  ))}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApiData;
