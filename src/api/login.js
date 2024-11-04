import request from './request'
export const login = (data) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
