import axios from 'axios';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { uiActions } from './store/ui-slice';

let render=true;
function App() {
  const notification=useSelector(state=>state.ui.notification)
  const showCart=useSelector(state=>state.ui.showCart)
  const cart=useSelector(state=>state.cart)

  const dispatch=useDispatch()

  useEffect(()=>{
    async function putdata(){
      dispatch(uiActions.showNotification({status:'Pending',title:'Sending',message:'Sending cart data'}));
      try{
       await axios.put("https://react-http-71f81-default-rtdb.firebaseio.com/cart.json",{cart});
       dispatch(uiActions.showNotification({status:'success',title:'Suceess',message:'Sent cart data successfully'}));
      }catch(error){
        dispatch(uiActions.showNotification({status:'error',title:'Error',message:'Seding cart data failed!'}));
      }
    }
    if(render===true){
      render=false ;
      return;
    }
    putdata()
  },[cart,dispatch]);
  return (
    <Fragment>
    {notification && <Notification  status={notification.status} title={notification.title} message={notification.message}/>}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
