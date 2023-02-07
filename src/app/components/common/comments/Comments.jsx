import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {orderBy} from 'lodash'
import api from '../../../api'
import FormComment from './FormComment'
import ListComments from './ListComments'

const Comments = () => {
  const {userId} = useParams()
  const [comments, setComments] = useState([])
  useEffect(() => {
    api.comments
      .fetchCommentsUser(userId)
      .then((data) => setComments(data))
  }, [])

  const handleAddComment = data => {
    api.comments
      .add({...data, pageId: userId})
      .then(data => setComments([...comments, data]))
  }

  const sortedComments = orderBy(comments, ['created_at'], ['desc'])

  const handleRemoveComment = id => {
    api.comments.remove(id).then(id => setComments(
      comments.filter(instance => instance._id !== id)
    ))
  }

  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <FormComment onSubmit={handleAddComment}/>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body ">
          <h2>Комментарии</h2>

          <hr/>

          {sortedComments.length > 0 ? (
              <ListComments
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            )
            : 'Комментариев пока нет, будьте первым!'
          }
        </div>
      </div>
    </>
  )
}

export default Comments
