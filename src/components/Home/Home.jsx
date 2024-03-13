import React, { useEffect, useState, useRef } from "react";
import { Avatar, Input } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import Header from "../layout/Header";
import "./Home.scss";
import { sendcurrentMessage } from "../Services/api";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import user from '../../assets/user.png'
import bot from '../../assets/bot.jpg'
const Home = () => {
   const [message, setMessage] = useState("");
   const [allmessages, setAllMessages] = useState([]);
   const [itemsselected, setItemsselected] = useState([]);
   const [isLoading, setIsLoading] = useState(false); // State to track loading
   const messagesEndRef = useRef(null);

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
      if(!message)
      {

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
if(res)
{
   setAllMessages((prevMessages) => [
      ...prevMessages,
      { from: "bot", message: res.response },
   ]);
}
else
{
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

   return (
      <div className="home">
         <div style={{marginTop:'8px'}}>
          
            {allmessages.length <= 0 ? (
               <>
                  <div className="title">
                  <Avatar src={bot} style={{width:'30px',height:'28px'}}/>  <h2 style={{marginLeft:'12px'}} >Hi, how can I help you today?</h2>
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
                                 item.from=="user"?<div ><div><Avatar src={user} style={{width:'30px',height:'28px'}}/> <span style={{marginLeft:'6px'}}>You</span> </div><div style={{marginTop:'-14px'}}><h5>{item.message}</h5>
                                    </div></div>:<div>
                                       <div style={{alignItems:'left'}}>
                                       <Avatar src={bot} style={{width:'30px',height:'28px'}}/> 
                                       <span style={{marginLeft:'9px'}}>
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
   );
};

export default Home;
