import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'

function App() {

  //Starts app
  const [startApp, setStartApp] = useState('none')
  const [hideBtn, setHideBtn] = useState('block')

  //Get user's date
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const date = new Date()
  const todayDate = {
    dayWeek: days[date.getDay()],
    month: months[date.getMonth()],
    dayMonth: date.getDate()
  }
  console.log('Day: ', todayDate.dayWeek)
  console.log('Month: ', todayDate.month)
  console.log('Day: ', todayDate.dayMonth)

  //Set temperature units
  const [tempUnits, setTempUnits] = useState(true)
   
  //Stores user's location
  const [location, setLocation] = useState()

  //Stores API response
  const [todayWeather, setTodayWeather] = useState()

  //Stores user's longitud and latitud
  let lon, lat

  //Gets current user's location using his device
  const getCoordinates = () => {
    
    const success = pos => {
      lon = pos.coords.longitude
      lat = pos.coords.latitude
      setLocation({lon, lat})
      setStartApp('block')
      setHideBtn('none')

    }
    navigator.geolocation.getCurrentPosition(success);
  } 

  console.log(location)

//OpenWeather API Key
  const API_KEY = '8d9fc6317d22aaab7a5cb9339e19a2cc'  

  useEffect(() => {
    //Creates API call's URL until location is not undefined
    if(location !== undefined) {
      //Returned temperature value is in metric units (Celsius)
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location?.lat}&lon=${location?.lon}&appid=${API_KEY}&units=metric`
      console.log(url)
      axios.get(url)
        .then(res => {
          console.log('API response: ', res.data)
          const city = res.data.name
          console.log('City: ' + city)
          const country = res.data.sys.country
          console.log('Country: ' + country)
          const weatherIcon = res.data.weather[0].icon
          console.log('Icon: ' + weatherIcon)
          const temperature = res.data.main.temp
          console.log('Temperature: ' + temperature + ' °C')
          const weatherDesc = res.data.weather[0].description
          console.log('Description: ' + weatherDesc)
          setTodayWeather({
            city: res.data.name,
            country: res.data.sys.country,
            weatherIcon: res.data.weather[0].icon,
            temperature: res.data.main.temp,
            weatherDesc: res.data.weather[0].description,
            humidity: res.data.main.humidity,
            pressure: res.data.main.pressure,
            windSpeed: res.data.wind.speed
          })
        })
    }
  }, [location])

  console.log(todayWeather)

  
  return (
    <div className="App">
      <Card 
        todayWeather={todayWeather}
        todayDate={todayDate}
        tempUnits={tempUnits}
        setTempUnits={setTempUnits}
        startApp={startApp}
      />
      <button onClick={getCoordinates} style={{display:hideBtn}}>Start Weather App</button>
    </div>
  )
}

export default App
