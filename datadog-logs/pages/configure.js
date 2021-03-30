import Fieldset from 'components/fieldset'
import Layout from 'components/layout'
import Skeleton from 'components/skeleton'
import useSWR from 'swr'
import jwt from 'jsonwebtoken'

function ConfigurePage ({ configurationId, sessionExpired }) {
  const { data } = useSWR(
    configurationId && `/api/configurations/${configurationId}`,
    { revalidateOnFocus: false }
  )

  const isLoading = !data

  if (sessionExpired) {
    return (
      <Layout className="flex flex-col items-center text-center text-primary-600">
        <p className="mt-10">Session expired.</p>
        <p className="mt-2">Please go back to your Configuration Page on Vercel.</p>
      </Layout>
    )
  }

  return (
    <Layout className="space-y-4">
      <Fieldset
        title="Configuration Details"
        subtitle="Your logs beeing forwared to Datadog based on your Access Settings on Vercel."
      >
        <div className="space-y-6">
          <div className="flex justify-between">
            <div className="flex text-primary-500 text-sm">
              <b className="mr-1">Region:</b>
              {isLoading ? <Skeleton width={20} height={20} /> : data.region}
            </div>

            <div className="flex text-primary-500 text-sm">
              <b className="mr-1">API Key:</b>
              {isLoading ? (
                <Skeleton width={210} height={20} />
              ) : (
                data.apiKey
              )}
            </div>
          </div>
        </div>
      </Fieldset>
    </Layout>
  )
}

export async function getServerSideProps({ req, query }) {
  const configurationId = query.configurationId
  const auth = req.cookies.auth ? jwt.decode(req.cookies.auth) : undefined

  if (configurationId && configurationId !== auth?.configurationId) {
    return {
      redirect: {
        destination: `https://vercel.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&configurationId=${query.configurationId}`,
        permanent: false
      },
    }
  }

  if (auth) {
    return {
      props: {
        configurationId: auth.configurationId,
        sessionExpired: false
      }
    }
  }

  return {
    props: {
      sessionExpired: true
    }
  }
}

export default ConfigurePage
