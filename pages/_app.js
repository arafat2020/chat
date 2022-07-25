import { UserProvider } from "../state/stateprovider.js"
import '../style/style.css'

function MyApp({ Component, pageProps }) {
    return <UserProvider>
        <Component {...pageProps} />
    </UserProvider>
  }
  
  
  export default MyApp