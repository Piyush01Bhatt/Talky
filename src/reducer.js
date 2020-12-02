export const initialState = {
  user: {},
  onlineStatus: false,
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

    case "SET_ONLINE":
      return {
        ...state,
        onlineStatus: true
      }

    case "LOGOUT":
      return {
        ...initialState
      }

    case "SET_OFFLINE":
      return {
        ...state,
        onlineStatus: false
      }


    case "SET_ROOM":
      return {
        ...state,
        room: action.item,
      };

    case "ADD_ROOM":
      return {
        ...state,
        recent_rooms: { ...state.recent_rooms, ...action.item }
      };

    case "SET_ROOM_ONLINE":
      if (!(action.item.id in state.recent_rooms)){
        return state
      }
      const modifiedRoom = {
        ...state.recent_rooms[action.item.id],
        isOnline: true
      }
      return {
        ...state,
        recent_rooms: {
          ...state.recent_rooms,
          [action.item.id]: {
            ...modifiedRoom
          }
        }
      }

    case "SET_ROOM_OFFLINE":
      if (!(action.item.id in state.recent_rooms)){
        return state
      }
      const modiRoom = {
        ...state.recent_rooms[action.item.id],
        isOnline: false
      }
      return {
        ...state,
        recent_rooms: {
          ...state.recent_rooms,
          [action.item.id]: {
            ...modiRoom
          }
        }
      }

    case "ADD_RECEIVED_MESSAGE":
      /*const modified = {...state.recent_rooms}
      modified[action.item.from_id].messages.push(action.item)*/
      const modified = {
        ...state.recent_rooms[action.item.from_id],
        messages: [...state.recent_rooms[action.item.from_id].messages, action.item]
      }
      return {
        ...state,
        recent_rooms: {
          ...state.recent_rooms,
          [action.item.from_id]: {
            ...modified
          }
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
