import React from 'react';
import { Cards, Chart, CountryPicker } from './Components/'
import { fetchData } from './api'

import CoronaBanner from './images/Corona.jpg'
import styles from './App.module.css'

class App extends React.Component {

  state = {
    data: {},
    country: '' //The country data is handles in the App component, so it may be passed to all it child components and the data fetched-
    //- would be reflected on all the child components, with respect to the country choosen on the UI
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountrySelection = async (country) => {
    //Fetch the data
    const fetchedData = await fetchData(country);
    //Set the data to the state
    this.setState({ data: fetchedData, country: country });

  }

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img src={CoronaBanner} className={styles.banner} alt="Covid-19" />
        <Cards data={data} />
        <CountryPicker handleCountrySelection={this.handleCountrySelection} />
        <Chart data={data} country={country} />
      </div>
    )
  }
}

export default App;
