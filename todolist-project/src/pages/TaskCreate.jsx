import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const TaskCreate = () => {
  const navigate = useNavigate()
  const repeatOptions = ['EVERYDAY', 'EVERY_WEEK', 'EVERY_MONTH']
  const [categoryData,setCategoryData] = useState([])
  const [inputText,setInputText]=useState({
    label: '',
    start: '',
    end: '',
    repeatType: '',
    categoryId: '',
  })

  const labelHandler = (e) =>{
    const taskLabel= e.target.value
    setInputText({...inputText,label: taskLabel});
  }
  const startHandler = (e) =>{
    const taskStart= e.target.value
    setInputText({...inputText,start: taskStart});
  }
  const endHandler = (e) =>{
    const taskEnd= e.target.value
    setInputText({...inputText,end: taskEnd});
  }
  const categoryHandler = (e) =>{
    const taskCategory= e.target.value
    setInputText({...inputText,categoryId: taskCategory});
    console.log(inputText)
  }
  const repeatHandler = (e) =>{
    const taskRepeat= e.target.value
    setInputText({...inputText,repeatType: taskRepeat});
  }
  const apiUrl2="http://localhost:8080/categories"
  useEffect(()=>{
    axios
      .get(apiUrl2)
      .then((response) => {
       setCategoryData(response.data)
       console.log(response.data)}
        )
  },[]);
  
  const addHandler = (e) =>{
    e.preventDefault()
    console.log(inputText)
    if(!inputText.label || !inputText.start || !inputText.end || !inputText.categoryId || !inputText.repeatType){
      alert('Please fill out all required fields') 
    }else{
      const apiUrl1 = 'http://localhost:8080/tasks';
      console.log(apiUrl1)
      axios
        .post(apiUrl1, {label: inputText.label,startTime: inputText.start,endTime: inputText.end,categoryId: inputText.categoryId,repeatType: inputText.repeatType})
        .then((value) => console.log(value))
        .then(()=> navigate('/'))
    }
    
    }
  
  return (
    <>
      <form className='m-auto w-80 mt-12' onSubmit={addHandler}>
        <Link to="/"><FaArrowLeft className='mb-3'/></Link>
        <h1 className='font-medium text-xl mb-1'>Add Task</h1>
        <div>
        <label className='text-lg font-medium'>Label</label>
          <div className='mt-2'>
          <input className='bg-gray-100 w-80 h-12 rounded-lg mb-2 p-2' name='label' id='label' type='text' placeholder='Create Instagram post' required onChange={labelHandler}/>
          </div>
        </div>
        <div>
        <label className='text-lg font-medium'>Start Time</label>
          <div className='mt-2'>
          <input className='bg-gray-100 w-80 h-12 rounded-lg mb-7 p-2' name='startTime' id='startTime'  type='time' onChange={startHandler}/>
          </div>
        </div>
        <div>
        <label className='text-lg font-medium'>End Time</label>
          <div className='mt-2'>
          <input className='bg-gray-100 w-80 h-12 rounded-lg mb-7 p-2' name='endTime' id='endTime' type='time' onChange={endHandler}/>
          </div>
        </div>
        <div>
        <label className='text-lg font-medium'>Category</label>
          <div className='mt-2'>
          <select className='bg-gray-100 w-80 h-12 rounded-lg mb-7 p-2' name='categoryId' id='categoryId' type='text' onChange={categoryHandler}>
              {
                categoryData.map((category,index) => {
                  return (
                    <option key={index} value={category.id}>{category.name}</option>
                  )
                })
              }
          </select>
          </div>
        </div>
        <div>
        <label className='text-lg font-medium'>Repeat</label>
          <div className='mt-2'>
          <select className='bg-gray-100 w-80 h-12 rounded-lg mb-7 p-2' name='repeatType' id='repeatType' onChange={repeatHandler}>
            {
              repeatOptions.map((repeat,index) =>
              <option key={index} value={repeat} onChange={repeatHandler}>{repeat}</option>)
            }
          </select>
          </div>
        </div>
        <button className='bg-violet-500 w-80 h-11 rounded-md' type='submit'>Create Task</button>
      </form>
    </>
  );
}

export default TaskCreate;
