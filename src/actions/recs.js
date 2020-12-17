import { REC_RESULTS, RESET_RECS } from "../actions/types";
import axios from "axios";
const API_KEY = process.env.REACT_APP_SHAZAM_API_KEY;

//get recomendations list

export const getRecs = (songId) => async (dispacth) => {
  try {
    const config = {
      method: "GET",
      url: "https://shazam.p.rapidapi.com/songs/list-recommendations",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "shazam.p.rapidapi.com",
        "x-rapidapi-key": API_KEY,
        useQueryString: true,
      },
      params: {
        locale: "en-US",
        key: songId,
      },
    };

    const res = await axios(config);

    dispacth({
      type: REC_RESULTS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const resetRecs = () => (dispatch) => {
  try {
    dispatch({
      type: RESET_RECS,
    });
  } catch (error) {
    console.error(error);
  }
};
