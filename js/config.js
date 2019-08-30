let Racing = {};

//所有今天馬匹資料
let currentMatchHorseData = {};

//該場馬匹分析資料
let horseCurrentMatchStackData = '';

window.$grid = null;

//firebase data
const firebaseConfig = {
    apiKey: "AIzaSyDePToJuht1hyi_O73VIeKdmL1O5hI0UME",
    authDomain: "racingtool-b9bc4.firebaseapp.com",
    databaseURL: "https://racingtool-b9bc4.firebaseio.com",
    projectId: "racingtool-b9bc4",
    storageBucket: "racingtool-b9bc4.appspot.com",
    messagingSenderId: "132036832937",
    appId: "1:132036832937:web:ed7ae7644eef5d08"
};

firebase.initializeApp(firebaseConfig);
let firebase_database = firebase.database();

//MENU TOP 賽事簡單資料
let basicMatchData = ''; 

//現在場數
let currentMatch = 1;

//現在場數距離
let currentMatchDistance = '';

//資事資料
let allMatchData = null;

//標準及最快時間紀錄
let standardTimeJson = '';

const DistanceMapping = {
                '1000' : 'P3',
                '1200' : 'P3',
                '1400' : 'P4',
                '1600' : 'P4',
                '1650' : 'P4',
                '1800' : 'P5',
                '2000' : 'P5',
                '2200' : 'P6',
                '2400' : 'P6'
            }