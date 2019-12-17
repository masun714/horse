Racing.dataLoader = {
    
    BindAllHorseData : new Promise(function(solve, reject){
        
        var alldata = '';
    
        $.ajax({
            url: 'data/match_all.js',
            dataType: 'json',
            async: false,
            type: "GET",
            success: function(data){
                const alldata = data[0];
                allMatchData = data[0];
                let horseDataMatch = 1;
                
                $.each(alldata, function(content,v){
                    if(content != 'matchSchedule'){
                        
                        currentMatchHorseData[horseDataMatch] = {}
                        
                        $.each(v, function(k, horseName){
                            currentMatchHorseData[horseDataMatch][horseName.hrname_c] = [];
                        })
                    
                        horseDataMatch ++;
                    
                    }
                })
                
            }
        })
        
        var getdata = firebase_database.ref('/').once('value', function(data){
            
            var fireData = data.val();
            
            $.each(currentMatchHorseData, function(matchNo,horses){
                $.each(horses, function(horseName){
                    $.each(fireData[horseName], function(k,v){
                        currentMatchHorseData[matchNo][horseName].push(v); 
                    })
                })
            })
            
            solve();
            
        });
            
    }),
    
    standTimeRecord : new Promise(function(solve, reject){
        
        
        var getdata = firebase_database.ref('/').once('value', function(data){
            
            var fireData = data.val();
            
            standardTimeJson = fireData.stardTimeJson;
            
            
            solve();
            
        });
        
        // $.getJSON('data/racingTimeStandard.json', function(data){
            
        //     standardTimeJson = data;
            
        // })
        
    })
    
}