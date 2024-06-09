'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SchemaGenerator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questionType, setQuestionType] = useState("string");
  const [enumValues, setEnumValues] = useState([]);
  const [step, setStep] = useState(1);
  const [label, setLabel] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState(null); // Track the ID of the schema to update
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const schema = {
      title: title,
      description: description,
      schema: {
        question1: {
          type: questionType,
          required: isRequired,
          enum: enumValues,
          step: step
        }
      },
      options: {
        question1: {
          type: questionType,
          label: label,
          enum: enumValues,
          required: isRequired
        }
      }
    };

    // Perform the update operation using the schema and idToUpdate
    console.log("Update Schema with ID:", idToUpdate, schema);
  };

  const handleUpdate = (id) => {
    // Set the ID of the schema to update
    router.push(`/update/${id}`)

    setIdToUpdate(id);

  };

  return (
    <div className="container mx-auto p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Schema Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Description:</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Question Type:</span>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="array">Array</option>
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Enum Values (comma separated):</span>
          <input
            type="text"
            value={enumValues.join(",")}
            onChange={(e) => setEnumValues(e.target.value.split(","))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Step:</span>
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(parseInt(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Label:</span>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Is Required:</span>
          <input
            type="checkbox"
            checked={isRequired}
            onChange={(e) => setIsRequired(e.target.checked)}
            className="mt-1 block"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate Schema
        </button>
      </form>
      <button
        onClick={() => handleUpdate(123)} // Pass the ID of the schema to update
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Update Schema
      </button>
    </div>
  );
};

export default SchemaGenerator;
