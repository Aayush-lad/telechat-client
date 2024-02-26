import React from 'react'
import "../styles/globals.css"
import { StateProvider } from '../context/StateContext';
import Head  from 'next/head';
import reducer,{initialState} from '../context/StateReducers';
function App({ Component, pageProps }){
    return (

        <StateProvider initialstate={initialState} reducer={reducer} >
            <Head>
                <title>Telechat</title>
            </Head>
            <Component {...pageProps} />
         </StateProvider>
    )
}
export default App;