import React, { useContext, useState } from 'react'
import { CustomCard, CustomContainer } from '../components/Styles'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';

// 회원가입 화면을 반환하는 컴포넌트

const Register = () => {

  // 사용자가 입력한 회원데이터를 저장할 변수
  const [member, setMember] = useState({});
  const {host} = useContext(Context);
  const navigate = useNavigate();

  const handlerChange = (event)=>{
    const {name, value} = event.target;

    let newMember = {...member}
    newMember[name] = value;
    setMember(newMember)
  }
  
  // 함수 추가
  const handleSubmit = async (event) => {
    event.preventDefault();
    // javascript의 object는 json구조체
    // api의 파라미터 형식과 member의 타입이 일치하므로 바로 대입
    const response = await axios.post(`${host}/register`,member)
    // 사용자가 입력한 데이터를 서버에 전송
    if(response.status===201){
      navigate("/")
    }
  }
  return (

    <CustomCard>
      <CustomContainer>
      <h3>회원가입</h3>
      {/* 폼 안에 버튼을 클릭하면 submit 이벤트 발생 */}
      {/* 사용자가 입력한 데이터를 서버에 전송 */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="member.id">
          <Form.Label>아이디</Form.Label>
          <Form.Control type="text" onChange={handlerChange} name='id'/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="member.password">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" onChange={handlerChange} name='password'/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="member.name">
          <Form.Label>이름</Form.Label>
          <Form.Control type="text" onChange={handlerChange} name='name'/>
        </Form.Group>
        {/* 사용자 권한 -> 옵션 -> 라디오버튼 */}
        <Form.Group className="mb-3" controlId="member.role" onChange={handlerChange}>
          <Form.Check
            type="radio"
            label="사용자" /* 밖으로 표시되는 이름 */
            id="member.role1"
            name="role"
            value="ROLE_USER" /* 서버에 전달되는 실제 값 */
          />
          <Form.Check
            type="radio"
            label="관리자"
            id="member.role2"
            name="role"
            value="ROLE_ADMIN"
          />
        </Form.Group>
        {/* 일반 버튼X submit 버튼은 특별한 기능이 있음 */}
        {/* 폼데이터를 서버에 전달하는 역할 */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      </CustomContainer>
    </CustomCard>
    
  )
}

export default Register