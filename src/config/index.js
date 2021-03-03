import dontenv from 'dotenv';
dontenv.config();
const config={
    env:process.env.ENV,
    port:process.env.PORT
}
export default config;