#!/usr/bin/env node

import dayjs from "dayjs";
import "dayjs/locale/ja.js";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import minimist from "minimist";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

function main() {
  const { m, y } = get_month_year();
  console.log(`      ${m}月 ${y}`);

  const week_header = ["日", "月", "火", "水", "木", "金", "土"];
  console.log(week_header.join(" "));

  print_date(m, y);
}

function get_month_year() {
  const argv = minimist(process.argv.slice(2));
  let m = Number(argv.m || dayjs().format("M"));
  let y = Number(argv.y || dayjs().format("YYYY"));

  return { m, y };
}

function print_date(m, y) {
  const specified_date = dayjs()
    .year(y)
    .month(m - 1);

  const first_day_of_week = Number(specified_date.startOf("month").format("d"));
  const last_day = Number(specified_date.endOf("month").format("D"));

  let calender = "";
  let first_day = "1";

  calender += "   ".repeat(first_day_of_week);

  for (let i = first_day; i <= last_day; i++) {
    calender += first_day.toString().padStart(2) + " ";
    if ((first_day_of_week + i - 1) % 7 === 6) {
      calender += "\n";
    }
    first_day++;
  }

  console.log(calender);
}

main();
