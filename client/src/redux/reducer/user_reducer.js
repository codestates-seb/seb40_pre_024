// 유저를 처리하는 리듀서
import { SET_USER, CLEAR_USER } from '../actions/types';

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
      };

    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
      };

    default:
      return state;
  }
}
//
