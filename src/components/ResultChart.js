import { Chart } from "react-google-charts";

const ResultChart = ({data}) => {
    const options = {
        title: "Performance Chart",
        legend: { position: "bottom" },
        hAxis: {
            title: "Date",
        },
        vAxis: {
            title: "Score",
        },
        colors: ['#1b55e2'],
    };
    return ( 
        <div className="chart-container">
            <div className="chart-select-form">
                
            </div>
            <Chart
            chartType="LineChart"
            data={data}
            options={options}
            width="100%"
            height="500px"
            />
        </div>
     );
}
 
export default ResultChart;