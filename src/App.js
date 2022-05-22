import {CartContainer, Navbar} from './components'
import {calculateTotals} from './features/cart/cartSlice'
import {useDispatch, useSelector} from '@reduxjs/toolkit'
import {useEffect} from 'react'

function App() {
  const {cartItems} = useSelector(state => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  return <main>
    <Navbar/>
    <CartContainer/>
  </main>;
}
export default App;
