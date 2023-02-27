import { styled } from "@stitches/react";

export const SuccessContainer = styled('main', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    height: 656,

    h1: {
        fontSize: '$2xl',
        color: '$gray100'
    },

    p: {
        fontSize: '$xl',
        color: '$gray300',
        maxWidth: 560,
        textAlign: "center",
        marginTop: '2rem',
        lineHeight: 1.4
    },

    a: {
        display: "block",
        marginTop: '5rem',
        color: '$green500',
        fontSize: '$lg',
        fontWeight: 'bold',
        textDecoration: 'none',

        "&:hover": {
            color: '$green300'
        }
    },

    ul: {
        display: 'flex',
    },

    // When has +3 more items //
    ".must3items div:last-of-type::after": {
        content: '+3',
        width: '100%',
        height: '100%',
        backgroundColor: '$gray800',
        opacity: 0.75,

        position: 'absolute',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '$xl'
    }
})

export const ImageContainer = styled('div', {
    width: '100%',
    maxWidth: 130,
    height: 145,

    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.8)',
    borderRadius: '50%',
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    objectFit: 'cover',

    marginTop: '4rem',
    overflow: 'hidden',

    position: 'relative',
    
    "&:not(:first-of-type)": {
        marginLeft: '-2rem',
    },
})