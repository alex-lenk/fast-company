import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {toast} from 'react-toastify'
import qualitiesService from '../services/quality.service'

const QualitiesContext = React.createContext()

export const useQualities = () => {
  return useContext(QualitiesContext)
}

export const QualitiesProvider = ({children}) => {
  const [isLoading, setLoading] = useState(true)
  const [qualities, setQualities] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getQualitiesList()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  async function getQualitiesList() {
    try {
      const {content} = await qualitiesService.get()
      setQualities(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function getQualitiesById(id) {
    return qualities.find((item) => String(item._id) === String(id))
  }

  function errorCatcher(error) {
    const {message} = error.response.data
    setError(message)
  }

  return (
      <QualitiesContext.Provider
          value={{isLoading, qualities, getQualitiesById}}
      >
        {children}
      </QualitiesContext.Provider>
  )
}
QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
