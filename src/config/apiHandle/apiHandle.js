import axios from "axios";
import { session_expired } from "../../store/constants";
import { save_tokens_constant } from "../../utils/asyncStatus";

export const exit_session = () => {
  localStorage.removeItem(save_tokens_constant.AUTH);
  // localStorage.removeItem(save_id)
  localStorage.setItem(session_expired, true);
  localStorage.clear();

  window.location.reload();
};

export const baseURL = `https://donerightaway.com/jiff-done-backend/public/api`;

export const apiHandle = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axios.defaults.timeout = 15000;

apiHandle.interceptors.request.use((req) => {
  const auth_token = localStorage.getItem(save_tokens_constant.AUTH);

  if (auth_token) {
    console.log("auth_token =================>", auth_token);
    req.headers.Authorization = `Bearer ${auth_token}`;
  }

  console.log(
    "req.headers.Authorization  ====================>",
    req.headers.Authorization
  );
  console.log("auth_token  ====================>", auth_token);
  return req;
});

// apiHandle.interceptors.request.use(async req => {

//     const auth_token = await localStorage.getItem(save_tokens_constant)

//     if(auth_token){

//         console.log('auth_token =================>', auth_token)

//         req.headers.Authorization = `Bearer ${auth_token}`
//     }

//     console.log('req.headers.Authorization  ====================>', req.headers.Authorization );

//     return req

// })

// apiHandle.interceptors.request.use(async req => {

//   const authTokens = localStorage.getItem(save_tokens_constant) ? JSON.parse(localStorage.getItem(save_tokens_constant)) : null

//   if (authTokens) {
//     req.headers.Authorization = `Bearer ${authTokens?.access_token}`

//     const user = jwt_decode(authTokens?.access_token)

//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

//     const refreshTokenDecode = jwt_decode(authTokens?.refresh_token)
//     const isRefreshExpired = dayjs.unix(refreshTokenDecode.exp).diff(dayjs()) < 1

//     if (!isExpired) {
//     }
//     else if (isRefreshExpired && isExpired) {
//       exit_session()
//     }
//     else if (!isRefreshExpired && isExpired) {
//       try {
//         const response = await axios.post(`${baseURL}/renew-token`, { refresh_token: authTokens?.refresh_token }, {
//           headers: { Authorization: `Bearer ${authTokens?.access_token}` }
//         })
//         if (response.data.success) {
//           const { access_token, refresh_token } = response.data.tokens
//           req.headers.Authorization = `Bearer ${access_token}`
//           localStorage.setItem(save_tokens_constant, JSON.stringify({ access_token: access_token, refresh_token: refresh_token }))
//         }
//       } catch (error) {
//         if (error.response.data) {
//           if (api_error_messages_to_exit.includes(error.response.data.message)) {
//             exit_session()
//           }
//         }
//       }
//     }
//   }

//   return req
// })
