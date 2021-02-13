import { request } from './request'

export  function userProfile(uid){
    return request({
        url:'/user/detail',
        params: {
           uid
        },
        method:"get"
    })
}



