
//this component is made so that if image picture is loading then this spinner will be shown instead of the image.
import React, { Component } from 'react'
import loading from './loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="Loading..." />
        
      </div>
    )
  }
}

export default Spinner
