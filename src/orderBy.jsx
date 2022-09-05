import React from 'react'

const OrderBy= (props)=>{
return (

		<select className="p-3"  value={props.selectedOrder} onChange={props.handle} >
			<option value="">select</option>
			<option value="highest">highest</option>
			<option value="lowest">lowest</option>
		</select>
		)
}

export default OrderBy;