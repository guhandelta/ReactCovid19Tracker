import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'

import { fetchCountryData } from '../../api'
import styles from './CountryPicker.module.css'

const CountryPicker = ({ handleCountrySelection }) => {

    const [countryData, setCountryData] = useState([]);

    useEffect(() => {
        const countryData = async () => {
            setCountryData(await fetchCountryData())
        }

        countryData();
    }, [setCountryData]); // useEffect will be triggered only when setCountryData changes => enables selecting different countries

    console.log(countryData);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect onChange={(e) => handleCountrySelection(e.target.value)}>
                <option value="global">Global</option>
                {
                    countryData.map((country, i) => <option key={i} value={country}>{country}</option>)
                }
            </NativeSelect>
        </FormControl>
    )
}
export default CountryPicker;