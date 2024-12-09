import { GET_USER } from "utils/types.utils";
import { storeAction } from 'interfaces/common.interface'

const initialState = {};

const UserReducer = (state = initialState, action: storeAction) => {
  switch (action.type) {
    case GET_USER:
      let newState = { ...state }
      newState = { ...newState, ...action.payload }
      return newState
    default:
      return state;
  }
}

export default UserReducer
