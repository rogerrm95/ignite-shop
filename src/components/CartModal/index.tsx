import { useState } from 'react';
import * as Modal from '@radix-ui/react-dialog'
import Image from 'next/image';
// HOOKS //
import { useShoppingCart } from '@/src/hooks/useShoppingCart';
// ICONS & STYLES //
import { FiX } from 'react-icons/fi'
import tshirt from '../../assets/1.png'

import { CartShopItem, CheckoutButton, CloseButton, ImageContainer, ModalContent, ModalOverlay, ModalTitle, Summary } from "./styles";
import axios from 'axios';

export function CartModal() {
    const { cost, cart, removeItemToShoppingCart } = useShoppingCart()

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    function handleRemoveItemToShoppingCart(productId: string) {
        removeItemToShoppingCart(productId)
    }

    async function handleBuyProducts() {
        try {
            setIsCreatingCheckoutSession(true)

            // Lista dos price ID dos produtos //
            const priceIdList = cart.map(item => {
                return {
                    price: item.data.defaultPriceId,
                    quantity: item.amount
                }
            })

            const response = await axios.post('/api/checkout', priceIdList)

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl
        } catch (error) {
            // Conectar com alguma ferramenta de observabilidade (datadog / Sentry) //

            setIsCreatingCheckoutSession(false)
            alert('Falha ao redirecionar ao checkout')
        }
    }

    return (
        <Modal.Portal>
            <ModalOverlay />

            <ModalContent>

                <ModalTitle>
                    Sacola de compras
                </ModalTitle>

                <ul>
                    {/* ITEM DO CARRINHO */}
                    {
                        cart.map(item => (
                            <CartShopItem key={item.data.id}>
                                <ImageContainer>
                                    <Image src={item.data.imageUrl} alt='' width={90} height={90} />
                                </ImageContainer>

                                <div>
                                    <p>{item.data.name}</p>

                                    <p>
                                        {item.data.priceFormatted}
                                        <span>{`Qtd: ${item.amount}`}</span>
                                    </p>

                                    <button onClick={() => handleRemoveItemToShoppingCart(item.data.id)}>
                                        Remover
                                    </button>
                                </div>
                            </CartShopItem>
                        ))
                    }
                </ul>

                <Summary>
                    <div id='amount'>
                        <span>Quantidade</span>
                        <span>{cart.length ? `${cart.length} item(s)` : `Vazio`}</span>
                    </div>

                    <div id='total'>
                        <span>Valor total</span>
                        <span>{cost}</span>
                    </div>

                    <CheckoutButton onClick={handleBuyProducts} disabled={isCreatingCheckoutSession}>
                        {
                            isCreatingCheckoutSession ? '...' : 'Finalizar compra'
                        }
                    </CheckoutButton>
                </Summary>

                <CloseButton>
                    <FiX size={32} />
                </CloseButton>
            </ModalContent>
        </Modal.Portal>
    )
}