import PropTypes from 'prop-types'

const Bookmark = ({status, ...rest}) => {
  const stateFavorite = status ? '-heart-fill' : ''

  return (
    <button className="btn" {...rest}>
      <i className={`bi bi-bookmark${stateFavorite}`}/>
    </button>
  )
}

Bookmark.propTypes = {
  status: PropTypes.bool
}

export default Bookmark
