import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {

  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef=useRef();

  let options=props.options;
  let priceOptions = Object.keys(options);

  const[qty, setQty] = useState(1)
  const[size,setSize] = useState("")

  const handleAddToCart=async ()=>{

    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item; 
        break;
      }
    }

    console.log(food)
    console.log(new Date())
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({type:"ADD",id:props.foodItem._id, name:props.foodItem.name, price:finalPrice, qty:qty, size:size})
    // console.log(data)
  }

  let finalPrice=qty * parseInt(options[size]);

  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])

  return (
    <div>
      <div class="container"> 
      <div class="row">
      <div class="col">
        <div className="card mt-3" id='card' class="bg-black" style={{"width": "18rem" ,"maxHeight":"360px",border: '1px solid #726D6D',borderRadius:'5px'}}>
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{objectFit:"contain !important",height:"170px"}} />
          <div className="card-body" style={{ color: 'white' }}>
            <h5 className="card-title" style={{ color: 'white' }}>{props.foodItem.name}</h5>
            <div className='container w=100'>
              <select className='m-2 h-100 rounded' style={{ backgroundColor: '#CCAD80' }} onChange={(e)=> setQty(e.target.value)}>
              {Array.from(Array(6),(e,i)=>{
                return(
                  <option key={i+1} value={i+1}>{i+1}</option>
                )
              })}
              </select>

              <select className='m-2 h-100 rounded' style={{ backgroundColor: '#CCAD80' }} ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                {priceOptions.map((data)=>{
                  return <option key={data} value={data}>{data}</option>
                })}

              </select>

              <div className='d-inline h-100 fs-5'>
                ₹{finalPrice}/-
              </div>

              <hr>
              </hr>
              <button className={`btn text-dark justify-center ms-2`} style={{ backgroundColor: '#CCAD80' }} onClick={handleAddToCart}>Add to Cart</button>

            </div>
          </div>
        </div>
      </div></div></div>
    </div>
  )
}