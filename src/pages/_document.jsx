import { Html,Head,Main,NextScript } from 'next/document'
import React from 'react'

function Document(){
  return (
    <Html>
        <Head/>
        <body>
            <Main/>
            <NextScript/>
            <div id="photo-picker-element"></div>
        </body>
    </Html>
  )
}

export default Document