import { Handbag } from "phosphor-react";
import { Container } from "./styles";

import Dialog from '@radix-ui/react-dialog'
import { ButtonHTMLAttributes } from "react";
import { useShoppingCart } from "@/src/hooks/useShoppingCart";

interface CartButtonProps extends ButtonHTMLAttributes<HTMLElement> { }

export function CartButton({ ...rest }: CartButtonProps) {
    const { cart } = useShoppingCart()

    return (
        <Container {...rest}>
            <Handbag size={24} weight='bold' />

            {
                cart.length > 0 && (
                    <span>
                        {cart.length}
                    </span>
                )
            }
        </Container>
    )
}