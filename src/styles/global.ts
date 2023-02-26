import { globalCss } from '.'

export const GlobalStyles = globalCss({
    '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
    },

    body: {
        '-webkit-font-smoothing': 'antialiased',
        backgroundColor: '$gray900',
        color: '$gray100'
    },

    'body, input, textarea, button': {
        fontFamily: 'Roboto',
        fontWeight: 400
    },

    button: {
        outline: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',

        fontSize: '1rem'
    },

    '::-webkit-scrollbar': {
        width: '5px'
    },

    '::-webkit-scrollbar-track ': {
        backgroundColor: '$gray900',
        borderRadius: 99
    },

    '::-webkit-scrollbar-thumb ': {
        backgroundColor: '$green500',
    }
})