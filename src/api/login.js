import request from './request'
export const login = (data) => {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}
