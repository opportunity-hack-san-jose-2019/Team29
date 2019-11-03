import React from 'react'
import PropTypes from 'prop-types'

const MentorDisplay = ({item}) => (
    <div>
        <h3>{item[1].name}</h3>
        <h4>Email: {item[0].email}</h4>
        <h4>Preferece Matching Percentage: {item[2].preference_Count}%</h4>
        <h4>Profile Matching Percentage: {item[3].profile_Count}%</h4>
        <p style={{ color: 'blue' }}>Matched Preference</p>
        {
            item[5].preferenceList.map((param, key) => (
                <p>{param.key}: {param.value}</p>
            ))
        }
        <p style={{ color: 'blue' }}>Matched Profile</p>
        {
            item[4].profileList.map((param, key) => (
                <p>{param.key}: {param.value}</p>
            ))
        }
    </div>
)

export default MentorDisplay