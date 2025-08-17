import { registerAs } from "@nestjs/config"
 

export default registerAs('googleOauth', () => ({
  clientId: process.env.Google_Client_ID,
  clientSecret: process.env.GOOLE_SECRET,
  callbackUrl: process.env.GOOLE_Callback_URL,
}))