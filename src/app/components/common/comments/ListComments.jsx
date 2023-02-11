import PropTypes from 'prop-types'
import Comment from './Comment'

const ListComments = ({ comments, onRemove }) => {
  return comments.map((comment) => (
    <Comment key={comment._id} {...comment} onRemove={onRemove} />
  ))
}

ListComments.propTypes = {
  comment: PropTypes.array,
  onRemove: PropTypes.func
}

export default ListComments
