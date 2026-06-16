import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/health")
      .then(res => setMessage(res.data.message))
      .catch(err => console.error(err));
  }, []);

  return <h1>{message || "Loading..."}</h1>;
}

export default App;
