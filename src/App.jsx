import { useState ,useEffect } from 'react'
import axios from 'axios'

import OrderBy from './orderBy'

import Cart from './cart'






function App() {
  
 // hardcode everysize instead of takiing it from products 
  let sizes = ["l", "xl", "m","xl","s", "xs","l", "xl", "m","xl","s", "xs"]
  sizes.reduce((acc,cv)=>{
    acc =acc.concat(cv)
    return cv
  },[])

 let uniqu = [...new Set(sizes)]
 const [order,setOrder] = useState("");
 const [size,setSize] = useState([]);
  const [category,setCategory] = useState([]);
 const [cart,setCart] = useState(localStorage.carts ? JSON.parse(localStorage.getItem("carts")) :  []);
 const [prds,setPrds] = useState([]);



 useEffect(()=>{  
    axios.get(`https://fakestoreapi.com/products`).then(res => {
      const   dt = res.data
      setPrds(dt)
    })
    handleStorage()
 },[cart])


 
    let catPrds = [...prds]
    
  let catgs = catPrds.reduce((acc,cv)=>{
    acc =acc.concat(cv.category)
    return acc
  },[])
  let uniqCat = [...new Set(catgs)]
  

  
  
 


 // Number of items in the cart
 let numOfItems = cart.reduce((acc,cv)=>{
    acc += cv.quantity
    return acc;

 },0)



 // amont of items in the cart
  let total = cart.reduce((acc,cv)=>{
    acc += cv.price * cv.quantity
    return acc;

 },0)

 // store items in LocalStorage
function handleStorage(){
 
  localStorage.setItem("carts", JSON.stringify(cart))


}


 function handleCart(p){
  if(cart.findIndex((prd)=> prd.id === p.id) !== -1)
  {
    increament(p.id)
  }else{
     setCart((prev) =>{ return prev.concat({...p,quantity:1})})
  } 
       handleStorage()
       
     

 }
 const increament =(id)=>{
  
    setCart((prev)=>{

          let updatedCart = prev.map((itm)=>{
      if(itm.id === id ){

        return {
          ...itm,
          quantity : itm.quantity+1
        }
      }
      return itm

    })
          return updatedCart;
    })
    
 }

 const descrement =(id)=>{
    setCart((prev)=>{

    let updatedCart = prev.map((itm)=>{
      if(itm.id === id ){

        return {
          ...itm,
          quantity : itm.quantity-1
        }
      }
      return itm

    })
    return updatedCart;
    })
 }

const Del =(id)=>{
  
    setCart((prev)=>{

 let updatedCart = prev.filter((itm)=>{
    return itm.id !== id  

    })    
  return updatedCart
})
   
 }

function handleCategory(value){
  if(category.includes(value)){
    setCategory(()=>category.filter((c)=>c !== value))
  }else{
     setCategory((prev)=>{return prev.concat(value)})
  }
  
}


 function handleSize(value){
  if(size.includes(value)){
      setSize(()=>size.filter((s) => s !== value))
  }else{
     setSize((prev)=>{ return prev.concat(value)})
  }

   
   
 }


 function handleOrder(event){
setOrder(event.target.value)
 }


 function orderProduct (order, catgs ,products){

/*  let Prds = [...products]
  if(sizes.length > 0){
    Prds = Prds.filter((pr)=>{
    for(const sz of sizes){
        if(pr.size.includes(sz)){
      return true;
    }
    }
  
  })
  }*/
  let Prds = [...products]
  if(catgs.length > 0){
    Prds = Prds.filter((pr)=>{
      for(const cag of catgs){  //["men clothes", "jewelry"]
           
           if(pr.category.includes(cag)){
               return true;
    }
      } 
  })
  }


  
  if(order ==="lowest"){
    Prds = Prds.sort((a,b )=>a.price-b.price)
  }
   if(order ==="highest"){
    Prds = Prds.sort((a,b )=>b.price-a.price)
  }

  return Prds;
 }

 let products = orderProduct(order,category, prds)
  

let count = 3
  return (
    <div className="App">

    <Cart  total={total} items={cart} incr={increament} desc ={descrement} delete={Del} numItm={numOfItems}/> 

   <div className="flex flex-row gap-8 rounded items-center justify-center mt-14   ">

      {uniqCat.map((cat)=>{
    return (
      <button className={`rounded-full  w-24 h-24
      "size":xl p-3 bg-neutral-300 ${(category.includes(cat)) ? "bg-red-500" : " "}`} onClick={()=>{handleCategory(cat)}}>{cat}</button>
      )})}   


      </div>
      <div className="mx-6 my-8  ">
      <OrderBy  selectedOrder={order} handle={handleOrder} button/>
      </div>

         <div className="grid grid-cols-2 lg:grid-cols-4    gap-8 p-14  ">
      {products.map((prd)=>{
          return (
            <div className="flex  flex-col bg-neutral-200 justify-center  text-center items-center">
            <img src={prd.image} className="h-56"/>
        
            
            <div className=" h-30 w-56 flex-col bg-amber-500 text-center " >
              
              <p>{prd.title}</p>
              <p>{prd.price}</p>  
              <button onClick={()=> handleCart(prd)} className="bg-black text-neutral-100 mx-auto my-1 p-2">Add to cart</button>
           </div>

            </div>
            )  
      })} 
   </div>  
   </div>
    )
}

export default App
