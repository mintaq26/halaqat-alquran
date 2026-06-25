function renderDaily(){
    console.time("daily");
    console.time("cards");

if(systemData.students.length===0){
console.time("html");
document.getElementById("app").innerHTML=`

<div class="daily-page">

<h2>✏️ الإدخال اليومي</h2>

<div class="empty-box">

أضف الطلبة أولاً

</div>

<button id="backBtn">

⬅️ العودة للرئيسية

</button>

</div>

`;
console.timeEnd("html");
document.getElementById("backBtn").onclick=renderDashboard;

return;

}



let cards="";


systemData.students.forEach((student,index)=>{

const last=

systemData.lastStudentData[student.name] || {};

cards+=`

<div class="daily-card">

<div class="student-header">

<div

id="statusDot${index}"

class="status-dot present-dot">

</div>

<h3>

${student.name}

</h3>

</div>

<div class="attendance-buttons">

<button

class="attendance-btn active"

id="present${index}"

onclick="setAttendance(${index},'حاضر')">

✓ حاضر

</button>

<button

class="attendance-btn"

id="absent${index}"

onclick="setAttendance(${index},'غائب')">

✖ غائب

</button>

</div>

<input

type="hidden"

id="attendance${index}"

value="حاضر">

<div class="daily-caption">

📖 مقرر الحفظ

</div>

<div class="entry-row">

<select

id="saveSura${index}"

onchange="fillSaveAyat(${index})">

<option value="">

اختر السورة

</option>

${createSurahOptions(last.saveSura)}

</select>

<select id="saveFrom${index}">

<option>

من

</option>

</select>

<select id="saveTo${index}">

<option>

إلى

</option>

</select>

</div>
<div class="daily-caption">

🔄 مقرر المراجعة

</div>

<div class="entry-row">

<select

id="reviewSura${index}"

onchange="fillReviewAyat(${index})">

<option value="">

اختر السورة

</option>

${createSurahOptions(last.reviewSura)}

</select>

<select

id="reviewFrom${index}">

<option>

من

</option>

</select>

<select

id="reviewTo${index}">

<option>

إلى

</option>

</select>

</div>

<div class="daily-caption">

⏭️ المقرر القادم

</div>

<div class="entry-row">

<select

id="nextSura${index}"

onchange="fillNextAyat(${index})">

<option value="">

اختر السورة

</option>

${createSurahOptions(last.nextSura)}

</select>

<select id="nextFrom${index}">

<option>

من

</option>

</select>

<select id="nextTo${index}">

<option>

إلى

</option>

</select>

</div>

</div>

`;

});
console.timeEnd("cards");
document.getElementById("app").innerHTML=`

<div class="daily-page">

<div class="top-section">

<div class="logo-container">

<img

src="images/logo.png"

class="header-logo">

</div>

<div class="main-title">

الإدخال اليومي

</div>

<div class="main-subtitle">

تسجيل أداء الطلبة اليوم

</div>

</div>

<input

type="date"

id="dailyDate">
<br>
${cards}
<div class="report-notes-box">



<div class="notes-box">

<label class="notes-label">
📝 ملاحظات المعلم
</label>

<textarea
id="reportNotes"
class="report-notes">
</textarea>

</div>

</div>
<button id="saveDailyBtn">

💾 حفظ اليوم

</button>

<button id="backBtn">

⬅️ رجوع

</button>

</div>

`;

document.getElementById(

"dailyDate"

).value=

systemData.selectedDate;
systemData.students.forEach(

(student,index)=>{

document.getElementById(

`attendance${index}`

).value="حاضر";

});
console.time("restoreData");
systemData.students.forEach(

(student,index)=>{

const last=

systemData.lastStudentData[

student.name

];

if(!last){

return;

}

/* يبدأ دائماً بحاضر */

setAttendance(

index,

"حاضر"

);

/* الحفظ */

if(last.saveSura){

document.getElementById(

`saveSura${index}`

).value=

last.saveSura;

fillSaveAyat(index);

document.getElementById(

`saveFrom${index}`

).value=

last.saveFrom;

document.getElementById(

`saveTo${index}`

).value=

last.saveTo;

}

/* المراجعة */

if(last.reviewSura){

document.getElementById(

`reviewSura${index}`

).value=

last.reviewSura;

fillReviewAyat(index);

document.getElementById(

`reviewFrom${index}`

).value=

last.reviewFrom;

document.getElementById(

`reviewTo${index}`

).value=

last.reviewTo;

}

/* القادم */

if(last.nextSura){

document.getElementById(

`nextSura${index}`

).value=

last.nextSura;

fillNextAyat(index);

document.getElementById(

`nextFrom${index}`

).value=

last.nextFrom;

document.getElementById(

`nextTo${index}`

).value=

last.nextTo;

}

}


);
console.timeEnd("restoreData");
document.getElementById(

"saveDailyBtn"

).onclick=

saveDaily;

document.getElementById(

"backBtn"

).onclick=

renderDashboard;
console.time("afterRender");
console.timeEnd("daily");
}



function saveDaily(){

const today=

document.getElementById(

"dailyDate"

).value;

systemData.selectedDate=today;

const entries=[];

for(

let index=0;

index<systemData.students.length;

index++

){

const student=

systemData.students[index];

const item={

studentName:student.name,

attendance:

document.getElementById(

`attendance${index}`

).value,

saveSura:

document.getElementById(

`saveSura${index}`

).value,

saveFrom:

document.getElementById(

`saveFrom${index}`

).value,

saveTo:

document.getElementById(

`saveTo${index}`

).value,

reviewSura:

document.getElementById(

`reviewSura${index}`

).value,

reviewFrom:

document.getElementById(

`reviewFrom${index}`

).value,

reviewTo:

document.getElementById(

`reviewTo${index}`

).value,

nextSura:

document.getElementById(

`nextSura${index}`

).value,

nextFrom:

document.getElementById(

`nextFrom${index}`

).value,

nextTo:

document.getElementById(

`nextTo${index}`

).value

};

/* الفاليديشن */

if(

item.attendance==="حاضر"

&&

item.saveSura===""

&&

item.reviewSura===""

&&

item.nextSura===""

){

alert(

`${student.name}\n\nيجب اختيار مقرر واحد على الأقل`

);

return;

}

systemData.lastStudentData[

student.name

]={

saveSura:item.saveSura,

saveFrom:item.saveFrom,

saveTo:item.saveTo,

reviewSura:item.reviewSura,

reviewFrom:item.reviewFrom,

reviewTo:item.reviewTo,

nextSura:item.nextSura,

nextFrom:item.nextFrom,

nextTo:item.nextTo

};

entries.push(item);

}

const existingIndex=

systemData.dailyEntries.findIndex(

day=>day.date===today

);

if(existingIndex>=0){

systemData.dailyEntries[existingIndex].entries=entries;

systemData.dailyEntries[existingIndex].notes=
document.getElementById(
"reportNotes"
)?.value || "";

}

else{

systemData.dailyEntries.push({

date:today,

entries:entries,

notes:
document.getElementById(
"reportNotes"
)?.value || ""

});

}

saveData();

const answer=confirm(

"✅ تم الحفظ\n\nهل تريد عرض التقرير الآن ؟"

);

if(answer){

renderReports();

}

else{

renderDashboard();

}

}




function setAttendance(index,status){

document.getElementById(

`attendance${index}`

).value=status;

const present=

document.getElementById(

`present${index}`

);

const absent=

document.getElementById(

`absent${index}`

);
const dot=

document.getElementById(

`statusDot${index}`

);
const controls=[

`saveSura${index}`,

`saveFrom${index}`,

`saveTo${index}`,

`reviewSura${index}`,

`reviewFrom${index}`,

`reviewTo${index}`,

`nextSura${index}`,

`nextFrom${index}`,

`nextTo${index}`

];
present.classList.remove(

"active",

"absent-active"

);

absent.classList.remove(

"active",

"absent-active"

);

if(status==="حاضر"){

    dot.classList.remove(

"absent-dot"

);

dot.classList.add(

"present-dot"

);
controls.forEach(id=>{

document.getElementById(id)

.disabled=false;

});
present.classList.add(

"active"

);

}

else{
    dot.classList.remove(

"present-dot"

);

dot.classList.add(

"absent-dot"

);
controls.forEach(id=>{

document.getElementById(id)

.disabled=true;

});
absent.classList.add(

"absent-active"

);

}

}
function createSurahOptions(selected=""){

let html="";

surahs.forEach(

surah=>{

html+=`

<option

value="${surah.name}"

${selected===surah.name ? "selected" : ""}>

${surah.name}

</option>

`;

}

);

return html;

}



function fillReviewAyat(index){

const sura=

document.getElementById(

`reviewSura${index}`

).value;

const from=

document.getElementById(

`reviewFrom${index}`

);

const to=

document.getElementById(

`reviewTo${index}`

);

from.innerHTML="";

to.innerHTML="";

if(!sura){

return;

}

const selected=

surahs.find(

s=>s.name===sura

);

let html="";

for(

let i=1;

i<=selected.verses;

i++

){

html+=`

<option value="${i}">

${i}

</option>

`;

}

from.innerHTML=html;

to.innerHTML=html;

}
function fillSaveAyat(index){

const sura=

document.getElementById(

`saveSura${index}`

).value;

const from=

document.getElementById(

`saveFrom${index}`

);

const to=

document.getElementById(

`saveTo${index}`

);

from.innerHTML="";

to.innerHTML="";

if(!sura){

return;

}

const selected=

surahs.find(

s=>s.name===sura

);

let html="";

for(

let i=1;

i<=selected.verses;

i++

){

html+=`

<option value="${i}">

${i}

</option>

`;

}

from.innerHTML=html;

to.innerHTML=html;

}

function fillNextAyat(index){

const sura=

document.getElementById(

`nextSura${index}`

).value;

const from=

document.getElementById(

`nextFrom${index}`

);

const to=

document.getElementById(

`nextTo${index}`

);

from.innerHTML="";

to.innerHTML="";

if(!sura){

return;

}

const selected=

surahs.find(

s=>s.name===sura

);

let html="";

for(

let i=1;

i<=selected.verses;

i++

){

html+=`

<option value="${i}">

${i}

</option>

`;

}

from.innerHTML=html;

to.innerHTML=html;

}
function shareToWhatsapp(){

const report =
systemData.dailyEntries[
systemData.dailyEntries.length - 1
];
alert("الملاحظة = " + report.notes);
alert(
JSON.stringify(report,null,2)
);
let text = "";

text += "📄 تقرير الحلقة\n";
text += "━━━━━━━━━━━━━━\n\n";

text += "📅 التاريخ: " + report.date + "\n";
text += "👤 المعلم: " + systemData.teacher.teacherName + "\n";
text += "📚 الحلقة: " + systemData.teacher.halaqaName + "\n\n";

if(report.notes){

text += report.notes + "\n\n";

}

text += "👥 أسماء الطلبة:\n";
text += "━━━━━━━━━━━━━━\n\n";

report.entries.forEach((item, index)=>{

text += (index + 1) + " - " + item.studentName + "\n";

if(item.attendance === "حاضر"){

text += "🟢 حاضر\n";

text += "📖 الحفظ: " +
(item.saveSura || "-") +
" (" + (item.saveFrom || "") +
"-" + (item.saveTo || "") + ")\n";

text += "🔄 المراجعة: " +
(item.reviewSura || "-") +
" (" + (item.reviewFrom || "") +
"-" + (item.reviewTo || "") + ")\n";

text += "⏭️ القادم: " +
(item.nextSura || "-") +
" (" + (item.nextFrom || "") +
"-" + (item.nextTo || "") + ")\n";

}else{

text += "🔴 غائب\n";

}

text += "\n";

});

const url =
"https://wa.me/?text=" +
encodeURIComponent(text);

window.open(url, "_blank");

}