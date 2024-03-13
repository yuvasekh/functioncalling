import React, { useEffect, useState, useRef } from "react";
import { Avatar, Button, Input } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import Header from "../layout/Header";
import "./Home.scss";
import { addFunction, sendcurrentMessage } from "../Services/api";
import { connect, useDispatch } from 'react-redux';
import { loginuser, showwidgetbox } from '../ReduxStore/actions';
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import user from '../../assets/user.png'
import bot from '../../assets/bot.jpg'
const Home = ({ showwidget }) => {
   const [message, setMessage] = useState("");
   const [allmessages, setAllMessages] = useState([]);
   const [itemsselected, setItemsselected] = useState([]);
   const [isLoading, setIsLoading] = useState(false); // State to track loading
   const [codeadder,setcodeadder]=useState("")
   const messagesEndRef = useRef(null);
   console.log(showwidget, "home")
   const code = `It should be below format
   {
      "functions": [{
                 "name": "get_current_weather",
                 "description": "Get the current weather in a given location",
                 "parameters": {
                     "type": "object",
                     "properties": {
                         "location": {
                             "type": "string",
                             "description": "The city and state, e.g. San Francisco, CA"
                         },
                         "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
                     },
                     "required": ["location"]
                 }
             }]
         
 }`;
   useEffect(() => {
      console.log(itemsselected, "item");
   }, [itemsselected]);

   useEffect(() => {
      setItemsselected(localStorage.getItem("items"));
   }, []);

   useEffect(() => {
      scrollToBottom();
   }, [allmessages]);

   const handleInput = (e) => {
      setMessage(e.target.value);
   };

   const sendMessage = async () => {
      if (!message) {

      }
      if (isLoading) return; // Prevent sending message while loading

      setIsLoading(true); // Start loading

      setAllMessages((prevMessages) => [
         ...prevMessages,
         { from: "user", message: message },
      ]);

      var selectit = JSON.parse(localStorage.getItem("items"));
      console.log(selectit, "Selectit");

      console.log("insideif");
      let data = {
         functionNames: selectit,
         content: message,
      };
      try {
         var res = await sendcurrentMessage(data);
         console.log(res, "response");
         if (res) {
            setAllMessages((prevMessages) => [
               ...prevMessages,
               { from: "bot", message: res.response },
            ]);
         }
         else {
            setAllMessages((prevMessages) => [
               ...prevMessages,
               { from: "bot", message: "Failed To Fetch Data" },
            ]);
         }

      } catch (error) {
         console.error("Error sending message:", error);

      } finally {
         setIsLoading(false); // End loading, whether successful or not
      }

      setMessage("");
   };

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };
   const codeTracker = (e) => {
console.log(e,"code")
setcodeadder(e)
   };
   const addfun=async()=>
   {
    
      console.log(codeadder,"code")
      var res=await addFunction(codeadder)
      console.log(res,"resaddfun")
   }

   return (
      <div className="home">


         <div className={showwidget == true ? 'addfun' : 'nonefun'}>
            <h4>Add a Function</h4>
            <div>
            <CodeMirror
               value={code}
               height="70vh"
               width="40vw"
               onChange={codeTracker}
               theme={vscodeDark}
            />
            </div>
        
            <div className="btn">
            <Button style={{background:'black',color:'white'}} onClick={addfun}>Add Function</Button>
            </div>
     
         </div>
         <div  className={showwidget == true ? 'message-con' : 'message-con1'}>
            <div style={{ marginTop: '8px' }}>

               {allmessages.length <= 0 ? (
                  <>
                     <div className="title">
                        <Avatar src={bot} style={{ width: '30px', height: '28px' }} />  <h2 style={{ marginLeft: '12px' }} >Hi, how can I help you today?</h2>
                     </div>
                  </>
               ) : (
                  <>
                     <div className="allmessages">
                        {allmessages.map((item, index) => {
                           return (
                              <div
                                 key={index}
                                 className={
                                    item.from == "user" ? "user" : "bot"
                                 }
                              >
                                 {
                                    item.from == "user" ? <div ><div><Avatar src={user} style={{ width: '30px', height: '28px' }} /> <span style={{ marginLeft: '6px' }}>You</span> </div><div style={{ marginTop: '-14px' }}><h5>{item.message}</h5>
                                    </div></div> : <div>
                                       <div style={{ alignItems: 'left' }}>
                                          <Avatar src={bot} style={{ width: '30px', height: '28px' }} />
                                          <span style={{ marginLeft: '9px' }}>
                                             OpenAI
                                          </span>
                                       </div>
                                       <div> <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                                          {item.message}
                                       </SyntaxHighlighter></div>  </div>
                                 }

                                 {/* <h2>{item.message}</h2> */}
                              </div>
                           );
                        })}
                        <div ref={messagesEndRef} />
                     </div>
                  </>
               )}
            </div>
            <div className="input-con">
               <Input
                  value={message}
                  suffix={<ArrowUpOutlined onClick={sendMessage} />}
                  onChange={handleInput}
                  onKeyPress={(e) => {
                     if (e.key === "Enter") {
                        sendMessage();
                     }
                  }}
                  disabled={isLoading} // Disable input while loading
               />
            </div>
         </div>
      </div>
   );
};
const mapStateToProps = (state) => ({
   count: state.count,
   isAuthenticated: state.isAuthenticated,
   showwidget: state.showwidget
});

const mapDispatchToProps = {
   loginuser,
   showwidgetbox
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
