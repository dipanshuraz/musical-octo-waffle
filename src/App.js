import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './components/Graph';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, fetchChartData } from './redux/action';
import moment from 'moment';

const renderHTML = (escapedHTML) =>
  React.createElement('span', {
    dangerouslySetInnerHTML: { __html: escapedHTML },
  });

function App() {
  let now = moment().format('YYYY-MM-DD');
  let startdate = moment();
  startdate = startdate.subtract(60, 'days');
  startdate = startdate.format('YYYY-MM-DD');

  const [country, setcountry] = useState({
    USD: {},
    GBP: {},
    EUR: {},
  });

  const [activeChartCountry, setActiveChartCountry] = useState({});
  const [chartData, setChartData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData);
  }, [dispatch]);

  const countryReducer = useSelector((state) => state.country);

  useEffect(() => {
    setcountry(countryReducer);
  }, [countryReducer]);

  const handleSelect = (e) => {
    let value = e.target.value;
    dispatch(fetchChartData(value, startdate, now));
    setActiveChartCountry(country[value]);
  };

  const chart = useSelector((state) => state.data);

  useEffect(() => {
    setChartData(chart);
  }, [chart]);

  useEffect(() => {
    dispatch(fetchChartData('USD', startdate, now));
    setActiveChartCountry(country['USD']);
  }, [country, dispatch]);

  return (
    <div className='container'>
      <div className='row h-100 align-items-center'>
        <div className='col-12 col-md-6 '>
          <h2>1 Bitcoin Equals</h2>
          <br />
          <select
            defaultValue='USD'
            onChange={handleSelect}
            class='form-select'
            aria-label='Default select example'
          >
            <option value='USD'>United States Dollar (USD)</option>
            <option value='GBP'>British Pound Sterling (GBP)</option>
            <option value='EUR'>Euro (EUR)</option>
          </select>
          <br />
          <p className='display-4 bold'>
            {activeChartCountry &&
              renderHTML(
                activeChartCountry &&
                  `${Number(activeChartCountry.rate_float).toFixed(2)}
                ${activeChartCountry.symbol}`
              )}
          </p>
        </div>

        <div className='col-12 col-md-6'>
          <Graph
            labels={Object.keys(chartData).map((elem) =>
              moment(elem).format('D MMM')
            )}
            stats={Object.values(chartData)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
