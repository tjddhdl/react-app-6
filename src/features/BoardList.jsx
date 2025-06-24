import React, { useContext, useEffect, useState } from 'react'
import { CustomCard, CustomContainer } from '../components/Styles'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '..';
import { useSelector } from 'react-redux';
// useNavigate: 다른 페이지로 이동하는 기능
// 가짜데이터
// API를 호출하여 데이터베이스에 있는 진짜 데이터 가져오기
// const data = [
//   { no:1, title:'1번', content:'1번입니다', writer:'둘리', regDate:'2024-11-08', modDate:'2024-11-08' },
//   { no:2, title:'2번', content:'2번입니다', writer:'또치', regDate:'2024-11-09', modDate:'2024-11-09' },
//   { no:3, title:'3번', content:'3번입니다', writer:'도우너', regDate:'2024-11-10', modDate:'2024-11-10' }
// ];

const BoardList = () => {

  // navigate함수 생성
  const navigate = useNavigate();

  // 게시물 리스트
  let [data, setData] = useState(null);

  // 저장소에서 API 주소 꺼내기
  const {host} = useContext(Context);

  // redux store에서 로그인 데이터(토큰) 가져오기
  const token = useSelector(state=>state.member.token)
  // API 호출
  // awaite는 async 함수 안에서만 사용 가능
  // api를 호출하고 응답받는 함수

  // API 기본주소를 전역으로 관리 (http://localhost:8080)
  const apicall = async () => {

    // axios ajax fetch 와 같이 api를 호출하는 함수는 비동기 함수.
    // 비동기 함수를 사용할 때는 await async 키워드를함께 사용
    const response = await axios.get(`${host}/board/list`, {
      headers: {
        Authorization: token
      }
    })
    // 상태 업데이트
    setData(response.data)

  }
  // 함수 호출
  // API 호출 > 상태 업데이트 > 컴포넌트 리렌더링 > 다시 API 호출
  // 해결방법: useEffect 사용
  // API 직접 호출 x
  // 인자: 수행할 코드, 주기
  // 빈 배열: 처음만 실행한다는 의미
  useEffect(() => {
    apicall()
  }, [])

  return (
    <CustomCard>
      <CustomContainer>
        <Row>
          <Col sm={8}>
            <h3>게시물 리스트</h3>
          </Col>
          <Col sm={4}>
            <Button variant="secondary" onClick={() => {
              // 게시물등록 페이지로 이동
              navigate('/board/register');
            }} >게시물 등록</Button>
          </Col>
        </Row>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            {data !== null && data.map((board) => {
              // jsx를 동적으로 생성할때는 key값을 삽입해야함
              return (
                <tr key={board.no}>
                  {/* 상세화면 URL 예시: /board/read/1 */}
                  <td><Link to={'/board/read/' + board.no}>{board.no}</Link></td>
                  <td>{board.title}</td>
                  <td>{board.writer}</td>
                  <td>{board.regDate}</td>
                </tr>
              );
            })
            }
          </tbody>
        </Table>

      </CustomContainer>
    </CustomCard>
  )
}

export default BoardList