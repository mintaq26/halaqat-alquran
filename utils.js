function getWeekDayName(){

const days=[

"الأحد",

"الإثنين",

"الثلاثاء",

"الأربعاء",

"الخميس",

"الجمعة",

"السبت"

];

return days[

new Date().getDay()

];

}



function getCurrentWeek(){

if(

systemData.weekStartDate===""

){

systemData.weekStartDate=

new Date().toISOString();

saveData();

}

const start=

new Date(

systemData.weekStartDate

);

const today=

new Date();

const diff=

today-start;

const days=

Math.floor(

diff/

86400000

);

return Math.floor(

days/7

)+1;

}
function getWeekDayName(){

const days=[

"الأحد",

"الإثنين",

"الثلاثاء",

"الأربعاء",

"الخميس",

"الجمعة",

"السبت"

];

return days[

new Date().getDay()

];

}



function getCurrentWeek(){

if(

systemData.weekStartDate===""

){

systemData.weekStartDate=

new Date().toISOString();

saveData();

}

const start=

new Date(

systemData.weekStartDate

);

const today=

new Date();

const diff=

today-start;

const days=

Math.floor(

diff/

86400000

);

return Math.floor(

days/7

)+1;

}



function getSelectedDayData(date){

return systemData.dailyEntries.find(

day=>day.date===date

);

}