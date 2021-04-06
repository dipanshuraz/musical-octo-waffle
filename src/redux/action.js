import axios from 'axios';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILED = 'FETCH_DATA_FAILED';

export const FETCH_CHART_REQUEST = 'FETCH_CHART_REQUEST';
export const FETCH_CHART_SUCCESS = 'FETCH_CHART_SUCCESS';
export const FETCH_CHART_FAILED = 'FETCH_CHART_FAILED';

// Action

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (payload) => ({
  type: FETCH_DATA_SUCCESS,
  payload,
});

export const fetchDataFailed = () => ({
  type: FETCH_DATA_FAILED,
});

// Chart Fetch

export const fetchChartDataRequest = () => ({
  type: FETCH_CHART_REQUEST,
});

export const fetchChartDataSuccess = (payload) => ({
  type: FETCH_CHART_SUCCESS,
  payload,
});

export const fetchChartDataFailed = () => ({
  type: FETCH_CHART_FAILED,
});

// Action
export const fetchData = (dispatch) => {
  dispatch(fetchDataRequest());
  return axios
    .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then((res) => {
      dispatch(fetchDataSuccess(res.data.bpi));
    })
    .catch((err) => console.log(err.message));
};

export const fetchChartData = (currency, start, end) => (dispatch) => {
  dispatch(fetchChartDataRequest());

  return axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${start}&end=${end}`
    )
    .then((res) => {
      let data = res.data.bpi;

      dispatch(fetchChartDataSuccess(data));
    })
    .catch((err) => console.log(err.message));
};
