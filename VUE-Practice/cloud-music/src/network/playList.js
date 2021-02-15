import { request } from "./request";

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

export function playlistDetail(ids = []) {
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