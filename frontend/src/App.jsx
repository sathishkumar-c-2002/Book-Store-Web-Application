import './App.css';
import {Routes,Route} from 'react-router-dom'
// import {CreateBook,DeleteBook,EditBook,Home,ShowBook} from './pages'
import { CreateBook } from './pages/CreateBook';
import { DeleteBook } from './pages/DeleteBook';
import { EditBook } from './pages/EditBook';
import { ShowBook } from './pages/ShowBook';
import { Home } from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/books/create' element={<CreateBook />}/>
      <Route path='/books/delete/:id' element={<DeleteBook />}/>
      <Route path='/books/details/:id' element={<ShowBook />}/>
      <Route path='/books/edit/:id' element={<EditBook />}/>
    </Routes>
  )
}

export default App
