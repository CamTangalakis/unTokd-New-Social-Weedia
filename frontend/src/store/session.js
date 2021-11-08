import {csrfFetch} from './csrf'

const ADD_USER = 'session/add'
const DEL_USER = 'session/del'

export const add = (user) => {
    return {
        type: ADD_USER,
        payload: user
    }
}

export const del = () => {
    return {
        type: DEL_USER
    }
}

export const login = (user) => async (dispatch) => {
    const {credential, password} = user
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({credential, password})
    })
    const newUser = await response.json()
    dispatch(add(newUser.user))
    return response
}

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session')
    const res = await response.json()
    dispatch(add(res.user))
    return response
}

export const signup = (user) => async (dispatch) => {
    console.log('sign out!!!!!!!!!!!!!!!!!!!!!!!')
    const {username, email, password} = user
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username, email, password
        })
    })
    const data = await response.json()
    dispatch(add(data.user))
    return response
}

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: "DELETE"
    })
    dispatch(del())
    return response;
}

const sessionReducer = (state={user:null}, action) => {
    let newState
    switch(action.type){
        case ADD_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case DEL_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state
    }
}

export default sessionReducer