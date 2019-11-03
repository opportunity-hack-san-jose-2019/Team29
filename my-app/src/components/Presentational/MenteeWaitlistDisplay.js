import React from 'react'
import PropTypes from 'prop-types'

const MenteeWaitlistDisplay = ({item}) => (
    <div>
        <h3>{item.name}</h3>
        <h4>Email: {item.mentee_email}</h4>
        <p style={{ color: 'blue' }}>Mentee's Message</p>
        {
            item.message
        }
    </div>
)

export default MenteeWaitlistDisplay