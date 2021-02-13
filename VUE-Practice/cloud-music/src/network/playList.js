import { request } from './request'


export  function myPlaylist(uid,limit=1000){
    console.log('myPlaylist',uid);
    return request({
        url:"/user/playlist",
        params: {
           uid,
           limit
        },
        method:"get"
    })
}

export  function playlistDetail(ids=[]){
    return request({
        url:"/song/detail",
        params: {
           ids
        },
        method:"get"
    })
}

export  function comment(playlistID,pageSize=20, offSet=0){
    return request({
        url:"comment/playlist",
        params: {
            "id":playlistID,
            pageSize,
            offset
        },
        method:"get"
    })
}


