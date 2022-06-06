import React from 'react'
import icon50d from './assets/img/50d.png'
import icon13d from './assets/img/13d.png'
import icon11d from './assets/img/11d.png'
import icon10d from './assets/img/10d.png'
import icon09d from './assets/img/09d.png'
import icon04d from './assets/img/04d.png'
import icon03d from './assets/img/03d.png'
import icon02d from './assets/img/02d.png'
import icon01d from './assets/img/01d.png'

//Object stores units in Celsius and Fahrenheit
const units = [
    {
        unit: 'Celsius',
        symbol: 'C'
    },
    {
        unit: 'Fahrenheit',
        symbol: 'F'
    }
]

const Card = ( {todayWeather, todayDate, tempUnits, setTempUnits, startApp} ) => {
    
    //Sets icon ID for day and night to be the same
    const icon = todayWeather?.weatherIcon[0] + todayWeather?.weatherIcon[1] + 'd'
    
    let iconUrl

    //Sets icon URL
    switch(icon) {
        case '01d':
            iconUrl = icon01d
            break
        case '02d':
            iconUrl = icon02d
            break
        case '03d':
            iconUrl = icon03d
            break
        case '04d':
            iconUrl = icon04d
            break
        case '09d':
            iconUrl = icon09d 
            break
        case '10d':
            iconUrl = icon10d 
            break
        case '11d':
            iconUrl = icon11d
            break
        case '13d':
            iconUrl = icon13d 
            break
        case '50d':
            iconUrl = icon50d 
            break
        default:
            break
    }

    //Change units
    const changeUnits = () => {
        setTempUnits(!tempUnits)
        console.log(tempUnits)
        
    }

  return (
    <section className='card' style={{display:startApp}}>
        <p className='city-country'>{todayWeather?.city}, {todayWeather?.country}</p>
        <p className='date'>{todayDate.dayWeek}, {todayDate.dayMonth} {todayDate.month}</p>
        <div className='icon-container'>
            <img className='icon' src={iconUrl} alt="Weather Icon" />
        </div>
        <p className='weather-desc'>{todayWeather?.weatherDesc}</p>
        <p className='temperature'>
            {tempUnits ? todayWeather?.temperature.toFixed(0) : ((todayWeather?.temperature * 1.8) + 32).toFixed(0)}
            °{tempUnits ? units[0]?.symbol : units[1]?.symbol}
        </p>
        <button className='change-temp' onClick={changeUnits}>Show in  
            {tempUnits ? ' Fahrenheit' : ' Celsius'}
        </button>
        <div className='extra-info'>  
            <p className='extra'>
                <i class="fa-solid fa-droplet fa-2xl"></i>
                <span>Humidity</span>
                <span>{todayWeather?.humidity}%</span>
            </p>   
            <p className='extra'>
                <i class="fa-solid fa-wind fa-2xl"></i>
                <span>Wind Speed</span>
                <span>{todayWeather?.windSpeed}m/s</span>
            </p>
            <p className='extra'>
                <i class="fa-solid fa-temperature-half fa-2xl"></i>
                <span>Pressure</span>
                <span>{todayWeather?.pressure}hPa</span>
            </p>
        </div>
    </section>
  )
}

export default Card