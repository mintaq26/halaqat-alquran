function renderDashboard() {

const today=

systemData.selectedDate ||

new Date()

.toISOString()

.split("T")[0];

const todayData=

systemData.dailyEntries.find(

day=>day.date===today

);

const presentCount=

todayData ?

todayData.entries.filter(

entry=>entry.attendance==="حاضر"

).length

:0;

const absentCount=

todayData ?

todayData.entries.filter(

entry=>entry.attendance==="غائب"

).length

:0;

document.getElementById("app").innerHTML=`

<div class="dashboard">

<div class="main-container">

<div class="top-header">

<img
src="images/logo.png"
class="header-logo">

<div class="main-title">

برنامج متابعة الحلقات

</div>

<div class="main-subtitle">

إدارة سهلة • متابعة يومية • تقارير ذكية

</div>

</div>

<div class="chips-row">

<div class="teacher-chip">

👤 ${systemData.teacher.teacherName}

</div>

<div class="halaqa-chip">

📚 ${systemData.teacher.halaqaName}

</div>

</div>

<div class="section-title">

أرقام إحصائية

</div>

<div class="dashboard-stats">

<div class="stat-box">

<i class="fa-solid fa-users"></i>

<div class="number">

${systemData.students.length}

</div>

<div class="label">

الطلبة

</div>

</div>

<div class="stat-box">

<i class="fa-solid fa-file-lines"></i>

<div class="number">

${systemData.dailyEntries.length}

</div>

<div class="label">

التقارير

</div>

</div>

<div class="stat-box">

<i class="fa-solid fa-circle-check"></i>

<div class="number">

${presentCount}

</div>

<div class="label">

الحضور

</div>

</div>

<div class="stat-box">

<i class="fa-solid fa-xmark"></i>

<div class="number">

${absentCount}

</div>

<div class="label">

الغياب

</div>

</div>

</div>

<div class="section-title">

الخدمات الرئيسية

</div>

<div class="menu">

<button id="studentsBtn">

<i class="fa-solid fa-users"></i>

<span>

إدارة الطلبة

</span>

</button>

<button id="dailyBtn">

<i class="fa-solid fa-pen"></i>

<span>

الإدخال اليومي

</span>

</button>

<button id="reportsBtn">

<i class="fa-solid fa-file-lines"></i>

<span>

التقارير

</span>

</button>

<button id="accountBtn">

<i class="fa-solid fa-user"></i>

<span>

الحساب

</span>

</button>

<button id="backupBtn">

<i class="fa-solid fa-database"></i>

<span>

النسخة الاحتياطية

</span>

</button>

<button id="restoreBtn">

<i class="fa-solid fa-cloud-arrow-up"></i>

<span>

الاستعادة

</span>

</button>

</div>

<button
id="logoutBtn"
class="logout-btn">

<i class="fa-solid fa-right-from-bracket"></i>

الخروج

</button>

</div>

</div>

`;


document.getElementById("studentsBtn").onclick=()=>renderStudents();

document.getElementById("dailyBtn").onclick=()=>{

systemData.selectedDate=

new Date()

.toISOString()

.split("T")[0];

renderDaily();

};
document.getElementById("reportsBtn").onclick=()=>renderReports();

document.getElementById(

"accountBtn"

).onclick=

renderAccount;

document.getElementById("backupBtn").onclick=()=>renderBackup();

document.getElementById("restoreBtn").onclick=()=>restoreBackup();

document.getElementById("logoutBtn").onclick=()=>renderLogin();
}
function renderBackup(){

const data=

JSON.stringify(

systemData

);

const blob=

new Blob(

[data],

{

type:"application/json"

}

);

const url=

URL.createObjectURL(

blob

);

const link=

document.createElement(

"a"

);

link.href=url;

link.download=

"backup.json";

link.click();

URL.revokeObjectURL(url);

}
function restoreBackup(){

const input=

document.createElement(

"input"

);

input.type="file";

input.accept=".json";

input.onchange=(e)=>{

const file=

e.target.files[0];

if(!file){

return;

}

const reader=

new FileReader();

reader.onload=(event)=>{

try{

systemData=

JSON.parse(

event.target.result

);

saveData();

alert(

"✅ تم استعادة البيانات"

);

renderDashboard();

}

catch(error){

alert(

"❌ ملف غير صالح"

);

}

};

reader.readAsText(file);

};

input.click();

}