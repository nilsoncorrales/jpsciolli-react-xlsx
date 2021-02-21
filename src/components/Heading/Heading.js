import React from "react"
import PropTypes from "prop-types"

import "./Heading.css"

const Heading = ({ title, subtitle }) => (
  <section className="heading">
    <h1 className="title">{title}</h1>
    <small className="subtitle">{subtitle}</small>
  </section>
)

Heading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

export default Heading
