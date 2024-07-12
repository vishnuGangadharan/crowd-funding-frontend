import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const EditableInput: React.FC = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState("hello world");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <div className="mb-4">
          <label htmlFor="editable-input" className="block text-gray-700 text-sm font-bold mb-2">
            Input Field
          </label>
          <input
            id="editable-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            readOnly={!isEditable}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              isEditable ? 'bg-white' : 'bg-gray-200'
            }`}
          />
        </div>
        <button
          onClick={() => setIsEditable(!isEditable)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Edit Input
        </button>
      </div>
    </div>
  );
};

export default EditableInput;
