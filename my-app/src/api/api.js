import * as axios from 'axios';

//basic preferences axios
const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   withCredentials: true,
   headers: {'API-KEY': '8b2693d0-3960-41c2-b1a0-c956832ad2e4'}
});

//API for users
export const usersAPI = {
   //get users and default settings pages
   getUsers(currentPage = 1, pageSize = 10) {
      return instance.get(`users?page=${currentPage}&count=${pageSize}`)
   },
   //unfollow user API
   unfollow(userID) {
      return instance.delete(`follow/${userID}`)
   },
   //follow user API
   follow(userID) {
      return instance.post(`follow/${userID}`, {})
   }
}

//API for profile
export const profileAPI = {
   //API for users profile pages
   getProfile(userID) {
      return instance.get(`profile/` + userID)
   },
   //API for users status
   getStatus(userID) {
      return instance.get('profile/status/' + userID)
   },
   //API for update logined user status
   updateStatus(status) {
      return instance.put('profile/status', {
         status: status
      })
   },
   savePhoto(photoFile) {
      const formData = new FormData();
      formData.append('image', photoFile);
      return instance.put('profile/photo', formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      })
   },
   saveProfile(profile) {
      return instance.put('profile', profile)
   }
}

//Authorization API
export const authAPI = {
   //User page
   me() {
      return instance.get(`auth/me`)
   },
   //Login API
   login(email, password, rememberMe = false, captcha = null) {
      return instance.post('auth/login', {email, password, rememberMe, captcha})
   },
   //Logout API
   logout() {
      return instance.delete('auth/login')
   }
}

export const securityAPI = {
   getCaptchaUrl() {
      return instance.get('security/get-captcha-url')
   }
}
