
import { Header } from 'components';
import Home from 'pages/Home';
import Rates from 'pages/Rates';
import { useEffect, useState } from 'react';
import { useDispatch, } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getBaseCurrency} from 'reduxState/operations';
import { setDefaultCurrency } from 'reduxState/slice';

export const App = () => {
  const [isDenied, setIsDenied] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
  const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

    function success(pos) {
      const crd = pos.coords;
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      if (isDenied) {
        dispatch(setDefaultCurrency(''))
        setIsDenied(false)
      }
      dispatch(getBaseCurrency(crd))

    }
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
        setIsDenied(true)
      dispatch(setDefaultCurrency('USD'))
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [isDenied, dispatch])

  
  
  return <>
    <Header>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/rates/' element={<Rates/>} />
        <Route path='*' element={<Navigate to={"/"}/>}/>
      </Routes>
  </Header>
  </>
};
