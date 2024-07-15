import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainComponent from './components/MainComponent'
import Form from './components/Form'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainComponent />} />
        <Route path='/form' element={<Form />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
