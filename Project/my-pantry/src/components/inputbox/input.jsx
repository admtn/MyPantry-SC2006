import React, { useState } from 'react';

function InputBox() {
  const [value, setValue] = useState('');

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <div>
      <label htmlFor="input-box">Enter text:</label>
      <input
        type="text"
        id="input-box"
        value={value}
        onChange={handleChange}
      />
      <button onClick={()=>{
        console.log('dad')

      }}>Search</button>
    </div>
  );
}

export default InputBox;
