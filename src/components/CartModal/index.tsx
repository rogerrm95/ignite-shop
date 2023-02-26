import * as Modal from '@radix-ui/react-dialog'
import Image from 'next/image';

import { FiX } from 'react-icons/fi'

import { CartShopItem, CheckoutButton, CloseButton, ImageContainer, ModalContent, ModalOverlay, ModalTitle, Summary } from "./styles";

import tshirt from '../../assets/1.png'

export function CartModal() {
    return (
        <Modal.Portal>
            <ModalOverlay />

            <ModalContent>

                <ModalTitle>
                    Sacola de compras
                </ModalTitle>

                <ul>
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
                </ul>

                <Summary>
                    <div id='amount'>
                        <span>Quantidade</span>
                        <span>3 itens</span>
                    </div>

                    <div id='total'>
                        <span>Valor total</span>
                        <span>R$ 270,00</span>
                    </div>

                    <CheckoutButton>
                        Finalizar compra
                    </CheckoutButton>
                </Summary>

                <CloseButton>
                    <FiX size={32} />
                </CloseButton>
            </ModalContent>
        </Modal.Portal>
    )
}