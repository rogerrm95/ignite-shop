<<<<<<< refs/remotes/origin/main
=======
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
>>>>>>> local
import Link from "next/link";
import { SuccessContainer, ImageContainer } from "../styles/pages/success";

<<<<<<< refs/remotes/origin/main
export default function Success(){
    return(
        <SuccessContainer>
            <h1>Compra efetuada!</h1>

            <ImageContainer>

            </ImageContainer>

            <p>
                Uhuul, <strong>Diego Fernandes</strong>, 
                sua compra de <strong>3 camisetas</strong> já estão a caminho da sua casa. 
            </p>
=======
interface SuccessProps {
    customerName: string,
    product: {
        name: string,
        imageUrl: string
    }
}

export default function Success({ customerName, product }: SuccessProps) {
    return (
        <>
            <Head>
                <title>Compra efetuada | Ignite Shop</title>

                {/* Solicita que o buscadores não busque por está página */}
                <meta name="robots" content="noindex" />
            </Head>

            <SuccessContainer>
                <h1>Compra efetuada!</h1>
>>>>>>> local

                <ImageContainer>
                    <Image src={product.imageUrl} alt='' width={120} height={110} />
                </ImageContainer>

                <p>
                    Uhuul, <strong>{customerName}</strong>,
                    sua compra de <strong>{product.name}</strong> já está a caminho da sua casa.
                </p>

                <Link href="/">
                    Voltar ao catálogo
                </Link>
            </SuccessContainer>
        </>
    )
<<<<<<< refs/remotes/origin/main
}
=======
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
    const product = session.line_items?.data[0].price?.product as Stripe.Product

    return {
        props: {
            customerName,
            product: {
                name: product.name,
                imageUrl: product.images[0]
            }
        }
    }
}

// Tipos de Fetch //
// Client-Side (useEffect) / getStaticProps / getServerSideProps // 
>>>>>>> local
