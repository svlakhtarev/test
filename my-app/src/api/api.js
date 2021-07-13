import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {"API-KEY": "8b2693d0-3960-41c2-b1a0-c956832ad2e4"}
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            });
    },

    unfollow(userID) {
        return instance.delete(`follow/${userID}`)
    },

    follow(userID) {
        return instance.post(`follow/${userID}`, {})
    },

    getProfile(userID) {
        return profileAPI.getProfile(userID)
    }
}

export const profileAPI = {
    getProfile(userID) {
        return instance.get(`profile/` + userID)
    },
    getStatus(userID) {
        return instance.get('profile/status/' + userID)
    },
    updateStatus(status) {
        return instance.put('profile/status', {
            status: status
        })
    },
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instance.post('auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete('auth/login')
    }
}