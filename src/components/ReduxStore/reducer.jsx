import { INCREMENT, DECREMENT, LOGIN, LOGOUT, ROLESET,SHOWWIDGETBOX } from './actions'; // Assuming LOGIN and LOGOUT action types

const initialState = {
  count: 0,
  isAuthenticated: false,
  role: "",
  showwidget: false
};

const counterReducer = (state = initialState, action) => {
  console.log(action.payload,"payload")
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    case ROLESET:
      return {
        ...state,
        role: action.payload,
      };
    case SHOWWIDGETBOX:
      return {
        ...state,
        showwidget: action.payload

  
      };
    default:
      return state;
  }
};

export default counterReducer;
