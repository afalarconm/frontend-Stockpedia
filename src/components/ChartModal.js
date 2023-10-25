import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { PredictionChart } from './PredictionChart';

const ChartModal = ({ chartData, isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>
            Cerrar
          </button>
            <div className="modal-body">
                <PredictionChart chartData={chartData} />
            </div>
        </div>
      </div>
    )
  );
};

export default ChartModal;