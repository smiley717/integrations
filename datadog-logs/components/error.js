import cx from 'classnames'

const Error = props => (
  <div className={cx('flex text-sm text-error', props.className)}>
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 8v4" stroke="currentColor"></path>
      <path d="M12 16h.01" stroke="currentColor"></path>
    </svg>
    <b className="ml-2 font-bold">Error:</b>
    <span className="ml-2">{props.children}</span>
  </div>
)

export default Error
