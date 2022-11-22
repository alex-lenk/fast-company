import React from 'react'

const Quality = (props) => {
  return <span className={`badge m-1 bg-${props.color}`}>{props.name}</span>
}

export default Quality
