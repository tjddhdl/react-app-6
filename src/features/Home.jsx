import React from 'react'
import { CustomCard, CustomContainer } from '../components/Styles'
import { useSelector } from 'react-redux'

// 홈 화면을 반환하는 컴포넌트

const Home = () => {
  // redux store에서 로그인 데이터 가져오기
  useSelector(state =>{
    console.log(state)
  })
  return (
    <CustomCard>
      <CustomContainer>
        <h3>Home</h3>

      </CustomContainer>
    </CustomCard>
  )
}

export default Home