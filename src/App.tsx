import { BrowserRouter } from "react-router-dom";

import AWS from 'aws-sdk'
import { Amplify } from "aws-amplify";
import env from "react-dotenv";

// Features
import RoutesList from "./routes";

AWS.config.update({
  accessKeyId: env.ACCESS_KEY_ID,
  secretAccessKey: env.SECRET_ACCESS_KEY
})


Amplify.configure({
  Auth: {
    identityPoolId: env.IDENTITY_POOL_ID,
    region: env.REGION,
    userPoolId: env.USER_POOL_ID, 
    userPoolWebClientId: env.USER_POOL_WEB_CLIENT_ID, 
  },
});


function App() {
  return (
    <BrowserRouter>
      <RoutesList />
    </BrowserRouter>
  );
}

export default App;