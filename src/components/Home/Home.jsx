import React, { useEffect, useState, useRef } from "react";
import { Input } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import Header from "../layout/Header";
import "./Home.scss";
import { sendcurrentMessage } from "../Services/api";

const Home = () => {
   const [message, setMessage] = useState("");
   const [allmessages, setAllMessages] = useState([]);
   const messagesEndRef = useRef(null);

   useEffect(() => {
      scrollToBottom();
   }, [allmessages]);

   const handleInput = (e) => {
      setMessage(e.target.value);
   };

   const sendMessage = async() => {
      // var res=await sendcurrentMessage()
      setAllMessages((prevMessages) => [
         ...prevMessages,
         { from: "user", message: message },
         { from: "bot", message: "hello bot" },
      ]);
      setMessage("");
   };

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };

   return (
      <div className="home">
         <div>
            {allmessages.length <= 0 ? (
               <>
                  <div className="title">
                     <h2>Hi, how can I help you today?</h2>
                  </div>
               </>
            ) : (
               <>
                  <div className="allmessages">
                     {allmessages.map((item, index) => {
                        return (
                           <div
                              key={index}
                              className={item.from == "user" ? "user" : "bot"}
                           >
                              <h2>{item.message}</h2>
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
            />
         </div>
      </div>
   );
};

export default Home;
