import React from 'react'
import PropTypes from 'prop-types'

const MentorDisplay = ({item}) => (
    <div>
        <h3>{item.name}</h3>
        <h4>{item.email}</h4>
        <p>Matched Preference</p>
        {
            item.pref.map((item, key) => (

                <li
                    key={key}
                    role='presentation'>
                    {item.key} {item.value}
                </li>
            ))
        }
        <p>Matched Profile</p>
    </div>
)

export default MentorDisplay