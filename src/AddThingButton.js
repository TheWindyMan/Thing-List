import React from 'react'

import './AddThingButton.css'

const AddThingButton = ({ addThing }) => {
  return <button className="AddThingButton" onClick={addThing}>Add Thing</button>
}

export default AddThingButton