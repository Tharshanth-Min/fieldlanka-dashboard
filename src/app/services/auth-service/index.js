import TitumUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import api from "../../main/utils/api";

const API_URL = process.env.REACT_APP_API_URL;

class AuthService extends TitumUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "You are logged out");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');
			return;
		}
		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

  signInWithUserAndPassword = (username, password) => {
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/login`,  {username, password})
          .then((response) => {
            this.setSession(response.data.accessToken);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
    });
  };

  signInWithUser = () => {
    return new Promise((resolve, reject) => {
      api()
        .get(`/sign-in-with-user`)
        .then((response) => {
          if (response.data.user) {
            resolve(response.data);
          } else {
            this.logout();
            reject(new Error("Failed to login ."));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error("Failed to login"));
        });
    });
  };

  logout = () => {
    return new Promise(() => {
      api()
        .post(`/logout`)
        .then(() => {
          this.setSession(null);
        })
        .catch(() => {});
    });
  };

  isAuthTokenValid = access_token => {
    return access_token;
  };

  setSession = access_token => {
    if (access_token) {
      localStorage.setItem('fieledlanka_access_token', access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem('fieledlanka_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  getAccessToken = () => {
    return window.localStorage.getItem('fieledlanka_access_token');
  };
}

const instance = new AuthService();

export default instance;
