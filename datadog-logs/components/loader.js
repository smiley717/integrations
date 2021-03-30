const Loader = props => (
  <div className="flex items-center justify-center w-full">
    {props.children || 'Loading'}...
  </div>
)

export default Loader
