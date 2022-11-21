import React from 'react'

const Bookmark = ({favorite, ...rest}) => {
  const stateFavorite = favorite ? '-heart-fill' : ''

  return (
    <button className="btn" {...rest}>
      <i className={`bi bi-bookmark${stateFavorite}`}>&nbsp;</i>
    </button>
  )
}

export default Bookmark
