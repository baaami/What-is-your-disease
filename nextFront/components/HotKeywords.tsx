import React, { useState, useEffect } from 'react'
import API from 'service/api'
import styled from 'styled-components'
// data: "백신"
// freq: 5
// publishedDate: "2022-03-21T11:12:17.712Z"
// __v: 0
// _id: "62385d9140ef82ccc04c7520"
interface keywordsModel {
  data: string
  freq: number
  publishedDate: string
  __v: number
  _id: string
}
const HotKeywords = () => {
  const [keywords_list, setKeywordsList] = useState<keywordsModel[]>([])

  const getHotKeywords = async () => {
    await API.keywords
      .getKeywords()
      .then((res) => {
        setKeywordsList(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const getNowDate = () => {
    const date = new Date()
    return date.toISOString().split('T')[0]
  }

  useEffect(() => {
    getHotKeywords()
  }, [])

  return (
    <HotKeywordsContainer>
      <div className="keywords_title">인기 키워드</div>
      <section className="keywords-wrap">
        {keywords_list.slice(0, 10).map((item, index) => {
          return (
            <>
              <div className="keyword-row d-f f-j-sb">
                <div className="d-f">
                  <i className="fw-700 mr-3">{index + 1}</i>
                  <span className="keyword">{item.data}</span>
                </div>
                <div className="freq">{item.freq}</div>
              </div>
            </>
          )
        })}
      </section>
      <div className="date">{getNowDate()} 기준</div>
    </HotKeywordsContainer>
  )
}

export default HotKeywords

const HotKeywordsContainer = styled.div`
  @keyframes renderKeywords {
    0% {
      height: 0%;
    }
    10% {
      height: 20%;
    }
    30% {
      height: 30%;
    }
    40% {
      height: 40%;
    }
    50% {
      height: 50%;
    }
    60% {
      height: 60%;
    }
    70% {
      height: 70%;
    }
    80% {
      height: 80%;
    }
    90% {
      height: 90%;
    }
    100% {
      height: 100%;
    }
  }
  position: absolute;
  right: 100px;
  top: 100px;
  width: 280px;
  height: 400px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 20px 10px;

  .keywords_title {
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 10px;
  }

  .keywords-wrap {
    animation: renderKeywords 2s;
    max-height: 300px;
    overflow-y: hidden;
    .keyword-row {
      padding: 3px;
      padding-left: 6px;
      i {
        display: inline-block;
        text-align: center;
        width: 20px;
      }

      .keyword {
        display: inline-block;
        width: 76%;
      }

      .freq {
        color: #1850a3;
      }
      &:hover {
        cursor: pointer;
        background-color: rgba(230, 230, 230, 0.5);
        .keyword {
          font-weight: 700;
        }
      }
    }
  }

  .date {
    color: #666;
    font-size: 13px;
    position: absolute;
    bottom: 10px;
    left: 15px;
  }
`
