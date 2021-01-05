import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css'
//import "../node_modules/lucid-ui/dist/lucid.css";
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}