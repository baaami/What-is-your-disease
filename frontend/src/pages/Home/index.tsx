import React, { useState, useEffect } from 'react'
import { Category, HomeContainer, HotTopic, MainBanner, Post } from './styles'
import { Link, useHistory } from 'react-router-dom'
import API from 'service/api'
import PostsTable from 'components/PostsTable'
import Pagination from 'components/Pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Container, NoData, Title } from 'common.styles'
import SwiperCore, { Navigation } from 'swiper'
import thumbnail from '../../assets/img/thumbnail.svg'
import like_out from '../../assets/img/like_out.svg'
import like_active from '../../assets/img/like_active.svg'
import Search from 'components/Search'
import { useRecoilState } from 'recoil'
import { currentUserInfo } from 'store/userInfo'

interface IHomeProps {}

const categories = [
  { name: '내과' },
  { name: '내과' },
  { name: '내과' },
  { name: '내과' },
  { name: '내과' },
  { name: '내과' },
  { name: '내과' },
  { name: '내과' },
  { name: '내과' },
  { name: '내과' },
  { name: '내과' },
  { name: '내과' },
  { name: '내과' },
  { name: '내과' },
  { name: '내과' },
  { name: '내과' },
  { name: '내과' },
  { name: '내과' },
]

export default function Home(props: IHomeProps) {
  const history = useHistory()
  const [latest_posts, setLatestPosts] = useState([])
  const [hot_posts, setHotPosts] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [total_cnt, setTotalCnt] = useState(0)
  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo)

  SwiperCore.use([Navigation])

  const getLatestPosts = async (order_by: string) => {
    await API.posts
      .getFilterPosts(order_by, current_page, 10)
      .then((res) => {
        setTotalCnt(res.data.postTotalCnt)
        setLatestPosts(res.data.data.post)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const getHotPosts = async () => {
    await API.posts
      .getHotPosts()
      .then((res) => {
        setHotPosts(res.data.data.post)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getHotPosts()
    window.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    getLatestPosts('latest')
  }, [current_page])

  return (
    <HomeContainer>
      <MainBanner>
        <Container>
          <h2>너의 건강상태도 알려줘~!</h2>
          {localStorage.getItem('jwttoken') ? (
            <Link to="/posts/edit">공유하러 가기</Link>
          ) : (
            <Link to="/login">공유하러 가기</Link>
          )}
        </Container>
      </MainBanner>
      <Category>
        <Container>
          <Title>카테고리</Title>
          <div className="category">
            {categories.map((item, idx) => {
              return (
                <div
                  className="categoryItem"
                  key={idx}
                  onClick={() =>
                    history.push(`/posts/category/lists/${item.name}`)
                  }
                >
                  <h2>{item.name}</h2>
                </div>
              )
            })}
          </div>
        </Container>
      </Category>
      <HotTopic>
        <Container>
          <Title style={{ marginBottom: 0 }}>Hot 토픽🔥</Title>
          {hot_posts.length === 0 ? (
            <NoData>조회된 결과가 없습니다.</NoData>
          ) : (
            <Swiper navigation spaceBetween={30} slidesPerView={3.4}>
              {hot_posts.slice(0, 10).map((item: any) => (
                <SwiperSlide key={item._id}>
                  <Link
                    to={`/posts/detail/${item._id}`}
                    className="popularPost"
                  >
                    {item.likes === 0 ? (
                      <div
                        className="likeBox"
                        onClick={(e) => e.isPropagationStopped()}
                      >
                        <img src={like_out} alt="like out icon" />
                        <span style={{ color: '#ebebeb' }}>{item.likes}</span>
                      </div>
                    ) : !item.likeMe.includes(userInfo._id) ? (
                      <>
                        <div
                          className="likeBox"
                          onClick={(e) => e.isPropagationStopped()}
                        >
                          <img src={like_out} alt="like out icon" />
                          <span style={{ color: '#ebebeb' }}>{item.likes}</span>
                        </div>
                      </>
                    ) : (
                      <div
                        className="likeBox"
                        onClick={(e) => e.isPropagationStopped()}
                      >
                        <img src={like_active} alt="like active icon" />
                        <span style={{ color: '#EA1F1C' }}>{item.likes}</span>
                      </div>
                    )}
                    <img src={thumbnail} alt="기본 이미지" />
                    <div className="descript">
                      <h2>{item.category}</h2>
                      <h3>{item.title}</h3>
                      <h4>
                        {item.user.info.nickname}{' '}
                        <span>{item.publishedDate.split('T')[0]}</span>
                      </h4>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Container>
      </HotTopic>
      <Post>
        <Container>
          <Title>전체 게시물</Title>
          <Search />
          <PostsTable posts={latest_posts} getPosts={getLatestPosts} />
          <Pagination
            current_page={current_page}
            total_count={total_cnt}
            per_page={10}
            block={5}
            onChange={setCurrentPage}
          />
        </Container>
      </Post>
    </HomeContainer>
  )
}
