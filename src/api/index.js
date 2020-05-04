import axios from 'axios'

const endpoint_url = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
    try {
        // Destructurizing the data obj while receiving the axios response, rather than doing it seaprately
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(endpoint_url);

        return { confirmed, recovered, deaths, lastUpdate };

    } catch (error) {

    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${endpoint_url}/daily`)
        const specifics = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return specifics; 
    } catch (error) {

    }
}