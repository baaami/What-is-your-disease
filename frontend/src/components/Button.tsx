import React, { ReactNode } from 'react'
import styled from 'styled-components'
/** Model: Button */
interface ButtonModel {
  id?: string
  children: ReactNode
  margin?: MarginModel
  type: 'button' | 'submit'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  btn_type?: string
  className?: string
  disabled?: boolean
}
interface MarginModel {
  left?: number
  top?: number
  right?: number
  bottom?: number
  className?: string
}

/**
 * Button Component
 */
const Button = (props: ButtonModel) => {
  const {
    id, // Button id
    children, // Button children
    margin, // 버튼 기준 margin
    type, // 버튼 타입 button | submit ...
    onClick, // 클릭 이벤트
    btn_type, // Button Style 타입 : prime , second , tertiary 등... common.scss 내 Button section 참고
    className, // 컴포넌트에 사용할 className
    disabled,
  } = props

  /* 버튼 클릭 이벤트 */
  const _onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick && type === 'button') onClick(e)
  }

  return (
    <StyledButton
      className={`btn ${btn_type ?? ''} ${className ?? ''}`}
      type={type ?? 'button'}
      style={{
        marginTop: margin && margin.top ? margin.top : 0,
        marginBottom: margin && margin.bottom ? margin.bottom : 0,
        marginLeft: margin && margin.left ? margin.left : 0,
        marginRight: margin && margin.right ? margin.right : 0,
      }}
      onClick={_onClick}
      disabled={disabled ?? false}
    >
      {children}
    </StyledButton>
  )
}

export default Button

const StyledButton = styled.button`
  width: 110px;
  height: 45px;
  background-color: #3c6d2e;
  color: white;
  font-size: 18px;
  border-radius: 5px;
  font-weight: 900;
`
