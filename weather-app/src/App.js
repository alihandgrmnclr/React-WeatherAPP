import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import axios from "axios"
import { useState } from 'react';

function App() {

  // hide the api key in .env file and save it in gitignore folder
  const apiKey2 = process.env.REACT_APP_WEATHERBIT_API_KEY; //weatherBit apikey
  const [weather, setWeather] = useState([{}]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  const Swal = require('sweetalert2') //sweetalert2

  const getWeather = () => {
    axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lang=en&days=7&key=${apiKey2}`)
      .then((response) => {
        setWeather(response)
      })
      .catch(() => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'Make sure city name is correct'
      }))
      .finally(setLoading(false))
  }

  const getDay = (day) => {
    const objToday = new Date();
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = weekday[objToday.getDay() + day];
    return dayOfWeek;
  }

  return (
    <div className="app-body">

      <div id='myContainer' className='text-center'>
        <h1>Welcome to My Weather App</h1> <br />
        <div className="container">
          <div className="row">
            <div className="col-sm-12 d-flex justify-content-center">
              <input className="form-control mb-2" type="text" placeholder='City Name' value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>
        </div>
        <button className='btn btn-primary' onClick={getWeather}>Search</button>
        {
          weather.length < 2 ?
            <div className="mt-2">
              Please enter city name
            </div>
            :
            <div className="container mt-3">
              <div className="row">
                <div className="col-sm-12">
                  <h3>{weather.data.city_name}, {weather.data.country_code}</h3>
                </div>
                <div className="col-sm-12">
                  <div className="row">
                    {weather?.data?.data.map((value, index) => (
                      <div className="col-sm-3 mb-4" key={index}>
                        <div >{value.datetime}</div>
                        {getDay(index)}<br />
                        Average<b> {value.temp}</b> °C <br />
                        Max<b> {value.max_temp}</b> °C <br />
                        Min<b> {value.min_temp}</b> °C <br />
                        {value.weather.description}  <br />
                        <img src={`https://www.weatherbit.io/static/img/icons/${value.weather.icon}.png`} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        }
      </div>
    </div>
  );
}

export default App;
