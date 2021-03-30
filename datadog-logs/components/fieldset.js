const Fieldset = props => (
  <div className="rounded border border-primary-200 bg-white">
    <div className="px-6 py-6">
      {props.title && <h4 className="text-xl font-semibold">{props.title}</h4>}
      {props.subtitle && <p className="text-sm mt-3">{props.subtitle}</p>}
      <div className="mt-6">{props.children}</div>
    </div>
    {props.footer && (
      <div className="border-t border-primary-200 px-6 py-3 bg-primary-100 rounded-b text-sm text-primary-600">
        {props.footer}
      </div>
    )}
  </div>
)

export default Fieldset
