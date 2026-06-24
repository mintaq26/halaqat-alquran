function renderStudents(){

let studentsHtml="";

if(systemData.students.length===0){

studentsHtml=`

<div class="empty-box">

لا يوجد طلبة حاليا

</div>

`;

}

systemData.students.forEach(

(student,index)=>{

studentsHtml+=`

<div class="student-card">

<div>

<h3>

${student.name}

</h3>


<div>

📞 ${student.phone || "لم يحدد"}

</div>

</div>

<div class="student-actions">

<button

onclick="editStudent(${index})">

✏️

</button>



<button

onclick="deleteStudent(${index})">

🗑️

</button>

</div>

</div>

`;

}

);

document.getElementById("app").innerHTML=`

<div class="dashboard">

<div class="main-container">

<div class="students-page">

<div class="top-section">

<div class="logo-area">

<img

src="images/logo.png"

class="header-logo">

</div>

<div class="main-title">

إدارة الطلبة

</div>


<div class="main-subtitle">

إضافة ومتابعة بيانات الطلبة 

</div>

</div>
<div class="section-title center-title">

<div class="students-stats">

<div class="stat-box">

<div class="number">

${systemData.students.length}

</div>

<div class="label">

عدد الطلبة

</div>

</div>

</div>

</div>
<div class="student-form">

<input

id="studentName"

placeholder="اسم الطالب">

<button

id="addStudentBtn">

➕ إضافة

</button>

</div>

${studentsHtml}

<button

id="backBtn">

⬅️ رجوع

</button>

</div>

</div>

</div>

`;

document

.getElementById(

"addStudentBtn"

)

.onclick=

addStudent;

document

.getElementById(

"backBtn"

)

.onclick=

renderDashboard;

}



function addStudent(){

const input=

document.getElementById(

"studentName"

);

const name=

input.value.trim();

if(name===""){

return;

}

systemData.students.push({

id:Date.now(),

name:name,

parentName:"",

phone:"",

link:""

});

saveData();

renderStudents();

}



function deleteStudent(index){

systemData.students.splice(

index,

1

);

saveData();

renderStudents();

}



function editStudent(index){

const student=

systemData.students[index];

const newName=

prompt(

"اسم الطالب",

student.name

);

if(!newName){

return;

}



const phone=

prompt(

"رقم ولي الأمر",

student.phone || ""

);

student.name=

newName.trim();



student.phone=

(phone || "").trim();

saveData();

renderStudents();

}
function generateLink(index){

const student=

systemData.students[index];

if(

student.link===""

){

student.link=

"https://halaqa.app/student/"+

student.id;

}

saveData();

alert(

"🔗 رابط الطالب:\n\n"+

student.link

);

}