import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, Input, TextareaAutosize, Button } from '@mui/material'
import HttpClient from 'utils/HttpClient'
function Category() {
  const [category,setCategory]=useState('')
  const [img,setImg]=useState()
  const [description,setDescription]=useState('')
  const clickHandler=async(e)=>{
    e.preventDefault()
    const result=await HttpClient.fil('add-category','POST',{})

  }
 
  const fetchImgUrl=async(imgs)=>{
    console.log(imgs.length)
    const data=new FormData()
    data.append('image',imgs)
    const result=await HttpClient.fileUplode('image-upoad/product','POST',data)
    if(result.status){
      console.log(result)
    }
  }
  // useEffect(()=>{
  //   console.log(category)
  //   console.log(img)
  //   console.log(description)
  // },[category,img,description])

  return (
    <div>
        <FormControl sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:"center",
          alignItems:"center",
          gap:'15px',
          width:"400px"
        }}>
          <InputLabel>Category</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" onChange={e=>setCategory(e.target.value)}/>
          <Input type='file' onChange={e=>{
            fetchImgUrl(e.target.files)
            }} multiple/>
          {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
          <TextareaAutosize maxRows={8} sx={{width:'80%',height:'60%'}} onChange={e=>setDescription(e.target.value)}/>
          <Button variant='contained' onClick={e=>clickHandler(e)}>Add</Button>
        </FormControl>
    </div>
  )
}

export default Category