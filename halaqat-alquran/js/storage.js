function saveData(){

localStorage.setItem(

"halaqatData",

JSON.stringify(systemData)

);

}



function loadData(){

const saved=

localStorage.getItem(

"halaqatData"

);

if(saved){

Object.assign(

systemData,

JSON.parse(saved)

);

}

}