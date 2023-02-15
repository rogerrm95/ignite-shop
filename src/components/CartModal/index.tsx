import * as Modal from '@radix-ui/react-dialog'
import Image from 'next/image';

import { CartShopItem, FinishBuyButton, ImageContainer, ModalContent, ModalOverlay, ModalTitle, Summary } from "./styles";

import tshirt from '../../assets/1.png'

export function CartModal() {
    return (
        <Modal.Portal>
            <ModalOverlay />

            <ModalContent>

                <ModalTitle>
                    Sacola de compras
                </ModalTitle>
    
                {/* ITEM DO CARRINHO */}
                <CartShopItem>
                    <ImageContainer>
                        <Image src={tshirt} alt="" width={90} height={90} />
                    </ImageContainer>

                    <div>
                        <p>Camiseta Beyond the Limits</p>

                        <span>R$ 79,90</span>

                        <button>Remover</button>
                    </div>
                </CartShopItem>

                <Summary>

                </Summary>

                <FinishBuyButton>
                    Finalizar compra
                </FinishBuyButton>
            </ModalContent>
        </Modal.Portal>
    )
}