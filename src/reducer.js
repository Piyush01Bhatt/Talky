export const initialState = {
  user: {
    name:"",
    id:""
  },
  room: {
    name:'',
    id:''
  },
  messages:[],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.item,
      };

    case "SET_ROOM":
      return {
        ...state,
        room: action.item,
      };

    case "ADD_MESSAGE":
      return{
        ...state,
        messages:[...state.messages,action.item]
      }

    default:
      return state;
  }
};
