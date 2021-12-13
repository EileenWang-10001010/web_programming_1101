import {Input} from "antd";
import {UserOutlined} from "@ant-design/icons";
import Title from "../Components/Title";
import {message } from "antd";

const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = {
        content: msg,
        duration: 0.5, //why duration?
      };
      switch (type) {
        case "success":
          message.success(content); //antd component
          break;
        case "error":
        default:
          message.error(content);
          break;
      }
    }
  };

const SignIn = ({me, setMe,setSignedIn})=>(
    <>
    <Title>
        <h1>My Chat Room</h1>
    </Title>
    <Input.Search
    onSearch={(name)=>{
        if(!name) 
        displayStatus({
            type: "error",
            msg: "Missing user name",
        }); 
        else setSignedIn(true);
    }}
    prefix={<UserOutlined/>}
    value={me} enterButton="Sign In"
    onChange={(e) => {setMe(e.target.value)}}
    placeholder="Enter your name"
    size="large" style={{width:300,margin:50}}
 />
    </>
);
export default SignIn;