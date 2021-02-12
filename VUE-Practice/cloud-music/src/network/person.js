import { request } from './request'

export  function getPersonalized(){
    return request({
        url:'/personalized?limit=24'
    })
}