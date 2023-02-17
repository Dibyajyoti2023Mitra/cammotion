import React, {useState } from 'react'
import { FormControl, Button, TextField, Box, Input} from '@mui/material'
import HttpClient from 'utils/HttpClient'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from 'components/Header'
import InputTextField from '../InputTextField'


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
    // console.log('location.status._id',location.state._id)
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
     <Box sx={{ textAlign: "center" }} m="10px">
        <Header subtitle={"Add Category"}/>
           <Box mt="10px">
            <Box mt="20px">
              <Box mb={"15px"}>
                   <TextField id="my-input" label='Category Name' aria-describedby="my-helper-text" 
                      value={submitValues.name}
                      fullWidth
                      onChange={(e)=>{
                      setSubmitValues((prev)=>{
                         return {
                            ...prev,
                            name:e.target.value
                       }
                      })
                   }}
                    error={error.nameerr}
                    helperText={error.nameerr ? 'please provide a category name':''}
                  />
              </Box>
               <Box mb={"15px"}>
                 <TextField type='file'
                  fullWidth 
                  onChange={e=>{fetchImgUrl(e.target.files[0])}}
                  variant='outlined'
                  />
                 {submitValues.img && (
                    <img src={submitValues.img} width="100" height="100" />
                 )}
                </Box>
          {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                <Box mb={"15px"}>
                   <TextField
                     label='Category Description'
                     value={submitValues.desc}
                     fullWidth
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
                </Box>

               <Box mt="10px">
                <Button variant='contained' onClick={e=>clickHandler(e)} size="medium">
                  {location.state ? 'Edit':'Add'}</Button>
               </Box>
            </Box>         
          </Box>
    </Box>

  )
}

export default Category