import {
  APIResponceType,
  getItemsType,
  instance
} from './api'

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get<getItemsType>(`users?page=${currentPage}&count=${pageSize}`)
      .then(res => res.data)
  },
  unfollow(userID: number) {
    return instance.delete(`follow/${userID}`).then(res => res.data) as Promise<APIResponceType>
  },
  follow(userID: number) {
    return instance.post<APIResponceType>(`follow/${userID}`, {}).then(res => res.data)
  }
}
