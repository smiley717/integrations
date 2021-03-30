import cx from 'classnames'

const Skeleton = ({ className, width, height = 24 }) => (
  <div
    className={cx(
      'flex flex-grow leading-5 animate-pulse bg-primary-200 rounded',
      className
    )}
    style={{ width, height }}
  />
)

export default Skeleton
