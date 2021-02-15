
//传入毫秒
export function calcDurationStr(duration){
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

