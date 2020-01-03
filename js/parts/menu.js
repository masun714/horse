Racing.menu = {
    
    SlideOut : new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('menu'),
        'padding': 100,
        'tolerance': 70
    }),
    
    buildMenu : function (){
    
       
        var data = allMatchData['matchSchedule'];
        basicMatchData = data;
        
        var menu = '';
    
        menu += '<div class="headerItem Date">' + data[0].racedate + '</div>';
        menu += '<div class="headerItem Date">星期' + Racing.Function.dateFormat(data[0].racedate, 'dddd') + '</div>';
        menu += '<div class="headerItem title">場次</div>';
        
        for(var i = 1; i <= data.length ; i ++){
            
            menu += '<div class="headerItem matchNo ' + ( currentMatch == i ? 'on' : '') +  '" rel="' + i + '">' + i + '</div>';
        }
        
        $('#menu').html(menu);
        
        Racing.menu.buildHeader();
        Racing.contentControl.init();
        
        
        $('.headerItem.matchNo').click(function(el){
            $('.headerItem').removeClass('on');
            $(this).addClass('on');
            currentMatch = parseInt($(this).attr('rel'));
            Racing.menu.buildHeader();
            Racing.contentControl.init();
        })
            
            

    },
    
    buildHeader : function(){
    
       var currentHeaderData = basicMatchData[currentMatch - 1];
       var header = '<div class="matchTitleRow first"><div class="raceno">場次: ' + currentHeaderData.raceno + '</div>';
       header += '<div class="racetime">時間: ' + currentHeaderData.racetime + '</div></div>';
       
       header += '<div class="matchTitleRow second"><div class="distance">距離: ' + currentHeaderData.distance + ' ' + currentHeaderData.route + '</div>';
       header += '<div class="raceclass">班次: ' + currentHeaderData['race class'].replace('　','') + '</div>';
       header += '<div class="venue">場地: ' + currentHeaderData.venue + '</div></div>';
       
       
       $('.matchTitle').html(header);
       
       currentMatchDistance = currentHeaderData.distance;
       
       
       const classMapping = {
           第一班 : 'Class1',
           第二班 : 'Class2',
           第三班 : 'Class3',
           第四班 : 'Class4',
           第五班 : 'Class5',
           公開 : 'ClassGroup',
           新馬 : 'ClassNew'
           
       }
       
       var horseClass = '';
       if(/賽|盃/.test(currentHeaderData['race class']) == true){
           horseClass = 'ClassGroup';
       }else{
           horseClass = classMapping[currentHeaderData['race class']];
       }
       var checkGround = /泥/.test(currentHeaderData.venue) ? 'Muddy' : 'Glass';
       var checkPlace =  /谷|快活谷/.test(currentHeaderData.venue) ? ['HV', 'HappyValley'] : ['ST', 'ShaTin'] ;
       var recordName = checkPlace[0] + currentHeaderData.distance;
       
       var foundRecord = standardTimeJson[checkPlace[1]]
       
       if(checkGround == 'Muddy' && checkPlace[0] == 'ST'){
           foundRecord = foundRecord[checkPlace[1] + checkGround ][recordName][horseClass];
       }else{
           foundRecord = foundRecord[checkPlace[1] + 'Glass' ][recordName][horseClass];
       }
       
       /*******************************************/
       
      var standardRecordTime = '<div class="matchTitleRow third">';
      
      var bestRecord = '<div class="bestTime">最佳:';
      var standardRecord = '<div class="bestTime">標準:';
      
      $.each(foundRecord, function(k,v){
          if(k == 'BestTime'){
              bestRecord += '<span>' + Racing.Function.addDot(v) + '</span>';
          }else if(k != 'record'){
              standardRecord += '<span>' + Racing.Function.addDot(v) + '</span>';
          }
      })
      
      bestRecord += '</div>';
      standardRecord += '</div>';
      standardRecordTime += standardRecord;
      standardRecordTime += bestRecord;
      standardRecordTime += '</div>';
       
      $('.standardTime').html(standardRecordTime); 
      
      
    }
    
}