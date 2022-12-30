
    let pagename = window.location.pathname.split('/').slice(-1);
    var db_url = 'https://pkj99.github.io/demo/vod/db/haiwaikan-movie.db';
    var pagecount;
    var urlParams;
    var jsonString='';
    var output = '';
    var sqlstring = '';
    var t = 0;
    var pg = 1;
    var ids = 0;

    function getPlaylists(sqlstring,callback){

        // console.log(sqlstring);

        jsonString = '';
        const xhr = new XMLHttpRequest();
        xhr.open('GET', db_url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = e => {      
            const uInt8Array = new Uint8Array(xhr.response);
            const db = new SQL.Database(uInt8Array);

            var xstring = '';
            if (t == 0 && ids == 0){
                xstring = 'select count(*) from movie';
            } else {
                if (ids == 0){
                    xstring = 'select count(*) from movie where type_id = '+t;
                } else {
                    xstring = 'select count(*) from movie where id in ('+ids+')';
                }
            }
            var contents = db.exec(xstring);
            var data = JSON.parse(JSON.stringify(contents));
            data = data[0].values;
            var total = parseInt(data[0][0]);
            var pagecount = parseInt(data[0][0] / 20)+1;

            jsonString += '{"code":1,"msg":"","page":'+pg+',"pagecount":'+pagecount+',"limit":"20","total":'+total+',';



            contents = db.exec(sqlstring);
            var data = JSON.parse(JSON.stringify(contents));

            if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }

            var i = 0;

            jsonString += '"list":[';            
            for (var i = 0; i < data.length; i++) {
                jsonString += '{"vod_id":'+data[i][0]+',"vod_name":"'+data[i][1]+'","type_id":'+data[i][2]+',"type_name":"'+data[i][3]+'","vod_en":"'+data[i][4]+'","vod_time":"'+data[i][5]+'","vod_remarks":"'+data[i][6]+'","vod_play_from":"'+data[i][7]+'","vod_play_url":"'+data[i][8]+'"}';
                if (i < data.length-1) {jsonString += ',';}
            }
            jsonString += '],'

            contents = db.exec('select distinct type_id, type_name from movie order by type_id, type_name');
            var data = JSON.parse(JSON.stringify(contents));

            if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }

            var i = 0;
            jsonString += '"class":[';
            for (let i=0; i<data.length;i++){
                jsonString += '{"type_id":'+data[i][0]+',"type_pid":0,"type_name":"'+data[i][1]+'"}';
                if (i < data.length-1) {jsonString += ',';}
            }
            jsonString += ']}'

            // console.log(jsonString);
            document.write(jsonString);
            callback(jsonString);
        }
        xhr.send();
    }



    // get params
    (window.onpopstate = function () {
        var match,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = window.location.search.substring(1);

        urlParams = {};
        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);
    })();

    if (urlParams["t"] != null) { var t = urlParams["t"];}
    if (urlParams["pg"] != null) { var pg = urlParams["pg"];}
    if (urlParams["ids"] != null) { var ids = urlParams["ids"];}
    
    if (t == 0 && ids == 0){
        sqlstring = 'select id,name,type_id,type_name,name,time,remarks,play_from,url from movie order by time desc limit 20';
    } else {
        if (ids == 0){
            sqlstring = 'select id,name,type_id,type_name,name,time,remarks,play_from,url from movie where type_id = '+t+' order by time desc limit 20';
        } else {
            sqlstring = 'select id,name,type_id,type_name,name,time,remarks,play_from,url from movie where id in ('+ids+')  order by time desc limit 20';
        }
    }
    var offset = (pg-1)*20;
    sqlstring += ' offset '+ offset;

    getPlaylists(sqlstring, function callback(data) {  output = data; });

    console.log(output);
