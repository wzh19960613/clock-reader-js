import { dynTemplate, type DynTemplate } from 'dyn-template'

export type { DynTemplate }
export type DateFormatter = (time: Date) => string | number

export * from './getters'
export * from './formatters'
export * from './timezone'
export * from './cn'
export * from './en'
export const clockReader = dynTemplate<DateFormatter>

export function compile(clockReader: DynTemplate<DateFormatter>, timeZone?: number) {
    const z = (timeZone === undefined ? -new Date().getTimezoneOffset() : timeZone * 60) * 60 * 1000
    const getDate = z
        ? function (t: Date | number) { return new Date((t instanceof Date ? t.valueOf() : t) + z) }
        : function (t: Date | number) { return t instanceof Date ? t : new Date(t) }
    const { first, fns, strs } = clockReader
    return function (time: Date | number) {
        const t = getDate(time)
        return fns.reduce((r, p, i) => r + p(t) + strs[i], first)
    }
}