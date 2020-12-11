import { SET_PLAYLIST, SET_SONG, SONG_SEARCH_RESULTS } from "../actions/types";

const initialState = {
  searchComplete: false,
  results: null,
};

export default function (state = initialState, action) {
  const { type, ...payload } = action;
  switch (type) {
    case SONG_SEARCH_RESULTS:
      return {
        ...state,
        searchComplete: true,
        results: payload,
      };

    default:
      return state;
  }
}
