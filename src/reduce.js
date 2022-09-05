let arr = ["xl","l","s","m"]

let size = arr.reduce((acc,cv)=>{

	acc = acc.concat(cv)
	return acc;
},[])

console.log(size)