import React from "react";

const SuccesModal = ({ message }) => {
  return (
    <div className="d-flex bg-green-500 w-70 h-20 rounded-xl z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-green-950 shadow-lg">
      <p className="text-white succes text-lg font-semibold p-4 text-center">
        {message}
      </p>
    </div>
  );
};

export default SuccesModal;