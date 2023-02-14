// _app.tsx = Container das páginas da aplicação //

import { GlobalStyles } from '../styles/global'
import type { AppProps } from 'next/app'
import Image from 'next/image'

import logoImg from '../assets/logo.svg'
import { Handbag } from 'phosphor-react'
import { Container, Header } from '../styles/pages/app'

GlobalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />

        <button>
          <Handbag size={24} weight='bold' />
        </button>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
