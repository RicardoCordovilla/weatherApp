import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import '/src/cloud.css'

const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });


const CloudCard = ({ cloud, temp, city, country, setSearch, setCitySearch, setAutoLocation }) => {


  const [cityImage, setCityImage] = useState()
  const [centi, setCenti] = useState(true)
  const [countryName, setCountryName] = useState('')


  const changeTemp = () => setCenti(!centi)


  useEffect(() => {

    // consumo una api de google search image
    // https://rapidapi.com/apigeek/api/google-search3/
    // esta api me devuelve varias imagenes haciendo una búsqueda con la ciudad
    // seleccinamos una y la mostramos en un pequeño espacio
    if (country) {
      setCountryName(regionNamesInEnglish.of(country))
    }

    if (city) {
      const options = {
        method: 'GET',
        url: `https://google-search3.p.rapidapi.com/api/v1/image/q=${city} de ${countryName} sus paisajes de ${city}`,
        headers: {
          'X-User-Agent': 'desktop',
          'X-Proxy-Location': 'EU',
          'X-RapidAPI-Key': '62b6a69803msh80a4b7c5f0b6d7bp196fcbjsnc2c232e89034',
          'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
        }
      }
      axios.request(options)
        .then(res => {
          // console.log(res.data)
          setCityImage(res.data.image_results[4].image)
        })
        .catch(err => console.log(err))
    }
  }, [city])

  console.log(countryName, city)




  const cloudStyle = {
    // le hice un estilo dimamico dependiendo del valor que me arroja en cloud 
    // para darle un efecto de nubes negras, entre más alto es el valor más negra se pone la nube
    // y da la apariencia como que que está lloviendo con la sombra que se produce dinamicamente
    filter: `drop-shadow(5px ${cloud}px 20px #000) contrast(${cloud * 1.2}%) opacity(${cloud * 1.2}%)`
  }

  const sunStyle = {
    // el sol tiene un estilo dinámico de intensidad de color dependiendo la temperatura
    filter: `blur(20px) opacity(${temp * 0.02})`
  }

  return (
    <>
      <div className="cardCloud">
        <div className="glass"></div>

        <div className="infoTemp">
          <figure>

            {/* aquí colocamos una imagen dinámica dependiendo de la ciudad */}
            <img src={cityImage?.src} />
            <div className="searchDiv">


              <input className='searchCity' id='searchCity' type="text" placeholder='Search a city'
                onChange={e => setCitySearch(e.target.value)}
              />

              <div className="tooltip">

                <button className='btn'
                  onClick={() => {
                    setSearch(true)
                    document.getElementById('searchCity').value = ''
                    console.log('input:', document.getElementById('searchCity').value)
                  }}
                ><i className='bx bx-search-alt'></i>

                </button>
                <span className='tooltiptext'>Click to search</span>
              </div>
            </div>



            <div className="tooltip">

              <button className='btn'
                onClick={() => {
                  setAutoLocation(true)
                  setSearch(true)
                }}

              >
                {city}
                <i className='bx bx-current-location'></i>
              </button>
              <span className='tooltiptext'>Click set your current location</span>
            </div>

          </figure>
          <div className="infoTemp_description">

            <span>Temperature:</span>
            <span className='temp'>{Math.floor(centi ? Math.floor(temp) : Math.floor(temp) * (9 / 5) + 32)} {centi ? '°C' : '°F'}</span>
            <progress value={temp} max="40" ></progress>

            <div className="tooltip">

              <button
                onClick={changeTemp}
                className='btn'
              >{centi ? '°C' : '°F'}
              </button>
              <span className='tooltiptext'>Change units</span>
            </div>
          </div>
        </div>

        <div className="weather">
          <div className="sunBack" style={sunStyle}></div>
          <div className="imgCloud">
            <img src="./src/assets/images/cloud2.png" alt=""
              style={cloudStyle}
            />
            <span className='numCloud'>Clouds: {cloud}</span>
          </div>
        </div>


      </div>
    </>
  )
}

export default CloudCard