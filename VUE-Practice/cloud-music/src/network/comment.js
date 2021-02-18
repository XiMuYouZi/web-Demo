export function getPlaylistComment(playlistId, pageSize = 20, offset = 0) {
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


// 0: 歌曲， 1: mv，2: 歌单，3: 专辑，4: 电台，5: 视频
export function getHotComment(id, pageSize = 20, offset = 0) {
  return request({
      url: "comment/hot",
      params: {
          id,
          pageSize,
          offset
      },
      method: "get"
  });
}

export function getMvComment(mvId, pageSize = 20, offset = 0) {
  return request({
      url: "comment/mv",
      params: {
          id: mvId,
          pageSize,
          offset
      },
      method: "get"
  });
}

export function getSongComment(songId, pageSize = 20, offset = 0) {
  return request({
      url: "comment/music",
      params: {
          id: songId,
          pageSize,
          offset
      },
      method: "get"
  });
}