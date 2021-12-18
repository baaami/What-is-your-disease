import * as React from 'react'
import { HomeContainer } from '../../styles/Home.styles'
import Search from '../../components/Search'

interface IHomeProps {}

export default function Home(props: IHomeProps) {
  return (
    <HomeContainer>
      <Search />
    </HomeContainer>
  )
}
