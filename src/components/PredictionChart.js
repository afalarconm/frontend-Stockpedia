import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';


class PredictionChart extends Component {
    constructor(props) {
        super(props);

        
        const { pricesArray, prediction } = this.props;

        const formattedPrices = pricesArray.map(item => ({
        x: item.x,
        y: item.y,
        }));
        console.log("formattedPrices "+formattedPrices[2].y);
        const lastPoint = formattedPrices[0];

        const originalPrice = prediction.original_price;
        const originalDate = prediction.datetime;
        const predictionDatetime = new Date(prediction.datetime);
        const predictionDays = parseInt(prediction.prediction_time);
        predictionDatetime.setDate(predictionDatetime.getDate() + predictionDays);
        const unixTime = predictionDatetime.getTime();
        const predictionPrice = prediction.prediction;

        let lineColor, pointColor;
        if (predictionPrice > originalPrice) {
            lineColor = 'rgba(0, 255, 0, 0.5)'; // Verde
            pointColor = '#00FF00'; // Verde
        } else {
            lineColor = 'rgba(255, 0, 0, 0.5)'; // Rojo
            pointColor = '#FF0000'; // Rojo
        }

        this.state = {
        
          series: [
            {
              name: 'Stock Price',
              data: formattedPrices,
              color: '#008FFB', // Color azul
            },
            {
              name: 'Original Price',
              data: [{ x: originalDate, y: originalPrice }],
              color: '#000000', // Color verde
            },
            {
              name: 'Prediction Price',
              data: [{ x: unixTime, y: predictionPrice }],
              color: pointColor,
            },
            {
                name: 'Expected evolution',
                data: [
                  { x: originalDate, y: originalPrice },
                  { x: unixTime, y: predictionPrice },
                ],
                lineType: 'dotted', // Línea punteada
                lineWidth: 2, // Grosor de línea
                color: lineColor, // Color rojo semitransparente
              },
          ],
          options: {
            chart: {
              type: 'area',
              stacked: false,
              height: 350,
              zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
              },
              toolbar: {
                autoSelected: 'zoom'
              }
            },
            dataLabels: {
              enabled: false,
              position: 'bottom',
              background: {
                enabled: true,
                opacity: 0.9,
              },
            },
            markers: {
              size: 0,
            },
            title: {
              text: 'Stock Price Movement',
              align: 'left'
            },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
              },
            },
            yaxis: {
              title: {
                text: 'Price'
              },
            },
            xaxis: {
              type: 'datetime',
              labels: {
                  datetimeFormatter: {
                      year: 'yyyy',
                      month: 'MMM \'yy',
                      day: 'dd MMM',
                      hour: 'HH:mm'
                  }
              }
            },
            
          },
        
        
        };
      }
    

      render() {
    return (
      <div className='pr-3 pt-4'>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type='area'
          height={500}
        />
      </div>
    );
  }
}

export default PredictionChart;