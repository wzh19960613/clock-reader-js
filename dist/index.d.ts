import { DynTemplate } from 'dyn-template'

export declare function msec(time: Date): number
export declare function sec(time: Date): number
export declare function minute(time: Date): number
export declare function hour(time: Date): number
export declare function hour12(time: Date): number
export declare function isAM(time: Date): boolean
export declare function date(time: Date): number
export declare function month(time: Date): number
export declare function year(time: Date): number
export declare function week(time: Date): number
export declare function mss(time: Date): string
export declare function ss(time: Date): string
export declare function mm(time: Date): string
export declare function hh(time: Date): string
export declare function hh12(time: Date): string
export declare function dd(time: Date): string
export declare function mo(time: Date): string
export declare function yyyy(time: Date): string
export declare function yy(time: Date): string
export declare function y_m_d(time: Date): string
export declare function m_d(time: Date): string
export declare function h_m_s(time: Date): string
export declare function h_m(time: Date): string
export declare function localZ(): number
export declare function parseZ(inHour?: number): {
	sign: string
	zHour: number
	zMinute: number
}
export declare function sz(zone?: number): string
export declare function szz(zone?: number): string
export declare function szzzz(zone?: number): string
export declare function szz_zz(zone?: number): string
export declare function zZeroOrNot(whenIsZero: string, whenNot: (z?: number) => string): (z?: number) => string
export declare function zIntOrNot(whenIsInt: (z?: number) => string, whenNot: (z?: number) => string): (z?: number) => string
export declare const iso8601_Shortest: (z?: number) => string
export declare function year_cn(time: Date): string
export declare function month_cn(time: Date): string
export declare function month_cn_cc(time: Date): string
export declare function date_cn(time: Date): string
export declare function hour_cn(time: Date): string
export declare function hour12_cn(time: Date): string
export declare function minute_cn(time: Date): string
export declare function sec_cn(time: Date): string
export declare function msec_cn(time: Date): string
export declare function y_m_d_cn(time: Date): string
export declare function h_m_s_cn(time: Date): string
export declare function week_cn(time: Date): string
export declare function am_pm_cn(time: Date): "\u4E0A\u5348" | "\u4E0B\u5348"
export declare function month_en(time: Date): string
export declare function month_en_full(time: Date): string
export declare function m_d_y_en(time: Date): string
export declare function d_m_y_en(time: Date): string
export declare function week_en(time: Date): string
export declare function week_en_full(time: Date): string
export declare function am_pm_en(time: Date): "AM" | "PM"
export type DateFormatter = (time: Date) => string | number
export declare const clockReader: (strs: TemplateStringsArray, ...exps: any[]) => DynTemplate<DateFormatter>
export declare function compile(template: DynTemplate<DateFormatter>, timeZone?: number): (time: Date | number) => string

export {
	DynTemplate,
}

export { }
