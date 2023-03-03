// _app.tsx = Container das páginas da aplicação //
import { GlobalStyles } from '../styles/global'
import type { AppProps } from 'next/app'
import Image from 'next/image'

import * as Modal from '@radix-ui/react-dialog'

import { CartButton } from '../components/CartButton'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app'
import { CartModal } from '../components/CartModal'
import { ShoppingCartContextProvider } from '../contexts/ShoppingCartContext'

GlobalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ShoppingCartContextProvider>
      <Container>
        <Header>
          <Image src={logoImg} alt="" />

          <Modal.Root>
            <Modal.Trigger asChild>
              <CartButton />
            </Modal.Trigger>

            <CartModal />
          </Modal.Root>
        </Header>

        <Component {...pageProps} />
      </Container>
    </ShoppingCartContextProvider>
  )
}
