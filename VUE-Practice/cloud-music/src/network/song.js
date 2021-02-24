import { request } from "./request";

// 相似音乐
export function getSimiSongs(id) {
    return request({
        url: `/simi/song?id=${id}`
    });
}

// 歌词
export function getLyric(id) {
    return request({
        url: `/lyric?id=${id}`
    });
}
