import React, {useState } from 'react'
import { FormControl, Button, TextField, Box, Input} from '@mui/material'
import HttpClient from 'utils/HttpClient'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
// import CategoryTable from './CategoryTable'

function Category({count,setCount}) {
  const location = useLocation()
  const navigate=useNavigate()
  const [submitValues,setSubmitValues] = useState({
    name:location.state ? location.state.name:"",
    desc:location.state? location.state.desc:"",
    img:location.state ? location.state.img : ""
  })
  const [error,setError]=useState({})
  // const [isEdit,setIsEdit]=useState(false)
  const clickHandler=async(e)=>{
    e.preventDefault()
    setError(validate())
    console.log('location.status._id',location.state._id)
    if(location.state){
      console.log("edit page")
       const result=await HttpClient.requestData(`update-category/${location.state._id}`,'PUT',submitValues)
       if(result.status){
          toast.success(result.message)
          // location.status={}
          setTimeout(()=>{
          navigate('/category')
        },1000)
     }
    }else{
    // if(error.imgerr) toast.error('please upload an image')
       if(Object.entries(validate()).length===0){
          const result=await HttpClient.requestData('add-category','POST',submitValues)
          if(result.status){
      // setIsCategory(true)
      // const res=await HttpClient.requestData('get-category','GET',{})
      // if(res.status){
      //   console.log(res.data)
      // }
      // toast.success(result.message)
            setCount(count+1)
            toast.success(result.message)
          }
       }
     }
  }
  
  

  const validate=()=>{
    const obj={}
    if(!submitValues.name) obj.nameerr=true
    if(!submitValues.img)  obj.imgerr=true
    if(!submitValues.desc) obj.descerr=true
    return obj
  }
 
  const fetchImgUrl=async(img)=>{
    const data=new FormData()
    data.append('image',img)
    console.log(data,'daaaaa')
    const result=await HttpClient.fileUplode('upload','POST',data)
    if(result.status){
      console.log(result)
      setSubmitValues(prev=>{
        return {
          ...prev,
          img:result.url
        }
      })
    }
  }

  return (
   <Box>
     <Box sx={{
      display:"flex",
      justifyContent:"center",
      alignContent:"center",
      marginTop:"60px",
    }}>
      <FormControl sx={{gap:"30px",
      margin:"40px",
      padding:"20px"}} fullWidth>
            <h2 style={{fontWeight:'bold',textAlign:'center'}}>
              {location.state ?"Edit Category" :"Add Category"}</h2>
            <TextField id="my-input" label='Category Name' aria-describedby="my-helper-text" 
            value={submitValues.name}
             onChange={(e)=>{
              setSubmitValues((prev)=>{
                return {
                  ...prev,
                  name:e.target.value
                }
               })
             }}
             error={error.nameerr}
             helperText={error.nameerr ? 'please provide a description':''}
            />
            <Box>
            <Input type='file' 
             onChange={e=>{fetchImgUrl(e.target.files[0])}}
             variant='standard' 
             />
            {submitValues.img && (
               <img src={submitValues.img} width="100" height="100" />
            )}
            </Box>
          {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
             <TextField
             label='Category Description'
             value={submitValues.desc}
             onChange={e=>setSubmitValues((prev)=>{
                return {
                  ...prev,
                  desc:e.target.value
                }
             })
          }
          error={error.descerr}
          helperText={error.descerr ? 'please provide a description':''}
          maxrows={20} 
          multiline/>
            <Button variant='contained' onClick={e=>clickHandler(e)}>{location.state ? 'Edit':'Add'}</Button>
          </FormControl>
    </Box>

   </Box>
  )
}

export default Category