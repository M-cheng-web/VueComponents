import http from '../utils/http'

export const getLever = params => http.get('/getLever', params)
