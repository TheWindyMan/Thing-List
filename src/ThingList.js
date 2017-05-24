import React from 'react'
import './ThingList.css'
import Thing from './Thing'

const ThingList = (props) => {
    const sortThings = (a, b) => {
        return b.match(/\d+/)[0] - a.match(/\d+/)[0]
    }

    return (
        <ul className="ThingList">
            {
                Object
                    .keys(props.things)
                    .sort(sortThings)
                    .map(thingId => <Thing
                                        {...props}
                                        thing={props.things[thingId]}
                                        key={thingId}
                                    />)
            }
        </ul>
    )
}

export default ThingList