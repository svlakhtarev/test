import * as axios from "axios";

//basic preferences axios
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {"API-KEY": "8b2693d0-3960-41c2-b1a0-c956832ad2e4"}
});

//API for users
export const usersAPI = {
    //get users and default settings pages
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            });
    },

    //unfollow user API
    unfollow(userID) {
        return instance.delete(`follow/${userID}`)
    },

    //follow user API
    follow(userID) {
        return instance.post(`follow/${userID}`, {})
    },

    //get our profile, redirected to profileAPI
    getProfile(userID) {
        return profileAPI.getProfile(userID)
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
}

//Authorization API
export const authAPI = {
    //User page
    me() {
        return instance.get(`auth/me`)
    },
    //Login API
    login(email, password, rememberMe = false) {
        return instance.post('auth/login', {email, password, rememberMe})
    },
    //Logout API
    logout() {
        return instance.delete('auth/login')
    }
}