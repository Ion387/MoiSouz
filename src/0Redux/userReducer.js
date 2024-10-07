const userAC=0
const userTC=0

export const addSubmitAC = (loginUp) => {return {
  type : "xAC", loginUp
  }}

const initialState ={
  isUserLogin:false,
 userLogin:'login',
 userId:null,
 userEmail:0,

}

const userReducer =(state=initialState, action)=> {

  switch (action.type) {
  
  case"xAC": 
      return {
        ...state,
        isUserLogin:true
       /*  newTextMessage:'',
        textsData:[...state.textsData, {id:5,
          text:state.newTextMessage}], */}

  default: return state
    }}

/* export const xTC=(a,b)=>{
  return async(dispatch)=>{
    dispatch( xAC1())
let response =  await usersApi.letGetUsers(a,b)
    if (response.data.result=0) dispatch(xAC2(response.data))
else {dispatch(xAC3(response.data))}
} */



export default userReducer