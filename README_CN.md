# clock-reader

[English](README.md) | 中文

轻量、简洁、无歧义、高性能，极其灵活的新一代时间格式化工具。

## 为什么需要 clock-reader

时间格式化是一个常见需求。目前常用的库有： [moment.js](https://momentjs.com/)、[dayjs](https://day.js.org/)、[date-fns](https://date-fns.org/)。

相比于这些库，clock-reader 仅使用 JavaScript 原生的 [Date对象](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) 和 [模板字符串](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals) 语法，具有以下优势：

- 体积小：压缩体积小于 3KB
- 简洁、无歧义：无需学习复杂的模板与逃逸语法，直接使用 JavaScript 的[模板字符串](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals)
- 快速：速度约为`moment.js` 的 4 倍，`date-fns` 的 10 倍。点击此处[测试](https://codepen.io/wzh19960613/pen/PoMOXLX)
- 灵活：函数化设计，可以轻松实现并使用自定义组件

## 安装

```bash
npm i clock-reader
```

## 使用方法

### 使用模板

```javascript
import {
    compile, clockReader,                   // 模板
    y_m_d, h_m_s, mss, iso8601_Shortest,    // 组件
    week_en_full, m_d_y_en,                 // 英语组件
    y_m_d_cn, h_m_s_cn, week_cn_full,       // 中文组件
} from 'clock-reader'

const iso = compile(clockReader`${y_m_d}T${h_m_s}.${mss}${iso8601_Shortest()}`)
const en = compile(clockReader`${week_en_full} ${m_d_y_en}, ${h_m_s}`, +0)
const cn = compile(clockReader`${y_m_d_cn} ${h_m_s_cn} ${week_cn_full}`, +8)

const now = Date.now()

console.log(iso(now))   // 2024-10-25T00:09:23.929+08
console.log(en(now))    // Thursday Oct 24, 2024, 16:09:23
console.log(cn(now))    // 二〇二四年十月二十五日 零时九分二十三秒 星期五
```

### 基础组件

```javascript
import {
    y_m_d, m_d, h_m_s, h_m,                                     // 返回固定字数的字符串
    yyyy, mo, dd, hh, mm, ss, mss, hh12, yy,                    // 返回固定字数的字符串
    year, month, date, hour, minute, sec, msec, hour12, week,   // 返回数字
    isAM,                                                       // 返回布尔值
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

### 英语组件

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

### 中文组件

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
console.log(month_cn_cc(o))                      // 与 month_cn 相同，但一月返回 '正'，十二月返回 '腊'
console.log(hour_cn(o), hour12_cn(o), minute_cn(o), sec_cn(o), msec_cn(o))  // 三 三 四 五 六
console.log(y_m_d_cn(o), h_m_s_cn(o))            // 一九七〇年一月二日 三时四分五秒
console.log(week_cn(o), am_pm_cn(o))             // 五 上午
```

### 自定义组件

可以将任何接受 Date 对象作为参数、且返回值可转换为字符串的函数作为组件传入模板中。  
自定义组件在处理 Date 对象时，应使用带 `UTC` 字样的方法而非本地时区方法，且无需担心时区问题。

```javascript
import { compile, clockReader, y_m_d_cn, month_cn } from 'clock-reader'

function weekday_weekend(date) {
    const day = date.getUTCDay()
    return day === 0 || day === 6 ? '周末' : '工作日'
}

function early_mid_late(date) {
    const d = date.getUTCDate()
    return d < 11 ? '上' : d < 21 ? '中' : '下'
}

const formatter =
    compile(clockReader`${y_m_d_cn}是${month_cn}月${early_mid_late}旬的一个${weekday_weekend}。`)
console.log(formatter(new Date(2024, 9, 19)))   // 二〇二四年十月十九日是十月中旬的一个周末。
console.log(formatter(new Date(0)))             // 一九七〇年一月一日是一月上旬的一个工作日。
```

### 时区

```javascript
import { 
    localZ, 
    parseZ,
    sz, szzzz, szz_zz, 
    iso8601_Shortest,
    zZeroOrNot, zIntOrNot
} from 'clock-reader'

console.log(localZ())                   // 类型为数字，值为按小时计算的本地时区
console.log(parseZ(-7.5))               // { sign: '-', zHour: 7, zMinute: 30 }
console.log(sz(0), sz(+8), sz(-7.5))    // +0 +8 -7.5 
console.log(szzzz(0), szzzz(+8), szzzz(-7.5))                                   // +0000 +0800 -0730
console.log(iso8601_Shortest(0), iso8601_Shortest(+8), iso8601_Shortest(-7.5))  // Z +08 -0730
const fn1 = zZeroOrNot('Z', szzzz)      // fn1(0) === 'Z', fn1(非零值) === szzzz(...)
const fn2 = zIntOrNot(szz, szz_zz)      // fn2(整数) === szz(...), fn2(非整数) === szz_zz(...)
// 所以 iso8601_Shortest 其实就是 zZeroOrNot('Z', zIntOrNot(szz, szzzz))
```

### 请注意

1. 当使用动态模板时，时区将始终为编译模板时给定的时区。如果编译模板时未给定时区参数，则默认使用本地时区。

```javascript
import { compile, clockReader, hh } from 'clock-reader'

const h12 = 12 * 60 * 60 * 1000
console.log(compile(clockReader`${hh}`, 0)(h12))    // 12
console.log(compile(clockReader`${hh}`, +8)(h12))   // 20
console.log(compile(clockReader`${hh}`)(h12))       // 本地时区 + 12
```

2. 当单独使用组件时，组件始终忽略时区。无论本地时区和 Date 对象本身的时区如何，组件始终按照 UTC+0 时间来处理。因此，如果需要按照特定时区或本地时区来处理时间，请使用动态模板。

```javascript
import { compile, clockReader, hh } from '.'

const t = new Date('1970-01-01T12:00:00+0800')  // 04:00:00Z
console.log(hh(t))                              // 04
console.log(compile(clockReader`${hh}`, +8)(t)) // 12
console.log(compile(clockReader`${hh}`)(t))     // 本地时区 + 4
```

3. 动态模板不考虑 Date 对象本身的时区，因此，如果模板中包含时区相关内容，应调用函数而非直接传入函数。

```javascript
import { compile, clockReader, szzzz } from 'clock-reader'

const tz = +8
console.log(compile(clockReader`给定时区：${szzzz(tz)}，本地时区：${szzzz()}`, tz)(0))
```
