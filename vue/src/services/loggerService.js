class Logger {
  addInterceptor(axiosClient) {
    axiosClient.interceptors.request.use(
      config => {
        this.log("Request success", config);
        return config;
      },
      error => {
        this.log("Request error", error);
        return Promise.reject(error);
      }
    );
    axiosClient.interceptors.response.use(
      response => {
        this.log("Response success", response);
        return response;
      },
      error => {
        this.log("Response error", error);
        return Promise.reject(error);
      }
    );
  }

  log(...data) {
    // Do something much more meaningful for real world app :)
    console.log(...data);
  }
}

export default new Logger();
