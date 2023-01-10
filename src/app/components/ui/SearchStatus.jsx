import React from 'react'
import declensionWords from '../../utils/declensionWords'
import PropTypes from 'prop-types'

const SearchStatus = ({length}) => {
  const renderPhrase = (number) => {
    return `${number} человек${declensionWords(number, [' тусанет', 'а тусанут', ' тусуются'])}`
  }

  return <>
    {!length ? (
      <div className="alert-danger alert">Никто не тусуются с тобою сегодня</div>
    ) : (
      <div className="alert-primary alert">
        {renderPhrase(length)} с тобою сегодня
      </div>
    )}
  </>
}

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired,
}

export default SearchStatus
