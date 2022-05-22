import {CartContainer, Navbar, Modal} from './components'
import {calculateTotals, getCartItems} from './features/cart/cartSlice'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'

function App() {
  const {cartItems, isLoading} = useSelector(state => state.cart)
  const {isOpen} = useSelector(state => state.modal)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return <main>
    <Navbar/>
    <CartContainer/>
    {isOpen && <Modal/>}
  </main>;
}
export default App;
