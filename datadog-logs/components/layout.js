import cx from 'classnames'
import Logo from 'components/logo'
import Head from 'next/head'

const Layout = props => (
  <div className="flex justify-center min-h-screen font-sans antialiased bg-primary-100">
    <Head>
      <title>Datadog Integration</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="p-6 w-full lg:max-w-3xl lg:mt-8">
      <div className="flex items-center space-x-6">
        <Logo className="h-14 flex-shrink-0" />
        {props.title && <h1 className="text-2xl font-bold">{props.title}</h1>}
      </div>
      <div className={cx('mt-6', props.className)}>{props.children}</div>
    </div>
  </div>
)

export default Layout