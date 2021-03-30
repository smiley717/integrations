import cx from 'classnames'

const Label = props => (
  <label
    className={cx(
      'leading-5 uppercase text-primary-600 text-xs font-semibold',
      props.className
    )}
  >
    {props.children}
  </label>
)

export default Label
