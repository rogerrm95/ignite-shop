import { styled } from "@/src/styles"

export const Container = styled('button', {
    padding: '0.75rem',
    backgroundColor: '$gray800',
    border: 'none',
    borderRadius: 8,
    color: '$gray300',
    cursor: 'pointer',
    transition: 'all 0.3s',

    position: 'relative',

    "&:hover": {
        opacity: 0.8,
        color: '$green500'
    },

    // Notificação //
    'span': {
        width: 20,
        height: 20,
        backgroundColor: '$green300',
        color: '$white',
        padding: '0.75rem',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9999,

        position: 'absolute',
        top: -10,
        right: -10,

        overflow: 'hidden',
    },
})