import React, { useContext, useEffect, useState } from 'react'
import { CustomCard, CustomContainer } from '../components/Styles'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Context } from '..';
import { useSelector } from 'react-redux';

// 게시물 상세 화면: 게시물의 모든 정보를 출력

const BoardDetail = () => {

  // 게시물 데이터 (데이터베이스 대신)
  // const board = null;
  // const board = { no:1, title:'1번', content:'1번입니다', writer:'둘리', regDate:'2024-11-08', modDate:'2024-11-08' }

  // navigate 함수 생성
  const navigate = useNavigate();

  const { host } = useContext(Context);
  const token = useSelector(state => state.member.token)

  // 파일 기본 경로
  const IMG_PATH = '/images/'

  // 일반변수에 데이터를 담아도 화면에는 변화가 없음
  // state로 변경
  let [board, setBoard] = useState(null);
  // API를 호출하여 실제 게시물 데이터 가져오기
  // 예: /board/read?no=1
  // API를 호출하기 위해서 게시물 번호가 필요함

  // URL 주소에 포함된 파라미터 추출
  const params = useParams();
  // axios는 비동기 함수로 응답을 기다렸다가 받아야함
  // await는 async 함수 안에서만 사용 가능
  const apicall = async () => {
    const response = await axios.get(`${host}/board/read?no=${params.no}`, {
      headers: {
        Authorization: token
      }
    })

    // 응답을 받은 후에 처리
    if (response.status === 200) {
      setBoard(response.data)
    } else {
      console.log(`api error: ${response.status} ${response.statusText}`)
    }
  }

  // 컴포넌트가 처음에 생성될 때 한번만 api를 호출
  useEffect(() => {
    apicall()
  }, [])

  return (
    <CustomCard>
      <CustomContainer>
        <h3>게시물 상세</h3>

        {/* 게시물 데이터가 있다면 폼 표시 */}
        {/* 첫번째조건이 false라면 두번째항은 실행안됨 */}
        {
          board !== null &&
          <Form>
            <Form.Group className="mb-3" controlId="board.no">
              <Form.Label>번호</Form.Label>
              <Form.Control type="text" value={board.no} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.title">
              <Form.Label>제목</Form.Label>
              <Form.Control type="text" value={board.title} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.content">
              <Form.Label>내용</Form.Label>
              <Form.Control as="textarea" rows={3} value={board.content} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.writer">
              <Form.Label>작성자</Form.Label>
              <Form.Control type="text" value={board.writer} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.regDate">
              <Form.Label>등록일</Form.Label>
              <Form.Control type="text" value={board.regDate} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.modDate">
              <Form.Label>수정일</Form.Label>
              <Form.Control type="text" value={board.modDate} readOnly />
            </Form.Group>

            {/* 이미지 필드 추가 */}
            {/* src 에 이미지 경로 작성 */}
            {/* 브라우저가 보안상 이유로 리소스에 접근하는 것을 막음 */}
            {/* 1. 프로젝트 내부에 저장하여 웹루트로 접근 */}
            {/* 2. aws같은 사이트를 이용해 공개주소로 접근 */}
            <Form.Group className='mb-3'>
              <img src={`${board.imgPath}`}></img>
            </Form.Group>

            {/* 게시물 데이터 확인 */}
            <div>{board.imgPath}</div>

            <Button variant="primary" onClick={() => {
              // 게시물 수정화면으로 이동
              // 주소 예시: /board/modify/1
              navigate(`/board/modify/${board.no}`);
            }} >수정</Button>

          </Form>

        }

      </CustomContainer>
    </CustomCard>
  )
}

export default BoardDetail