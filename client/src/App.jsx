import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthForm from './components/AuthForm'
import LandingPage from './pages/LandingPage'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <Router>
      <Routes>
        {/* Example routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<AuthForm mode="login" />} />
        <Route path="/register" element={<AuthForm mode="register" />} />
      </Routes>
    </Router>
  )
}

export default App
