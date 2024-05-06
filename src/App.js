import React, { useState, useEffect } from 'react';
import WeatherInput from './components/WeatherInput';
import WeatherDisplay from './components/WeatherDisplay.js';

const getBackgroundImage = (icon) => {
  switch (icon) {
    case '01d':
      return 'url(https://cdn.thebluestsky.com/tbs/2021/04/06112431/bigstock-Beautiful-Warm-Cloudless-Day-O-332461027.jpg)';
    case '01n':
      return 'url(https://wallpapercave.com/wp/wp4541296.jpg)';
    case '02d':
      return 'url(https://i.pinimg.com/originals/49/ef/53/49ef536b4e15542f3cdb28b379235bf8.jpg)';
    case '02n':
      return 'url(https://eoimages.gsfc.nasa.gov/images/imagerecords/48000/48892/noctilucent_clouds_paulsen_lrg.jpg)';
    case '03d':
    case '03n':
      return 'url(https://coclouds.com/wp-content/uploads/2011/06/illuminated-scattered-clouds-2011-06-21.jpg)';
    case '04d':
    case '04n':
      return 'url(https://www.baltana.com/files/wallpapers-2/Sun-Clouds-HD-Desktop-Wallpaper-09066.jpg)';
    case '09d':
    case '09n':
      return 'url(https://getwallpapers.com/wallpaper/full/4/e/4/770144-vertical-rainy-day-background-3840x2160-mac.jpg)';
    case '10d':
    case '10n':
      return 'url(https://getwallpapers.com/wallpaper/full/8/f/7/552643.jpg)';
    case '11d':
    case '11n':
      return 'url(https://c.pxhere.com/photos/c8/10/thunderstorm_flashes_night_weather_sky_forward_nature_storm-1438107.jpg!d)';
    case '13d':
    case '13n':
      return 'url(https://wallpaperaccess.com/full/3432153.jpg)';
    case '50d':
    case '50n':
      return 'url(https://wallpapercave.com/wp/wp4155374.jpg)';
    default:
      return 'url(https://wallpapercave.com/wp/qQa5Pd7.jpg)';
  }
};

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.transition = 'background-image 0.5s ease';
  }, []);

  const handleSearch = async (location) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=85066c6de56d3de5fcc05b6934af3e9e`
      );

      const data = await response.json();
      setData(data);
      document.body.style.backgroundImage = `url(${getBackgroundImage(data.weather[0].icon)})`;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ backgroundSize: 'cover' }}>
      <WeatherInput onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {data && !loading && <WeatherDisplay data={data} location={data.name} />}
    </div>
  );
};

export default App;
