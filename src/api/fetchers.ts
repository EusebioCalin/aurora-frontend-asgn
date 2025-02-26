import axios from "axios";
import { EndpointMovie, Movie } from "../types/types";
import { getMoviesUrl } from "../utils/endpoints";
import { ResponseError } from "../utils/ResponseError";

interface FetchMoviesParams {
  skip?: number;
  limit?: number;
  query?: string;
}

interface EndpointMoviesResponse {
  items: EndpointMovie[];
  total: number;
}

interface MoviesResponse {
  items: Movie[];
  total: number;
}

export const fetchMovies = async ({ skip, limit, query }: FetchMoviesParams): Promise<MoviesResponse> => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 1000));
    const result: { data: EndpointMoviesResponse } = await axios.get(getMoviesUrl(), {
      params: {
        skip: skip || null,
        limit: limit || null,
        query: query || null,
      },
    });
    // Handle the result as needed
    const { items } = result.data
    return {
      ...result.data,
      items: items.map(item => ({
        imageUrl: item.image_url,
        id: item.id,
        title: item.title,
        description: item.description,
        rating: item.rating,
      })),
    }

  } catch (error) {
    let responseError = null;
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      if (error.response?.data?.detail) {
        responseError = new ResponseError(error.response?.data?.detail);
      } else {
        responseError = new ResponseError(error.response?.data);
      }
    } else {
      console.error(error);
      responseError = new ResponseError(error?.toString());
    }
    throw responseError;
  }
};