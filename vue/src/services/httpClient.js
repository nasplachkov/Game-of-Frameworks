import axios from "axios";
import logger from "./loggerService";

function createHttpClient() {
  logger.addInterceptor(axios);
  
  return {
    get(url) {
      return axios({
        method: "get",
        url: url
      });
    },
    post(url, data) {
      return axios({
        method: "post",
        url: url,
        data: data
      });
    },
    put(url, data) {
      return axios({
        method: "put",
        url: url,
        data: data
      });
    },
    patch(url, data) {
      return axios({
        method: "patch",
        url: url,
        data: data
      });
    },
    delete(url) {
      return axios({
        method: "delete",
        url: url
      });
    }
  };
}

export let httpClient = createHttpClient();
