export function localZ() { return -new Date().getTimezoneOffset() / 60 }

export function parseZ(inHour?: number) {
    const h = inHour ?? localZ()
    const sign = h < 0 ? '-' : '+'
    const z = Math.abs(h)
    return Number.isInteger(h) ? { sign, zHour: z, zMinute: 0 }
        : { sign, zHour: Math.floor(z), zMinute: Math.round(z % 1 * 60) }
}

export function sz(zone?: number) {
    const { sign, zHour } = parseZ(zone)
    return sign + zHour.toString()
}

export function szz(zone?: number) {
    const { sign, zHour } = parseZ(zone)
    return sign + zHour.toString().padStart(2, '0')
}

export function szzzz(zone?: number) {
    const { sign, zHour, zMinute } = parseZ(zone)
    return sign + zHour.toString().padStart(2, '0') + zMinute.toString().padStart(2, '0')
}

export function szz_zz(zone?: number) {
    const { sign, zHour, zMinute } = parseZ(zone)
    return sign + zHour.toString().padStart(2, '0') + ':' + zMinute.toString().padStart(2, '0')
}

export function zZeroOrNot(whenIsZero: string, whenNot: (z?: number) => string) {
    return function (z?: number) { return (z ??= localZ()) === 0 ? whenIsZero : whenNot(z) }
}

export function zIntOrNot(whenIsInt: (z?: number) => string, whenNot: (z?: number) => string) {
    return function (z?: number) {
        return Number.isInteger(z ??= localZ()) ? whenIsInt(z) : whenNot(z)
    }
}

export const iso8601_Shortest = zZeroOrNot('Z', zIntOrNot(szz, szzzz))