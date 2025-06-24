import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
import { logout } from '../store/memberSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// styled: React에서 css문법을 사용할수있도록 도와주는 기능
// 태그이름 + 백틱`

const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: white;
  /* flex 컨테이너 */
  display: flex;
  align-items: center;
  /* 그림자의 위치. x축 y축  아래쪽으로 0.5rem만큼 */
  /* 흐림정도 */
  /* 그림자 색상과 불투명도15% */
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
`;

export const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => {
    return state.member.user
  })
  // 이벤트 함수 추가
  // logout 링크를 클릭하면 이벤트 발생
  const handlerClick = (event) => {
    event.preventDefault();
    dispatch(logout())
    navigate('/')
  }

  return (
    <HeaderContainer>
      {/* Navbar 클래스 삭제 */}
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* 로그인이 됏으면 로그아웃, 게시물 */}
              {/* 로그인이 안됐으면 로그인, 회원가입 */}
              {
                user === null && <>
                  <Nav.Link as={Link} to="/login">로그인</Nav.Link>
                  <Nav.Link as={Link} to="/register">회원가입</Nav.Link>
                </>
              }
              {user !== null && <>
                <Nav.Link as={Link} to="/" onClick={handlerClick}>로그아웃</Nav.Link>
                <Nav.Link as={Link} to="/">홈</Nav.Link>
                <Nav.Link as={Link} to="/board/list">게시물관리</Nav.Link>
              </>
              }
              {/* href 속성을 사용하면 페이지 전환시 전체 페이지를 새로고침하여 스토어가 초기화됨 */}
              {/* href속성 대신 to속성을 사용하고, as속성에 NavLink를 설정해야함 */}
              {/* <Nav.Link as={NavLink} to="/login">로그인</Nav.Link>
            <Nav.Link as={NavLink} to="/logout">로그아웃</Nav.Link>
            <Nav.Link as={NavLink} to="/register">회원가입</Nav.Link>
            <Nav.Link as={NavLink} to="/">홈</Nav.Link>
            <Nav.Link as={NavLink} to="/board/list">게시물관리</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </HeaderContainer>
  )
}

export default Header