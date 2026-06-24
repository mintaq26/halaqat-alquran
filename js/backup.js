function exportBackup(){

const data=

JSON.stringify(

systemData

);

const blob=

new Blob(

[data],

{

type:

"application/json"

}

);

const link=

document.createElement(

"a"

);

link.href=

URL.createObjectURL(

blob

);

link.download=

"halaqat-backup.json";

link.click();

}



function importBackup(){

const input=

document.createElement(

"input"

);

input.type=

"file";

input.accept=

".json";



input.onchange=

function(e){

const file=

e.target.files[0];



if(!file){

return;

}



const reader=

new FileReader();



reader.onload=

function(){

try{

const imported=

JSON.parse(

reader.result

);



Object.assign(

systemData,

imported

);



saveData();



alert(

"✅ تمت استعادة النسخة الاحتياطية"

);



renderDashboard();

}

catch(error){

alert(

"❌ الملف غير صالح"

);

}

};



reader.readAsText(

file

);

};



input.click();

}