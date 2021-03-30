import cx from 'classnames'
import Label from 'components/label'

const Select = ({ className, label, ...props }) => (
  <div className={className}>
    {label && <Label>{label}</Label>}
    <select
      className={cx(
        'border border-primary-200 rounded h-10 px-3 text-sm focus:ring-0 focus:border-black w-full transition duration-150 ease-in-out',
        { 'mt-1': label }
      )}
      {...props}
    >
      {props.children}
    </select>
  </div>
)

export default Select
