import React, { useState, useEffect } from "react";
import axios from "axios";
import backgroundImageRainy from "./background-rainy.jpg";
import backgroundImageSunny from "./background-sunny.jpg";
import backgroundImageCloudy from "./background-cloudy.jpg";
import backgroundImageNight from "./background-night.jpg";
import menuImage from "./menu.png"; // import the menu image

function App() {
  const [data, setData] = useState({});
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [fontColor, setFontColor] = useState("white");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Add state for menu

  const url = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, [url]);

  useEffect(() => {
    // Update the background image and font color based on the weather and time
    if (data.weather) {
      const weather = data.weather[0].main;
      const currentTime = new Date().getHours();
      if (weather === "Rain") {
        setBackgroundImage(backgroundImageRainy);
        setFontColor("white");
      } else if (weather === "Clear" && currentTime >= 6 && currentTime < 18) {
        setBackgroundImage(backgroundImageSunny);
        setFontColor("black");
      } else if (weather === "Clear" || (currentTime < 6 && currentTime >= 18)) {
        setBackgroundImage(backgroundImageNight);
        setFontColor("white");
      } else {
        setBackgroundImage(backgroundImageCloudy);
        setFontColor("white");
      }
    }
  }, [data]);

  // Define a function to toggle the menu state
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        height: "120%",
        color: fontColor // Set the font color based on the state variable
      }}
    >

      <img
        src={menuImage}
        alt="Menu"
        onClick={toggleMenu}
        className="menu-image"
        height="30em"
      />

      {isMenuOpen && (
        <div className="side-menu">
          <ul>
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
            <li>Menu Item 3</li>
          </ul>
        </div>
      )}

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="top">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">
                  {data.wind.speed.toFixed()} metres/sec
                </p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
