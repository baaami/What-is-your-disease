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
// import { Link, useHistory } from 'react-router-dom'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import API from 'service/api'
import PostsTable from 'components/PostsTable'
import Pagination from 'components/Pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Container, NoData, Title } from 'common.styles'
import SwiperCore, { Navigation } from 'swiper'
import thumbnail from 'assets/img/thumbnail.svg'
import like_out from 'assets/img/like_out.svg'
import like_active from 'assets/img/like_active.svg'
import Search from 'components/Search'
import { useRecoilState } from 'recoil'
import { currentUserInfo } from 'store/userInfo'
import { categoryList } from 'static/constant'

const Home: NextPage = () => {
  const router = useRouter()
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
      <Head>
        <title>Dr.u</title>
      </Head>
      <MainBanner>
        <Container>
          <h2>너의 건강상태도 알려줘~!</h2>
          {userInfo._id !== '' ? (
            <Link href="/posts/edit">공유하러 가기</Link>
          ) : (
            <Link href="/login">공유하러 가기</Link>
          )}
        </Container>
      </MainBanner>
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
                  <h2>{item}</h2>
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
                  <Link href={`/posts/detail/${item._id}`} passHref>
                    <a className="popularPost">
                      <>
                        {item.likes === 0 ? (
                          <div
                            className="likeBox"
                            onClick={(e) => e.isPropagationStopped()}
                          >
                            <Image src={like_out} alt="like out icon" />
                            <span style={{ color: '#ebebeb' }}>
                              {item.likes}
                            </span>
                          </div>
                        ) : !item.likeMe.includes(userInfo._id) ? (
                          <>
                            <div
                              className="likeBox"
                              onClick={(e) => e.isPropagationStopped()}
                            >
                              <Image src={like_out} alt="like out icon" />
                              <span style={{ color: '#ebebeb' }}>
                                {item.likes}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div
                            className="likeBox"
                            onClick={(e) => e.isPropagationStopped()}
                          >
                            <Image src={like_active} alt="like active icon" />
                            <span style={{ color: '#EA1F1C' }}>
                              {item.likes}
                            </span>
                          </div>
                        )}
                        <img src={thumbnail.src} alt="기본 이미지" />
                        <div className="descript">
                          <h2>{item.category}</h2>
                          <h3>{item.title}</h3>
                          <h4>
                            {item.user.info.nickname}{' '}
                            <span>{item.publishedDate.split('T')[0]}</span>
                          </h4>
                        </div>
                      </>
                    </a>
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

export default Home

// export const getServerSideProps = async () => {}
