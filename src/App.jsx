import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import { Link } from 'react-router-dom';

function App() {

  const [showData, setShowData] = useState(null)

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await axios.get("https://api.tvmaze.com/search/shows?q=all")
        setShowData(response.data)
      }catch(error){
        console.log(error)
      }
    }

    fetchData()
  },[])

  if(showData == null){
    return (
      <>
        <h1>Loading Data</h1>
      </>
    )
  }else{


    return (
      <>
        <Link to="/"><h1 className='text-center my-8 text-5xl font-semibold '>TV Maze</h1></Link>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center my-20'>
          {
            showData.map((data)=>{
              
              return (
                <Link to={`/shows/${data.show.id}`}>
                  <div key={data.show.id} className='p-4 mx-4 my-4 rounded-md shadow-[0px_0px_10px_#afafaf] hover:shadow-[0px_0px_10px_#ff62cd] cursor-pointer'>
                    <div className='bg-[#ff62cd] w-max px-1 rounded-md relative top-3 left-36'> {data.show.rating.average || "NA"} ⭐</div>
                    <img src={data.show.image != null?data.show.image.medium:"./show.jpg"} alt="" className='rounded-md w-[210px] h-[295px] -mt-5'/>
                    <h1 className='my-4 text-[#ff62cd] font-bold text-xl'>{data.show.name}</h1>
                    <p>Genre: {data.show.genres[0]}</p>

                    <div className='w-[210px]'></div>
                      <p className='font-bold mt-6 mb-2 underline'>View More</p>
                    </div>
                </Link>
              )
            })
          }
          
        </div>
      </>
    )
  }
}

export default App
