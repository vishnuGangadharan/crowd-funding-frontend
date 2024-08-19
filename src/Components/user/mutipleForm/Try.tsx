import React, { useState } from 'react';

const RadioButtonForm: React.FC = () => {
  // Initialize state with "Option1" to set it as the default selected value
  const [selectedOption, setSelectedOption] = useState<string>('Option1');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Selected option:', selectedOption);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input
            type="radio"
            value="Option1"
            checked={selectedOption === 'Option1'}
            onChange={handleOptionChange}
          />
          Option 1
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="Option2"
            checked={selectedOption === 'Option2'}
            onChange={handleOptionChange}
          />
          Option 2
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RadioButtonForm;
