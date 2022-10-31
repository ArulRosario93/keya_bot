import React, { useRef, useEffect, useState } from "react";
import "./ChatRoom.css";
import { useDataLayerValue } from "../../DataLayer";
  import axios from "axios";
import Message from "./Message/Message";

const ChatRoom = () => {
  const [{ bitCoins, stocks }, dispatch] = useDataLayerValue();

  const [show , sethow] = useState(false);

  const btns = ["Sln Token", "Silver Line", "General"];

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello how may i help you <3", type: "received" },
  ]);

  const slnTokensRecommended = [
    "What determines SLN Token's price?",
    "Can SLN tokens be regulated?",
    "What happens when the SLN tokens are lost?",
    "Why do we need to trust SLN tokens?"
  ]

  const silverLineRecommended = [
    "How is Silver Line different from others?",
    "Who controls the Silver Line networks?",
  ]

  const generalRecommended = [
    "How to start trading?",
    "What is the best time to trade?",
    "Who is the founder of this website/Platform?",
  ]

  const Handler = (e) => {
    const text = e.target.value;
    setMessage(text);
  };

  const setMsgHere = async (message) => {
    const response = await axios.post("http://localhost:3500/textQuery", {
        message,
      })

      return response;
    }
    
    const HandlerClick = async (e) => {
      if(message.length > 0){
        e.preventDefault();
        setMessage("");
        setTimeout(() => {
          sethow(true);
        }, 1000);
        setTimeout(() => {
          sethow(false);
        }, 4999);
      
      let botText = "evil";
      setMessages((pervMessages) => [
        ...pervMessages,
        { text: message, type: "sent" },
      ]);

      const bigOne = setMsgHere(message);
      
      botText = (await bigOne).data;

      setTimeout(() => {
        setRecievedMsgHere(botText);
      }, 5000);
    } 
  }
  
  const setRecievedMsgHere = async (botText) => {
    setMessages((pervMessages) => [
      ...pervMessages,
      { text: botText, type: "received" },
    ]);
  }

  // console.log(msg.toString("hola thakanglah glglh glg wargankn  w.'lglmksn phh ahe.h jae.jeajea ea j.ea.ae .ejaeje.atja tj.a.jea.jr j;wr", 20));

  const messagesEndRef = useRef(null);
  const messagesEndRef2 = useRef(null);

  const HandlerBtn = (event, value) => {
    
    if(value === "Sln Token"){
      setMessages(prevMessage => [
        ...prevMessage,
        { text: slnTokensRecommended.map(item => item), type: 'Recommended', value }
      ])
    }

    if (value === "Silver Line") {
      setMessages(prevMessage => [
        ...prevMessage,
        { text: silverLineRecommended.map(item => item), type: 'Recommended', value }
      ])
    }

    if (value === "General") {
      setMessages(prevMessage => [
        ...prevMessage,
        { text: generalRecommended.map(item => item), type: 'Recommended', value }
      ])
    }
  };

  const scrollToBottom = () => {
  };
  const scrollToBottom2 = () => {
  };
  
  console.log(window.innerHeight, "height here");
  console.log(window.innerHeight / 13.79451359, "height here");
  
  console.log(window.innerHeight / 39, "height for greeetings here");
  
  let today = new Date();
  let hrs = today.getHours();
  let mins = today.getMinutes();
  let time = hrs + ":" + mins;
  
  useEffect(() => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // messagesEndRef2.current?.scrollIntoView({ behavior: "smooth" });
    // scrollToBottom();
    // scrollToBottom2();
    console.log(messages, "message here")
    // if(show){
    //   const interval = setInterval(() => {
    //     setCounter((prevCounter) => prevCounter + 1);
    //   }, 1000);
  
    //   return () => clearInterval(interval);
    // }
  }, [messages, show]);
  //12.0563
  return (
    <>
      <div 
        className="chatRoom"
        style={{ 
          height: `${show ? window.innerHeight /12.0563 + `vh` : window.innerHeight /12.0563 + `vh` }`,
         marginTop: `${show ? "-2vh" : "-15px"}` 
        }}
      >
        <p className="timehere" style={{ margin: "1px 0px 5px" }}>  
          {
            time
          }
        </p>
        {btns.length > 0 ? (
          <div className="btnsHere">
            {btns.map((item, i) => {
              return (
                <div
                  key={i}
                  className="btn"
                  onClick={(event) => HandlerBtn(event, item)}
                >
                  <p className="buttonHere">{item}</p>
                </div>
              );
            })}
          </div>
        ) : null}
        {/* <div style={{paddingTop: "3vh"}} ref={messagesEndRef}/> */}
        {messages.length > 0 ? (
          <div className="scrollMsg">
            {messages.map((item, i) => {
              return (
                <>
                  <Message itemHere={item}/>
                  {show ? <h1 className="typing">...</h1> : null}
                </>
              );
            })}
          </div>
        ) : null}
      </div>
      <form className="inputContainer" onSubmit={HandlerClick}>
        <input
          placeholder="How May I help you?"
          onChange={Handler}
          value={message}
          type="text"
          required
          autoFocus
        />
        <div className="sendBtn">
          <input type="submit" onClick={HandlerClick} value="Send" />
        </div>
      </form>
    </>
  );
};

export default ChatRoom;
