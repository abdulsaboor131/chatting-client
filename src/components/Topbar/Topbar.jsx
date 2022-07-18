import React from 'react'
import "./Topbar.scss"
import { ArrowDropDown } from "@mui/icons-material"
import { useSelector } from 'react-redux'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';
import { showAlert, hideAlert } from "../../redux/alertSlice"
import { resetStates } from "../../redux/conversationSlice"


const Topbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useSelector((state) => state.user.data)
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout())
    dispatch(showAlert({ type: "success", message: "Logged Out Successfully" }))
    dispatch(resetStates())
    setTimeout(() => {

      dispatch(hideAlert())
    }, 3000)
  }
  return (
    <div className="topbar-container">
      <div className="wrapper">
        <div className="left">
          <span className="logo">chat if you can</span>
        </div>
        <div className="right">
          <img src={user.image ? "http://localhost:5000/images/" + user.image : "../../images/dummyuser.jpg"} alt="" />
          <ArrowDropDown className='icon'
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick} />
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={logoutUser}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default Topbar