import React,{useState} from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'
import BackButton from '../components/BackButton'
import { useNavigate,useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const DeleteBook = () => {
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const {id}=useParams();
  const {enqueueSnackbar}=useSnackbar();
  const handelDeleteBook=()=>{
    setLoading(true);
    axios
      .delete(`https://book-store-bee.onrender.com/books/${id}`)
      .then(()=>{
        setLoading(false);
        enqueueSnackbar('Book Deleted Successfully',{variant:'success'})
        navigate('/');
      })
      .catch((error)=>{
        setLoading(false);
        // alert('Error Occured Please Check Console')
        enqueueSnackbar('Error',{variant:'error'})
        console.log(error);
      });
  };
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading?<Spinner/>:''}
      <div className='flex flex-col items-cenetr border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you Sure You Want To Delete This Entery?</h3>
        <button className='p-4 bg-red-600 text-white m-8' onClick={handelDeleteBook}>
         Yes,Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBook
