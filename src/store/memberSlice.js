// store: app에서 state를 전역적으로 관리하는 도구
// 여러 컴포넌트에서 state를 공유함

// slice: 기능별로 나눠서 state를 관리
// 예: todo 기능의 slice, 계산기 기능의 slice

// memberSlice: 회원정보를 관리하는 저장소

const { createSlice } = require("@reduxjs/toolkit")

// state 초기값
// state에 저장할 값: login 데이터
const init = {
  token: null,
  user: null
}

// 인자: 슬라이스 이름, 초기값, 리듀서함수 
export const memberSlice = createSlice({
  name: 'memberSlice',
  initialState: init,
  reducers: {
    // 발급받은 토큰과 회원정보를 state에 저장
    login: (state, action)=>{
      state.token = action.payload.token
      state.user = action.payload.user
      // 로컬 스토리지에도 로그인 데이터를 저장
      // key, value
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))

    },
    logout: (state, action)=>{
      state.token = null
      state.user = null
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
})

// toolkit은 리듀서 함수를 액션함수로 자동 생성함
// 외부에서 리듀서를 편하게 호출할 수 있도록 액션 함수를 내보내기
export const {login, logout} = memberSlice.actions; 
// actions는 object
// object에서 login과 logout 함수 꺼내기