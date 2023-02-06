import { BrowserRouter } from "react-router-dom";

import AWS from 'aws-sdk'
import env from "react-dotenv";

// Features
import RoutesList from "./routes";

AWS.config.update({
  accessKeyId: env.ACCESS_KEY_ID,
  secretAccessKey: env.SECRET_ACCESS_KEY
})

function App() {
  return (
    <BrowserRouter>
      <RoutesList />
    </BrowserRouter>
  );
}

export default App;