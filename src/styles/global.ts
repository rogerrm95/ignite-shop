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
    }
})