import { instance } from "utils/axios.utils";

const auth = {
  login: (data: any) => {
    let promise = new Promise((resolve, reject) => {
      let url = "auth/user_login";
      instance()
        .post(url,data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  getUser: (id: any) => {
    let promise = new Promise((resolve, reject) => {
      let url = "user/view/" + id;
      instance()
        .post(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },
  uploadFile: (data: any) => {
    let promise = new Promise((resolve, reject) => {
      let url = "auth/get_signed_url";
      instance()
        .post(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },
  regenerateToken: () => {
    let promise = new Promise((resolve, reject) => {
      let url = "auth/regenerate_token";
      instance()
        .post(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },
};

export default auth;
