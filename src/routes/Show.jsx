import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx"
import { Link, redirect, useNavigate, useParams } from 'react-router-dom';

function Show() {
  const params  = useParams()
  const userId = params.showId
  const navigate = useNavigate()

  const [showData, setShowData] = useState()
  const [showForm, setShowForm] = useState(false)
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: ""
  })


  //To Toggle the form
  const toggleShowForm = ()=>{    
    setShowForm(!showForm)
  }

  //To update user data
  const updateValue = (e)=>{
    const {name,value} = e.target
    setUserData((prevData)=>(
      {...prevData, [name]:value}
    ))
  }

  //To submit the form and add user data to LocalStorage
  const submitForm = (e)=>{       
    e.preventDefault()
    if(localStorage.getItem("user") != null){
      if(JSON.stringify(userData) == JSON.stringify(data)){
        console.log(JSON.parse(localStorage.getItem("user"))) // Prints the current user if previous and new user are same
      }else{
        localStorage.setItem("user", JSON.stringify(userData)) // Update user in storage if previous user is not equal to new user
        navigate("/")
      }
    }else{
      localStorage.setItem("user", JSON.stringify(userData)) // Sets a user session in localStorage
      navigate("/")
    }
  }

  //To fetch data from api              
  useEffect(()=>{                 
    const fetchShowData = async ()=>{
      try{
        const response = await axios.get(`https://api.tvmaze.com/shows/${userId}`)
        setShowData(response.data)
      }catch(error){
        console.log(error)
      }

    }

    fetchShowData()
  },[userId])


  if(showData == null){
    return(
      <div>Loading</div>
    )
  }else{
    return (
      <div>
        <Link to="/"><FaArrowLeft size={28} className='m-8'/></Link>
  
        <div className='flex flex-col md:flex-row mx-8 my-5 justify-between'>
          <div className='w-full md:w-1/3'>
            <img src={showData.image.medium} alt="" width={350} className='mx-auto'/>
          </div>
  
          <div className='w-full md:w-2/3 my-10 md:my-0 md:mx-10'>
            <h1 className='text-2xl sm:text-6xl font-semibold'>{showData.name}</h1>
            <p className='my-3'><span className='text-[#ff62cd] font-bold text-lg'>Genre: </span> {showData.genres[0]}</p>
            <p className='my-3'><span className='text-[#ff62cd] font-bold text-lg'>Language: </span> {showData.language}</p>
            <p className='text-lg font-bold mb-4'>{showData.rating.average || "NA"} ⭐</p>
            <div dangerouslySetInnerHTML={{__html: showData.summary}} className='text-base md:text-lg my-2'></div>

            <button className='bg-[#ff62cd] px-20 py-2 my-10 rounded-sm hover:bg-[#d31797]' onClick={toggleShowForm}>Book</button>

          </div>
        </div>

        {/* FORM To Book ticket */}
        <div className={`bg-[#0f0f0f] absolute top-24  w-[100vw] p-5 ${showForm? "block": "hidden"} shadow-[0px_0px_10px_#ffffff]`}>
          <form action="" onSubmit={submitForm}>
            <RxCross2 onClick={toggleShowForm} className='mb-10 mt-4' size={28}/>
            <div className='flex mb-8'>
              <div className='w-1/2 mr-4 md:ml-0'>
                <label htmlFor="movieName" className='block text-lg md:text-xl mb-5 text-[#ff62cd]'>Movie Name</label>
                <input type="text" readOnly id='movieName' name='movieName' value={showData.name} className='bg-transparent border-b border-b-white outline-none my-3 w-[80%] md:w-[50%]'/>
              </div>
              <div className='w-1/2'>
                <label htmlFor="ticketqty" className='block text-[#ff62cd] text-lg md:text-xl mb-5'>Qty.</label>
                <input type="number" id='ticketqty' name='ticketqty' defaultValue={1} max={50} min={1} onChange={updateValue} className='bg-transparent border-b border-b-white outline-none my-3 w-[80%] md:w-[50%]'/>
              </div>
            </div>
            <div className='flex mb-8'>
              <div className='w-1/2'>
                <label htmlFor="fname" className='block text-[#ff62cd] text-lg md:text-xl mb-5'>First Name</label>
                <input type="text" id='fname' name='fname' placeholder='John' onChange={updateValue} className='bg-transparent border-b border-b-white outline-none my-3 w-[80%] md:w-[50%]'/>
              </div>
              <div className='w-1/2'>
                <label htmlFor="lname" className='block text-[#ff62cd] text-lg md:text-xl mb-5'>Last Name</label>
                <input type="text" id='lname' name='lname' placeholder='Doe' onChange={updateValue} className='bg-transparent border-b border-b-white outline-none my-3 w-[80%] md:w-[50%]'/>
              </div>
            </div>

            <label htmlFor="email" className='block text-[#ff62cd] text-lg md:text-xl mb-5'>Email</label>
            <input type="email" id='email' name='email' placeholder='xyz@gmail.com' onChange={updateValue} className='bg-transparent border-b border-b-white outline-none my-3 w-[50%] md:w-[30%]'/>

            <button type="submit" className='bg-[#ff62cd] hover:bg-[#d13797] my-4 mx-auto py-2 px-20 rounded-sm block'>Submit</button>
          </form>
        </div>
      </div>
    )
  }

  
}

export default Show