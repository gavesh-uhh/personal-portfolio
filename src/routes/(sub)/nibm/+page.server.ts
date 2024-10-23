import axios from "axios";
import * as cheerio from "cheerio";

export async function load() {
  const realDate = await getRealDate();
  return {
    date: realDate,
    today: scrapeWebsite(
      realDate,
      "https://lms.nibmworldwide.com/mod/nibm/display.php?wing=CO&div=1",
    ),
  };
}

async function scrapeWebsite(date: Date, url: string) {
  const lectures: Lecture[] = [];
  const currentDate = date;
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
            lecture.branch = text.replaceAll("/CO", "");
          }
          if (tdIndex === 1) {
            $(td).find("big").each((i, big) => {
              lecture.floor = $(td).contents().last().text() + " " + $(big).text();
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

        // Determine if the lecture is ongoing
        lecture.on_going = isSameDay(currentDate, lecture.date) && isOngoing(currentDate, lecture.time ?? "");
        lectures.push(lecture);
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  }
  return lectures;
}

function isOngoing(currentDate: Date, time_str: string) {
  if (!time_str) return false;
  const time_data = time_str.split("-");
  const start_time = convertTimeToDate(time_data[0]);
  const end_time = convertTimeToDate(time_data[1]);
  return currentDate >= start_time && currentDate <= end_time;
}
async function getRealDate() {
  const localDate = new Date();
  const localOffset = localDate.getTimezoneOffset() * 60 * 1000; // in milliseconds
  const utcDate = new Date(localDate.getTime() + localOffset);
  const sriLankaOffset = 5.5 * 60 * 60 * 1000; // offset in milliseconds
  const sriLankaDate = new Date(utcDate.getTime() + sriLankaOffset);
  return sriLankaDate;
}
function isSameDay(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false;
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
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

function convertTimeToDate(time: string) {
  const time_str = time.trim().replace(/pm/i, "").replace(/am/i, "").trim();
  const time_data = time_str.split(":");
  const curr_date = new Date();
  curr_date.setHours(parseInt(time_data[0]), parseInt(time_data[1]), 0, 0);
  return curr_date;
}

function getDateWithOffset(realDate: Date, offset: number) {
  const offsetDate = new Date(realDate);
  offsetDate.setDate(realDate.getDate() + offset);
  const offsetCleaned = `${offsetDate.getFullYear()}-${offsetDate.getMonth() + 1}-${offsetDate.getDate()}`
  return offsetCleaned;

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

