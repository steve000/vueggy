/*
* @Author: Just be free
* @Date:   2020-10-19 16:31:57
* @Last Modified by:   Just be free
* @Last Modified time: 2020-10-20 17:41:57
* @E-mail: justbefree@126.com
*/
const now = new Date();
export type VDate = string|number|VgDate;
export type VDateString = string|number;
class VgDate {
  private year: VDate = now.getFullYear();
  private month: VDateString = now.getMonth() + 1;
  private date: VDateString = now.getDate();
  private JSDate = new Date();
  constructor(year?: VDate, month?: VDateString, date?: VDateString) {
    this.init(year, month, date);
  }
  init(year?: VDate, month?: VDateString, date?: VDateString) {
    if (year instanceof VgDate) {
      return year;
    } else if (this.isDateFormat(year as string)) {
      this.init(...(year as string).split("-"));
    } else {
      if (year && month && date) {
        this.JSDate = new Date(Date.parse(`${year}/${month}/${date}`));
        this.year = year;
        this.setMonth(month);
        this.setDate(date);
        return this;
      } else {
        this.JSDate = new Date(Date.parse(`${this.year}/${this.month}/${this.date}`));
        return this;
      }
    }
  }
  setMonth(month: VDateString): void {
    this.month = parseInt(month as string) < 10 ? `0${month}` : month;
  }
  setDate(date: VDateString): void {
    this.date = parseInt(date as string) < 10 ? `0${date}` : date;
  }
  isDateFormat(arg: string): boolean {
    return /^(\d{4})(-)(\d{2})(-)(\d{2})$/.test(String(arg));
  }
  add(count: number = 1, unit: string = "days"): VgDate {
    if (["days", "day", "d"].indexOf(unit) > -1) {
      this.JSDate.setDate(this.JSDate.getDate() + count);
    } else if (["months", "month", "m"].indexOf(unit) > -1) {
      // 解决思路：在某一个日期加一个月或N个月的时候需要判断当前日期是当月的第X天，
      // 需要确保在加了一个月或N个月的那月也有同样的X天，如果没有，则取那月的最后一天
      const otherMonthDaysCount = VgDateInstance(this.year, this.JSDate.getMonth() + 1 + count, "01").getDaysCountOfMonth();
      const currentDay = this.JSDate.getDate();
      if (currentDay > otherMonthDaysCount) {
        this.JSDate.setDate(otherMonthDaysCount);
        this.JSDate.setMonth(this.JSDate.getMonth() + count);
      } else {
        this.JSDate.setMonth(this.JSDate.getMonth() + count);
      }
    } else if (["years", "year", "y"].indexOf(unit) > -1) {
      this.JSDate.setFullYear(this.JSDate.getFullYear() + count);
    }
    this.year = this.JSDate.getFullYear();
    this.setMonth(this.JSDate.getMonth() + 1);
    this.setDate(this.JSDate.getDate());
    return this;
  }
  substract(count: number = 1, unit: string = "days"): VgDate {
    return this.add(-1 * count, unit);
  }
  getMonthPeriod(begin: VgDate, end: VgDate): Array<string> {
    const period = [begin.format()];
    if (begin instanceof VgDate && end instanceof VgDate) {
      while (begin.isBefore(end)) {
        begin.add(1, "month");
        period.push(begin.format());
      }
    }
    return period;
  }
  getToday() {
    // 获取指定时间（默认当天）
    return this.JSDate;
  }
  format() {
    return `${this.year}-${this.month}-${this.date}`;
  }
  getDay() {
    // 获取具体每一天是周几
    return new Date(
      Date.parse(`${this.year}/${this.month}/${this.date}`)
    ).getDay();
  }
  getTime() {
    // 获取指定时间毫秒数
    return new Date(
      Date.parse(`${this.year}/${this.month}/${this.date}`)
    ).getTime();
  }
  getDaysCountOfMonth() {
    // 获取指定年月总归有多少天
    return new Date(parseInt(this.year as string), parseInt(this.month as string, 10), 0).getDate();
  }
  diff(year: VDate, month?: VDateString, date?: VDateString): number {
    if (year instanceof VgDate) {
      return (year.getTime() - this.getTime()) / 1000 / 60 / 60 / 24;
    } else if (this.isDateFormat(year as string)) {
      const [y, m, d] = (year as string).split("-");
      return this.diff(y as string, m as string, d as string);
    } else {
      return (
        (VgDateInstance(year, month, date).getTime() - this.getTime()) /
        1000 /
        60 /
        60 /
        24
      );
    }
  }
  isBefore(year: VDate, month?: VDateString, date?: VDateString): boolean {
    // 是不是早于某个（默认当天）时间
    return this.diff(year, month, date) > 0;
  }
  isAfter(year: VDate, month?: VDateString, date?: VDateString): boolean {
    // 是不是晚于某个（默认当天）时间
    return this.diff(year, month, date) < 0;
  }
  isSame(year: VDate, month?: VDateString, date?: VDateString): boolean {
    // 是不是和某个时间相同（默认当天）
    return this.diff(year, month, date) === 0;
  }
  isBetweenIncludeLeft(start: VDate, end: VDate): boolean {
    return this.isBetween(start, end) || this.isSame(start);
  }
  isBetweenIncludeRight(start: VDate, end: VDate): boolean {
    return this.isBetween(start, end) || this.isSame(end);
  }
  isBetweenIncludeBoth(start: VDate, end: VDate): boolean {
    return this.isBetween(start, end) || this.isSame(start) || this.isSame(end);
  }
  isBetween(start: VDate, end: VDate): boolean {
    return this.isAfter(start) && this.isBefore(end);
  }
}
const VgDateInstance = (year?: VDate, month?: VDateString, date?: VDateString): VgDate => {
  return new VgDate(year, month, date);
}
export { VgDate };
export default VgDateInstance;
