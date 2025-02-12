import React, { useState, useEffect } from 'react'
import { BackButton } from '../components/BackButton';
import { Spinner } from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom';
import { useSnackbar } from 'notistack';


export const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response)=>{
      setAuthor(response.data.author);
      setPublishYear(response.data.publishYear);
      setTitle(response.data.title); 
      setLoading(false);
    }).catch((error)=>{
      setLoading(false);
      alert('An error happened. Please Check Console');
      console.log(error);
    })
  },[])


  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        enqueueSnackbar('Book Edited Succesfully',{variant:'success'});
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        // alert('An Error Has Occurred. Please check the console');
        enqueueSnackbar('Error',{variant:'error'});
        setLoading(false);
      });
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>

      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 p-4 border-sky-500 rounded-xl w-[600px] mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='p-2 border-2 border-gray-300 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='p-2 border-2 border-gray-300 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='p-2 border-2 border-gray-300 px-4 py-2 w-full' />

          <button onClick={handleEditBook} className='bg-sky-500 text-white p-2 mt-4 rounded-md'>
            Save Book
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditBook;
