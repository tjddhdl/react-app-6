import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createContext } from 'react';
import store from './store/store';
import {Provider, useDispatch} from 'react-redux';
import { login } from './store/memberSlice';
// context 저장소 생성
// context: 여러 컴포넌트에서 값을 공유할 때 사용
// store, slice: 여러 컴포넌트에서 상태(state)를 공유할 때 사용
export const Context = createContext()
let host = null;
if(window.location.hostname==="localhost"){
  host = 'http://localhost:8080'
}else{
  // AWS주소를 직접 사용하면 프로토콜 문제로 호출 안됨
  // 따라서 /api로 우회(프록시)할 것
  // 프록시: 가짜 요청을 보내고 다시 실제 요청으로 변경
  // host = 'http://54.180.86.144'
  host = '/api'
}
// 화면이 새로고침이 되었을때 로그인 상태 유지하기

// redux dispatch 함수 가져오기
const dispatch = store.dispatch

// 1. 로컬스토리지에서 로그인데이터 꺼내기
const user = localStorage.getItem('user')
const token = localStorage.getItem('token')

// 2. 로그인 데이터가 있다면, 다시 로그인 처리
if(user != null){
  const userObj = JSON.parse(user)

  // dispatch를 이용해 리듀서함수 호출
  // 로그인 작업에 필요한 데이터를 함께 전달
  dispatch(login({token: token, user: userObj}))
}

// 하위 컴포넌트에서 store를 사용할 수 있도록 주입


// 하위 컴포넌트들에게 저장소를 공유
// Router: URL 주소에따라 화면을 전환하는 기능
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{ host }}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Context.Provider>
);