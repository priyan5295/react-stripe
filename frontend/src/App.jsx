import { Container } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Store from '../src/pages/Store'
import Success from '../src/pages/Success'
import Cancel from '../src/pages/Cancel'
import CartProvider from '../src/CartContent'
import NavbarComponent from './components/NavbarComponent'

function App() {
  

  return (
    <>
    <CartProvider>
    <Container>
    <NavbarComponent />
    <BrowserRouter>
    <Routes>
      <Route index element={<Store />} />
      <Route path='success' element={<Success />} />
      <Route path='cancel' element={<Cancel />} />
    </Routes>
    </BrowserRouter>
    </Container>
    </CartProvider>
    </>
  )
}

export default App
