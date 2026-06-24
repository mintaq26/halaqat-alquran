function renderSetup(){

document.getElementById("app").innerHTML=`

<div class="login-page">

<div class="login-card">

<div class="logo-container">

<img

src="images/logo.png"

class="login-logo"

alt="الشعار">

</div>
<h1>

إعداد البرنامج

</h1>

<p>

أدخل بياناتك لأول مرة

</p>

<input

id="teacherName"

placeholder="اسم المعلم">

<input

id="halaqaName"

placeholder="اسم الحلقة">

<input

id="username"

placeholder="اسم المستخدم">

<input

id="password"

type="password"

placeholder="كلمة المرور">

<input

id="confirmPassword"

type="password"

placeholder="تأكيد كلمة المرور">

<input
type="password"

id="recoveryCode"

placeholder="رمز استعادة كلمة المرور">


<button id="createAccountBtn">

إنشاء الحساب

</button>

</div>

</div>

`;

document

.getElementById(

"createAccountBtn"

)

.onclick=

createAccount;

}



function createAccount(){

const teacherName=

document.getElementById(

"teacherName"

).value.trim();

const halaqaName=

document.getElementById(

"halaqaName"

).value.trim();

const username=

document.getElementById(

"username"

).value.trim();

const password=

document.getElementById(

"password"

).value.trim();

const confirmPassword=

document.getElementById(

"confirmPassword"


).value.trim();

const recoveryCode=

document.getElementById("recoveryCode")

.value

.trim();

if(

teacherName===""

||

halaqaName===""

||

username===""

||

password===""

||

!recoveryCode

){

alert(

"أكمل جميع الحقول"

);

return;

}

if(

password.length<4

){

alert(

"يجب أن تتكون كلمة المرور من 4 أحرف على الأقل"

);

return;

}

if(

recoveryCode.length<4

){

alert(

"يجب أن يتكون رمز الاستعادة من 4 أحرف على الأقل"

);

return;

}

if(

password!==confirmPassword

){

alert(

"كلمتا المرور غير متطابقتين"

);

return;

}



systemData.teacher={

teacherName:teacherName,

halaqaName:halaqaName,

username:username,

password:password,
recoveryCode

};



systemData.isSetup=true;



saveData();



renderLogin();

}