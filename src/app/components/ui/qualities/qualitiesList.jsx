import PropTypes from 'prop-types'
import Quality from './Quality'

const QualitiesList = ({qualities}) => {
  return qualities.map(quality => (
    <Quality key={quality} id={quality}/>
  ))
}

QualitiesList.propTypes = {
  qualities: PropTypes.array,
}

export default QualitiesList
