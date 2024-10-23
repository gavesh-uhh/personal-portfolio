import { json } from "@sveltejs/kit";
import axios from "axios";
import * as cheerio from "cheerio";

type Lecture = {
  class: string | null;
  branch: string | null;
  floor: string | null;
  lecturer: string | null;
  time: string | null;
  on_going: boolean;
  date: Date | null;
};

export const GET = async ({ url }: { url: URL }) => {
  const currentUTCDate = url.searchParams.get("date");
  if (currentUTCDate == null) return json({
    error: "UTC date not provided",
    data: []
  });
  return json({
    data: await getData(currentUTCDate, "https://lms.nibmworldwide.com/mod/nibm/display.php?wing=CO&div=1")
  });
};

async function getData(currentDate: string, url: string, limit = 3) {
  const lectures: Lecture[] = [];
  for (let i = 0; i < limit; i++) {
    let dateWithOffset = await getDateWithOffset(currentDate, i);
    const formatString = await getFormattedStringViaDate(dateWithOffset);
    try {
      const { data } = await axios.get(url + "&date=" + formatString);
      const $ = cheerio.load(data);

      $("div.swiper-slide > table > tbody > tr").each(async (index, row) => {
        const lecture: Lecture = {
          class: null,
          branch: null,
          floor: null,
          lecturer: null,
          time: null,
          on_going: false,
          offset: i
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

        lecture.on_going = false;
        lectures.push(lecture);
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  }
  return lectures;
}

async function getFormattedStringViaString(currentDate: string) {
  const date = new Date(currentDate);
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
}

async function getFormattedStringViaDate(date: Date) {
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
}

async function getDateWithOffset(currentDate: string, offset: number) {
  const date = new Date(currentDate);
  date.setUTCDate(date.getUTCDate() + offset);
  return date;
}

