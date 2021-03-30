import Button from 'components/button'
import Error from 'components/error'
import Fieldset from 'components/fieldset'
import Input from 'components/input'
import Layout from 'components/layout'
import Select from 'components/select'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function CallbackPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [region, setRegion] = useState('US')
  const [apiKey, setApiKey] = useState('')
  const [apiKeyError, setApiKeyError] = useState()
  const [genericError, setGenericError] = useState()

  const isLoading = !router.isReady
  const isPerformingLogin = Object.keys(router.query).length === 1 && router.query.code

  useEffect(() => {
    async function verifyLogin(code) {
      await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code
        })
      })

      router.push('/configure')
    }

    if (isPerformingLogin) {
      verifyLogin(router.query.code)
    }
  }, [isPerformingLogin])

  const submit = async () => {
    setIsSubmitting(true)

    const res = await fetch('/api/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        region,
        apiKey,
        code: router.query.code
      })
    })

    if (res.ok) {
      router.push(router.query.next)
    } else {
      const json = await res.json()

      if (json.code === 'invalid-api-key') {
        setApiKeyError(json.message)
      } else {
        setGenericError(json.message)
      }
    }

    setIsSubmitting(false)
  }

  if (isLoading) return <Layout><p className="text-center mt-10 text-gray-600">Loading...</p></Layout>
  if (isPerformingLogin) return <Layout><p className="text-center mt-10 text-gray-600">Verifying Session...</p></Layout>

  return (
    <Layout title="Setup Datadog Integration" className="space-y-4">
      <Fieldset
        title="Set Region"
        subtitle="The region you chose when creating your account."
      >
        <Select
          className="w-20"
          value={region}
          onChange={e => setRegion(e.target.value)}
        >
          <option value="US">US</option>
          <option value="EU">EU</option>
        </Select>
      </Fieldset>

      <Fieldset
        title="Set API Key"
        subtitle={
          <>
            Go to <b>Integrations &gt; APIs</b> on your Datadog dashboard to
            retrieve your API Key.
          </>
        }
      >
        <Input
          className="max-w-sm"
          placeholder="Your Datadog API Key"
          value={apiKey}
          error={apiKeyError}
          onChange={e => setApiKey(e.target.value)}
        />
      </Fieldset>

      <div className="flex items-center justify-between">
        {genericError ? <Error>{genericError}</Error> : <div />}
        <Button
          className="w-full md:w-48"
          onClick={submit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Integration...' : 'Add Integration'}
        </Button>
      </div>
    </Layout>
  )
}

export default CallbackPage
