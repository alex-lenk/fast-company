import PropTypes from 'prop-types'
import {useProfessions} from '../../hooks/useProfession'

const Profession = ({id}) => {
  const {isLoading, getProfession} = useProfessions()
  const prof = getProfession(id)
  if (!isLoading) {
    return <p>{prof.name}</p>
  } else {
    ('loading ...')
  }
}

Profession.propTypes = {
  id: PropTypes.string,
}

export default Profession
