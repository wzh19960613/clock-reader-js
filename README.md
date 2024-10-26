# clock-reader

English | [中文](README_CN.md)

A lightweight, concise, unambiguous, high-performance, and extremely flexible next-generation time formatting tool.

## Why clock-reader

Time formatting is a common requirement. Currently popular libraries include: [moment.js](https://momentjs.com/), [dayjs](https://day.js.org/), [date-fns](https://date-fns.org/).

Compared to these libraries, clock-reader uses JavaScript's native [Date object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) and [template literal](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals) syntax, with the following advantages:

- Small size: compressed size less than 3KB
- Concise and unambiguous: no need to learn complex template and escape syntax, directly use JavaScript's [template literals](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals)
- Fast: about 4 times faster than `moment.js` and 10 times faster than `date-fns`. Test it [here](https://codepen.io/wzh19960613/pen/PoMOXLX)
- Flexible: functional design, easy to implement and use custom components

## Installation

```bash
npm i clock-reader
```

## Usage

### Using templates

```javascript
import {
    compile, clockReader,                   // Template
    y_m_d, h_m_s, mss, iso8601_Shortest,    // Components
    week_en_full, m_d_y_en,                 // English components
    y_m_d_cn, h_m_s_cn, week_cn_full,       // Chinese components
} from 'clock-reader'

const iso = compile(clockReader`${y_m_d}T${h_m_s}.${mss}${iso8601_Shortest()}`)
const en = compile(clockReader`${week_en_full} ${m_d_y_en}, ${h_m_s}`, +0)
const cn = compile(clockReader`${y_m_d_cn} ${h_m_s_cn} ${week_cn_full}`, +8)

const now = Date.now()

console.log(iso(now))   // 2024-10-25T00:09:23.929+08
console.log(en(now))    // Thursday Oct 24, 2024, 16:09:23
console.log(cn(now))    // 二〇二四年十月二十五日 零时九分二十三秒 星期五
```

### Basic Components

```javascript
import {
    y_m_d, m_d, h_m_s, h_m,                                     // Return fixed-length string
    yyyy, mo, dd, hh, mm, ss, mss, hh12, yy,                    // Return fixed-length string
    year, month, date, hour, minute, sec, msec, hour12, week,   // Return number
    isAM,                                                       // Return boolean
} from 'clock-reader'

const o = new Date('1970-01-02T03:04:05.006Z')

// 1970-01-02 01-02 03:04:05 03:04
console.log(y_m_d(o), m_d(o), h_m_s(o), h_m(o))

// 1970 01 02 03 04 05 006 03 70
console.log(yyyy(o), mo(o), dd(o), hh(o), mm(o), ss(o), mss(o), hh12(o), yy(o))

// 1970 1 2 3 4 5 6 3 5
console.log(year(o), month(o), date(o), hour(o), minute(o), sec(o), msec(o), hour12(o), week(o))

// true
console.log(isAM(o))
```

### English Components

```javascript
import {
    month_en, month_en_full,
    m_d_y_en,
    d_m_y_en,
    week_en, week_en_full, am_pm_en
} from 'clock-reader'

const o = new Date('1970-01-02T03:04:05.006Z')

console.log(month_en(o), month_en_full(o))              // Jan January
console.log(m_d_y_en(o))                                // Jan 2, 1970
console.log(d_m_y_en(o))                                // 2 Jan 1970
console.log(week_en(o), week_en_full(o), am_pm_en(o))   // Fri Friday AM
```

### Chinese Components

```javascript
import {
    year_cn, month_cn, date_cn,
    month_cn_cc, 
    hour_cn, hour12_cn, minute_cn, sec_cn, msec_cn,
    y_m_d_cn, h_m_s_cn,
    week_cn, am_pm_cn,
} from 'clock-reader'

const o = new Date('1970-01-02T03:04:05.006Z')

console.log(year_cn(o), month_cn(o), date_cn(o)) // 一九七〇 一 二
console.log(month_cn_cc(o))  // Same as `month_cn`, but Jan will be '正' and Dec will be '腊'
console.log(hour_cn(o), hour12_cn(o), minute_cn(o), sec_cn(o), msec_cn(o))  // 三 三 四 五 六
console.log(y_m_d_cn(o), h_m_s_cn(o))            // 一九七〇年一月二日 三时四分五秒
console.log(week_cn(o), am_pm_cn(o))             // 五 上午
```

### Custom Components

Any function that takes a Date object as a parameter and returns a value convertible to string can be passed as a component into the template. Custom components should use methods with 'UTC' when processing Date objects, rather than methods related to the local timezone and no need to worry about the timezone.

```javascript
import { compile, clockReader, y_m_d, month_en_full } from 'clock-reader'

function weekday_weekend(date) {
    const day = date.getUTCDay()
    return day === 0 || day === 6 ? 'weekend' : 'weekday'
}

function early_mid_late(date) {
    const d = date.getUTCDate()
    return d < 11 ? 'early ' : d < 21 ? 'mid-' : 'late '
}

const formatter =
    compile(clockReader`${y_m_d} is a ${weekday_weekend} in ${early_mid_late}${month_en_full}.`)
console.log(formatter(new Date(2024, 9, 19)))   // 2024-10-19 is a weekend in mid-October.
console.log(formatter(new Date(0)))             // 1970-01-01 is a weekday in early January.
```

### Timezone

```javascript
import { 
    localZ, 
    parseZ,
    sz, szzzz, szz_zz, 
    iso8601_Shortest,
    zZeroOrNot, zIntOrNot
} from 'clock-reader'

console.log(localZ())                   // A number is equal to the local timezone in hours
console.log(parseZ(-7.5))               // { sign: '-', zHour: 7, zMinute: 30 }
console.log(sz(0), sz(+8), sz(-7.5))    // +0 +8 -7.5 
console.log(szzzz(0), szzzz(+8), szzzz(-7.5))                                   // +0000 +0800 -0730
console.log(iso8601_Shortest(0), iso8601_Shortest(+8), iso8601_Shortest(-7.5))  // Z +08 -0730
const fn1 = zZeroOrNot('Z', szzzz)      // fn1(0) === 'Z', fn1(else) === szzzz(...)
const fn2 = zIntOrNot(szz, szz_zz)      // fn2(integer) === szz(...), fn2(else) === szz_zz(...)
// So iso8601_Shortest is actually zZeroOrNot('Z', zIntOrNot(szz, szzzz))
```

### Attention

1. When using dynamic templates, the timezone will always be the one given when compiling the template. If no timezone parameter is given when compiling the template, the local timezone is used by default.

```javascript
import { compile, clockReader, hh } from 'clock-reader'

const h12 = 12 * 60 * 60 * 1000
console.log(compile(clockReader`${hh}`, 0)(h12))    // 12
console.log(compile(clockReader`${hh}`, +8)(h12))   // 20
console.log(compile(clockReader`${hh}`)(h12))       // Local timezone + 12
```

2. When using components individually, components always ignore timezones. Regardless of the local timezone or the timezone of the Date object itself, components always process time according to UTC+0. Therefore, use dynamic templates when need to process time according to a specific timezone or local timezone.

```javascript
import { compile, clockReader, hh } from '.'

const t = new Date('1970-01-01T12:00:00+0800')  // 04:00:00Z
console.log(hh(t))                              // 04
console.log(compile(clockReader`${hh}`, +8)(t)) // 12
console.log(compile(clockReader`${hh}`)(t))     // Local timezone + 4
```

3. Dynamic templates do not consider the timezone of the Date object itself. If timezone-related content is included in the template, the function should be called rather than directly passing the function.

```javascript
import { compile, clockReader, szzzz } from 'clock-reader'

const tz = +8
console.log(compile(clockReader`Given timezone: ${szzzz(tz)}, Local timezone: ${szzzz()}`, tz)(0))
```
