import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILED,
  FETCH_CHART_REQUEST,
  FETCH_CHART_SUCCESS,
  FETCH_CHART_FAILED,
} from './action';

const initialState = {
  country: {},
  data: {},
  isLoading: false,
  error: '',
};

const reducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        country: payload,
      };

    case FETCH_DATA_FAILED:
      return {
        ...state,
        error: payload,
      };

    case FETCH_CHART_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CHART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    case FETCH_CHART_FAILED:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export default reducer;
