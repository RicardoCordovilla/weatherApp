import React from 'react'
import '/src/CardInfo.css'


const CardInfo = ({info}) => {
  return (

    // info.main.feels_like
    // info.main.pressure
    // info.main.humidity
    // info.wind.speed
    <div className='cardInfo'>
      <div className="infoBx">
        <span>Feels</span>
        <img className='infoIcon' src="./src/assets/images/temperature.svg" alt="" />
        <span>{info?.main.feels_like}</span>
      </div>
      <div className="infoBx">
        <span>Pressure</span>
        <img className='infoIcon' src="./src/assets/images/pressure.webp" alt="" />
        <span>{info?.main.pressure}</span>
      </div>
      <div className="infoBx">
        <span>Humidity</span>
        <img className='infoIcon' src="./src/assets/images/humidity.png" alt="" />
        <span>{info?.main.humidity}</span>
      </div>
      <div className="infoBx">
        <span>Wind</span>
        <img className='infoIcon' src="./src/assets/images/wind.png" alt="" />
        <span>{info?.wind.speed}</span>
      </div>

    </div>
  )
}

export default CardInfo