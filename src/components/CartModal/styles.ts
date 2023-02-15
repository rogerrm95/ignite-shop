import { styled } from '@/src/styles'
import * as Modal from '@radix-ui/react-dialog'

export const ModalOverlay = styled(Modal.Overlay, {
    width: '100vw',
    height: '100vh',
    inset: 0,
    position: 'fixed',

    background: 'rgba(0, 0, 0, 0.5)'
})

export const ModalContent = styled(Modal.Content, {
    width: '100vw',
    maxWidth: '480px',
    height: '100vh',

    backgroundColor: '$gray800',

    position: 'fixed',
    top: 0,
    right: 0,

    padding: '3rem',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
})

export const ModalTitle = styled(Modal.Title, {
    fontSize: '$lg',
    marginBottom: '2rem',
})

export const CartShopItem = styled('div', {
    height: 94,
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',

    div: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',

        p: {
            fontSize: '$md',
            lineHeight: '160%',
            color: 'gray300'
        },

        span: {
            fontSize: '$md',
            fontWeight: 'bold',
            lineHeight: '160%',
            color: 'gray100',
        },

        button: {
            marginTop: '0.5rem',
            fontWeight: 'bold',
            color: '$green500',

            transition: 'color 0.3s',

            '&:hover': {
                color: '$green300'
            },
        },
    },
})

export const ImageContainer = styled('div', {
    width: '100%',
    maxWidth: 94,
    height: 94,

    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    objectFit: 'cover',
})

// ... //
export const Summary = styled('div', {
    
})
export const FinishBuyButton = styled('button', {

})