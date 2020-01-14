const  adress = {
    name:  'sada',
    street:  'dasdasda',
    number: 1
}

const    {name,  street, number} = adress;

const first  = [1,2,3];
const second =   [4,5,6];
//const  combined =  first.concat(second);
const combined =  [...first, 'a', ...second];
const clone = [...first];

const  obj1 =  {name:'Alex'};
const   obj2  = {job:'programmer'};
const combinedObj = {...obj1, ...obj2,  location:'Greece'};
const cloneObj = {...first};


const objArray = { array: [1,2,3]};
const { length: count } = objArray.array;
console.log(count);
//console.log(first.length > 0 && 'true');