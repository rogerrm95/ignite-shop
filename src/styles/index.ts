import { createStitches } from '@stitches/react'

export const { css, keyframes, styled, globalCss, theme, config, createTheme, getCssText } = createStitches({
    theme: {
        colors: {
            white: '#FFF',

            gray900: '#121214',
            gray800: '#202024',
            gray300: '#c4c4cc',
            gray100: '#e1e1e6',

            green500: '#00875f',
            green300: '#00b37e',
        }
    }
})