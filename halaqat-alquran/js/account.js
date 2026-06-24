
function renderAccount(){

document.getElementById(

"app"

).innerHTML=`

<div class="students-page">

<h2>

 الحساب

</h2>

<div class="account-wrapper">

<div class="account-container">

<div class="student-card">

<div class="account-row">

<div class="account-icon">

👨‍🏫

</div>

<div>

<div class="account-title">

اسم المعلم

</div>

<div class="account-value">

${systemData.teacher.teacherName}

</div>

</div>

</div>

</div>

<div class="student-card">

<div class="account-row">

<div class="account-icon">

📚

</div>

<div>

<div class="account-title">

اسم الحلقة

</div>

<div class="account-value">

${systemData.teacher.halaqaName}

</div>

</div>

</div>

</div>

<div class="student-card">

<div class="account-row">

<div class="account-icon">

🪪

</div>

<div>

<div class="account-title">

اسم المستخدم

</div>

<div class="account-value">

${systemData.teacher.username}

</div>

</div>

</div>

</div>

<div class="student-card">

<div class="account-row">

<div class="account-icon">

🔒

</div>

<div>

<div class="account-title">

كلمة المرور

</div>

<div class="account-value">

••••••••

</div>

</div>

</div>

</div>

<button

id="editAccountBtn"

class="save-btn">

✏️ تعديل الحساب

</button>

<button id="backBtn">

⬅️ العودة للرئيسية

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

"editAccountBtn"

).onclick=

renderSetup;

}
