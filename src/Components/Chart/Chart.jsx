import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { fetchDailyData } from '../../api/'

import styles from './Chart.module.css'

const Chart = () => {
    const [dailyData, setDailyData] = useState([]); // Specifying an empty array will make testing empty array, easy
    useEffect(() => { //useEffect() is Synchronous, so can't specify it as async, but can only be made async by defn a async fn() inside
        const dailyDataAPI = async () => { // This can also be defn as self calling a IIFE
            setDailyData(await fetchDailyData());
        }
        dailyDataAPI();
    });
    const lineChart = (
        dailyData.length ? (// Prevent initial data load errors, as the data would not be available initially
            <Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{ //Datasets for confirmed/infected & deaths are only used here, as dailyData only provides those 2 datasets
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill: true
                    }],
                }}
            />) : null
    );
    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}
export default Chart;