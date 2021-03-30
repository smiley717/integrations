import React from 'react'
import cx from 'classnames'

const Button = ({ type, size, className, children, ...props }, ref) => {
  const types = {
    default:
      'bg-black border-black text-white active:bg-primary-100 hover:text-black hover:bg-white',
    secondary:
      'bg-white border-primary-200 text-primary-600 active:bg-primary-100 hover:text-black hover:border-black'
  }

  const sizes = {
    default: 'h-10',
    small: 'h-8'
  }

  const classesForType = types[type] || types['default']
  const classesForSize = sizes[size] || sizes['default']

  return (
    <button
      type="button"
      className={cx(
        'block font-medium border rounded px-3 text-sm transition duration-150 ease-in-out focus:outline-none disabled:bg-primary-100 disabled:border-primary-200 disabled:text-primary-300 disabled:cursor-not-allowed',
        classesForType,
        classesForSize,
        className
      )}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  )
}

export default React.forwardRef(Button)
