let matchLenght = '';
let getSection = /speedList/.test(window.location.href);
let getCurrentMatch = (/currentMatch/.test(window.location.href) ? currentMatch = window.location.href.replace(/.*currentMatch=/,'') : '' );

Racing.init = function (){

    Racing.dataLoader.BindAllHorseData
    .then(Racing.menu.buildMenu)
    .then(()=>{
        $('.loadingCTN').hide();
        $('.panel').show();
    })

}


Racing.HorseDataControl = function(data){
    

    const stackStructure = {
        status : {},
        firstTime : {},
        noHistory : {}
    };
    
    const currentMatchHistory = currentMatchHorseData[currentMatch];
    
    $.each(currentMatchHistory, function(k,horse){
        
        // stackStructure.status[k] = Racing.detectHorseStatus(horse);
        stackStructure.firstTime[k] = true;
        
        if(horse.length == 0 ){
            stackStructure.noHistory[k] = true;
        }else{
            stackStructure.noHistory[k] = false;
        }

        $.each(horse,function(k1, v){
            
            if(v.matchDistance == currentMatchDistance && stackStructure.firstTime[v.horseName] != false && v.horseRunningPosition[0] != '退出'){
                stackStructure.firstTime[v.horseName] = false;
            }

            if(typeof stackStructure[v.matchDistance] == "undefined"){
                stackStructure[v.matchDistance] = [];
                stackStructure[v.matchDistance].push(v);
            }else{
                stackStructure[v.matchDistance].push(v);
            }
            
        })
    
    })
    
    console.log(stackStructure);
    
    return stackStructure;
    
}

Racing.detectHorseStatus = function(data){
    
    if(data.length == 0) return 0;
    
    console.log(data[0].MatchHorseName + '--------------------------');
    
    let horseStructure = {
        st:{},
        hv:{}
    };
    
    $.each(data, function(k,v){
        if(v.MatchPlace == '沙田'){
            
            if(typeof horseStructure['st'][v.MatchDistance] == "undefined"){
                horseStructure['st'][v.MatchDistance] = [];
                horseStructure['st'][v.MatchDistance].push(v);
            }else{
                horseStructure['st'][v.MatchDistance].push(v);
            }
            
        }else{
            
            if(typeof horseStructure['hv'][v.MatchDistance] == "undefined"){
                horseStructure['hv'][v.MatchDistance] = [];
                horseStructure['hv'][v.MatchDistance].push(v);
            }else{
                horseStructure['hv'][v.MatchDistance].push(v);
            }
            
        }
    })
    
    console.log(horseStructure);
    
    
    var intercept = 0;
    var slope = 0;
    var r2 = 0;
    
    $.each(horseStructure, function(place,placeData){
        
        console.log(place + '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        
        
        $.each(placeData, function(k,v){
            
            console.log(k);
  
            if(v.length > 1){
                
                var timeArr = [];
                var dateLengthArr = [];
                
                for( var x = 0 ; x < v.length ; x ++){
                    if(v[x].MatchSpeedRecord != '-'){
                        timeArr.push(Number(v[x].MatchSpeedRecord.FinalTime.replace(/\.|\:/g,'')));
                        dateLengthArr.push(x + 1);
                    }
                }
                
                console.log(timeArr);
                
                var qfTimeArr = timeArr.length != 1 && (timeArr.length != 2 && timeArr[1] != timeArr[2] );
                
                if(qfTimeArr){
                    
                    var lr = Racing.Function.linearRegression(dateLengthArr, timeArr);
                    
                    slope += lr.slope;
                    intercept += lr.intercept;
                    r2 += lr.r2;
                    
                    console.log(lr);
                }
                
            }
            
        })
        
    })
    
    return Math.round(intercept);
    // if(intercept > 100){
    //     return 'up';
    // }else if(intercept < -100){
    //     return 'down';
    // }else{
    //     return 'middle';
    // }
}

$(document).ready(function(){
    Racing.init();
})

// Racing.getArragneListBasicMatch = function(){
//     if(loadBasicMatch != true){
        
//         var data = allMatchData['match' + currentMatch]
//         horseCurrentMatchStackData = Racing.HorseDataControl();
    
//         $('.horseListControl span').removeClass('on');
//         $('.horseListControl span[rel="horseNo"]').addClass('on');
        
//         let horseList = '';
        
//         $.each(data, function(k,v){
            
//             var horseBox = '<div class="horseBox grid-item">'
            
//                 horseBox += '<div class="horseBoxWrapper">';
//                 horseBox += '<div class="horseNo">' + v.hrno + '</div>';
//                 horseBox += '<div class="horseName">' + v.hrname_c;
//                 horseBox +=  (horseCurrentMatchStackData.noHistory[v.hrname_c] ? 'H' : '' ) + (horseCurrentMatchStackData.firstTime[v.hrname_c] ? 'F' : '' )+ '</div>';
//                 horseBox += '<div class="horseAge">' + v.age + '</div>';
//                 horseBox += '<div class="horseJockey">' + v.jockey + '</div>';
//                 horseBox += '<div class="horseDrawno">' + v.drawno + '</div>';
//                 horseBox += '<div class="horseTrainer">' + v.stable + '</div>';
//                 horseBox += '</div>'

//                 horseBox += '<div class="horseBoxHistory">';
//                 horseBox += '<div>狀態走勢: <span class="horseStatus">' + horseCurrentMatchStackData.status[v.hrname_c] + '</span></div>';
//                 horseBox += '<div class="horseHistory" rel="' + v.hrname_c + '">按我看紀錄</div>';
//                 horseBox += '</div>';

//             horseBox += '</div>';
            
//             horseList += horseBox;
            
            
//         })
        
        
        
//         $('.horseTableList').html(horseList);
//         $('.loadingCTN').hide();
//         $('.panel').show();
//         $('.horseTableList').css('opacity' , 0);
        
        
//         if(window.$grid == null){
            
//             window.$grid = $('.grid').isotope({
//                 itemSelector: '.grid-item',
//                 layoutMode: 'fitRows',
//                 getSortData: {
//                     horseNo: '.horseNo parseInt',
//                     horseAge: '.horseAge parseInt',
//                     horseDrawno: '.horseDrawno parseInt',
//                     horseStatus: '.horseStatus parseInt'
//                 },
//                 sortBy: 'horseNo'
//             })
            
//             $('.horseTableList').css('opacity', 1);
        
//         }else{
//             $grid.isotope( 'reloadItems' );
//             $grid.isotope({ sortBy : 'horseNo' });
//             $('.horseTableList').css('opacity', 1);
//         }
        
//         loadBasicMatch = false;

//         $('.horseHistory').on('click',function(el){
            
//             if($(this).children().length != 0){
                
//                 $(this).html('按我看紀錄');
                
//             }else{
                
//                 var horsedata = currentMatchHorseData[currentMatch][$(this).attr('rel')];
                
//                 var history = '<div class="historyBox">';
                
//                 $.each(horsedata, function(k,v){
                    
//                     history += '<div class="wrapper matchBasicDetail">';  
//                     history += '<div class="">' + v.MatchDate + '</div>';
//                     history += '<div class="">' + v.MatchDistance + '</div>';
//                     history += '<div class="">' + v.MatchGround.replace('場地：','') + '</div>';
//                     history += '<div class="">' + v.MatchPlace + '</div>';
//                     history += '</div>';
//                     history += '<div class="wrapper matchTimeDetail">';  
//                     history += '<div class="">' + v.MatchSpeedRecord.P1 + '</div>';
//                     history += '<div class="">' + v.MatchSpeedRecord.P2 + '</div>';
//                     history += '<div class="">' + v.MatchSpeedRecord.P3 + '</div>';
//                     history += '<div class="">' + v.MatchSpeedRecord.P4 + '</div>';
//                     history += '<div class="">' + v.MatchSpeedRecord.P5 + '</div>';
//                     history += '<div class="">' + v.MatchSpeedRecord.P6 + '</div>';
//                     history += '<div class="">' + v.MatchSpeedRecord.FinalTime + '</div>';
//                     history += '</div>';
//                 })
                
//                 history += '</div>';
                
//                 $(this).append(history);
                
//             }
            
//             $grid.isotope({ sortBy : $('.horseListControl span.on').attr('rel') });
//         })

//     }
    
//     // loadBasicMatch = true;
// }