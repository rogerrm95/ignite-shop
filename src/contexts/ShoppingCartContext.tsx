import { createContext, ReactNode, useEffect, useState } from 'react'

// Context //
interface ShoppingCartContextData {
    cart: Product[],
    cost: string,
    addItemToShoppingCart: (product: Product) => void,
    clearShoppingCart: () => void,
    removeItemToShoppingCart: (productId: string) => void
}

type Product = {
    amount: number,
    data: {
        id: string,
        name: string,
        imageUrl: string,
        price: number,
        priceFormatted: string,
        description: string,
        defaultPriceId: string
    }
}

export const ShoppingCartContext = createContext<ShoppingCartContextData>({} as ShoppingCartContextData)

// Provider //
interface ShoppingCartContextProviderData {
    children: ReactNode
}

export function ShoppingCartContextProvider({ children }: ShoppingCartContextProviderData) {
    const [cart, setCart] = useState([] as Product[])
    const [cost, setCost] = useState('R$ 0,00')

    // CARREGA O CARRINHO DE COMPRAS SALVO NA LOCAL-STORAGE, SE HOUVER //
    useEffect(() => {
        const storage = localStorage.getItem('@ignite-shop:cart')

        storage ? setCart(JSON.parse(storage)) : setCart([] as Product[])
    }, [])

    //CALCULA O VALOR TOTAL E CONVERTE PARA REAL R$//
    useEffect(() => {
        if (cart.length >= 0) {
            const total = cart.reduce((total, item) => {
                return total + Number(item.data.price)
            }, 0)

            const totalFormatted = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(total)

            setCost(totalFormatted)
        }
    }, [cart])

    function addItemToShoppingCart(product: Product) {
        const newShoppingCartList = [...cart, product]

        setCart(newShoppingCartList)
        localStorage.setItem('@ignite-shop:cart', JSON.stringify(newShoppingCartList))
    }

    function removeItemToShoppingCart(productId: string) {
        const newShoppingCartList = cart.filter(item => item.data.id !== productId)

        setCart(newShoppingCartList)
        localStorage.setItem('@ignite-shop:cart', JSON.stringify(newShoppingCartList))
    }

    function clearShoppingCart() {
        setCart([] as Product[])
        setCost('R$ 0,00')
        localStorage.clear()
    }

    return (
        <ShoppingCartContext.Provider value={{ cart, cost, addItemToShoppingCart, clearShoppingCart, removeItemToShoppingCart }}>
            {
                children
            }
        </ShoppingCartContext.Provider>
    )
}
