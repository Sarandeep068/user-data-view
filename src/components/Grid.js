import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus, faUserEdit } from '@fortawesome/free-solid-svg-icons';

import { Context } from '../App';

const GridContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
}

const NoRecorderContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '80px'
}

const Card = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid green',
    padding: '16px',
    margin: '16px',
    width: '25%',
    minWidth: '220px'
}

const ButoonStyles = {
    outline: 'none',
    margin: '8px',
    cursor: 'pointer'
}

export default function Display() {
    const { userList, removeUser, setEditScreen } = useContext(Context);

    if(userList.length === 0) {
        return <div style={NoRecorderContainer}>There are no records to display</div>
    }

    return (
        <div style={GridContainer}>
            {
                userList.map(user => (
                    <div key={user.id}  style={Card}>
                        <div>
                            {user.name}
                        </div>
                        <div>
                            {user.email}
                        </div>
                        <div>
                            <button onClick={() => removeUser(user.id)} style={ButoonStyles}>
                                <FontAwesomeIcon icon={faUserMinus} />
                            </button>
                            <button onClick={() => setEditScreen(user) } style={ButoonStyles}>
                                <FontAwesomeIcon icon={faUserEdit} />
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

