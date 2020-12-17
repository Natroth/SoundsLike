import { SONG_SEARCH_RESULTS, RESET_SEARCH } from "../actions/types";

const initialState = {
  searchComplete: false,
  results: null,
};

export default function searchReducer(state = initialState, action) {
  const { type, ...payload } = action;
  switch (type) {
    case SONG_SEARCH_RESULTS:
      return {
        ...state,
        searchComplete: true,
        results: payload,
      };
    case RESET_SEARCH:
      return {
        ...state,
        searchComplete: false,
        results: null,
      };

    default:
      return state;
  }
}
