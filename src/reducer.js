export const initialState = {
  user: {
    name: "",
    id: ""
  },
  room: {
    name: '',
    id: '',
    key:-1
  },
  messages: [],
  recent_rooms: [{
    name: "Piyush",
    id: "5f64f240d5328d29e1c4e8ff",
  }, {
    name: "Pawan",
    id: "5f6b42673ffbaf4af3827907",
  }]
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
        room:action.item,
        messages:[]
      };

    case "ADD_ROOM":
      return {
        ...state,
        recent_rooms: [...state.recent_rooms, action.item]
      };

    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.item]
      }

    default:
      return state;
  }
};
