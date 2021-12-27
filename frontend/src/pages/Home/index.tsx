import * as React from 'react'
import {
  HomeContainer,
  CategoryBanner,
  BlueBanner,
  PopularPostBanner,
  LatestPostBanner,
} from '../../styles/Home.styles'
import Search from '../../components/Search'

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
        <button>로그인 하고 글 쓰러가기</button>
      </BlueBanner>
      <PopularPostBanner className="wrap">
        <div className="title">인기 게시글</div>
      </PopularPostBanner>
      <LatestPostBanner className="wrap">
        <div className="title">최신 게시글</div>
      </LatestPostBanner>
    </HomeContainer>
  )
}
