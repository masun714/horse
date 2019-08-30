if(typeof Racing == 'undefined'){
    Racing = {};
}

Racing.Function = {}

Racing.Function.dateFormat = function(dateObj, pattern) {
    
    var _this = this;
    
    // Some common format strings
    var masks = {'default':'ddd mmm dd yyyy HH:MM:ss'};
    // Internationalization strings
    var i18n = {
    dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', '日', '一', '二', '三', '四', '五', '六'],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };
    
    var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
    timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
    timezoneClip = /[^-+\dA-Z]/g,
    pad = function (val, len) {
        len = len || 2;
        return digitPad('0',val,len);
    };
    
    var formatter = function (date, mask, utc) {
    
        mask = String(masks[mask] || mask || masks['default']);
    
        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == 'UTC:') {
            mask = mask.slice(4);
            utc = true;
        }
    
        var	_ = utc ? 'getUTC' : 'get',
            d = date[_ + 'Date'](),
            D = date[_ + 'Day'](),
            m = date[_ + 'Month'](),
            y = date[_ + 'FullYear'](),
            H = date[_ + 'Hours'](),
            M = date[_ + 'Minutes'](),
            s = date[_ + 'Seconds'](),
            L = date[_ + 'Milliseconds'](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d:    d,
                dd:   pad(d),
                ddd:  i18n.dayNames[D],
                dddd: i18n.dayNames[D + 7],
                m:    m + 1,
                mm:   pad(m + 1),
                mmm:  i18n.monthNames[m],
                mmmm: i18n.monthNames[m + 12],
                yy:   y.toString().slice(2),
                yyyy: y,
                h:    H % 12 || 12,
                hh:   pad(H % 12 || 12),
                H:    H,
                HH:   pad(H),
                M:    M,
                MM:   pad(M),
                s:    s,
                ss:   pad(s),
                l:    pad(L, 3),
                L:    pad(L > 99 ? Math.round(L / 10) : L),
                t:    H < 12 ? "a"  : "p",
                tt:   H < 12 ? "am" : "pm",
                T:    H < 12 ? "A"  : "P",
                TT:   H < 12 ? "AM" : "PM"
            };
    
        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
    if (typeof dateObj === 'string'){
    dateObj = Racing.Function.strToDate(dateObj);
    }
    return formatter(dateObj, pattern, false);
    
    function digitPad(symbol, val, len) {
        var str = String(val);
        while (str.length < len) { str= symbol+str; }
        return str;
    }
    
}


Racing.Function.strToDate = function(str) {
    if (str.length >= 8) {
        var yyyy = str.substring(0, 4);
        var mm = parseInt(str.substring(4, 6), 10) - 1;
        var dd = str.substring(6, 8);
        var HH = (str.length >= 10) ? str.substring(8, 10) : 0;
        var MM = (str.length >= 12) ? str.substring(10, 12) : 0;
        var ss = (str.length >= 14) ? str.substring(12, 14) : 0;
        return new Date(yyyy,mm,dd,HH,MM,ss);
    }
    return new Date();
}

Racing.Function.getExcaptionValue = function(data){
    
    var ev = 0;
    
    var averageTime = [];
    
    var timeArray = [];
    
    for(var i = data.length - 1 ; i >= 0 ; i -- ){
        
    }
    
    Racing.Function.linearRegression()
    
    // for(var i = data.length - 1 ; i >= 0 ; i -- ){
        // console.log(data[i]);
    //     var sum = 0;
    //     $.each(data[i], function(k,v){
    //         if(v.MatchSpeedRecord != '-'){
    //             sum += Number(v.MatchSpeedRecord.FinalTime.replace(/\./g,''));
    //         }
    //     })
    //     averageTime.push(Math.round(sum/data[i].length));
    // }
    
    // $.each(averageTime, function(k,v){
    //     if(k != 0){
    //         averageTime[0] < v ? ev = ev += 1 : ev = ev -1;
    //     }
    // })
    
    return ev;
}
    
Racing.Function.linearRegression = function(y,x){
        var lr = {};
        var n = y.length;
        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_xx = 0;
        var sum_yy = 0;

        for (var i = 0; i < y.length; i++) {

            sum_x += x[i];
            sum_y += y[i];
            sum_xy += (x[i]*y[i]);
            sum_xx += (x[i]*x[i]);
            sum_yy += (y[i]*y[i]);
        } 

        lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
        lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
        lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

        return lr;
}

Racing.Function.rgbRanking = function(data){

    var r = 70;
    var g = 75;
    var b = 80;
    var colorTone = 'grey';

    data == 0 ? '' : data > 0 ? colorTone = 'green' : colorTone = 'red';
    
    if(colorTone ==  'green'){
        g = (data/510)/2 * 255;
        r = 0;
        b = 0;
    }else if( colorTone ==  'red'){
        r = (Math.abs(data)/510)/2 * 255;
        g = 0;
        b = 0;
    }

    var color = 'rgb(' + r + ',' + g + ',' + b + ')';

    return color;
}

Racing.Function.testGround = function(ground){
    
    var mapping = {
        '好地' : 'glass',
        '好黏' : 'glass',
        '好泥' : 'mud',
        '好快' : 'glass',
        '濕慢' : 'mud',
        '濕慢泥' : 'mud',
        '黏地' : 'glass',
        '快泥' : 'mud',
        '快地' : 'glass',
    }
    
    return mapping[ground.replace('場地：','')];
    
}

Object.defineProperty(Array.prototype, 'divideArray', {
    value: function(chunkSize) {
        var array=this;
        return [].concat.apply([],
            array.map(function(elem,i) {
                return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
            })
        );
    }
});
