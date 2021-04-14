import axios from 'axios';
import {TOKEN_NAME} from '../config'



export function getAccessToken() {
    return window.localStorage.getItem(TOKEN_NAME);
}


export function fetchRequest(
    url,
    data = {},
    method = "get",
    params = {},
    restrict = false,
    restrictReload
  ) {
    let header;
    if (restrict) {
      header = { Authorization: `Bearer ${getAccessToken()}` };
    }
    return axios({
      method,
      url,
      data,
      headers: header,
      params: params,
    });
  }