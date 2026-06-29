
function renderReports(){

if(systemData.dailyEntries.length===0){

document.getElementById("app").innerHTML=`

<div class="students-page">

<h2>📄 التقارير</h2>

<div class="empty-box">

لا توجد تقارير محفوظة

</div>

<button id="backBtn" class="btn-back">

⬅️ رجوع

</button>

</div>

`;

document.getElementById(

"backBtn"

).onclick=

renderDashboard;

return;

}

const report=

systemData.dailyEntries[

systemData.dailyEntries.length-1

];

let studentsHtml="";

report.entries.forEach(

(item,index)=>{

let plans="";

if(item.attendance==="حاضر"){

plans=`

<div class="student-plan">

📖 مقرر الحفظ

<br>

${item.saveSura || "-"}

${item.saveFrom ? " ("+item.saveFrom : ""}

${item.saveTo ? "-"+item.saveTo+")" : ""}

</div>

<div class="student-plan">

🔄 مقرر المراجعة

<br>

${item.reviewSura || "-"}

${item.reviewFrom ? " ("+item.reviewFrom : ""}

${item.reviewTo ? "-"+item.reviewTo+")" : ""}

</div>

<div class="student-plan">

⏭️ المقرر القادم

<br>

${item.nextSura || "-"}

${item.nextFrom ? " ("+item.nextFrom : ""}

${item.nextTo ? "-"+item.nextTo+")" : ""}

</div>

`;

}

studentsHtml+=`

<div class="whatsapp-student-card">

<div class="student-order">

${index+1}

</div>

<div class="student-content">

<div class="student-header-row">

<div class="${
item.attendance==="حاضر"

?

"attendance-dot-green"

:

"attendance-dot-red"

}">

</div>

<div class="student-name">

${item.studentName}

</div>

</div>

${plans}

</div>

</div>

`;

});

document.getElementById(

"app"

).innerHTML=`

<div class="reports-page">

<div class="report-container">

<div class="report-header">

<img

src="images/logo.png"

class="report-logo">

<div class="report-center">

<div class="report-title">

تقارير حلقات 
</div>

<div class="report-subtitle">
 القرآن الكريم

</div>

</div>

<img

src="images/logo.png"

class="report-logo">

</div>

<div class="report-info-box">

📅 ${report.date}

<br><br>

👤 المعلم:

${systemData.teacher.teacherName}

<br><br>

📚 الحلقة:

${systemData.teacher.halaqaName}

</div>

<div class="students-title">

👥 أسماء الطلبة

</div>

<div>

${studentsHtml}

</div>

<div class="buttons-column">

<button id="shareWhatsappBtn" class="btn-wa">
📤 تقرير مصور
</button>

<button id="shareTextReportBtn" class="btn-text">
📝 تقرير نصي
</button>

<button id="backBtn" class="btn-back">
⬅️ رجوع
</button>

</div>

</div>

</div>

`;

document.getElementById(

"backBtn"

).onclick=

renderDashboard;
document.getElementById(
"shareTextReportBtn"
).onclick=
shareTextReport;

document.getElementById(

"shareWhatsappBtn"

).onclick=

shareToWhatsapp;

}



function openReport(index){

const report=

systemData.dailyEntries[index];



let html="";



report.entries.forEach(

item=>{



html += `

<div class="report-details-card">

<div>

<b>

${item.studentName}

</b>

</div>

<div>📌 ${item.attendance}</div>

<div>
📖 الحفظ: ${item.saveSura}
(${item.saveFrom}-${item.saveTo})
</div>

<div>
🔄 المراجعة: ${item.reviewSura}
(${item.reviewFrom}-${item.reviewTo})
</div>

<div>
⏭️ القادم: ${item.nextSura}
(${item.nextFrom}-${item.nextTo})
</div>

</div>

`;



}

);



document.getElementById(

"app"

).innerHTML=`

<div class="students-page">

<h2>

📅 ${report.date}

</h2>



${html}


<button id="backBtn" class="btn-back">
⬅️ رجوع
</button>


</div>

`;



document

.getElementById(

"backBtn"

)

.onclick=

renderReports;

}

async function shareToWhatsapp(){

try{

const report=

document.querySelector(

".report-container"

);

const canvas=

await html2canvas(

report,

{

scale:2,

backgroundColor:"#ffffff"

}

);

canvas.toBlob(

async(blob)=>{

const file=

new File(

[blob],

"تقرير الحلقة.png",

{

type:"image/png"

}

);

if(

navigator.canShare

&&

navigator.canShare({

files:[file]

})

){

await navigator.share({

title:"تقرير الحلقة",

text:"📄 تقرير الحلقة",

files:[file]

});

}

else{

const link=

document.createElement(

"a"

);

link.href=

URL.createObjectURL(

blob

);

link.download=

"تقرير الحلقة.png";

link.click();

}

}

);

}

catch(error){

console.log(error);

alert(

"تعذر إنشاء التقرير"

);

}

}
function shareTextReport(){

const report=
systemData.dailyEntries[
systemData.dailyEntries.length-1
];


let reportText="";

reportText+="  ❖◎تقرير اليوم❖◎  \n";
reportText+="═══ °❖◎📖◎❖°═══\n";

reportText+="المدرســــة القرآنيــــة الوقفيــــة بولاية العامرات\n";

reportText+=`❖◎${systemData.teacher.halaqaName}❖◎\n`;

reportText+="═══ °❖◎📖◎❖°═══\n";

/* reportText+=`الأسبوع ${systemData.currentWeek}\n`; */

reportText+=`اليوم: ${report.date}\n`;

reportText+=`معلم الحلقة: ${systemData.teacher.teacherName}\n`;

if(report.notes){
 
/* reportText+="\n"; */
/* reportText+="📌\n"; */
reportText+="═══ °❖◎📖◎❖°═══\n";
reportText+=report.notes+"\n";

}

/* reportText+="\n";  */
reportText+="═══ °❖◎📖◎❖°═══\n";

report.entries.forEach((item,index)=>{

reportText+=`${index+1}- ${item.studentName}`;

if(item.attendance==="غائب"){

/* reportText+=" (ع)\n"; */
 
}else{

reportText+="\n";

}

if(item.attendance==="غائب"){

reportText+="🔴 غائب\n";

}else{

reportText+=`📖 الحفظ\n`;
reportText+=`${item.saveSura || "-"} ${item.saveFrom || ""}${item.saveTo ? "-"+item.saveTo : ""}\n`;

reportText+=`🔄 المراجعة\n`;
reportText+=`${item.reviewSura || "-"} ${item.reviewFrom || ""}${item.reviewTo ? "-"+item.reviewTo : ""}\n`;

reportText+=`⏭️ القادم\n`;
reportText+=`${item.nextSura || "-"} ${item.nextFrom || ""}${item.nextTo ? "-"+item.nextTo : ""}\n`;

}

reportText+="═══ °❖◎ ◎❖°═══\n";

});

/* reportText+="\n"; */
reportText+="بارك الله في الجهود المبذولة وفتح الله على الجميع فتحاً مبيناً\n";
reportText+="ومزيداً من التقدم والنجاح";

navigator.clipboard.writeText(reportText);

alert("✅ تم نسخ التقرير النصي");

}

