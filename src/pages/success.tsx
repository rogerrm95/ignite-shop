import { useEffect, useState } from "react";
// NEXT //
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// Hooks //
import { useShoppingCart } from "../hooks/useShoppingCart";
// Stripe //
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
// Styles //
import { SuccessContainer, ImageContainer } from "../styles/pages/success";

interface SuccessProps {
    customerName: string,
    products: Product[]
}

type Product = {
    name: string,
    imageUrl: string
}

export default function Success({ customerName, products }: SuccessProps) {
    const [productListWithThreeItems, setProductListWithThreeItems] = useState([] as Product[])

    const { clearShoppingCart } = useShoppingCart()

    useEffect(() => {
        clearShoppingCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Verifica o tamanho do array //
    // Caso o array for maior que 3, pega apenas os 3 primeiros items para exibir //
    useEffect(() => {
        const productsArrayLength = products.length

        const newProductList = productsArrayLength > 3 ? products.slice(0, 3) : products

        setProductListWithThreeItems(newProductList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Head>
                <title>Compra efetuada | Ignite Shop</title>

                {/* Solicita que o buscadores não busque por está página */}
                <meta name="robots" content="noindex" />
            </Head>

            <SuccessContainer>
                <h1>Compra efetuada!</h1>

                <ul className={`${products.length > 3 ? 'must3items' : ''}`}>
                    {
                        productListWithThreeItems.map(item => (
                            <ImageContainer key={item.name}>
                                <Image src={item.imageUrl[0]} alt='' width={120} height={110} title={item.name} />
                            </ImageContainer>
                        ))
                    }
                </ul>

                <p>
                    Uhuul, <strong>{customerName}</strong>,
                    sua compra de
                    <strong>{` ${products.length} `}</strong>
                    camisetas já estão a caminho da sua casa.
                </p>

                <Link href="/">
                    Voltar ao catálogo
                </Link>
            </SuccessContainer>
        </>
    )

}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if (!query.session_id) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const sessionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details?.name

    // Lista de produtos //
    // Map com as info: images e name//
    const productsList = session.line_items?.data

    const products = productsList ? productsList.map(item => {
        const product = item.price?.product as Stripe.Product
        return {
            name: product.name,
            imageUrl: product.images
        }
    }) : []

    return {
        props: {
            customerName,
            products
        }
    }
}

// Tipos de Fetch //
// Client-Side (useEffect) / getStaticProps / getServerSideProps // 
