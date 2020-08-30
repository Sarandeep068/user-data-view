import React, { useContext, useRef, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus, faUserEdit } from '@fortawesome/free-solid-svg-icons';

import DataTable from 'react-data-table-component';

import { Context } from '../App';

const ButoonStyles = {
    outline: 'none',
    margin: '8px',
    cursor: 'pointer'
}

export default function List() {
    const { userList, removeUser, setEditScreen } = useContext(Context);

    const getActionCell = (user) => {
        return (
            <div>
                <button onClick={() => removeUser(user.id)} style={ButoonStyles}>
                    <FontAwesomeIcon icon={faUserMinus} />
                </button>
                <button onClick={() => setEditScreen(user) } style={ButoonStyles}>
                    <FontAwesomeIcon icon={faUserEdit} />
                </button>
            </div>
        );
    }

    const headers = useMemo(() => [
        {
            name: 'Name',
            selector: 'name',
            id: 'name',
        },
        {
            name: 'Email',
            selector: 'email',
            id: 'email',
        },
        { name: 'Actions', id: 'actions', cell: getActionCell }
    ]);

    return (
        <DataTable
            columns={headers}
            data={userList}
        />
    )
}

