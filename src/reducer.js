export const initialState = {
  user: {},
  onlineStatus: false,
  requestsCounter: 0,
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

    case "SET_REQUESTS_COUNTER":
      return {
        ...state,
        requestsCounter: action.item
      }

    case "INCREMENT_REQUESTS_COUNTER":
      return {
        ...state,
        requestsCounter: state.requestsCounter + 1
      }

    case "DECREMENT_REQUESTS_COUNTER":
      return {
        ...state,
        requestsCounter: state.requestsCounter - 1
      }


    case "LOGOUT":
      localStorage.clear()
      return {
        ...initialState
      }

    case "SET_OFFLINE":
      return {
        ...state,
        onlineStatus: false
      }

    case "SET_ROOM":
      const modifyUnread = {
        ...state.recent_rooms[action.item.id],
        unreadNum: 0
      }
      return {
        ...state,
        room: action.item,
        recent_rooms: {
          ...state.recent_rooms,
          [action.item.id]: {
            ...modifyUnread
          }
        }
      };

    case 'UNSET_ROOM': return {
      ...state,
      room: {}
    }

    case "ADD_ROOM":
      return {
        ...state,
        recent_rooms: { ...state.recent_rooms, ...action.item }
      };

    case "SET_ROOM_ONLINE":
      if (!(action.item.id in state.recent_rooms)) {
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
      if (!(action.item.id in state.recent_rooms)) {
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
        messages: [...state.recent_rooms[action.item.from_id].messages, action.item],
        unreadNum: (state.room.id === action.item.from_id) ? 0 : state.recent_rooms[action.item.from_id].unreadNum + 1
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
