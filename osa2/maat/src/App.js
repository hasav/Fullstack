import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countryname = ( {name, setNewFilter} ) => {

  return (
    <div>
     {name}
    <button onClick={() => setNewFilter(name.toLowerCase())}>show</button>
    </div>
  )
}

const Weather = ( {city} ) => {
  const apikey = '55facdafa7c7445dabf174721190707 '
  const url = 'http://api.apixu.com/v1/current.json?key='+apikey + '&q='+city
  const [weather, setWeather] = useState('')
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
  }, [])


  if (weather) {
    
  const temp = weather.current.temp_c
  const wind = weather.current.wind_kph
  const wind_dir = weather.current.wind_dir
  const icon = weather.current.condition.icon
    return (
      <div>
        <h3>Weather in {city}</h3>
        
        <p><b>temperature:</b> {temp} Celsius</p>
        <img src={icon} width="50" height="50"></img>
        <p><b>wind:</b> {wind} kph direction {wind_dir}</p>
      </div>
    )
  }
  return(
    <div>fetching</div>
  )
}

const Country = ( {data} ) => {
  const name = data.name
  const capital = data.capital
  const population = data.population
  const languages = data.languages
  const flag = data.flag

  const rows = () => {
    return(
    languages.map(language => <li key={language.name}>{language.name}</li>)
    )
  }

  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h3>languages</h3>
      <ul>
      {rows()}
      </ul>
      <img src={flag} width="150" height="100"/>
      <Weather city={data.capital} />
    </div>
  )
}


const Filter = ( {newFilter, setNewFilter} ) => {
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
  }
  return (
    <form>
        <div>
          find countries
          <input
          value={newFilter}
          onChange={handleFilterChange}
          />
        </div>
      </form>
  )
}



const Rows = ( {newFilter, setNewFilter, countries} ) => {
  let filtered = countries.filter(country => country.name.toLowerCase().includes(newFilter))
  if (filtered.length > 9) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  if (filtered.length > 1) {
    return (
      filtered.map(country =>
        <Countryname
        key={country.name} 
        name={country.name}
        setNewFilter={setNewFilter}
        />)
      )
    }
  if (filtered.length === 1) {
    return (
      filtered.map(country =>
        <Country
        key={country.name}
        data={country}
        />
    )
    )

  }
  return (
    <div>
      loading...
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [ newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
    
  return (
    <div>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <div>
        <Rows newFilter={newFilter} setNewFilter={setNewFilter} countries={countries}/>
      </div>
    </div>
  )

}

export default App