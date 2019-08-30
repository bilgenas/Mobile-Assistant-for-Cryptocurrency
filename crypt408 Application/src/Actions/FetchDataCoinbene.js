import axios from 'axios';
import { coinBeneURL } from './../Utility/APILinks';
import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL } from './../Utility/DataFetchTypes';

export default function FetchDataBene() {
  return dispatch => {
    dispatch({ type: FETCH_DATA })
    return axios.get(`${coinBeneURL}/v1/market/ticker?symbol=all`)
      .then(res => {
        dispatch({type: FETCH_DATA_SUCCESS, payload: res.data})
      })
      .catch(err => {
        dispatch({type: FETCH_DATA_FAIL, payload: err.data})
      })
  }
}
