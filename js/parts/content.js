Racing.contentControl = {
    
    init: function(){
        
        var _this = this;
        
        _this.contentMain();
        _this.contentTopList();
        
    },
    
    contentTopList: function(){
    
        var list = {
            distance:{},
            date:{},
            name:{}
        };
        
        $.each(currentMatchHorseData[currentMatch], function(k,horse){
            $.each(horse, function(k1,v){
                if( typeof list.distance[v.matchDistance] == "undefined"){
                    list.distance[v.matchDistance] = '';
                }
                if( typeof list.date[v.matchDate.substr(0,4)] == "undefined"){
                    list.date[v.matchDate.substr(0,4)] = '';
                }
                if( typeof list.name[v.horseName] == "undefined"){
                    list.name[v.horseName] = '';
                }
            })
        })
        

        // $('.horseListControl').html('<span>所有配速</span>');
        
        var html = '';
        
        var distanceControlList = '<div class="speedCat">';
        $.each(list.distance, function(k,v){
            distanceControlList += '<span class="' + (currentMatchDistance == k ? 'on' : '') + '" rel="' + k + '">' + k + '</span>';
        })
        distanceControlList += '</div>';
        html += distanceControlList;
        
        // var dateControlList = '<div class="dateCat">';
        // dateControlList += '<span rel="all">全部</span>'
        //  $.each(list.date, function(k,v){
        //     dateControlList += '<span class="" rel="' + k + '">' + k + '</span>';
        // })
        // dateControlList +='</div>';
        // html += dateControlList;
        
        var speedCatAdvance = '<div class="speedCatAdvance"><span class="on" rel="final">最終時間</span><span class="" rel="first">前段</span><span class="" rel="last">後段</span></div>';
        html += speedCatAdvance;
        
        var groundCat = '<div class="groundCat"><span class="on" rel="all">全部</span><span class="" rel="mud">泥地</span><span class="" rel="glass">好地</span></div>';
        html += groundCat;
        
        var groundPlace = '<div class="placeCat"><span class="on" rel="all">全部</span><span class="" rel="st">沙田</span><span class="" rel="hv">快活谷</span></div>';
        html += groundPlace;

        var barChart = '<div class="barChart"><span class="' + ( $('.info').css('max-height') == '0px' ? '' : 'on' ) + '">圖表</span></div>';
        html += barChart;
        $('.horseListControl').html(html);
        
        ///////////////////////////////////////////////////////////////
        $('.horseListControl .speedCat span').on('click', function(el){
            $('.horseListControl .speedCat span').removeClass('on');
            $('.horseListControl .groundCat span, .horseListControl .placeCat span').removeClass('on');
            $('.horseListControl .groundCat span[rel="all"], .horseListControl .placeCat span[rel="all"]').addClass('on');
            $(this).addClass('on');
            
            if($('.horseListControl .groundCat span').attr('rel') != 'all'){
                $grid.isotope({ filter : '.' + $(this).attr('rel') + '.' + $('.horseListControl .groundCat span.on').attr('rel') });
                
            }else{
                $grid.isotope({ filter : '.' + $(this).attr('rel') });
                
            }
            
        })
        
        ///////////////////////////////////////////////////////////////////////////////////////////////////
        $('.horseListControl .groundCat span, .horseListControl .placeCat span').on('click', function(el){
            
            $(this).parent().find('span').removeClass('on');
            $(this).addClass('on');

            var place = $('.horseListControl .placeCat span.on').attr('rel') == 'all' ? '' : '.' + $('.horseListControl .placeCat span.on').attr('rel') ;
            var ground = $('.horseListControl .groundCat span.on').attr('rel') == 'all' ? '' : '.' + $('.horseListControl .groundCat span.on').attr('rel') ;
            var speed = $('.horseListControlCat .speed span.on').attr('rel') == 'all' ? '' : '.' + $('.horseListControl .speedCat span.on').attr('rel') ;
        
            $grid.isotope({ filter : place + ground + speed});

        })
        
        //////////////////////////////////////////////////////////////////////
        $('.horseListControl .speedCatAdvance span').on('click', function(el){
            $('.horseListControl .speedCatAdvance span').removeClass('on');
            $(this).addClass('on');
            if($(this).attr('rel') == 'final'){
              $grid.isotope({ sortBy : 'FinalTime'});
            }
            
            if($(this).attr('rel') == 'first'){
              $grid.isotope({ sortBy : 'P1'});
            }
            
            if($(this).attr('rel') == 'last'){
                
                var sortVal = DistanceMapping[$('.horseListControl .speedCat span.on').attr('rel')];
                
              $grid.isotope({ sortBy : sortVal});
              
            }
            
        })
        
        ////////////////////////////////////////////////////////////////////////////
        $('.horseListControl .barChart span').on('click', function(el){
            if($('.horseListControl .barChart span').hasClass('on')){
                $('.horseListControl .barChart span').removeClass('on');
                $('.info').css('max-height','0');
                $('.info').css('overflow','hidden');
            }else{
                $('.horseListControl .barChart span').addClass('on');
                $('.info').css('max-height','1000px');
                $('.info').css('overflow','auto');
            }
        })
        
        
        $grid.on( 'layoutComplete', function( event, laidOutItems ) {
             
             Racing.contentControl.inFoStat();
                
        })
        
        
    },
    
    contentMain: function(){
        
        var _this = this;
        
        horseCurrentMatchStackData = Racing.HorseDataControl();
        
        _this.bindSpeedInfo(horseCurrentMatchStackData);
        _this.bindSpeedTable(horseCurrentMatchStackData);
        
    },
    
    bindSpeedTable: function(horseCurrentMatchStackData){
    
        //date
        
        //horseName
        
        //speed
        
        let horseList = '';
        
        $.each(currentMatchHorseData[currentMatch], function(k,currentMatchHorse){
            
            $.each(currentMatchHorse, function(k1,v){
            
                if(v.horseRunningPosition[0] == '退出') return;
                if(v.matchDate.substr(0,4) < 2018) return;
        
                var horseBox = '<div class="horseBox grid-item ' + v.matchDistance + ' ' + v.matchDate.substr(0, 4) + ' ' + (v.matchGround == '草地' ? 'glass' : 'mud') + ' ' + (v.matchPlace == '沙田' ? 'st' : 'hv') + '">';
                
                horseBox += '<div class="horseBoxWrapper">';
                horseBox += '<div class="horseMatchDate">' + v.matchDate + '</div>';
                horseBox += '<div class="horseName" style="background-color:' + Racing.Function.rgbRanking(horseCurrentMatchStackData.status[v.horseName]) + '">' + 
                 '<a href="https://racing.hkjc.com/racing/information/Chinese/Horse/Horse.aspx?HorseId=HK_' + v.horseId.substring(0,4) + '_' + v.horseId.substr(4, v.horseId.length) + '" target="_blank">' + v.horseName + '</a>' +
                 (horseCurrentMatchStackData.noHistory[v.horseName] ? 'H' : '' ) + (horseCurrentMatchStackData.firstTime[v.horseName] ? 'F' : '' )+ '</div>';
                horseBox += '<div class="horseDistance">' + v.matchDistance + '</div>';
                horseBox += '<div class="horseGround">' + v.matchGroundDetail + '</div>';
                horseBox += '<div class="horsePlace">' + (v.matchPlace == '沙田' ? '沙田' : '快活谷') + '</div>';
                horseBox += '</div>';
            
                horseBox += '<div class="horseBoxWrapper">';
                
                    horseBox += '<div class="MatchP1">' + v.horseSectionalTime.P1 + '</div>';
                    horseBox += '<div class="MatchP2">' + v.horseSectionalTime.P2 + '</div>';
                    horseBox += '<div class="MatchP3">' + v.horseSectionalTime.P3 + '</div>';
                    horseBox += '<div class="MatchP4">' + v.horseSectionalTime.P4 + '</div>';
                    horseBox += '<div class="MatchP5">' + v.horseSectionalTime.P5 + '</div>';
                    horseBox += '<div class="MatchP6">' + v.horseSectionalTime.P6 + '</div>';
                    horseBox += '<div class="MatchFinalTime">' + v.horseFinalTime + '</div>';
                    horseBox += '</div>';
                
                horseBox += '<div class="valBox" style="display:none;">';
                horseBox += '<div class="p1val">' + ((v.horseSectionalTime.P1 != '-' && v.horseSectionalTime.P1 != undefined) ? Number(v.horseSectionalTime.P1.replace(/\.|\(|\)/g,'')) : 0) + '</div>';
                horseBox += '<div class="p2val">' + ((v.horseSectionalTime.P2 != '-' && v.horseSectionalTime.P2 != undefined) ? Number(v.horseSectionalTime.P2.replace(/\.|\(|\)/g,'')) : 0 ) + '</div>';
                horseBox += '<div class="p3val">' + ((v.horseSectionalTime.P3 != '-' && v.horseSectionalTime.P3 != undefined) ? Number(v.horseSectionalTime.P3.replace(/\.|\(|\)/g,'')) : 0 ) + '</div>';
                horseBox += '<div class="p4val">' + ((v.horseSectionalTime.P4 != '-' && v.horseSectionalTime.P4 != undefined) ? Number(v.horseSectionalTime.P4.replace(/\.|\(|\)/g,'')) : 0 ) + '</div>';
                horseBox += '<div class="p5val">' + ((v.horseSectionalTime.P5 != '-' && v.horseSectionalTime.P5 != undefined) ? Number(v.horseSectionalTime.P5.replace(/\.|\(|\)/g,'')) : 0 ) + '</div>';
                horseBox += '<div class="p6val">' + ((v.horseSectionalTime.P6 != '-' && v.horseSectionalTime.P6 != undefined) ? Number(v.horseSectionalTime.P6.replace(/\.|\(|\)/g,'')) : 0 ) + '</div>';
                horseBox += '<div class="fval">' + ((v.horseFinalTime != '-' && v.horseFinalTime != undefined) ? Number(v.horseFinalTime.replace(/\./g,'')) : 0 ) + '</div>';
                horseBox += '</div>';
                
                horseBox += '</div>';
                
                horseList += horseBox;
            })
            
        })
        
        $('.horseTableList').html(horseList);
        $('.horseTableList').css('opacity' , 0);
            
            
        if(window.$grid == null){
            
            window.$grid = $('.grid').isotope({
                itemSelector: '.grid-item',
                layoutMode: 'fitRows',
                getSortData: {
                    P1: '.p1val parseInt',
                    P2: '.p2val parseInt',
                    P3: '.p3val parseInt',
                    P4: '.p4val parseInt',
                    P5: '.p5val parseInt',
                    P6: '.p6val parseInt',
                    FinalTime: '.fval parseInt',
                },
                sortBy: 'FinalTime',
                filter: '.' + currentMatchDistance
            })
            
            Racing.contentControl.inFoStat()
            
            $('.horseTableList').css('opacity', 1);
        
        }else{
            $grid.isotope( 'reloadItems' );
            $grid.isotope({ sortBy : 'FinalTime' });
            $grid.isotope({ filter : '.' + currentMatchDistance });
            $('.horseTableList').css('opacity', 1);
        }
        
 
    },
    
    bindSpeedInfo: function(horseCurrentMatchStackData){
    
        var data = allMatchData['match' + currentMatch].sort(function(a,b){
            return a.drawno - b.drawno
        });
        
        
        var html = '';
        $.each(data, function(k,v){
            html += '<div class="horseInfoRow" rel="' +　v.hrname_c +　'">' 
                + '<div class="horseName" rel="' +　v.hrname_c +　'">' + ( k + 1 ) + '.' + v.hrname_c + (horseCurrentMatchStackData.noHistory[v.hrname_c] ? 'H' : '' ) + (horseCurrentMatchStackData.firstTime[v.hrname_c] ? 'F' : '' ) + '</div>'
                + '<div class="horseBar"></div>'
            + '</div>';
        })
        
        $('.info').html(html);
        
    },
    
    inFoStat: function(){
        
        console.log('check');
        var dataSet = {};
        var distance = $('.speedCat span.on').text() != '' ? $('.speedCat span.on').text() : currentMatchDistance;
        var finalPos = DistanceMapping[distance];
        
        var horseRecordFinalTime = [];
        var horseRecordFirstPos = [];
        var horseRecordFinalPos = [];
        
        setTimeout(function(){
            alert('infostat');
            $.each($('.info .horseName'), function(){
                $(this).css('color', '#777');
            })
            
            $.each($('.horseBox'), function(k,v){
                
                if($(v).css('display') != 'none'){
                    
                    var name = $(v).find('.horseName').text().replace(/H|F/g,'');
                    
                    $('.info .horseName[rel="' + name + '"').css('color', '#fff');
                    
                    if(typeof dataSet[name] == 'undefined'){
                        dataSet[name] = []
                    }
                    
                    var horseRecord = {};
                    
                    horseRecord['date'] = $(v).find('.horseMatchDate').text();
                    
                    horseRecord['FinalTime'] = $(v).find('.MatchFinalTime').text().replace(/\./g, '');
                    horseRecordFinalTime.push($(v).find('.MatchFinalTime').text().replace(/\./g, ''));
                    
                    horseRecord['P1'] = $(v).find('.MatchP1').text().replace(/\./g, '');
                    horseRecordFirstPos.push($(v).find('.MatchP1').text().replace(/\./g, ''));
                    
                    horseRecord[finalPos] = $(v).find( '.Match' + finalPos).text().replace(/\.|\)|\(/g, '')
                    horseRecordFinalPos.push($(v).find( '.Match' + finalPos).text().replace(/\.|\)|\(/g, ''));
                    
                    dataSet[name].push(horseRecord)
                    
                }
            })
            
            
            // var statusMap = {
            //     final : 'FinalTime',
            //     first : 'P1',
            //     last : finalPos
            // }
            
            // var status = statusMap[$('.speedCatAdvance span.on').attr('rel')];
            
            $('.info').removeClass('final');
            $('.info').removeClass('first');
            $('.info').removeClass('last');
            $('.info').addClass($('.speedCatAdvance span.on').attr('rel'));
            
            //中間數
            var FinalTimeStartPoint = 10000;
            var FinalTimeEndPoint = 0;
            var FirstPosStartPoint = 10000;
            var FirstPosEndPoint = 0;
            var FinalPosStartPoint = 10000;
            var FinalPosEndPoint = 0;
            var middleFinal = horseRecordFinalTime[Math.round(horseRecordFinalTime.length/2)];
            var middleFirstPos = horseRecordFirstPos[Math.round(horseRecordFirstPos.length/2)];
            var middleFinalPos = horseRecordFinalPos[Math.round(horseRecordFinalPos.length/2)];
            
            //近兩場時間
            
            var viewObject = {};
            
            $.each(dataSet, function(horseName,list){
                
                var horseArr = [];
                var sortArr = list.sort(function(a,b){
                    return b['date'] - a['date']
                })
                
                viewObject[horseName] = {};
                
                $('.horseInfoRow .horseBar' ).html('');
                
                viewObject[horseName]['FinalTime'] = [];
                viewObject[horseName]['FirstPos'] = [];
                viewObject[horseName]['FinalPos'] = [];
                
                $.each(sortArr, function(k,v){
                    if(k < 2){
                        
                        var FinalTimeNum = -(v.FinalTime/middleFinal * 100 - 100) * 100;
                        var FirstPosTimeNum = -(v['P1']/middleFirstPos * 100 - 100) * 100;
                        var FinalPosNum = -(v[finalPos]/middleFinalPos * 100 - 100) * 100;
                        
                        if(FinalTimeStartPoint > FinalTimeNum){
                            FinalTimeStartPoint = FinalTimeNum;
                        }
                        
                        if(FinalTimeEndPoint < FinalTimeNum){
                            FinalTimeEndPoint = FinalTimeNum;
                        }
                        
                         if(FirstPosStartPoint > FirstPosTimeNum){
                            FirstPosStartPoint = FirstPosTimeNum;
                        }
                        
                        if(FirstPosEndPoint < FirstPosTimeNum){
                            FirstPosEndPoint = FirstPosTimeNum;
                        }
                        
                         if(FinalPosStartPoint > FinalPosNum){
                            FinalPosStartPoint = FinalPosNum;
                        }

                        if(FinalPosEndPoint < FinalPosNum){
                            FinalPosEndPoint = FinalPosNum;
                        }
                        
                        viewObject[horseName]['FinalTime'].push(FinalTimeNum);
                        viewObject[horseName]['FirstPos'].push(FirstPosTimeNum);
                        viewObject[horseName]['FinalPos'].push(FinalPosNum);
                    }
                })

            })
            
            $.each(viewObject, function(horseName, recordType){
                
                $.each(recordType['FinalTime'], function(k,v){
                    
                    var FinalTimePercentage = getPercentage(FinalTimeStartPoint, FinalTimeEndPoint, v).toFixed(2);
                    
                    var html = '<div class="barCtn finalTime" w="' + FinalTimePercentage + '"></div>'
                    $('.horseInfoRow[rel="' + horseName + '"] .horseBar' ).append(html);
                    
                    $('.horseInfoRow[rel="' + horseName + '"] .horseBar .barCtn.finalTime[w="' + FinalTimePercentage + '"]').css('width', FinalTimePercentage + '%');
                })
                
                $.each(recordType['FirstPos'], function(k,v){
                    
                    var FirstPosPercentage = getPercentage(FirstPosStartPoint, FirstPosEndPoint, v).toFixed(2);
                    
                    var html = '<div class="barCtn firstPos" w="' + FirstPosPercentage + '"></div>'
                    $('.horseInfoRow[rel="' + horseName + '"] .horseBar' ).append(html);
                    
                    $('.horseInfoRow[rel="' + horseName + '"] .horseBar .barCtn.firstPos[w="' + FirstPosPercentage + '"]').css('width', FirstPosPercentage + '%');
                })
                
                $.each(recordType['FinalPos'], function(k,v){
                    
                    var FinalPosPercentage = getPercentage(FinalPosStartPoint, FinalPosEndPoint, v).toFixed(2);
                    
                    var html = '<div class="barCtn finalPos" w="' + FinalPosPercentage + '"></div>'
                    $('.horseInfoRow[rel="' + horseName + '"] .horseBar' ).append(html);
                    
                    
                    $('.horseInfoRow[rel="' + horseName + '"] .horseBar .barCtn.finalPos[w="' + FinalPosPercentage + '"]').css('width', FinalPosPercentage + '%');
                })
            })
            
            function getPercentage(startpos, endpos, currentpos){
                 var distance = endpos - startpos;
                 var displacement = currentpos - startpos;
                 return (displacement / distance) * 100;
            }
            
        }, 500)
                
    }
    
}