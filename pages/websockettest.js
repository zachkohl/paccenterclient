import React, { useState } from "react";

function WebSocketTestPage(props) {
  if (typeof window != "undefined") {
    var socket = new WebSocket("ws:localhost:3000");
    const [result, setResult] = useState("");
    const [inputValue, setInputValue] = useState("");
    socket.onmessage = function (event) {
      console.log(event.data);
      setResult(event.data);
    };

    function clickHandler(e) {
      socket.send(inputValue);
    }

    return (
      <div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={clickHandler}>Send message to server</button>
        <p>{result}</p>
      </div>
    );
  } else {
    return "server rendering";
  }
}

export default WebSocketTestPage;
