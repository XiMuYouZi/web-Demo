import { request } from './request'

// 获取歌手单曲
export function getArtists (id){
    return request({
        url:`/artists?id=${id}`
    })
} 