import { request } from "./request";

//我的歌单名称列表，包括自己创建的歌单和收藏的歌单
export function myPlaylist(uid, limit = 1000) {
    return request({
        url: "/user/playlist",
        params: {
            uid,
            limit
        },
        method: "get"
    });
}

//歌单的详情信息，包括描述和所有的歌曲id
export function playlistDetail(id) {
    return request({
        url: "/playlist/detail",
        params: {
            id
        },
        method: "get"
    });
}

//歌曲的详情信息
export function songlistDetail(ids = []) {
    return request({
        url: "/song/detail",
        params: {
            ids
        },
        method: "get"
    });
}

export function comment(playlistID, pageSize = 20, offset = 0) {
    return request({
        url: "comment/playlist",
        params: {
            id: playlistID,
            pageSize,
            offset
        },
        method: "get"
    });
}

//精品歌单列表
export function highqualityPlaylist(cat = "全部", limit = 1) {
    return request({
        url: "/top/playlist/highquality",
        params: {
            cat,
            limit
        },
        method: "get"
    });
}

export function latestMusic(type = 0) {
    return request({
        url: "/top/song",
        params: {
            type
        },
        method: "get"
    });
}

//分类歌单列表
export function categoryPlaylist(cat = "全部", offset=0,limit = 42) {
    return request({
        url: "/top/playlist",
        params: {
            cat,
            limit,
            offset
        },
        method: "get"
    });
}

