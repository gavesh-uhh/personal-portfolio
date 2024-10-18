export async function load() {
  return {
    today: await scrapeWebsite("https://lms.nibmworldwide.com/mod/nibm/display.php?wing=CO&div=1")
  }
}

import axios from "axios";
import * as cheerio from 'cheerio';

async function scrapeWebsite(url: string) {
  let lectures: Lecture[] = [];
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Gather all promises for isOngoing calls
    const lecturePromises = $('div.swiper-slide > table > tbody > tr').map(async (index, row) => {
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
            if (i === 0) {
              lecture.time = $(big).text();
            }
            if (i === 1) {
              lecture.lecturer = $(big).text();
            }
          });
        }
      });

      lecture.on_going = await isOngoing(lecture.time ?? "");
      return lecture;
    }).get();
    lectures = await Promise.all(lecturePromises);
  } catch (error) {
    console.error('Oopsie daisy', error);
  }
  return lectures;
}


async function isOngoing(time_str: string) {
  if (time_str == "") return false;
  let time_data = time_str.split("-");
  let start_time = convertToDateObj(time_data[0]);
  let end_time = convertToDateObj(time_data[1]);
  let date = await getRealTime();
  let current_time = date.getTime();
  return current_time >= start_time.getTime() && current_time <= end_time.getTime();
}

async function getRealTime() {
  let data = await fetch("https://timeapi.io/api/time/current/zone?timeZone=Asia%2FColombo");
  let resp = await data.json();
  return new Date(resp.dateTime);
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

