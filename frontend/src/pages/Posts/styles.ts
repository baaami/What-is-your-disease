import styled from 'styled-components'

export const PostEditContainer = styled.div`
    padding: 200px 0;

    .wrap{
        padding: 30px;
        background: #f6f6f6;
        border-radius: 4px;

        .ant-select-selector{
            height: 46px;

            span{
                line-height: 45px;
                font-size: 18px;
            }
        }
        .ant-select-arrow{
            color: #333;
        }

        #posts_title{
            margin-top: 20px;
            height: 60px;
        }

        .quill{
            height: 600px;
            margin-bottom: 70px;
            background: #fff;

            & *{
                background: #fff;
            }
        }

        .btnWrap{
            text-align: end;

            button{
                background: #1850A3;
            }
        }
    }
`
export const HashTagSection = styled.div`
    .hashWrap{
        .ant-tag{
            height: 35px;
            line-height: 32px;
            padding: 0 15px;
            font-size: 16px;

            span{
                padding-left: 10px;
            }
        }
    }

    .hashInput{
        width: 200px !important;
        height: 45px;
        padding: 0 15px;

        &::placeholder{
            color: #666;
        }
    }
`