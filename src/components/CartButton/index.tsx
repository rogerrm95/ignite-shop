import { Handbag } from "phosphor-react";
import { Container } from "./styles";

import Dialog from '@radix-ui/react-dialog'
import { ButtonHTMLAttributes } from "react";

interface CartButtonProps extends ButtonHTMLAttributes<HTMLElement> {
    amount: number
}

export function CartButton({ amount, ...rest }: CartButtonProps) {
    return (
        <Container {...rest}>
            <Handbag size={24} weight='bold' />

            {
                amount > 0 && (
                    <span>
                        {amount}
                    </span>
                )
            }
        </Container>
    )
}