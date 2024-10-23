import { json } from "@sveltejs/kit";

// for maintence purposes instead of taking down the whole thing i can artifically block the website
// hardcoded rn
// TODO: FIX THIS
export const GET = async () => {
  return json({
    message: "Website down for maintence purposes \n @Gavesh",
  });
};
