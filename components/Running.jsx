import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import styles from "./Layout.module.css";

export default function Running(props) {
const [address,setAddress] = useState("")
const [output,setOutput] = useState("")

async function checkTheAddress(){
    const response = await axios.post("/api/runningAPI",{address:address});
    console.log(response.data)
setOutput(<ul>{response.data.map((item,i)=><li key={`${item.name}${i}`}>{item.name}</li>)}</ul>);
}

return <div>
<h6>this page lets you see what districts you live in</h6>

<label>
Address:
<input value={address} onChange={(e)=>setAddress(e.target.value)} />
</label>
<button onClick={checkTheAddress}>Let's check</button>

{output}

</div>

}

