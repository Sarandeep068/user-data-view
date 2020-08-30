import React, { useState, useEffect, createContext, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripHorizontal, faGripLines, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Display from './components/Display';

const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    margin: '24px auto 0',
}

const fontStyles = {
    fontSize: '32px',
    color: '#4ef509',
    fontWeight: 800,
    fontStyle: 'italic'
}

const optionsContainer ={
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const SearchContainer = { position: "relative", width: '40%', marginRight: '24px' };

const inputStyles = {
    height: '44px',
    border: '3px solid #15b70a',
    borderRadius: '6px',
    outline: 'none',
    width: '100%',
    marginRight: '16px',
    paddingRight: '32px'
}

const ClearSearchButtonStyle = {
    position: "absolute",
    top: '12px',
    right: '0px',
    marginRight: '8px',
    outline: 'none',
    cursor: 'pointer',
    color: '#15b70a'
};

const refreshStyles = {
    backgroundColor: '#06a212',
    padding: '15px',
    color: '#fff',
    outline: 'none',
    marginRight: '16px',
    cursor: 'pointer',
    border: '1px solid #06a212',
    borderRadius: '6px',
}

const viewButtonStyles = {
    fontSize: '30px',
    color: '#1b8019',
    outline: 'none',
    border: '1px solid #1b8019',
    padding: '8px',
    borderRadius: '6px',
    marginRight: '8px',
    cursor: 'pointer'
}

export const Context = createContext({});

const App = () => {
    const [ viewType, setViewType ] = useState(1);
    const [ searchString, setSearchString ] = useState('');
    const [ userList, setUserList ] = useState([]);
    const [ editScreenShowed,  toggleEditScreen ] = useState(false);
    const [ editUserData, setEditUserData ] = useState(null);
    const [ newUserScreen, setNewUserScreen ] = useState(null);

    useEffect(() => {
        fetchUserList();
    }, [])

    const fetchUserList = () => {
        setUserList([]);
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => setUserList(data));
    }

    const changeViewTypeHandler = type => {
        setViewType(type);
    }

    const filteredUserList = () => {
        return userList.filter(user => {
            return  user.name.match(new RegExp(searchString, 'ig')) ||
                    user.email.match(new RegExp(searchString, 'ig'))
        })
    }

    const removeUser = id => {
        const newUserList = userList.filter(user => user.id !== id);
        setUserList(newUserList);
    }

    const editUser = () => {
        if(newUserScreen) {
            const newUserList = [...userList, {...editUserData, id: Date.now()}];
            setUserList(newUserList);
        }
        else {
            const newUserList = userList.map(user => {
                if(editUserData.id === user.id) {
                    return {...user, ...editUserData};
                }

                return user;
            });

            setUserList(newUserList);
        }

        toggleEditScreen(false);
    }

    const setEditScreen = user => {
        toggleEditScreen(true);

        if(user) {
            setNewUserScreen(false);
            setEditUserData(user);
        }
        else {
            setNewUserScreen(true);
            setEditUserData({});
        }
    }

    const saveUserData = (type, e) => {
        setEditUserData({ ...editUserData, [type]: e.target.value });
    }

    return (
        <Context.Provider value={{ userList: filteredUserList(), viewType, searchString, removeUser, setEditScreen}}>
            <div style={containerStyles}>
                {!editScreenShowed
                    ? (
                        <Fragment>
                            <div style={fontStyles}>User Data</div>
                            <div style={optionsContainer}>
                                <div style={SearchContainer}>
                                    <input value={searchString} onChange={(e) => setSearchString(e.target.value)} style={inputStyles} />
                                    {searchString.length !== 0 &&
                                        <button onClick={() => setSearchString('')} style={ClearSearchButtonStyle}>
                                            <FontAwesomeIcon icon={faTimesCircle} />
                                        </button>
                                    }
                                </div>
                                <button onClick={fetchUserList} style={refreshStyles}>Refresh List</button>
                                <button onClick={() => setEditScreen()} style={refreshStyles}>Add User</button>
                                <button onClick={() => changeViewTypeHandler(1)} style={viewButtonStyles}>
                                    <FontAwesomeIcon icon={faGripHorizontal} />
                                </button>
                                <button onClick={() => changeViewTypeHandler(2)} style={viewButtonStyles}>
                                    <FontAwesomeIcon icon={faGripLines} />
                                </button>
                            </div>
                            <Display />
                        </Fragment>
                    )
                    : (
                        <Fragment>
                            <div style={fontStyles}>{newUserScreen ? 'Add New User' :'User Edit'}</div>
                            <div style={optionsContainer}>
                                <label> User Name</label>
                                <input
                                    value={editUserData.name}
                                    onChange={(e) => saveUserData('name', e)}
                                    style={inputStyles}
                                />
                                <label> User Email</label>
                                <input
                                    value={editUserData.email}
                                    onChange={(e) => saveUserData('email', e)}
                                    style={inputStyles}
                                />
                                <button
                                    onClick={() => toggleEditScreen(false)}
                                    style={{ ...refreshStyles, backgroundColor: '#fff', color: '#06a212' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => editUser()}
                                    style={!(editUserData.name && editUserData.email) ? {...refreshStyles, opacity: 0.5} : refreshStyles}
                                    disabled={!(editUserData.name && editUserData.email)}
                                >
                                    Save
                                </button>
                            </div>
                        </Fragment>
                    )
                }
            </div>
        </Context.Provider>
    )
};

export default App;
