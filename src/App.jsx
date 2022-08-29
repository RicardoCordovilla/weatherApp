
import { useEffect, useState } from 'react'

import './App.css'
import CardWeather from './assets/Components/CardWeather'


let load = false

function App() {


  let registro = new Date(Date.now())
  const [hour, setHour] = useState()
  const [geo, setGeo] = useState()
  const [urlImg, setUrlImg] = useState()



  useEffect(() => {

    setHour(registro.getHours())


    if (hour > 19 && hour < 6) setUrlImg('https://torange.biz/photofxnew/213/HD/starry-night-sky-213217.jpg')
    else setUrlImg('data:image/jpeg;base64,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')


    const success = coord => {
      const location = {
        latitude: coord.coords.latitude,
        longitude: coord.coords.longitude
      }
      // console.log(coord.coords.latitude,coord.coords.longitude)
      setGeo(location)
    }

    navigator.geolocation.getCurrentPosition(success)
  }, [])


  const appStyle = {
    backgroud: `url('${urlImg}')`
  }


  const myTimeout = setTimeout(timeOut, 3000)

  function timeOut() {
    load = true
    const app = document.getElementById('App')
    const loading = document.getElementById('loading')
    app.classList.replace('loading', 'App')
    loading.classList.replace('pageLoading', 'hiden')

  }




  return (
    <>
      <div className="pageLoading" id='loading'>
        <h1 className='texLoading'>Loading...</h1>
      </div>
      <div className="loading" style={appStyle} id='App'>
        <img src={urlImg} alt="" />
        <CardWeather data={geo} />


      </div>
    </>
  )

}


export default App
