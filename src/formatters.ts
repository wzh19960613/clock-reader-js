export function mss(time: Date) { return time.getUTCMilliseconds().toString().padStart(3, '0') }

export function ss(time: Date) { return time.getUTCSeconds().toString().padStart(2, '0') }

export function mm(time: Date) { return time.getUTCMinutes().toString().padStart(2, '0') }

export function hh(time: Date) { return time.getUTCHours().toString().padStart(2, '0') }

export function hh12(time: Date) { return (time.getUTCHours() % 12).toString().padStart(2, '0') }

export function dd(time: Date) { return time.getUTCDate().toString().padStart(2, '0') }

export function mo(time: Date) { return (time.getUTCMonth() + 1).toString().padStart(2, '0') }

export function yyyy(time: Date) { return time.getUTCFullYear().toString() }

export function yy(time: Date) { return (time.getUTCFullYear() % 100).toString() }

export function y_m_d(time: Date) { return `${yyyy(time)}-${mo(time)}-${dd(time)}` }

export function m_d(time: Date) { return `${mo(time)}-${dd(time)}` }

export function h_m_s(time: Date) { return `${hh(time)}:${mm(time)}:${ss(time)}` }

export function h_m(time: Date) { return `${hh(time)}:${mm(time)}` }
