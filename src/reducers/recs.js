import { REC_RESULTS } from "../actions/types";

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

    default:
      return state;
  }
}
