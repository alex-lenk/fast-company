import PropTypes from 'prop-types'
import Quality from './Quality'
import {useQualities} from '../../../hooks/useQualities'

const QualitiesList = ({qualities}) => {
  const {isLoading} = useQualities()

  if (isLoading) return 'Загрузка...'

  return (
    <>
      {qualities.map(instance => (
        <Quality key={instance} id={instance}/>
      ))}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array,
}

export default QualitiesList
