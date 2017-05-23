import React from 'react'

import './ThingList.css'
import Thing from './Thing'

const ThingList = (props) => {
    return (
        <ul className="ThingList">
            {
                Object
                    .keys(props.things)
                    .map(thingId => <Thing thing={props.things[thingId]} key={thingId}/>)
            }
        </ul>
    )
}

export default ThingList