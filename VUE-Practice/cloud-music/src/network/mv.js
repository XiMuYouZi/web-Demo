import { request } from './request'

export  function allMV(area,order,type,offset,limit=40){
    return request({
        url:'/mv/all',
        params: {
            area,
            order,
            type,
            offset,
            limit
        },
        method:"get"
    })
}


export function getMvDetail(id){
    return request({
        url:`/mv/detail?mvid=${id}`
    })
}  

export function getMvUrl(id){
    return request({
        url:`/mv/url?id=${id}`
    })
} 



export function getSimiMv(id){
    return request({
        url:`/simi/mv?mvid=${id}`
    })
} 






