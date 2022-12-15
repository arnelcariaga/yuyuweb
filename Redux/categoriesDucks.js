// Constants
const initialData = {
  langs: [],
};

// types
const GET_LANGS_SUCCESS = "GET_LANGS_SUCCESS";

// reducer
export default function filesReducer(state = initialData, action) {
  switch (action.type) {
    case GET_LANGS_SUCCESS:
      return { ...state, langs: action.payload };
    default:
      return state;
  }
}

// actions
export const getLangsAction = () => async (dispatch) => {
  try {
    const fetchLangs = await fetch("/api/allLangs");
    const langs = await fetchLangs.json();
    dispatch({
      type: GET_LANGS_SUCCESS,
      payload: langs.data,
    });
  } catch (error) {
    throw error;
  }
};
