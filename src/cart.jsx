import React from 'react' 
import { Popover } from '@headlessui/react'

 
const Cart = (props)=>{

	return (
			<div>

			<Popover  className="absolute  top-0 right-0 p-5">
				<Popover.Button>
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
					stroke="currentColor" className="w-6 h-6">
  					<path strokeLinecap="round" strokeLinejoin="round" 
  					d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
					</svg>{props.numItm}
				</span>
				</Popover.Button>

			      <Popover.Panel className="bg-neutral-700  rounded-lg absolute w-96 right-4">
			        <div className="grid ">
			        	   {props.items.map((itm)=>{

				return (
					<div className=" flex justify-between space-x-2 p-3 ">
					<img src={itm.image} className="img-responsive w-24 h-24" alt="Image" />
					<p className="text-neutral-100">{itm.title}</p>
					<div>
					<button onClick={()=>props.incr(itm.id)} className="w-4 p-1 bg-pink-200">+</button>
					<button onClick={()=>props.desc(itm.id)}className="w-4 p-1 bg-pink-200">-</button>
					<button onClick={()=>props.delete(itm.id)}className="w-8 p-1 text-red-400">X</button>
					<p className="text-neutral-100">Quantity:{itm.quantity}</p>
					</div>
					</div>
					)

						})}
						<p className="text-lg text-center ">TOTAL :${props.total}</p>		
						  
			     </div>
			      </Popover.Panel>

    		</Popover>
					
			</div>
			)
}


export default Cart