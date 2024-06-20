// "use Client";

// import React, { useEffect, useState } from "react";
// import { useContext, createContext } from "react";
// import defaultStates from "../utils/DefaultStates";
// import axios from "axios";
// import { debounce } from "lodash";

// const GlobalContext = createContext(null);
// const GlobalContextUpdate = createContext(null);

// export const GlobalContextProvider = ({ children }) => {
//   const [forecast, setForecast] = useState([]);
//   const [geoCodeList, SetGeoCodeList] = useState(defaultStates);
//   const [inputValue, setInputValue] = useState("");

//   const [activeCityCoords, setActiveCityCoords] = useState([
//     51.752021, -1.257726,
//   ]);
//   const [airQuality, setAirQuality] = useState({});
//   const [fiveDayorcast, setFiveDayForeCast] = useState({});
//   const [uvIndex, setUvIndex] = useState({});

//   //   fetch ForeCast
//   const fetchForeCast = async (lat, lon) => {
//     try {
//       const res = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);

//       setForecast(res.data);
//       console.log("res : ", res.data);
//     } catch (e) {
//       console.log("Error fetching the forecast data", e.message);
//     }
//   };

//   //   fetch Air quality
//   const fetchAirQuality = async (lat, lon) => {
//     try {
//       const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
//       setAirQuality(res.data);
//     } catch (error) {
//       console.log("Error fetching the Air Quality", error.message);
//     }
//   };

//   //   fetch fiveday forecast

//   const fetchFiveDayForecast = async (lat, lon) => {
//     try {
//       const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);
//       setFiveDayForeCast(res.data);
//     } catch (error) {
//       console.log("Error Fetching the Five Day Forecast", error.message);
//     }
//   };

//   //   fetch the geo code list
//   const fetchGeoCodeList = async (search) => {
//     try {
//       const res = await axios.get(`api/geocoded?search=${search}`);
//       setFiveDayForeCast(res.data);
//     } catch (error) {
//       console.log("Error Fetching the Five Day Forecast", error.message);
//     }
//   };

//   //   fetch Uv
//   const fetchUvIndex = async (lat, lon) => {
//     try {
//       const res = await axios.get(`api/uv?lat=${lat}&lon=${lon}`);
//       setFiveDayForeCast(res.data);
//     } catch (error) {
//       console.log("Error Fetching the Five Day Forecast", error.message);
//     }
//   };

//   const handleInput = (e) => {
//     setInputValue(e.target.value);

//     if (e.target.value === "") {
//       SetGeoCodeList(defaultStates);
//     }

//     useEffect(() => {
//       const debouncedFetch = debounce((search) => {
//         fetchGeoCodeList(search);
//       }, 500);
//       if (inputValue) {
//         debouncedFetch(inputValue);
//       }

//       //cleanup
//       useEffect(() => {
//         fetchForeCast(activeCityCoords[0], activeCityCoords[1]);
//         fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
//         fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
//         fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
//       }, [activeCityCoords]);
//       return (
//         <GlobalContext.Provider
//           value={{
//             forecast,
//             airQuality,
//             fiveDayorcast,
//             uvIndex,
//             geoCodeList,
//             inputValue,
//             handleInput,
//             setActiveCityCoords,
//           }}
//         >
//           <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
//             {children}
//           </GlobalContextUpdate.Provider>
//         </GlobalContext.Provider>
//       );
//     });
//   };
// };

// export const useGlobalContext = () => useContext(GlobalContext);
// export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);

"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import defaultStates from "../utils/DefaultStates";
import axios from "axios";
import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState([]);
  const [geoCodeList, setGeoCodeList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");
  const [activeCityCoords, setActiveCityCoords] = useState([
    51.752021, -1.257726,
  ]);
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});

  const fetchForeCast = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
      setForecast(res.data);
    } catch (e) {
      console.log("Error fetching the forecast data", e.message);
    }
  };

  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/pollution?lat=${lat}&lon=${lon}`);
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error fetching the Air Quality", error.message);
    }
  };

  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/fiveday?lat=${lat}&lon=${lon}`);
      setFiveDayForecast(res.data);
    } catch (error) {
      console.log("Error Fetching the Five Day Forecast", error.message);
    }
  };

  const fetchGeoCodeList = async (search) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`);
      setGeoCodeList(res.data);
    } catch (error) {
      console.log("Error Fetching the Geo Code List", error.message);
    }
  };

  const fetchUvIndex = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);
      setUvIndex(res.data);
    } catch (error) {
      console.log("Error Fetching the UV Index", error.message);
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodeList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    return () => {
      debouncedFetch.cancel();
    };
  }, [inputValue]);

  useEffect(() => {
    fetchForeCast(activeCityCoords[0], activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  const handleInput = (e) => {
    setInputValue(e.target.value);

    if (e.target.value === "") {
      setGeoCodeList(defaultStates);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodeList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
