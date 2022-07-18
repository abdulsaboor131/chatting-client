import { useSelector } from "react-redux"
import "./Message.scss"

const Message = ({sender,message}) => {
  const {personImage} = useSelector((state)=>state.conversation);
  let imgUrl;
  if (!sender && personImage) imgUrl = "http://localhost:5000/images/"+personImage;
  else imgUrl = "../../images/dummyuser.jpg"
  return (
    <div className={`message-div ${sender?"end":"start"}`}>
      {!sender && <img src={imgUrl} alt="" />}
      <span className={`message ${sender?"grey":"blue"}`}>{message}</span>
    </div>
  )
}

export default Message