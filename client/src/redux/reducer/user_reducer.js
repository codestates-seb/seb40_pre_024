// 유저를 처리하는 리듀서
// import { SET_USER, CLEAR_USER, SET_PHOTOURL } from "../actions/types";

const intialUserState = {
  //유저 정보를 변수에 저장할 것임
  currentUser: null,
  //로딩 중이라는 것을 표시?
  isLoading: true,
};

export default function (state = intialUserState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        //user 정보가 맞게 들어왔으면 로그인이 되었으니깐 false로 변환
        isLoading: false,
      };

    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      };

    case SET_PHOTOURL:
      return {
        ...state,
        currentUser: { ...state.currentUser, photoURL: action.payload },
      };
    default:
      return state;
  }
}
