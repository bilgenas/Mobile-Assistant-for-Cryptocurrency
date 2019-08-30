import axios from 'axios';
import { hitBTCURL } from './../Utility/APILinks';
import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL } from './../Utility/DataFetchTypes';

export default function FetchDataHit() {
  return dispatch => {
    dispatch({ type: FETCH_DATA })
    return axios.get(`${hitBTCURL}/api/2/public/ticker`)
      .then(res => {
        dispatch({type: FETCH_DATA_SUCCESS, payload: res.data})
      })
      .catch(err => {
        dispatch({type: FETCH_DATA_FAIL, payload: err.data})
      })
  }
}
