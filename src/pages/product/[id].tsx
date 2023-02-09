import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import Stripe from "stripe"

import { stripe } from '../../lib/stripe'

import axios from 'axios'
import { useState } from "react"


interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string,
        defaultPriceId: string
    }
}

export default function Product({ product }: ProductProps) {
    const { isFallback } = useRouter()

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl


        } catch (error) {
            // Conectar com alguma ferramenta de observabilidade (datadog / Sentry) //

            setIsCreatingCheckoutSession(false)
            alert('Falha ao redirecionar ao checkout')
        }
    }

    if (isFallback) {
        return <p>Loading...</p>
    }

    return (
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt='' />

            </ImageContainer>

            <ProductDetails>
                <h1>{product.name}</h1>

                <span>{product.price}</span>

                <p>
                    {product.description}
                </p>

                <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession}>
                    {
                        isCreatingCheckoutSession ? '...' : 'Comprar agora'
                    }
                </button>
            </ProductDetails>
        </ProductContainer>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Buscar os produtos mais vendidos / mais vendidos //

    return {
        paths: [
            { params: { id: 'prod_NEnYsfsf5m9DkQ' } }
        ],
        fallback: true // false or blocking //
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    if (params?.id) {
        const productId = params.id

        const product = await stripe.products.retrieve(productId, {
            expand: ['default_price']
        })

        const price = product.default_price as Stripe.Price
        const priceFormatted = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price.unit_amount ? (price.unit_amount / 100) : 0)

        return {
            props: {
                product: {
                    id: product.id,
                    name: product.name,
                    imageUrl: product.images[0],
                    price: priceFormatted, // Salvar preços em centavos //
                    description: product.description,
                    defaultPriceId: price.id
                }
            },
            revalidate: 60 * 60 * 1,
        }
    } else {
        return {
            props: {

            },
            revalidate: 60 * 60 * 1,
        }
    }
}

// ANOTAÇÕES //

/*
* Exemplo para rota interna * 
    const router = useRouter()
    router.push('/checkout') 

* Exemplo para rota externa *
    window.location.href = checkoutUrl // rota externa //
*/

/*
// GET STATIC PATH //
// Utilizado quando uma página possui algum parâmetro a ser recebido //
// Ex: ID do produto //
*/