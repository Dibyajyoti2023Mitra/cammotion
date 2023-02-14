import React, {useState } from 'react'
import { FormControl, Button, TextField, Box} from '@mui/material'
import HttpClient from 'utils/HttpClient'
import { toast } from 'react-hot-toast'
import CategoryTable from './CategoryTable'
function Category() {
  const [submitValues,setSubmitValues] = useState({
    name:"",
    desc:"",
    img:""
  })
  const [isCategory,setIsCategory]=useState(false)
  const clickHandler=async(e)=>{
    e.preventDefault()
    const result=await HttpClient.requestData('add-category','POST',submitValues)
    if(result.status){
      setIsCategory(true)
      // const res=await HttpClient.requestData('get-category','GET',{})
      // if(res.status){
      //   console.log(res.data)
      // }
      // toast.success(result.message)
      toast.success(result.message)
    }
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
      marginTop:"100px"
    }}>
      <FormControl sx={{gap:"20px",
       width:"48%",
       height:"60%"}}>
            <h2 style={{fontWeight:'bold',textAlign:'center'}}>Add Category</h2>
            <TextField id="my-input" label='Category Name' aria-describedby="my-helper-text" 
             onChange={(e)=>{
              setSubmitValues((prev)=>{
                return {
                  ...prev,
                  name:e.target.value
                }
               })
             }}
            />
             <input type='file' 
             onChange={e=>{fetchImgUrl(e.target.files[0])}}
             variant='standard' 
             />
          {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
             <TextField
             label='Category Description'
             onChange={e=>setSubmitValues((prev)=>{
                return {
                  ...prev,
                  desc:e.target.value
                }
             })
          }
          maxrows={15} 
          multiline/>
          <Button variant='contained' onClick={e=>clickHandler(e)}>Add</Button>
          </FormControl>
    </Box>

    <CategoryTable/>   
   </Box>
  )
}

export default Category