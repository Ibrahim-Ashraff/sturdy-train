import React, { useState } from 'react'
import { ContainedButton, GrayButton } from "components/UI/Button/Button";

const AddRelationshipForm = props => {
    const initialFormState = { id: null, relationship: '' }
    const [user, setUser] = useState(initialFormState)

    const handleInputChange = event => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }

    return (
        <form
            onSubmit={event => {
                event.preventDefault()
                if (!user.relationship) return

                props.addUser(user)
                setUser(initialFormState)
            }}
        >
            <div className="form">

                <div className="form-group">
                    <label
                    // className="form label"
                    >Relationship</label>
                    <div className="flex">
                        <input type="text"
                            className="form-input"
                            name="relationship"
                            placeholder="e.g brother, father, mother etc"
                            value={user.relationship}
                            onChange={handleInputChange} />
                        <ContainedButton
                            classess="small ml-2"
                            onClick={props.onClick}
                            disabled={user.relationship.length === 0}
                        >

                            Save
                        </ContainedButton>
                    </div>

                </div>
            </div>




        </form>
    )
}

export default AddRelationshipForm