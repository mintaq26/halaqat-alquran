loadData();

if(

!systemData.isSetup

){

renderSetup();

}

else if(

systemData.isLoggedIn

){

renderDashboard();

}

else{

renderLogin();

}