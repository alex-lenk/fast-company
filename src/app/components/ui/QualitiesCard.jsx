import PropTypes from 'prop-types'
import Quality from './qualites/Quality'

const QualitiesCard = ({qualities}) => {
  return (
    <aside className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">

        <h5 className="card-title">
          <span>Качества</span>
        </h5>

        <p>
          {qualities.map(item => (
            <Quality key={item._id} {...item}/>
          ))}
        </p>
      </div>
    </aside>
  )
}

QualitiesCard.propTypes = {
  qualities: PropTypes.array.isRequired
}

export default QualitiesCard
