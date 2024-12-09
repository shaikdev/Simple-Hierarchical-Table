import store from "store/store"
import { TEST_ACTION, GET_USER } from "./types.utils";

export const testDispatch = (payload: object) => (
  store.dispatch({
      type: TEST_ACTION,
      payload: payload
}));

export const setUser = (payload: any) => {
  store.dispatch({
    type: GET_USER,
    payload: payload
  })
}
