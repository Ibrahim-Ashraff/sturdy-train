import React from 'react'

const GuardianCard = props => (

    <>
        <div className="card">
            {props.guardians.length > 0 ? (
                props.guardians.map(guardian => (
                    <div key={guardian.value}>
                        <span>Name : {guardian.name}</span>
                        <span>Phone: {guardian.phone}</span>
                    </div>
                ))
            ) : <>
                <span>No guardians selected</span>
            </>}
        </div>
    </>
)

export default GuardianCard