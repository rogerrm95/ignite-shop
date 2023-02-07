import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import Stripe from "stripe"

import { stripe } from '../../lib/stripe'


interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string
    }
}

export default function Product({ product }: ProductProps) {
    const { query } = useRouter()

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

                <button>Comprar agora</button>
            </ProductDetails>
        </ProductContainer>
    )
}

// GET STATIC PATH //
// Utilizando quando uma página possue algum parâmetro a ser recebido //
// Ex: ID do produto //
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'prod_NEnYsfsf5m9DkQ' } }
        ],
        fallback: false
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
                    description: product.description
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

