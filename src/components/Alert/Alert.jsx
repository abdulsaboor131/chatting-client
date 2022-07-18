import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { hideAlert } from '../../redux/alertSlice';
import "./Alert.scss"
const Alert = () => {
    const { visible, type, message } = useSelector((state) => state.alert);
    useEffect(() => {
        console.log(visible)
        console.log(type)
        console.log(message)
    })
    return (
        <div className={`alert-container ${visible ? 'display' : ''}`}>
            <div className={`wrapper ${type}`}>
                <div className={`message`}>
                    {message}
                </div>
            </div>
        </div>
    )
}

export default Alert