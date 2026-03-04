import './BigButton.css'

function BigButton({ onClick, children, variant = 'primary', disabled }) {
  return (
    <button
      type="button"
      className={`big-button big-button--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default BigButton
