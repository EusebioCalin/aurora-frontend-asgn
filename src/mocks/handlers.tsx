import { http, HttpResponse } from "msw";
import { getMoviesUrl } from "../utils/endpoints";
import { movieMock } from "./movieMock";

export const handlers = [
  http.get(getMoviesUrl(), ({ request }) => {
    console.log("MOcked API request received", request);
    return HttpResponse.json({ items: [movieMock], total: 0 });
  }),
];
