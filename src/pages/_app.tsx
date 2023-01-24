// _app.tsx = Container das páginas da aplicação //

import { GlobalStyles } from '../styles/global'
import type { AppProps } from 'next/app'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app'

GlobalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <Header>
        <img src={logoImg.src} alt=""/>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
