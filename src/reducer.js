export const initialState = {
  user: {},
  room: {},
  messages: [],
  recent_rooms: {}, // {name,id}
  requests: [], //{name,id,status}
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
      };

    case "ADD_ROOM":
      return {
        ...state,
        recent_rooms: {...state.recent_rooms, ...action.item}
      };

    case "ADD_RECEIVED_MESSAGE":
        const modified = {...state.recent_rooms}
        modified[action.item.from_id].messages.push(action.item)
        return {
          ...state,
          recent_rooms: {
            ...modified 
          }
        }
        /*state.recent_rooms[action.item.from_id].messages.push(action.item)
        return state*/

    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.item]
      };

    case "ADD_REQUEST":
      return {
        ...state,
        requests: [...state.requests, action.item]
      };
    
    case "ADD_REQUESTS":
      return {
        ...state,
        requests: [...action.item]
      }

    case "RESET_REQUESTS":
      return {
        ...state,
        requests: [...action.item]
      }

    default:
      return state;
  }
};
