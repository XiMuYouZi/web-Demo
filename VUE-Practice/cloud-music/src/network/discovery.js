import { request } from './request'

export  function recommendPlaylist(){
    return request({
        url:'/personalized?limit=21'
    })
}

export  function banner(){
    return request({
        url:'/banner?type=0'
    })
}

export  function latestMusic(){
    return request({
        url:'/personalized/newsong'
    })
}

export  function recommMV(){
    return request({
        url:'/personalized/mv'
    })
}