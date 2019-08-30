import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL } from './../Utility/DataFetchTypes';

const initState = {
  isFetching: null,
  data: [],
  hasError: false,
  errorMessage: null
};

export default function(state = initState, action) {
  switch(action.type) {
    case FETCH_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        data: [],
        hasError: false,
        errorMessage: null
      });

    case FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload,
        hasError: false,
        errorMessage: null
      });

    case FETCH_DATA_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload,
        hasError: true,
        errorMessage: action.err
      });

    default:
      return state;
  }
}
