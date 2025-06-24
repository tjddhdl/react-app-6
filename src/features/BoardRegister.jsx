import React, { useContext, useState } from 'react'
import { CustomCard, CustomContainer } from '../components/Styles'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// 게시물 정보
// 번호, 제목, 내용, 작성자, 등록일, 수정일
// 번호 => auto increament에 의해 자동으로 생성됨
// 작성자 => 로그인 후 시큐리티에 의해 자동으로 생성됨
// 등록일, 수정일 => jpa에 의해 현재시간으로 자동으로 저장됨

const BoardRegister = () => {

  // 게시물 데이터를 담을 state 생성
  // object{}로 초기화
  const [board, setBoard] = useState({});

  // context에서 host 꺼내기
  const { host } = useContext(Context)

  // 일반함수에서 사용x 컴포넌트 함수에서만 사용 가능
  // navigate: 페이지 이동시 사용
  const navigate = useNavigate();
  const token = useSelector(state=>state.member.token)
  // 이벤트 함수 정의
  // 버튼 클릭시 페이지 이동 방지
  // 등록 화면에서는 등록 버튼을 클릭할 때 API가 호출됨
  const handlerSubmit = async (event) => {
    event.preventDefault()
    // 사용자가 입력한 게시물 데이터를 꺼내서 등록 처리
    //axios 객체에서 post함수 호출 - post 메소드

    // 먼저 파라미터로 게시물 데이터 만들기
    // 중요. 파라미터의 형식: json 문자열 or 폼데이터
    // 제목, 내용, 파일
    // 사용자가 입력한 데이터를 꺼내서 폼데이터 생성
    // json x 폼데이터o
    const formData = new FormData()
    formData.append('title',board.title)
    formData.append('content',board.content)
    if (board.uploadFile && board.uploadFile.length > 0) {
    formData.append('uploadFile', board.uploadFile[0]);
  }

    // post 인자: 주소, 게시물데이터, 헤더
    // api 호출
    // 인자: 주소, 게시물데이터, 헤더
    const response = await axios.post(`${host}/board/register`, formData, {
      headers: {
        Authorization: token
      }
    })

    // 게시물 등록이 끝났으면 게시물 리스트로 이동
    if(response.status === 201){
      navigate('/board/list')
    }
  }

  // 함수 추가
  // 사용자가 입력필드에 값을 입력하면 이벤트가 발생됨
  const handlerChange = (event) => {
    // 이벤트가 발생한 엘리먼트에서 필요한 데이터 추출
    // name, value, files (파일첨부 필드의 경우)

    // 구조 분해 문법을 이용해 event 객체에 있는 데이터 추출
    const { name, value, files } = event.target
    // board 상태에 저장할 데이터 만들기
    // 이전에 추가한 데이터가 유지가 안됨
    // 기존의 게시물 데이터를 유지
    // 기존 게시물 데이터를 복제한 다음 새로운 프로퍼티 추가
    let newBoard = { ...board }
    // object에 데이터 추가하는 방법
    // 프로퍼티의 key는 입력필드의 name을 사용
    // 프로퍼티의 value는 value를 사용
    // 상태 업데이트

    if (name === "uploadFile") {
      newBoard[name] = files
    } else {
      newBoard[name] = value
    }
    setBoard(newBoard);
  }

  return (
    <CustomCard>
      <CustomContainer>
        <h3>게시물 등록</h3>
        <Form onSubmit={handlerSubmit}>
          <Form.Group className="mb-3" controlId="board.title">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" onChange={handlerChange} name="title" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="board.content">
            <Form.Label>내용</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={handlerChange} name="content" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="board.uploadFile">
            <Form.Label>이미지</Form.Label>
            <Form.Control type='file' rows={3} onChange={handlerChange} name="uploadFile" />
          </Form.Group>
          <Button variant="primary" type="submit">
            등록
          </Button>
        </Form>
      </CustomContainer>
    </CustomCard>
  )
}

export default BoardRegister