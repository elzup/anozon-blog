type NavigatorShare = {
  share?: (data?: ShareData) => Promise<void>
} & Navigator
type ShareData = {
  title?: string
  text?: string
  url?: string
}

let navigatorShare: NavigatorShare | undefined

if (typeof navigator !== 'undefined') {
  navigatorShare = navigator as NavigatorShare
}

export const isEnableShareAPI = Boolean(navigatorShare?.share)

export function share(props: ShareData) {
  if (!navigatorShare || isEnableShareAPI) {
    alert('Web Share API is not supported!!')
  }
  navigatorShare
    .share(props)
    .then(() => {
      console.log('Successful share')
    })
    .catch((error) => {
      console.log('Error sharing', error)
    })
}
