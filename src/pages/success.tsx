import Link from "next/link";
import { SuccessContainer, ImageContainer } from "../styles/pages/success";

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

            <Link href="/">
                Voltar ao catálogo
            </Link>
        </SuccessContainer>
    )
}