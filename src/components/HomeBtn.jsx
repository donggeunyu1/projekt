import { useNavigate } from "react-router-dom"
import header from "./Header"

function HomeBtn() {
    const navigate = useNavigate();
  
  function OnHomeClicked() {
    navigate("/home");
  }

  return ( 
      <div className="home-btn">
      <button className="btn" onClick={OnHomeClicked}>
        🏠︎
      </button>
      </div>
  )
}

export default HomeBtn