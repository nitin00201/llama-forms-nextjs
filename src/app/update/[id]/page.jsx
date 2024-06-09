'use client'
import React, { useState, useEffect } from "react";

const UpdateForm = ({ params }) => {
  const id = params.id;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    schema: {
      question1: {
        type: "",
        required: false,
        enum: [],
        step: ""
      }
    },
    options: {
      question1: {
        type: "",
        label: "",
        enum: [],
        required: false
      }
    }
  });

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/questions/${id}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchFormData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [key, subKey] = name.split(".");
    if (subKey) {
      setFormData({
        ...formData,
        [key]: {
          ...formData[key],
          [subKey]: type === "checkbox" ? checked : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3000/api/v1/questions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      alert("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          Schema - Question Type:
          <input
            type="text"
            name="schema.question1.type"
            value={formData.schema.question1.type}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          Schema - Required:
          <input
            type="checkbox"
            name="schema.question1.required"
            checked={formData.schema.question1.required}
            onChange={handleChange}
            className="mt-1 block"
          />
        </label>
        <label className="block">
          Schema - Step:
          <input
            type="number"
            name="schema.question1.step"
            value={formData.schema.question1.step}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          Schema - Enum:
          <input
            type="text"
            name="schema.question1.enum"
            value={(formData.schema.question1.enum || []).join(", ")}
            onChange={(e) => {
              const enumValues = e.target.value.split(", ");
              setFormData({
                ...formData,
                schema: {
                  ...formData.schema,
                  question1: {
                    ...formData.schema.question1,
                    enum: enumValues
                  }
                }
              });
            }}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          Options - Type:
          <input
            type="text"
            name="options.question1.type"
            value={formData.options.question1.type}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          Options - Label:
          <input
            type="text"
            name="options.question1.label"
            value={formData.options.question1.label}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          Options - Required:
          <input
            type="checkbox"
            name="options.question1.required"
            checked={formData.options.question1.required}
            onChange={handleChange}
            className="mt-1 block"
          />
        </label>
        <label className="block">
          Options - Enum:
          <input
            type="text"
            name="options.question1.enum"
            value={formData.options.question1.enum.join(", ")}
            onChange={(e) => {
              const enumValues = e.target.value.split(", ");
              setFormData({
                ...formData,
                options: {
                  ...formData.options,
                  question1: {
                    ...formData.options.question1,
                    enum: enumValues
                  }
                }
              });
            }}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
