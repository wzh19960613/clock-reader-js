import { newCnNumConvertor, newCnSerialNumConvertor } from 'cn-number'

const cns = newCnSerialNumConvertor()
const cn = newCnNumConvertor({ absLessThan: 1000 })

export function year_cn(time: Date) { return cns(time.getUTCFullYear()) }

export function month_cn(time: Date) { return cn(time.getUTCMonth() + 1) }

export function month_cn_cc(time: Date) {
    return [
        '正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '腊'
    ][time.getUTCMonth()]
}

export function date_cn(time: Date) { return cn(time.getUTCDate()) }

export function hour_cn(time: Date) { return cn(time.getUTCHours()) }

export function hour12_cn(time: Date) { return cn(time.getUTCHours() % 12) }

export function minute_cn(time: Date) { return cn(time.getUTCMinutes()) }

export function sec_cn(time: Date) { return cn(time.getUTCSeconds()) }

export function msec_cn(time: Date) { return cn(time.getUTCMilliseconds()) }

export function y_m_d_cn(time: Date) {
    return `${year_cn(time)}年${month_cn(time)}月${date_cn(time)}日`
}

export function h_m_s_cn(time: Date) {
    return `${hour_cn(time)}时${minute_cn(time)}分${sec_cn(time)}秒`
}

export function week_cn(time: Date) {
    return ['日', '一', '二', '三', '四', '五', '六'][time.getUTCDay()]
}

export function am_pm_cn(time: Date) { return time.getUTCHours() < 12 ? '上午' : '下午' }