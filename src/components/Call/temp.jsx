import React from 'react'

const temp = ({data}) => {

    let user ;

    const getUser = async(sid,rid)=>{

        try {
            console.log("getting user", sid, rid);
            user = await axios.get(`${GET_USER_DETAILS}/${userInfo.id === sid ? rid : sid}`);
            console.log(user)
        } catch (error) {
            console.log("Error fetching user:", error);
            
        }
    }
    getUser(data.senderId,data.receiverId)


  return (
    <div className="min-w-fit mr-1 pt-3 pb-1">
    <Image src={user.data.user.image} height={50} width={50} alt="avatar" className="rounded-full"/>
</div>
  )
}

export default temp