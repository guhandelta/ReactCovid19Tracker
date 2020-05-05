import axios from 'axios'

const endpoint_url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let dynamic_url = endpoint_url;
    if (country) { //Edit the url if there is country passed in as props
        dynamic_url = `${endpoint_url}/countries/${country}`
    }
    try {
        // Destructurizing the data obj while receiving the axios response, rather than doing it seaprately
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(dynamic_url);
        //Fetch the data as per URL for the country passed in as prop or use the normal URL

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

export const fetchCountryData = async () => {
    try {
        const { data: { countries } } = await axios.get(`${endpoint_url}/countries`)

        return countries.map((country) => country.name)
    } catch (error) {

    }
}