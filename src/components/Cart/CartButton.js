import classes from './CartButton.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const CartButton = (props) => {

  const dispatch=useDispatch()
  const numberOfProduct=useSelector(state=>state.totalQuantity)

  const cartShowHandler=()=>{
    dispatch(cartActions.showCart())
  }

  return (
    <button className={classes.button} onClick={cartShowHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{numberOfProduct}</span>
    </button>
  );
};

export default CartButton;
