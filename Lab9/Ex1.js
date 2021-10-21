date = 4;
month = 10;
year = 2001;


step1=21;
step2=parseInt(step1/4);
step3 = step2 + step1;
step4 = 0; 
step6 = step4 + step3;
step7 = step6 + date;
step8 = step7 - 1;
step9 = step8 % 7; 

var weekDay=new Array(7);
weekDay[0]="Sunday";
weekDay[1]="Monday";
weekDay[2]="Tuesday";
weekDay[3]="Wednesday";
weekDay[4]="Thursday";
weekDay[5]="Friday";
weekDay[6]="Saturday";

console.log(`My bday is ${weekDay[step9]}.`);