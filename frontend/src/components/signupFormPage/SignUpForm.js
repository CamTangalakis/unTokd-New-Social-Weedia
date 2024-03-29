import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './signup.css'

import * as sessionActions from '../../store/session';

const SignUpFormPage = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [owner, setOwner] = useState(false)
    const [errors, setErrors] = useState([])
    console.log(owner, '<------==-=-=-')

    const onSubmit = async(e) => {
        e.preventDefault()
        if(password === confirmPassword){
            setErrors([])
            return dispatch(sessionActions.signup({email, username, password, owner}))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
            });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    }

    return (
        <form className='signUpForm' onSubmit={onSubmit}>
            <ul>
                {errors.map(e=> <li key={e}>{e}</li>)}
            </ul>
            <h3 id='signUpHeader'>Sign Up</h3>
            <label id='signUpField'>Username:</label>
                <input
                    type='text'
                    placeholder='Enter username'
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)} />
            <label id='signUpField'>Email:</label>
                <input
                    type='text'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)} />
            <div className='ownerButtons'>
                <input name='owner' type='radio' value='true' className='ownerButton' onClick={(e)=>setOwner(e.target.value)}/>
                <label>Owner</label>
                <input name='owner' type='radio' value='false' className='ownerButton' onClick={(e)=>setOwner(e.target.value)}/>
                <label>Stoner</label>
            </div>
            <label id='signUpField'>Password:</label>
                <input
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} />
            <label id='signUpField'>Confirm Password:</label>
                <input
                    type='password'
                    placeholder='Enter password again'
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)} />
            <button id='signUpButton' type='submit'>Sign Up</button>
        </form>
    )
}

export default SignUpFormPage
