import { throttle } from "lodash-es";
import { Notification } from "element-ui";
export { debounce } from "lodash-es";
export const remBase = 14;
import { getAlbum } from "network/album";
import { getMvDetail } from "network/mv";
import router from "../router/router";

let htmlFontSize;
!(function() {
    const calc = function() {
        const maxFontSize = 18;
        const minFontSize = 14;
        const html = document.getElementsByTagName("html")[0];
        const width = html.clientWidth;
        let size = remBase * (width / 1440);
        size = Math.min(maxFontSize, size);
        size = Math.max(minFontSize, size);
        html.style.fontSize = size + "px";
        htmlFontSize = size;
    };
    calc();
    window.addEventListener("resize", throttle(calc, 500));
})();

//传入毫秒
export function fromatDurationStr(duration) {
    let time = parseInt(duration / 1000);
    let minute = parseInt(time / 60);
    let second = parseInt(time % 60);
    let minuteStr = `${minute}`;
    let secondStr = `${second}`;
    if (minute < 10) {
        minuteStr = `0${minute}`;
    }
    if (second < 10) {
        secondStr = `0${secondStr}`;
    }
    return `${minuteStr}:${secondStr}`;
}

export function isDefined(v) {
    return v !== undefined && v !== null;
}

export function formatNumber(number) {
    number = Number(number) || 0;
    return number > 100000 ? `${Math.round(number / 10000)}万` : number;
}

export function isLast(index, arr) {
    return index === arr.length - 1;
}

export function getPageOffset(page, limit) {
    return (page - 1) * limit;
}

export function scrollInto(dom) {
    dom.scrollIntoView({ behavior: "smooth" });
}

// 根据基准字号计算
// 用于静态样式
export function toRem(px) {
    return `${px / remBase}rem`;
}

// 根据当前的html根字体大小计算
// 用于某些js的动态计算
export function toCurrentRem(px) {
    return `${px / htmlFontSize}rem`;
}

//检测浏览器类型
let elementStyle = document.createElement("div").style;
let vendor = (() => {
    let transformNames = {
        // safari浏览器
        webkit: "webkitTransform",
        // Firefox浏览器
        Moz: "MozTransform",
        // Opera浏览器
        O: "OTransform",
        // IE
        ms: "msTransform",
        standard: "transform"
    };
    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key;
        }
    }
    return false;
})();

export function prefixStyle(style) {
    if (vendor === false) {
        return false;
    }

    if (vendor === "standard") {
        return style;
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

export function shallowEqual(a, b, compareKey) {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        let compareA = a[i];
        let compareB = b[i];
        if (compareKey) {
            compareA = compareA[compareKey];
            compareB = compareB[compareKey];
        }
        if (!Object.is(compareA, compareB)) {
            return false;
        }
    }
    return true;
}

export function formatDate(date, fmt = "yyyy-MM-dd hh:mm:ss") {
    date = date instanceof Date ? date : new Date(date);
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }
    let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + "";
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? str : padLeftZero(str)
            );
        }
    }
    return fmt;
}
function padLeftZero(str) {
    return ("00" + str).substr(str.length);
}

export function notify(message, type) {
    const params = {
        message,
        duration: 1500
    };
    const fn = type ? Notification[type] : Notification;
    return fn(params);
}
["success", "warning", "info", "error"].forEach(key => {
    notify[key] = message => {
        return notify(message, key);
    };
});

export function pad(num, n = 2) {
    let len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

export default class Song {
    constructor({
        id,
        singer,
        name,
        album,
        duration,
        image,
        url,
        playCount,
        score
    }) {
        this.id = id;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
        this.playCount = playCount;
        this.score = score;
    }
}

export function createSong(song) {
    const {
        id,
        name,
        img,
        artists,
        duration,
        albumId,
        albumName,
        mvId,
        ...rest
    } = song;

    return {
        id,
        name,
        img,
        artists,
        duration,
        albumName,
        url: genSongPlayUrl(song.id),
        artistsText: getArtistsText(artists),
        durationSecond: duration,
        // 专辑 如果需要额外请求封面的话必须加上
        albumId,
        // mv的id 如果有的话会在songTable组件中加上mv链接
        mvId,
        ...rest
    };
}

function genSongPlayUrl(id) {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

export function getArtistsText(artists) {
    return (artists || []).map(({ name }) => name).join("/");
}

export async function getSongImg(id, albumId) {
    if (!isDefined(albumId)) {
        throw new Error("need albumId");
    }
    const { songs } = await getAlbum(albumId);
    const {
        al: { picUrl }
    } = songs.find(({ id: songId }) => songId === id) || {};
    return picUrl;
}

export async function goMvWithCheck(id) {
    try {
        await getMvDetail(id);
        goMv(id);
    } catch (error) {
        notify("mv获取失败");
    }
}

export function goMv(id) {
    router.push(`/mv/${id}`);
}


export function hasParent(dom, parentDom) {
    parentDom = Array.isArray(parentDom) ? parentDom : [parentDom]
    while(dom) {
      if (parentDom.find(p => p === dom)) {
        return true
      } else {
        dom = dom.parentNode
      }
    }
  }