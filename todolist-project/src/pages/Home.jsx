import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgMenuLeft } from "react-icons/cg";
import { CiSquarePlus } from "react-icons/ci";
import c1 from "../assets/react.svg"
import { CiSquareCheck } from "react-icons/ci";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Strike.css';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate()
    
    const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };
  const taskHandler = (e) => {
    e.preventDefault()
    navigate("/TaskCreate")
  }
  const [categories,setCategories] = useState([]);
      const apiUrl1 = 'http://localhost:8080/categories'
      useEffect(()=>{
      axios
            .get(apiUrl1)
            .then((response) =>  {
                 setCategories(response.data)
                console.log(response.data)
            })
        },[])
    const [tasks,setTasks] = useState([])
    const apiUrl2 = 'http://localhost:8080/tasks'
    useEffect(()=>{
        axios
          .get(apiUrl2)
          .then((response) =>  {
                 setTasks(response.data)

                console.log(response.data)
            })
        },[])
    
    
  
  // Call fetchCategories after successfully creating a new category
  
  
    return (
        <>
        <form className='m-5' onSubmit={taskHandler}>
            <div className='flex justify-between mb-9'>
                <CgMenuLeft size={30} className='mb-3'/>
                <div className='flex gap-4'>
                    <CiSearch size={30}/>
                    <IoIosNotificationsOutline size={30}/>
                </div>

            </div>

            <div className='mb-7'>
                <h1 className='font-medium text-xl mb-1'>Hey there, Vally</h1>
                <p>Organize your plans for the day</p>
            </div>


            <div className='flex align-middle'>
                <h2 className='font-medium text-lg mb-5'>Categories</h2>
                <Link to="/categoryCreate"><CiSquarePlus className='pl-2' size={30}/></Link>
            </div>
            <div className='flex justify-left mb-6 overflow-auto'>
                {
                     categories.map((category) => 
            <div className='pl-3' key={category.id}>
                <div className='bg-gray-300 items-center rounded-xl'><img src={category.imageUrl} alt='category' className='text-center m-auto p-2 w-14  h-1w-14'/></div>
                <p className='text-center font-medium'>{category.name}</p>
            </div>
                     )
                }
            </div>
            <div>
            <h3 className='font-medium text-lg mb-5'>Today's Tasks</h3>
            <div className='mb-10'>

                    {
                        tasks.map((task) =>
                        <div className='bg-gray-200 w-80 h-20 rounded-xl mb-3' key={task.id}>
                    <div className='flex gap-3 items-center align-middle p-4' >
                    <input type='checkbox' onChange={handleCheckboxClick}/>
                    <div>
                    <label className={isChecked ? 'font-medium completed' : 'font-medium'}>{task.label}</label>
                    <p>{task.startTime}-{task.endTime}</p>
                    </div>
                    </div>
                    </div>
                        )
                    }
                
            </div>
            <button className='bg-violet-500 w-80 h-11 rounded-md' type='submit'>+ Add a new task</button>
            </div>
           

            </form>
        </>
    );
}

export default Home;
