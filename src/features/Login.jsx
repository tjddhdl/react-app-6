import React, { useContext, useState } from 'react'
import { CustomCard, CustomContainer } from '../components/Styles'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Context } from '..';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/memberSlice';

// 로그인 화면을 반환하는 컴포넌트
// 사용자가 작성한 로그인 데이터를 이용하여 로그인 처리

const Login = () => {
  const [user, setUser] = useState();
  const {host} = useContext(Context);
  const navigate = useNavigate();

  // redux dispatch 함수 가져오기
  const dispatch = useDispatch()

  const handlerChange = (event)=>{
    const {name, value} = event.target;
    let newUser = {...user};
    newUser[name] = value;
    setUser(newUser);
  }

  const handlerSubmit = async (event)=>{
    event.preventDefault();
    // 로그인 api 호출
    // api의 바디데이터는 제이슨
    const response = await axios.post(`${host}/login`,user)

    // 로그인 후 처리
    // 발급받은 토큰을 react app에 저장한 다음에, 다른 페이지에서 사용 
    if(response.status===200){
      
      // dispatch를 사용하여 token state를 업데이트
      // dispatch에 액션(명령)을 전달하여 리듀서 함수 호출
      // 작업에 필요한 데이터를 함께 전달 (토큰과 회원정보)
      dispatch(login(response.data))
      // dispatch를 사용하여 token state를 업데이트
      navigate("/");
    }
  }

  return (
    <CustomCard>
      <CustomContainer>
        <h3>로그인</h3>
        <Form onSubmit={handlerSubmit}>
          <Form.Group className="mb-3" controlId="member.id">
            <Form.Label>아이디</Form.Label>
            <Form.Control type="text" name='id' onChange={handlerChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="member.password">
            <Form.Label>패스워드</Form.Label>
            <Form.Control type="password" name='password' onChange={handlerChange}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            로그인
          </Button>
        </Form>
      </CustomContainer>
    </CustomCard>
  )
}

export default Login