// 슬라이스 모아서 스토어 만들기

import { configureStore } from "@reduxjs/toolkit";
import { memberSlice } from "./memberSlice";

// 인자: 슬라이스별 리듀서 함수
const store = configureStore({
  reducer: {
    member: memberSlice.reducer
  }
})

export default store