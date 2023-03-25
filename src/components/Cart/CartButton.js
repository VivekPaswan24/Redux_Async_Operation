import classes from './CartButton.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const CartButton = (props) => {

  const dispatch=useDispatch()
  const products=useSelector(state=>state.products);

  const cartShowHandler=()=>{
    dispatch(cartActions.showCart())
  }

  const numberOfProduct=products.reduce((currNumber,item)=>{
    return currNumber=currNumber+item.quantity
  },0)
  return (
    <button className={classes.button} onClick={cartShowHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{numberOfProduct}</span>
    </button>
  );
};

export default CartButton;
