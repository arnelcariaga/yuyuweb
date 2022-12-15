// Constants
const initialData = {
  categories: [],
};

// types
const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";

// reducer
export default function filesReducer(state = initialData, action) {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
}

// actions
export const getCategoriesAction = () => async (dispatch) => {
  try {
    const fetchCategories = await fetch("/api/allCategories");
    const categories = await fetchCategories.json();
    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: categories.data,
    });
  } catch (error) {
    throw error;
  }
};
