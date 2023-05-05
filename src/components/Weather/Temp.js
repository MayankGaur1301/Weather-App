import React, { useState, useEffect } from 'react';
import './style.css';
import Weathercard from './weathercard';

const Temp = () => {

    const [searchValue, setSearchValue] = useState('Kotdwar');
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=c4e5ca8775fd02ddf4c0288a391e36a3`;        //&units=metric for to show temp in celsius

            const res = await fetch(url);
            const data = await res.json();

            //becouse the data in the api is inside an array within object.
            const { temp, humidity, pressure } = data.main;           
            const { main: weathermood } = data.weather[0];    //main: weathermood <= i named main as weathermood
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };

            setTempInfo(myNewWeatherInfo);

        } catch (error) {
            console.log(error)
        }
    }

    // by default on page load what we want is the weather data of a city 

    useEffect(() => {
        getWeatherInfo();
    }, [])

    return (
        <>
            <div className='wrap'>
                <div className="search">
                    <input
                        type='search'
                        placeholder='search...🌤'
                        autoFocus
                        id='search'
                        className='searchTerm'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button className='searchButton'
                        type='button'
                        onClick={getWeatherInfo}>
                        Search</button>
                </div>
            </div>
             

             <Weathercard tempInfo={tempInfo} />
           
        </>
    )
}

export default Temp
