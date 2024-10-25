export function month_en(time: Date) {
    return [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ][time.getUTCMonth()]
}

export function month_en_full(time: Date) {
    return [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ][time.getUTCMonth()]
}

export function m_d_y_en(time: Date) {
    return `${month_en(time)} ${time.getUTCDate()}, ${time.getUTCFullYear()}`
}

export function d_m_y_en(time: Date) {
    return `${time.getUTCDate()} ${month_en(time)} ${time.getUTCFullYear()}`
}

export function week_en(time: Date) {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][time.getUTCDay()]
}

export function week_en_full(time: Date) {
    return [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ][time.getUTCDay()]
}

export function am_pm_en(time: Date) { return time.getUTCHours() < 12 ? 'AM' : 'PM' }