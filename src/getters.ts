export function msec(time: Date) { return time.getUTCMilliseconds() }

export function sec(time: Date) { return time.getUTCSeconds() }

export function minute(time: Date) { return time.getUTCMinutes() }

export function hour(time: Date) { return time.getUTCHours() }

export function hour12(time: Date) { return time.getUTCHours() % 12 }

export function isAM(time: Date) { return time.getUTCHours() < 12 }

export function date(time: Date) { return time.getUTCDate() }

export function month(time: Date) { return time.getUTCMonth() + 1 }

export function year(time: Date) { return time.getUTCFullYear() }

export function week(time: Date) { return time.getUTCDay() }