import { SONG_SEARCH_RESULTS, RESET_SEARCH } from "../actions/types";
import axios from "axios";
const API_KEY = process.env.REACT_APP_SHAZAM_API_KEY;

//fetch song guesses
export const searchSong = (searchTerm) => async (dispatch) => {
  const config = {
    method: "GET",
    url: "https://shazam.p.rapidapi.com/search",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "shazam.p.rapidapi.com",
      "x-rapidapi-key": API_KEY,
      useQueryString: true,
    },
    params: {
      locale: "en-US",
      offset: "0",
      limit: "5",
      term: searchTerm,
    },
  };

  try {
    const res = await axios(config);
    dispatch({
      type: SONG_SEARCH_RESULTS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const resetSearch = () => (dispatch) => {
  try {
    dispatch({
      type: RESET_SEARCH,
    });
  } catch (error) {
    console.error(error);
  }
};
