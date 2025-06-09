#!/usr/bin/env node

import dayjs from "dayjs";
import "dayjs/locale/ja.js";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import minimist from "minimist";

// UTCプラグインを読み込み
dayjs.extend(utc);
// timezoneプラグインを読み込み
dayjs.extend(timezone);
// 日本語化
// dayjs.locale("ja");
// タイムゾーンのデフォルトをJST化
dayjs.tz.setDefault("Asia/Tokyo");

function printCalender(month, year) {
  let m = Number(month || dayjs().format("M"));
  let y = Number(year || dayjs().format("YYYY"));

  const specified_date = dayjs()
    .year(y)
    .month(m - 1);

  const first_day_of_week = Number(specified_date.startOf("month").format("d"));
  const last_day = Number(specified_date.endOf("month").format("D"));

  // 月と年を表示
  console.log(`      ${month}月 ${year}`);

  // 曜日を表示
  const week_header = ["日", "月", "火", "水", "木", "金", "土"];
  console.log(week_header.join(" "));

  // 日付を表示
  let calender = "";
  let first_day = "1";

  // 最初の空白
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

const argv = minimist(process.argv.slice(2));

printCalender(argv.m, argv.y);
