import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'

import { HomeContainer, Product } from '../styles/pages/home'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: number
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
        <title>Ignite Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <HomeContainer ref={sliderRef} className='keen-slider'>

        {
          products.map(product => {
            return (
              <Product className='keen-slider__slide' key={product.name}>
                <Image src={product.imageUrl} alt='Camisa 3' width={520} height={480} />

                <footer>
                  <strong>{product.name}</strong>
                  <span>R$ {product.price}</span>
                </footer>
              </Product>
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

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount ? (price.unit_amount / 100) : 0, // Salvar preços em centavos //
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