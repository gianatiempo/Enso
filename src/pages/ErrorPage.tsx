import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError() as Error
  console.error(error)

  return (
    <div id="error-page">
      <h1>Uh oh, something went terribly wrong 😩</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          <pre>{error.message || JSON.stringify(error)}</pre>
        </i>
      </p>
    </div>
  )
}
