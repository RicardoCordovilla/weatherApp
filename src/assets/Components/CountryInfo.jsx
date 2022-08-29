import React, { useState } from 'react'
import { useEffect } from 'react'
const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });

const CountryInfo = ({ country, city }) => {
    const [countryName, setCountryName] = useState('')

    useEffect(() => {
        if (country) {
            setCountryName(regionNamesInEnglish.of(country))
        }
        

    }, [country])

    return (
        <div className='contryInfo'>
            <span className='countryInfo_name'>Country: {countryName} </span>
        </div>
    )
}

export default CountryInfo