import classes from './CartButton.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {

  const dispatch=useDispatch()
  const numberOfProduct=useSelector(state=>state.cart.totalQuantity)

  const cartShowHandler=()=>{
    dispatch(uiActions.toggle())
  }

  return (
    <button className={classes.button} onClick={cartShowHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{numberOfProduct}</span>
    </button>
  );
};

export default CartButton;
