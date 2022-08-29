import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CloudCard from './CloudCard'
import CardInfo from './CardInfo'
import CountryInfo from './CountryInfo'
import '/src/CardWeather.css'
import TimeInfo from './TimeInfo'

const CardWeather = ({ data }) => {

    const [clima, setClima] = useState()
    const apikey = '142b04b54fb56eb99cfb4bc4a48455e6'

    const [citySearch, setCitySearch] = useState()
    const [search, setSearch] = useState(false)
    const [autoLocation, setAutoLocation] = useState(false)

    // console.log('citySearch:', citySearch)

    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    useEffect(() => {
        let apiurl

        if (citySearch != '' && !autoLocation) apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apikey}&units=metric`
        if (data && !citySearch != '' || autoLocation) apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${apikey}&units=metric`

        axios.get(apiurl)
            .then(res => {
                setClima(res.data)
                setSearch(false)
                if (autoLocation)
                    setCitySearch('')
                setAutoLocation(false)
                // document.getElementById('searchCity').target.value=''
            })
            .catch(err => err.message)
    }, [data, search])

    function Salida(firstName, lastName) {
        this.citySearch = citySearch;
        this.search = search;
        this.autoLocation = autoLocation;

    }

    var me = new Salida(citySearch, search, autoLocation);

    // console.table(me);
    //   console.log(clima)

    return (
        <div className='cardWeather'>
            <TimeInfo />
            <CountryInfo country={clima?.sys?.country} city={clima?.name} />
            <CloudCard
                cloud={clima?.clouds.all}
                temp={clima?.main.temp}
                city={clima?.name}
                country={clima?.sys?.country}
                setCitySearch={setCitySearch}
                setSearch={setSearch}
                setAutoLocation={setAutoLocation}
            />
            <CardInfo info={clima} />
        </div>

    )
}

export default CardWeather