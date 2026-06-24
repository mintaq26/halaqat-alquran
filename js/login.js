function renderLogin(){

document.getElementById(

"app"

).innerHTML=`

<div class="login-page">

<div class="login-card">

<div class="logo-container">

<img

src="images/logo.png"

class="login-logo"

alt="الشعار">

</div>

<h1>

حلقات القرآن الكريم

</h1>

<p>

نظام إدارة الحلقات

</p>

<input

id="username"

placeholder="اسم المستخدم">

<input

id="password"

type="password"

placeholder="كلمة المرور">

<button id="loginBtn">

دخول

</button>
<div id="forgotPasswordBtn"

class="forgot-password">

نسيت كلمة المرور؟

</div>

</div>

</div>

`;

document

.getElementById(

"loginBtn"

)

.onclick=

login;
document

.getElementById(

"forgotPasswordBtn"

)

.onclick=

renderForgotPassword;
}



function login(){

const username=

document.getElementById(

"username"

).value.trim();

const password=

document.getElementById(

"password"

).value.trim();

if(

username===

systemData.teacher.username

&&

password===

systemData.teacher.password

){

systemData.isLoggedIn=true;

saveData();

renderDashboard();

}

else{

alert(

"اسم المستخدم أو كلمة المرور غير صحيحة"

);

}

}
function renderForgotPassword(){

document.getElementById(

"app"

).innerHTML=`

<div class="login-page">

<div class="login-card">

<div class="logo-container">

<img

src="images/logo.png"

class="login-logo"

alt="الشعار">

</div>

<h1>

استعادة كلمة المرور

</h1>

<p>

أدخل رمز الاستعادة وكلمة المرور الجديدة

</p>

<input

id="recoveryCode"

type="password"

placeholder="رمز استعادة كلمة المرور">

<input

id="newPassword"

type="password"

placeholder="كلمة المرور الجديدة">

<input

id="confirmPassword"

type="password"

placeholder="تأكيد كلمة المرور">

<button id="savePasswordBtn">

حفظ

</button>

<button id="backLoginBtn">

رجوع

</button>

</div>

</div>

`;

document

.getElementById(

"savePasswordBtn"

)

.onclick=

saveNewPassword;

document

.getElementById(

"backLoginBtn"

)

.onclick=

renderLogin;

}
function saveNewPassword(){

const recoveryCode=

document

.getElementById(

"recoveryCode"

)

.value

.trim();

const newPassword=

document

.getElementById(

"newPassword"

)

.value

.trim();

const confirmPassword=

document

.getElementById(

"confirmPassword"

)

.value

.trim();

if(

recoveryCode!==

systemData.teacher.recoveryCode

){

alert(

"رمز الاستعادة غير صحيح"

);

return;

}

if(

newPassword.length<4

){

alert(

"يجب أن تتكون كلمة المرور من 4 أحرف على الأقل"

);

return;

}

if(

newPassword!==

confirmPassword

){

alert(

"كلمتا المرور غير متطابقتين"

);

return;

}

systemData.teacher.password=

newPassword;

saveData();

alert(

"تم تغيير كلمة المرور بنجاح"

);

renderLogin();

}