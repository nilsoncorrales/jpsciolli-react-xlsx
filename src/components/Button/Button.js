import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import "./Button.css"

const Button = ({ type, text, onClick }) => (
  <button
    className={classNames("button", {
      [`type-${type}`]: type,
    })}
    onClick={onClick}
  >
    {text}
  </button>
)

Button.propTypes = {
  type: PropTypes.oneOf(["primary"]),
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

Button.defaultProps = {
  type: "primary",
  onClick: () => {},
}

export default Button
