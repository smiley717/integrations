import 'styles/index.css'
import { init } from 'lib/sentry'

init()

export default function App({ Component, pageProps, err }) {
  // Workaround for https://github.com/vercel/next.js/issues/8592
  return <Component {...pageProps} err={err} />
}
