import React from 'react';

const WalletInput = ({ numberValue, handleNumberChange, handleSubmit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg py-5 m-6 w-3/4">
      <div className="flex flex-col items-center">
        <label htmlFor="numberInput" className="mb-4 text-l font-semibold">
          Agregar dinero a mi billetera:
        </label>
        <input
          type="number"
          id="numberInput"
          placeholder="$0000"
          value={numberValue}
          onChange={handleNumberChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg text-lg px-4 py-2 focus:ring-4 focus:outline-none focus:ring-green-300 mt-1 mb-2"
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default WalletInput;
