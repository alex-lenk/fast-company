import React from 'react'
import declensionWords from '../utils/declensionWords'

const SearchStatus = ({length}) => {
  const renderPhrase = (number) => {
    return `${number} человек${declensionWords(number, [' тусанет', 'а тусанут', ' тусуются'])}`
  }

  return <div className="mb-5">
    {!length ? (
      <div className="alert-danger alert">Никто не тусуются с тобою сегодня</div>
    ) : (
      <div className="alert-primary alert">
        {renderPhrase(length)} с тобою сегодня
      </div>
    )}
  </div>
}

export default SearchStatus
