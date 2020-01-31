type NavigatorShare = {
  share?: (data?: ShareData) => Promise<void>
}
type ShareData = {
  title?: string
  text?: string
  url?: string
}

const navigatorShare = navigator as Navigator & NavigatorShare

export const isEnableShareAPI = Boolean(navigatorShare.share)

export function share(props: ShareData) {
  if (isEnableShareAPI) {
    navigatorShare
      .share(props)
      .then(() => {
        console.log('Successful share')
      })
      .catch(error => {
        // シェアせず終了した場合もここに入ってくる。
        console.log('Error sharing', error)
      })
  } else {
    alert('Web Share API is not supported!!')
    // Web Share API未対応ブラウザ向けのフォールバックを実装する。
  }
}
