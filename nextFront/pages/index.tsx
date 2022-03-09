import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import {
  Category,
  HomeContainer,
  HotTopic,
  MainBanner,
  Post,
} from 'styles/styles'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import API from 'service/api'
import PostsTable from 'components/PostsTable'
import Pagination from 'components/Pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Container, NoData, Title } from 'common.styles'
import SwiperCore, { Navigation } from 'swiper'
import first from 'assets/img/first.svg'
import second from 'assets/img/second.svg'
import third from 'assets/img/third.svg'
import { useRecoilState } from 'recoil'
import { currentUserInfo } from 'store/userInfo'
import { categoryList } from 'static/constant'
import Search from 'components/Search'

const Home: NextPage = (props) => {
  const router = useRouter()
  const [latest_posts, setLatestPosts] = useState([])
  const [hot_posts, setHotPosts] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [total_cnt, setTotalCnt] = useState(0)
  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo)

  SwiperCore.use([Navigation])

  const getLatestPosts = async (order_by: string, diseasePeriod?: string) => {
    await API.posts
      .getFilterPosts(order_by, current_page, 10, diseasePeriod)
      .then((res) => {
        setTotalCnt(res.data.postTotalCnt)
        setLatestPosts(res.data.data.post)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const getHotPosts = async (diseasePeriod?: string) => {
    await API.posts
      .getFilterPosts('hotest', 1, 10, diseasePeriod)
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
      <Head>
        <title>Dr.u</title>
      </Head>
      <MainBanner>
        <Container>
          <h2>너의 건강상태도 알려줘~!</h2>
          {userInfo._id !== '' ? (
            <Link href="/posts/edit">글쓰러 가기</Link>
          ) : (
            <Link href="/login">글쓰러 가기</Link>
          )}
        </Container>
      </MainBanner>
      <Container style={{ marginTop: '90px' }}>
        <Title style={{ marginBottom: 0 }}>원하는 증상을 검색하세요.</Title>
        <Search />
      </Container>
      <Category>
        <Container>
          <Title>카테고리</Title>
          <div className="category">
            {categoryList.map((item, idx) => {
              return (
                <div
                  className="categoryItem"
                  key={idx}
                  // onClick={() =>
                  //   router.push({
                  //     pathname: `/posts/category/lists/${item}`,
                  //   })
                  // }
                >
                  <h2
                    onClick={() =>
                      router.push({ pathname: `/posts/category/lists/${item}` })
                    }
                  >
                    {item}
                  </h2>
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
            <Swiper
              navigation
              spaceBetween={30}
              breakpoints={{
                1200: {
                  slidesPerView: 3.4,
                },
                // when window width is >= 768px
                850: {
                  slidesPerView: 2.5,
                },
                640: {
                  slidesPerView: 1.5,
                },
              }}
            >
              {hot_posts.slice(0, 10).map((item: any, index) => (
                <SwiperSlide key={item._id}>
                  <Link href={`/posts/detail/${item._id}`} passHref>
                    <div className="slideBox">
                      {index === 0 ? (
                        <img
                          className="rankingImg"
                          src={first.src}
                          alt="1순위 아이콘"
                        />
                      ) : index === 1 ? (
                        <img
                          className="rankingImg"
                          src={second.src}
                          alt="2순위 아이콘"
                        />
                      ) : index === 2 ? (
                        <img
                          className="rankingImg"
                          src={third.src}
                          alt="3순위 아이콘"
                        />
                      ) : null}
                      <h2>#{item.category}</h2>
                      <div className="likes">
                        좋아요 <span>{item.likes}</span> 조회수
                        <span>{item.views}</span>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                      <h4>
                        <span>{item.publishedDate.split('T')[0]}</span>{' '}
                        {item.user.info.nickname}
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
          <PostsTable
            table_title="전체 게시물"
            posts={latest_posts}
            getPosts={getLatestPosts}
          />
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

export default Home

// export const getServerSideProps = async () => {}
