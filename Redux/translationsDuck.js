// Constants
const initialData = {
  translations: [],
};

// types
const GET_TRANSLATIONS_SUCCESS = "GET_TRANSLATIONS_SUCCESS";

// reducer
export default function filesReducer(state = initialData, action) {
  switch (action.type) {
    case GET_TRANSLATIONS_SUCCESS:
      return { ...state, translations: action.payload };
    default:
      return state;
  }
}

// actions
export const getTranslationsAction = () => async (dispatch) => {
  try {
    const fetchTranslations = await fetch("/api/allTranslations");
    const translations = await fetchTranslations.json();
    dispatch({
      type: GET_TRANSLATIONS_SUCCESS,
      payload: translations.data,
    });
  } catch (error) {
    throw error;
  }
};
