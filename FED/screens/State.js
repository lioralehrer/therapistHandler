import React from 'react';

const goals =()=>{
  let arr = [  {
        serialNum: 1,
        id: Math.random(),
        skillType: '  שפה רצפטיבית',
        title: 'מטרה 1',
        description: "כאשר המבוגר יבקש מירדן להביא אובייקט מסוים שנמצא בחדר ומצריך חיפוש כלשהו על מנת לאתרו, ירדן תחפש את האובייקט ותביא אותו ",
        activities: [{ title: 'מגלשה', description: '', environments: { default: 'חדר טיפולים', more: [] } }],
        arcived: false,
        subGoals: [
            { id: 1, text: 'תת 1', done: "", tries: 0, succseses: 0 },
            { id: 2, text: 'תת 2', done: "", tries: 0, succseses: 0 },
            { id: 3, text: ' תת 3', done: "", tries: 0, succseses: 0 },
            { id: 4, text: 'תת 4', done: "", tries: 0, succseses: 0 }],
        numOfTherapists: 1,
        numOfDays: 4,
    },
    {
        serialNum: 2,
        id: Math.random(),
        skillType: 'כישורים חברתיים',
        title: 'מטרה שניה',
        description: '0במהלך פעילות תנועה או פעילות משחקית, ירדן תשתף את המבוגר בפעילות באופן מילולי המלווה במבט. היא תעשה זאת בלפחות שתי פעילויות שונות, עם שני מבוגרים שונים, לאורך 3 ימים עוקבים.")',
        checked: false,
        TherapistsConnected: ["קורל", "הדר", "מאי"],
        activities: [{ title: 'גואש', description: '', environments: { default: 'חדר טיפולים', more: [] } }],
        arcived: false,
        subGoals: [
            { id: 1, text: 'תת מטרה 1', done: "", tries: 0, succseses: 0 },
            { id: 2, text: 'תת מטרה 2', done: "", tries: 0, succseses: 0 },
            { id: 3, text: 'תת מטרה 3', done: "", tries: 0, succseses: 0 },
            { id: 4, text: 'תת מטרה 4', done: "", tries: 0, succseses: 0 }],
        numOfTherapists: 2,
        numOfDays: 3,
    },
    {
        serialNum: 3,
        id: Math.random(),
        skillType: 'שפה אקספרסיבית',
        title: 'מטרה שלישית',
        description: 'במהלך משחק משותף, כאשר המבוגר מציג לירדן תמונות\ציורים של דמויות עצובות\שמחות, ירדן תשיים אותן ותגיש למבוגר את התמונה\ציור הנכונים ע""פ בקשה מסוימת כגון ""תני לי אופיר עצובה"", עבור 5 דמויות שונות. היא תעשה זאת עם שני מבוגרים שונים, לאורך 3 ימים עוקבים.")',
        activities: [{ title: 'פאזל', description: '', environments: { default: 'חדר טיפולים', more: ['env1', 'env2'] } }, { title: 'כדור', description: '', environments: { default: '', more: [] } }],
        arcived: false,
        subGoals: [
            { id: 1, text: 'בדקי שעובד  ', done: "", tries: 0, succseses: 0 },
            { id: 2, text: 'תת מטרה 2', done: "", tries: 0, succseses: 0 },
            { id: 3, text: 'תת מטרה 3', done: "", tries: 0, succseses: 0 },
            { id: 4, text: 'תת מטרה 4', done: "", tries: 0, succseses: 0 }],
        numOfTherapists: 3,
        numOfDays: 3,
    },
    {
        serialNum: 4,
        id: Math.random(),
        skillType: 'קשב משותף',
        title: 'מטרה רביעית',
        description: 'בלהבהבךבב',
        activities: [{ title: 'חרוזים', description: '', environments: { default: 'חדר טיפולים', more: [] } }],
        arcived: false,
        subGoals: [
            { id: 1, text: 'תת 1', done: "", tries: 0, succseses: 0 },
            { id: 2, text: 'תת 2', done: "", tries: 0, succseses: 0 },
            { id: 3, text: 'תת 3', done: "", tries: 0, succseses: 0 },
            { id: 4, text: 'תת 4', done: "", tries: 0, succseses: 0 }],
        numOfTherapists: 3,
        numOfDays: 3,

    },
]
return arr;
}  

//  export default states;