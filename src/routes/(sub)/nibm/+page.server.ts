export async function load() {
  return {
    today: await scrapeWebsite("https://lms.nibmworldwide.com/mod/nibm/display.php?wing=CO&div=1&date=2024-10-16")
    //upcoming: scrapeWebsite("https://lms.nibmworldwide.com/mod/nibm/display.php?wing=CO&div=1" + generateUpcomingTimeStr())
  }
}

import axios from "axios";
import * as cheerio from 'cheerio';

async function scrapeWebsite(url: string) {
  let lectures: Lecture[] = [];
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // @ts-ignore
    $('div.swiper-slide > table > tbody > tr').each((index, row) => {
      const firstTD = $(row).find('td').first();
      let lecture: Lecture = { class: null, branch: null, floor: null, lecturer: null, time: null, on_going: false };
      $(row).find('td').each((tdIndex, td) => {
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
            if (i == 0) {
              lecture.time = $(big).text();
              lecture.on_going = (isOngoing(lecture.time));
            }
            if (i == 1) lecture.lecturer = $(big).text();
          });
        }
      });
      lectures.push(lecture);
    });
  } catch (error) {
    console.error('Oopsie daisy', error);
  }
  generateUpcomingTimeStr();
  return lectures;
}


function isOngoing(time_str: string) {
  let time_data = time_str.split("-");
  let start_time = convertToDateObj(time_data[0]);
  let end_time = convertToDateObj(time_data[1]);
  let current_time = new Date().getTime();
  return current_time >= start_time.getTime() && current_time <= end_time.getTime();
}

function generateUpcomingTimeStr() {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `&date=${year}/${month}/${day}`;
}

function convertToDateObj(time: string) {
  let time_str = time.trim().replaceAll("pm", "").replaceAll("am", "").trim();
  let time_data = time_str.split(":");
  let curr_date = new Date();
  curr_date.setHours(parseInt(time_data[0]), parseInt(time_data[1]), 0, 0);
  return curr_date
}

type Lecture = {
  class: string | null;
  branch: string | null;
  floor: string | null;
  lecturer: string | null;
  time: string | null;
  on_going: boolean;
}

