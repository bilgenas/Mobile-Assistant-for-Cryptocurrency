import axios from 'axios';
import { bitMaxURL } from './../Utility/APILinks';
import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL } from './../Utility/DataFetchTypes';

export default function FetchDataBMAX() {
  return dispatch => {
    dispatch({ type: FETCH_DATA })
    return axios.get(`${bitMaxURL}/api/v1/ticker/24hr`)
      .then(res => {
        dispatch({type: FETCH_DATA_SUCCESS, payload: res.data})
      })
      .catch(err => {
        dispatch({type: FETCH_DATA_FAIL, payload: err.data})
      })
  }
}
