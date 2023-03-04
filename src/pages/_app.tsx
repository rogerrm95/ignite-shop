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
import Link from 'next/link'
import { useRouter } from 'next/router'

GlobalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  return (
    <ShoppingCartContextProvider>
      <Container>
        <Header>
          {
            pathname === '/'
              ?
              (
                <Image src={logoImg} alt="" />
              )
              :
              (
                <Link href='/' title='Página Inicial'>
                  <Image src={logoImg} alt="" />
                </Link>
              )
          }

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
