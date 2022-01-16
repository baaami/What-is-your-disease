import * as React from 'react'
import {
  HomeContainer,
  CategoryBanner,
  BlueBanner,
  PopularPostBanner,
  LatestPostBanner,
} from '../../styles/Home.styles'
import Search from '../../components/Search'
import num1 from '../../assets/img/num1.png'
import num2 from '../../assets/img/num2.png'
import num3 from '../../assets/img/num3.png'
import { Link } from 'react-router-dom'
import arrow from '../../assets/img/arrow_right.png'

interface IHomeProps {}

const categories = [
  { id: '0', imgUrl: '/assets/img/vaccine.svg', name: '백신' },
  { id: '1', imgUrl: '/assets/img/cold.svg', name: '감기' },
  { id: '2', imgUrl: '/assets/img/headache.svg', name: '두통' },
  { id: '3', imgUrl: '/assets/img/tooth.svg', name: '치통' },
  { id: '4', imgUrl: '/assets/img/bug.svg', name: '벌레물림' },
  { id: '5', imgUrl: '/assets/img/muscle.svg', name: '근육통' },
  { id: '6', imgUrl: '/assets/img/virus.svg', name: '바이러스' },
  { id: '7', imgUrl: '/assets/img/stomache.svg', name: '복통' },
]

export default function Home(props: IHomeProps) {
  return (
    <HomeContainer>
      <Search />
      <CategoryBanner className="wrap">
        <div className="title">인기 카테고리</div>
        <div className="categoryItemContainer">
          {categories.map((item) => {
            return (
              <div className="categoryItem" key={`category: ${item.id}`}>
                <img src={item.imgUrl} alt={`${item.name} 아이콘`} />
                <h2>{item.name}</h2>
              </div>
            )
          })}
        </div>
      </CategoryBanner>
      <BlueBanner>
        <h3>너의 건강상태도 알려줘~!</h3>
        {localStorage.getItem('jwttoken') ? (
          <Link to="/posts/edit">글 쓰러가기</Link>
        ) : (
          <Link to="/login">로그인 하고 글 쓰러가기</Link>
        )}
      </BlueBanner>
      <PopularPostBanner className="wrap">
        <div className="title">인기 게시글</div>
        <div className="popularPostContainer">
          <div className="popularPost">
            <img src={num1} alt="1등 뱃지" />
          </div>
          <div className="popularPost">
            <img src={num2} alt="2등 뱃지" />
          </div>
          <div className="popularPost">
            <img src={num3} alt="3등 뱃지" />
          </div>
        </div>
      </PopularPostBanner>
      <LatestPostBanner className="wrap">
        <div className="title">최신 게시글</div>
        <button className="viewMoreBtn">더보기 +</button>
        <div className="latestPostContainer">
          <div className="latestPost">
            <div className="postTitle">제목들어갈 부분</div>
            <img src={arrow} alt="화살표 아이콘" />
          </div>
        </div>
      </LatestPostBanner>
    </HomeContainer>
  )
}
