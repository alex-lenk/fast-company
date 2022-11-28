import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = ({favorite, ...rest}) => {
  const stateFavorite = favorite ? '-heart-fill' : ''

  return (
    <button className="btn" {...rest}>
      <i className={`bi bi-bookmark${stateFavorite}`}>&nbsp;</i>
    </button>
  )
}

Bookmark.propTypes = {
  favorite: PropTypes.bool.isRequired,
}

export default Bookmark
