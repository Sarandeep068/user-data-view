import React, { useContext } from 'react';
import { Context } from '../App';

import Grid from './Grid';
import List from './List';

const LoadingMessageStyles = {
    fontSize: '20px',
    color: 'green'
}

export default function Display() {
    const { userList, searchString,viewType } = useContext(Context);

    if(userList.length === 0 && !searchString.length) {
        return <div style={LoadingMessageStyles}>Loading.................</div>
    }

    return (
        viewType === 1
            ? <Grid />
            : <List />
    )
}

