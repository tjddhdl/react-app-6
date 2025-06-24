import React, { useContext, useEffect, useState } from 'react'
import { CustomCard, CustomContainer } from '../components/Styles'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Context } from '..';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// 게시물 수정 화면: 상세화면과 같이 게시물의 모든 내용이 표시
// 수정 가능한 필드와 수정 불가능한 필드를 구분
// 번호, 제목, 내용, 작성자, 등록일, 수정일
// 번호: 데이터 식별자라서 수정하면 안됨
// 작성자: 로그인하면 자동으로 id가 입력됨
// 등록일: 등록일은 처음 입력되고 다음부터는 수정 안됨
// 수정일: 수정시 현재시간으로 자동으로 입력됨
// 수정화면: 상세화면과 등록화면의 특징을 모두 가지고 있음!

// 게시물 수정 화면
// 기존 게시물 데이터 조회
// 일부 데이터 수정 가능
// 수정 버튼을 클릭하면 게시물 데이터 업데이트
const BoardModify = () => {

  // 게시물 데이터
  let [board, setBoard] = useState(null);
  
  const token = useSelector(state=>state.member.token)

  // api를 호출하여 데이터베이스에 있는 게시물데이터 꺼내오기

  // api 기본주소 가져오기
  const {host} = useContext(Context)
  const params = useParams()

  const navigate = useNavigate();

  // axios를 사용해서 게시물 단건 조회 api 호출
  const apicall = async ()=>{
    const response = await axios.get(`${host}/board/read?no=${params.no}`,{
      headers: {
        Authorization: token
      }
    })
    // 상태 업데이트
    if(response.status===200){
      setBoard(response.data)
    }
  }
  // 컴포넌트가 처음 로드될때 한번만 api를 호출
  useEffect(()=>{apicall()},[])

  // 사용자가 입력필드에서 값을 바꾸면 실행됨
  // 사용자가 입력한 내용을 다시 board state에 업데이트
  // 그러면 변경된 내용이 화면에 나타남
  const handlerChange = (event)=>{
    // 기존 게시물 복사
    const {name, value, files}=event.target
    const newBoard = {...board}
    // 특정 프로퍼티만 교체
    // 엘리먼트가 가지고 있는 name을 key로 사용
    if(name==='uploadFile'){
      newBoard[name]=files[0];
    }else{
      newBoard[name]=value;
    }
    // 상태 업데이트
    setBoard(newBoard)
    console.log(newBoard)
  }

  const handlerSubmit = async (event)=>{
    event.preventDefault()
    const formData = new FormData();
    formData.append('no',board.no);
    formData.append('title',board.title);
    formData.append('content',board.content);
    if(board.uploadFile&&formData.append('uploadFile',board.uploadFile));
    
    // axios는 내부에서 promise 객체를 사용함
    // 원래는 promise가 api를 호출하고 기다렸다가 응답을받아야하는데
    // await가 없기 때문에 응답을 받지 못한채로 promise 객체를 받음
    const response = await axios.put(`${host}/board/modify`,formData,{
      headers: {
        Authorization: token
      }
    })
    if(response.status ===204){
      navigate('/board/read/'+board.no)
    }
    // api를 수정하여 게시물 수정 처리

  }
  const handlerRemove = async () => {
    // 게시물 삭제 api 호출
    // 인자: 주소, 헤더
    const response = await axios.delete(`${host}/board/remove?no=${board.no}`, {
      headers: {
        Authorization: token
      }
    })
    console.log(response.status)
    if(response.status===204){
      navigate('/board/list')
    }
  }

  return (
    <CustomCard>
      <CustomContainer>
        <h3>게시물 수정</h3>
        {/* 폼 안에 버튼을 클릭하면 submit 이벤트가 발생 */}
        {/* 사용자가 수정한 게시물 데이터가 서버로 전송 */}
        {board!==null && 
          <Form onSubmit={handlerSubmit}>
            <Form.Group className="mb-3" controlId="board.no">
              <Form.Label>번호</Form.Label>
              <Form.Control type="text" value={board.no} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.title">
              <Form.Label>제목</Form.Label>
              <Form.Control type="text" value={board.title} name='title' onChange={handlerChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.content">
              <Form.Label>내용</Form.Label>
              <Form.Control as="textarea" rows={3} value={board.content} name='content' onChange={handlerChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.uploadFile">
            <Form.Label>이미지</Form.Label>
            <Form.Control type='file' rows={3} onChange={handlerChange} name="uploadFile" />
          </Form.Group>
            <Form.Group className="mb-3" controlId="board.writer">
              <Form.Label>작성자</Form.Label>
              <Form.Control type="text" value={board.writer} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.regDate">
              <Form.Label>등록일</Form.Label>
              <Form.Control type="text" value={board.regDate} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.modDate">
              <Form.Label>수정일</Form.Label>
              <Form.Control type="text" value={board.modDate} readOnly/>
            </Form.Group>
            <Button variant="primary" type="submit">
              저장
            </Button>
            <Button variant="danger" onClick={handlerRemove}>삭제</Button>
          </Form>        
        }
      </CustomContainer>
    </CustomCard>
  )
}

export default BoardModify