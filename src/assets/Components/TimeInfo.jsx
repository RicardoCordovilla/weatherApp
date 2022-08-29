import React, { useEffect, useState } from 'react'

const TimeInfo = () => {
    let registro = new Date(Date.now())
    const [hour, setHour] = useState()
    const [min, setMin] = useState()

    useEffect(()=>{
        setHour(registro.getHours())
        setMin(registro.getMinutes())
    },[])


    // console.log(hour)
    // console.log(min)

  return (
    <div className='timeInfo'>
      <span className='timeInfo_description'>Time:</span>
      <span>{hour}:{min}</span>

    </div>
  )
}

export default TimeInfo