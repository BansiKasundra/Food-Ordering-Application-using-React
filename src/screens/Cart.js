import React from 'react'
// import Delete from '@material-ui/icons/Delete'
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='text-white m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }



  // const handleCheckOut = async () => {
  //   try {
  //     let userEmail = localStorage.getItem("userEmail");
  //     let response = await fetch("http://localhost:5000/api/orderData", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         order_data: data,
  //         email: userEmail,
  //         order_date: new Date().toDateString()
  //       })
  //     });
      
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch');
  //     }
  
  //     let jsonResponse = await response.json();
  //     console.log("JSON RESPONSE:::::", jsonResponse);
      
  //     if (jsonResponse.success) {
  //       dispatch({ type: "DROP" });
  //     }
  //   } catch (error) {
  //     console.error('Error during checkout:', error);
  //     // Handle the error (e.g., show an error message to the user)
  //   }
  // }
  






  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:5000/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("Order Response:", response)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }


  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table  '>
          <thead className=' fs-4'style={{ color: '#CCAD80' }}>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody className='text-white fs-5'>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><DeleteIcon sx={{color: "#FFF"}} onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='text-white fs-3'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn mt-5 ' style={{ backgroundColor: '#CCAD80' }} onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}

// table-hover



