import { REC_RESULTS, RESET_RECS } from "../actions/types";

const initialState = {
  searchComplete: false,
  results: null,
};

export default function recReducer(state = initialState, action) {
  const { type, ...payload } = action;
  switch (type) {
    case REC_RESULTS:
      return {
        ...state,
        searchComplete: true,
        results: payload,
      };
    case RESET_RECS:
      return {
        ...state,
        searchComplete: false,
        results: null,
      };

    default:
      return state;
  }
}
