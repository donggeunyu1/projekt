import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GamblingCrash from './components/GamblingCrash'
import App from './App'

export default function Main() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  )
}