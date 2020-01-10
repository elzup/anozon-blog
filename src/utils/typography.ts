import Typography from 'typography'
import theme from 'typography-theme-ocean-beach'

theme.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
  }
}

theme.googleFonts.push({ name: 'Noto+Sans+JP', styles: ['400'] })

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
