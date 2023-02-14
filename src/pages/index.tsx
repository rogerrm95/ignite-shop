import { GetStaticProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'

import { HomeContainer, Product } from '../styles/pages/home'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { Handbag } from 'phosphor-react'

interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className='keen-slider'>

        {
          products.map(product => {
            return (
              <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
                <Product className='keen-slider__slide'>
                  <Image src={product.imageUrl} alt="" width={520} height={480} />

                  <footer>
                    <div>
                      <strong>{product.name}</strong>
                      <span>{product.price}</span>
                    </div>

                    <button>
                      <Handbag size={24} weight='bold' />
                    </button>
                  </footer>
                </Product>
              </Link>
            )
          })
        }
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const response = await stripe.products.list({
    expand: ['data.default_price']
  })


  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    const priceFormatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price.unit_amount ? (price.unit_amount / 100) : 0)

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: priceFormatted, // Salvar preços em centavos //
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 // Em segundos - 1 hora //
  }
}

// getStaticProps: não possui acesso ao contexto da requisição (req, res, params etc...) //
// getServerSideProps: possui acesso ao contexto da requisição (req, res, params etc...) //