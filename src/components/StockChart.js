import ReactApexChart from 'react-apexcharts';

const StockChart = ({ pricesArray }) => {
    const formattedPrices = pricesArray.map(item => ({
        x: item.x, // Use the timestamp as x-value
        y: item.y
    }));

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
            colors: ['#1976D2'] // Line color
        },
        series: [
            {
                name: 'Price',
                data: formattedPrices
            }
        ]
    };

    return (
        <div>
            <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
        </div>
    );
};

export default StockChart;
