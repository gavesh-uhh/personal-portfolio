import axios from "axios";
import * as cheerio from "cheerio";

export async function load() {
  return {
    date: await getRealTime(),
    today: scrapeWebsite(
      "https://lms.nibmworldwide.com/mod/nibm/display.php?wing=CO&div=1",
    ),
  };
}

async function scrapeWebsite(url: string) {
  const lectures: Lecture[] = [];
  const currentDate = await getRealTime();
  console.log(currentDate);
  for (let i = 0; i < 3; i++) {
    const lectureDate = getDateWithOffset(currentDate, i);

    try {
      const { data } = await axios.get(url + `&date=${lectureDate}`);
      const $ = cheerio.load(data);

      $("div.swiper-slide > table > tbody > tr").each((index, row) => {
        const lecture: Lecture = {
          class: null,
          branch: null,
          floor: null,
          lecturer: null,
          time: null,
          date: convertStringToDate(lectureDate),
          on_going: false,
        };

        $(row).find("td").each((tdIndex, td) => {
          const text = $(td).text().trim();
          if (tdIndex === 0) {
            console.log(text.replaceAll("/CO", ""));
            lecture.branch = text.replaceAll("/CO", "");
          }
          if (tdIndex === 1) {
            $(td).find("big").each((i, big) => {
              lecture.floor = $(td).contents().last().text() + " " +
                $(big).text();
            });
          }
          if (tdIndex === 2) {
            lecture.class = $(td).contents().last().text();
            $(td).find("big").each((i, big) => {
              if (i === 0) {
                lecture.time = $(big).text();
              }
              if (i === 1) {
                lecture.lecturer = $(big).text();
              }
            });
          }
        });

        if (isSameDay(currentDate, lecture.date)) {
          lecture.on_going = isOngoing(currentDate, lecture.time ?? "");
        } else {
          lecture.on_going = false;
        }

        lectures.push(lecture);
      });
    } catch (error) {
      console.error("Oopsie daisy", error);
    }
  }
  return lectures;
}

function isOngoing(currentDate: Date, time_str: string) {
  if (time_str == "") return false;
  const time_data = time_str.split("-");
  const start_time = convertTimeToDate(time_data[0]);
  const end_time = convertTimeToDate(time_data[1]);
  const date = currentDate;
  const current_time = date.getTime();
  return current_time >= start_time.getTime() &&
    current_time <= end_time.getTime();
}

async function getRealTime() {
  // const data = await fetch(
  //  "https://timeapi.io/api/time/current/zone?timeZone=Asia%2FColombo",
  //);
  //const resp = await data.json();
  let c = new Date();
  return c;
}

function isSameDay(date1: Date | null, date2: Date | null): boolean {
  if (date1 == null || date2 == null) return false;
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

function convertStringToDate(time: string) {
  if (!time) return null;
  const cleanedStr = time.trim();
  const timeData = cleanedStr.split("-");
  if (timeData.length !== 3) return null;
  const [year, month, day] = timeData;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return date;
}
function convertTimeToDate(time: string) {
  const time_str = time.trim().replaceAll("pm", "").replaceAll("am", "").trim();
  const time_data = time_str.split(":");
  const curr_date = new Date();
  curr_date.setHours(parseInt(time_data[0]), parseInt(time_data[1]), 0, 0);
  return curr_date;
}

function getDateWithOffset(realDate: Date, offset: number) {
  const year = realDate.getFullYear();
  const month = realDate.getMonth();
  const date = realDate.getDate();
  return `${year}-${month + 1}-${date + offset}`;
}

type Lecture = {
  class: string | null;
  branch: string | null;
  floor: string | null;
  lecturer: string | null;
  time: string | null;
  on_going: boolean;
  date: Date | null;
};
