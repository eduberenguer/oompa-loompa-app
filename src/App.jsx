import './App.css'
import { Routes, Route } from "react-router-dom";
import { Main } from './components/main/Main'
import { Header } from './components/header/Header'
import { Detail } from './components/detail/Detail'

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
