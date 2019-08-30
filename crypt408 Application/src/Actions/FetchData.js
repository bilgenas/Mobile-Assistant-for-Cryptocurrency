import axios from 'axios';
import { apiURL } from './../Utility/APILinks';
import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL } from './../Utility/DataFetchTypes';

export default function FetchData() {
  return dispatch => {
    dispatch({ type: FETCH_DATA })
    return axios.get(`${apiURL}/v1/ticker/?limit=300`)
      .then(res => {
        dispatch({type: FETCH_DATA_SUCCESS, payload: res.data})
      })
      .catch(err => {
        dispatch({type: FETCH_DATA_FAIL, payload: err.data})
      })
  }
}
