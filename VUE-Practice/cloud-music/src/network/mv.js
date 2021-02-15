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



