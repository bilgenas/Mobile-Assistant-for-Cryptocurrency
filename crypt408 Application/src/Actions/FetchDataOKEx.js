import axios from 'axios';
import { okexURL } from './../Utility/APILinks';
import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL } from './../Utility/DataFetchTypes';

export default function FetchDataOKEx() {
  return dispatch => {
    dispatch({ type: FETCH_DATA })
    return axios.get(`${okexURL}/api/spot/v3/instruments/ticker`)
      .then(res => {
        dispatch({type: FETCH_DATA_SUCCESS, payload: res.data})
      })
      .catch(err => {
        dispatch({type: FETCH_DATA_FAIL, payload: err.data})
      })
  }
}
