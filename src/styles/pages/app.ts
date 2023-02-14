import { styled } from "..";

export const Container = styled('div', {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: '100vh'
})

export const Header = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1100,
    margin: '0 auto',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    button: {
        padding: '0.75rem',
        backgroundColor: '$gray800',
        border: 'none',
        borderRadius: 8,
        color: '$gray300',
        cursor: 'pointer',
        transition: 'all 0.3s',

        position: 'relative',

        "&:hover": {
            opacity: 0.7,
            color: '$green500'
        },

        // Notificação //
        '&::after': {
            content: '5',
            width: 20,
            height: 20,
            backgroundColor: '$green300',
            padding: '0.25rem',
            
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 9999,

            position: 'absolute',
            top: -10,
            right: -10
        },
    },

})