import ReactApexChart from 'react-apexcharts';

const PredictionChart = ({ pricesArray, prediction }) => {
    const formattedPrices = pricesArray.map(item => ({
        x: item.x, // Use the timestamp as x-value
        y: item.y
    }));
    console.log(formattedPrices);


    // Obtener el último punto de pricesArray
    const lastPoint = formattedPrices[0];
    console.log(lastPoint);


    const predictionDatetime = new Date(prediction.datetime).getTime();
    console.log(predictionDatetime);
    const predictionPrice = prediction.prediction;
    console.log(predictionPrice);

    const chartData = {
        options: {
            xaxis: {
                title: {
                    text: 'Hora'
                },
                type: 'datetime', // Set x-axis type to datetime for timestamp-based x-values
                labels: {
                    datetimeFormatter: {
                        year: 'yyyy',
                        month: 'MMM \'yy',
                        day: 'dd MMM',
                        hour: 'HH:mm'
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Precio'
                }
            },
            chart: {
                id: 'stock-chart',
                toolbar: {
                    show: false
                }
            },
            colors: ['#1976D2'], // Line color
        },
        series: [
            {
                name: 'Price',
                data: formattedPrices
            },
        ],
    };

    // Agregar un punto rojo en el punto de predicción
    if (predictionDatetime > lastPoint.x) {
        chartData.series.push({
            name: 'Prediction',
            data: [{ x: predictionDatetime, y: predictionPrice }],
            color: '#FF0000', // Color rojo
            type: 'scatter', // Punto
            markers: {
                size: 8,
                shape: 'circle',
                fillColor: '#FF0000',
            },
        });
    }

    // Unir el último punto de pricesArray con una línea roja punteada
    if (predictionDatetime > lastPoint.x) {
        chartData.series.push({
        name: 'Stock Prediction Line',
        data: [
            { x: lastPoint.x, y: lastPoint.y },
            { x: predictionDatetime, y: predictionPrice },
        ],
        color: 'rgba(255, 0, 0, 0.5)', // Color rojo
        showLine: true,
        lineType: 'line',
        lineWidth: 0.1, // Ajusta este valor para cambiar el grosor de la línea
    });
}

    return (
        <div className='pr-3 pt-4'>
            <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
        </div>
    );
};

export default PredictionChart;