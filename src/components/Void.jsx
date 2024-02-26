import Image from 'next/image'
import React from 'react'

const Void = () => {
  return (
    <div className=" border-2 w-full h-full flex flex-col items-center justify-center bg-[#E1F5FF]">
        <Image src="/void.gif" height={500} width={500} />
    </div>
  )
}

export default Void