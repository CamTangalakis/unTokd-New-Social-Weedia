import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as sessionActions from '../../store/checkin';
import './feed.css'

export default function Feed() {
    const dispatch = useDispatch()
    const checkins = useSelector((state) => state.checkin)
    const currentUser = useSelector((state) => state.session.user)
    // const strains = useSelector((state)=> state)
    // console.log(currentUserId, '<-----------------')
    // console.log(checkins, strains, '<-----------------')
    // const [checkin, setCheckin] = useState()

    // dispatch(sessionActions.getCheckin())

    useEffect(()=> {
        dispatch(sessionActions.getCheckin())
    }, [dispatch])

    function deleteCheckin () {
        dispatch(sessionActions.delCheckin())
    }

    return (
        <div className='feedLayout'>
            <h1>feed</h1>
                {Object.keys(checkins).map((key) =>
                <div id='feedParts'>

                    <a href='/'>Strain Name</a>
                    <p>{checkins[key].text}</p>

                    {currentUser.id === checkins[key].userId ? (
                        <div id='checkinButtons'>
                            <button type='button'>Edit</button>
                            <button type='button' onClick={deleteCheckin}>Delete</button>
                        </div>
                    ) : null}

                </div>
                )}
        </div>
    )
}
