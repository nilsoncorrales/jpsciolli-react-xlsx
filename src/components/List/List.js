import React from "react"
import PropTypes from "prop-types"

import "./List.css"

const List = ({ data }) => (
  <section className="list">
    {data.map(({ name, urls }) => (
      <article className="content" key={`${name}${Math.random()}`}>
        <h3 className="list-title">{name}</h3>
        <ul className="list-group">
          {urls.map((link, index) => (
            <li className="list-group-item" key={link}>
              <span className="text">{index + 1}</span>
              <a
                className="link"
                href={link}
                title={link}
                target="_blank"
                rel="noreferrer noopener"
              >
                Enlace
              </a>
            </li>
          ))}
        </ul>
      </article>
    ))}
  </section>
)

List.propTypes = {
  data: PropTypes.any,
}

export default List
