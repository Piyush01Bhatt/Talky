export const initialState = {
  user: {name:"piyush"},
  room: {
    name:'',
    id:''
  },
  messages:[
    {name:"meethi",message:"hello"},
    {name:"meethi",message:"hello"},
    {name:"piyush",message:"yo bro"},
    {name:"meethi",message:"hello"},
    {name:"meethi",message:"hello"},
    {name:"piyush",message:"hiiiii"},
    {name:"meethi",message:"hello"},
    {name:"piyush",message:"yoyo...adfkal;dfka;lfjajflakjflkajfalkdfj"},
    {name:"meethi",message:"hello"},
    {name:"meethi",message:"hello"},
    {name:"meethi",message:"hello"},
    {name:"meethi",message:"hello"},
    {name:"meethi",message:"hello"},
    {name:"meethi",message:"hello"},
  ],
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
