import cx from 'classnames'
import Error from 'components/error'

const Input = ({ className, type, error, ...props }) => {
  const types = {
    default: 'border-primary-200 placeholder-primary-500 focus:border-black',
    error: 'text-error border-error placeholder-error-light focus:border-error'
  }

  const classesForType =
    types[type] || error ? types['error'] : types['default']

  return (
    <div className={className}>
      <input
        type="text"
        className={cx(
          'block border rounded px-3 h-10 text-sm focus:ring-0 w-full transition duration-150 ease-in-out',
          classesForType
        )}
        {...props}
      />
      {error && <Error className="mt-2">{error}</Error>}
    </div>
  )
}

export default Input
