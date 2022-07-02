import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import {useSelector} from "react-redux";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

const Chart = () => {
    const list = useSelector((state) => state.data.todo);
    let convertedDate = list.map((item) => {
        let localDate = new Date(item.created).toLocaleDateString();
        return {
            date : localDate
        }
    });

    const groupBy = (array,key) => {
        return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
            return result;
        }, []);
    }

    let dateGroup = groupBy(convertedDate, "date");
    const data = {
        labels : Object.keys(dateGroup).filter((item,index) => index < 5),
        datasets : [
            {
            label: "# of Todo",
            data: Object.values(dateGroup).map((item) => item.length),
            backgroundColor : [
                "rgba(255,99,132,0.2",
                "rgba(54,162,235,0.2",
                "rgba(255,206,86,0.2",
                "rgba(75,192,192,0.2",
                "rgba(153,102,255,0.2",
                "rgba(255,159,64,0.2",
            ],
            borderColor : [
                "rgba(255,99,132,1",
                "rgba(54,162,235,1",
                "rgba(255,206,86,1",
                "rgba(75,192,192,1",
                "rgba(153,102,255,1",
                "rgba(255,159,64,1",
            ],
            borderWidth : 1,
        }
        ]
    }
  return (
    <>
    <Bar data = {data} options= {options}/>
    </>
  )
}

export default Chart