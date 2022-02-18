import al from "../assets/img/arrow_left.svg";
import ar from "../assets/img/arrow_right.svg";
import styled from "styled-components";

/** 테이블 페이지네이션 */
interface PaginationModel {
  total_count: number;
  per_page: number;
  current_page: number;
  block: number;
  onChange?: (page: number) => void;
}

const Pagination = (props: PaginationModel) => {
  const { total_count, per_page, current_page, block, onChange } = props;

  const _total_count = total_count < per_page ? per_page : total_count;

  /* 표현 가능한 최대 페이지 */
  const _max_page = Math.ceil(_total_count / per_page);

  /* 첫 페이지 */
  const _start_page = Math.floor((current_page - 1) / block) * block + 1;

  /* 마지막 페이지 */
  const __end_page = _start_page + block - 1;
  const _end_page = __end_page > _max_page ? _max_page : __end_page;

  if (_start_page > _end_page) {
    return <></>;
  }

  /* 이전으로 활성화 여부 */
  const _prev_active = current_page !== 1;

  /* 다음으로 활성화 여부 */
  const _next_active = _max_page !== current_page;

  if (total_count < 1) {
    return <></>;
  }

  const _onClickNext = () => {
    _onClickPage(current_page + 1);
  };

  const _onClickPrev = () => {
    _onClickPage(current_page - 1);
  };

  const _onClickPage = (e: number) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <PaginationWrap className="pagination">
      <button
        onClick={_onClickPrev}
        disabled={!_prev_active}
        className="arrow-btn prev-btn rel"
      >
        <img className="abs" src={al.src} alt="아이콘" />
      </button>
      <span className="page-num-wrap ta-c">
        {1 < _start_page ? (
          <>
            <button onClick={() => _onClickPage(1)} className="ml-5">
              1
            </button>
            <button
              onClick={() => _onClickPage(_start_page - 1)}
              className="ml-5 three-dot"
            >
              ···
            </button>
          </>
        ) : (
          <></>
        )}
        {Array(_end_page - _start_page + 1)
          .fill(0)
          .map((item, index) => item + index + _start_page)
          .map((item) => {
            return (
              <button
                key={item}
                onClick={() => _onClickPage(item)}
                className={`${
                  item === current_page ? "current-page ml-5" : "ml-5"
                }`}
              >
                {item}
              </button>
            );
          })}
        {_end_page < _max_page ? (
          <>
            <button
              onClick={() => _onClickPage(_end_page + 1)}
              className="ml-5 three-dot"
            >
              ···
            </button>
            <button onClick={() => _onClickPage(_max_page)} className="ml-5">
              {_max_page}
            </button>
          </>
        ) : (
          <></>
        )}
      </span>
      <button
        onClick={_onClickNext}
        disabled={!_next_active}
        className="arrow-btn next-btn rel"
      >
        <img className="abs" src={ar.src} alt="아이콘" />
      </button>
    </PaginationWrap>
  );
};

export default Pagination;

const PaginationWrap = styled.div`
  @import "../../module";

  &.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    margin-bottom: 30px;
    margin-top: 30px;
    .ml-5 {
      margin-left: 10px;
    }
    .arrow-btn {
      margin: 0 5px;
    }
    .page-num-wrap {
      margin: 0 10px;
      button {
        width: 30px;
        height: 30px;
        border: 1px solid #c4c4c4;
        color: #c4c4c4;
        font-size: 16px;

        &.current-page {
          color: #1850a3;
          border-color: #1850a3;
        }
        &:first-child {
          &.ml-5 {
            margin-left: 0;
          }
        }
      }
    }

    button:disabled {
      cursor: not-allowed;
      .img-holder {
        filter: grayscale(1) brightness(2);
      }
    }

    .three-dot {
      background: transparent;
      border: none !important;
    }
  }
`;
