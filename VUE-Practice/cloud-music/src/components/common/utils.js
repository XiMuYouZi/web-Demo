export const remBase = 14


//传入毫秒
export function fromatDurationStr(duration){
    let time = parseInt(duration/1000)
    console.log();
    let minute = parseInt(time/60) 
    let second = parseInt(time%60) 
    let minuteStr = `${minute}`
    let secondStr = `${second}`
    if(minute < 10){
        minuteStr = `0${minute}`
    }
    if(second < 10){
        secondStr = `0${minute}`
    }
    return `${minuteStr}:${secondStr}`

}

export function isDefined (v) {
  return v !== undefined && v !== null
}

export function formatNumber (number) {
  number = Number(number) || 0
  return number > 100000 ? `${Math.round(number / 10000)}万` : number
}

export function isLast(index, arr) {
  return index === arr.length - 1
}

export function getPageOffset (page, limit) {
  return (page - 1) * limit
}

export function scrollInto(dom) {
  dom.scrollIntoView({ behavior: "smooth" })
}

// 根据基准字号计算
// 用于静态样式
export function toRem(px) {
  return `${px / remBase}rem`
}


export function formatDate (date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    date = date instanceof Date ? date : new Date(date)
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : padLeftZero(str)
        )
      }
    }
    return fmt
  }
  function padLeftZero (str) {
    return ('00' + str).substr(str.length)
  }
