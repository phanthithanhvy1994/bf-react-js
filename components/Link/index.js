import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './styles.scss'

const UILink = ({ text, href='#', children, target='' }) => {
  return <div className='wrapper-a'><Link to={{ pathname: href }} target={target}>{text ? text : children}</Link></div>
}


UILink.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  href: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

export default UILink