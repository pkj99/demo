
    let pagename = window.location.pathname.split('/').slice(-1);
    var db_url = 'https://pkj99.github.io/demo/vod/db/haiwaikan-movie.db';
    var pagecount;
    var urlParams;
    var jsonString='';


    function getPlaylists(sqlstring,callback){
        jsonString = '';
        const xhr = new XMLHttpRequest();
        xhr.open('GET', db_url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = e => {      
            const uInt8Array = new Uint8Array(xhr.response);
            const db = new SQL.Database(uInt8Array);

            var contents = db.exec(sqlstring.replace('select * ','select count(*) '));
            var data = JSON.parse(JSON.stringify(contents));
            data = data[0].values;
            var total = parseInt(data[0][0]);
            var pagecount = parseInt(data[0][0] / 20)+1;

            jsonString += '{"code":1,"msg":"","page":1,"pagecount":'+pagecount+',"limit":"20","total":'+total+',';



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
            // HttpContext.Current.Response.Write(jsonString);
            document.write(jsonString);

            callback(jsonString);
        }
        xhr.send();
    }


    // create sub menu 
    function submenuByTypeId(){
        var sqlstring = 'select distinct type_id,type_name from movie order by type_id';
        const xhr = new XMLHttpRequest();
        xhr.open('GET', db_url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = e => {
            const uInt8Array = new Uint8Array(xhr.response);
            const db = new SQL.Database(uInt8Array);
            const contents = db.exec(sqlstring);
            var data = JSON.parse(JSON.stringify(contents));
            // console.log(data);

            if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }
            
            let menu_type = '';
            for (let i=0; i<data.length;i++){
            var menu_id = data[i][0];
            var menu_name = data[i][1];
            if (menu_id == t){
                menu_type = menu_name.substring(menu_name.length-1);
            }
            }

            let htmlString = '';
            for (let i=0; i<data.length;i++){
            var menu_id = data[i][0];
            var menu_name = data[i][1];
            var menu_active = ' style="border-radius: 5px; padding: 5px 5px;"';
            if (menu_name.substring(menu_name.length-1) == menu_type){
                if (menu_id == t) {menu_active = 'style="background-color:#b0c4de;border-radius: 5px; padding: 5px 5px;"';}
                htmlString += '<li class="menu_header"><a href="'+pagename+'?s='+s+'&t='+menu_id+'" '+menu_active+'>'+menu_name+'</a></li>';
            }
            }
            document.getElementById('myui-menu').innerHTML = htmlString;
        };
        xhr.send();
    }


    function submenuByName(){
        var sqlstring = 'select distinct type_id, type_name from movie order by type_id, type_name';
        const xhr = new XMLHttpRequest();
        xhr.open('GET', db_url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = e => {
            const uInt8Array = new Uint8Array(xhr.response);
            const db = new SQL.Database(uInt8Array);
            const contents = db.exec(sqlstring);
            var data = JSON.parse(JSON.stringify(contents));

            if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }

            var i = 0;
            let jsonString = '"class":[';
            for (let i=0; i<data.length-1;i++){
                jsonString += '{"type_id":'+data[i][0]+',"type_pid":0,"type_name":"'+data[i][1]+'"}';
                if (i < data.length-1) {jsonString += ',';}
            }
            // i += 1;
            // jsonString += '{"type_id":'+data[i][0]+',"type_pid":0,"type_name":"'+data[i][1]+'"}]';
            console.log(jsonString);
            document.write(jsonString);
        };
        xhr.send();
    }


    function submenuByArea(){
        var sqlstring = 'select distinct area from movie';
        const xhr = new XMLHttpRequest();
        xhr.open('GET', db_url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = e => {
            const uInt8Array = new Uint8Array(xhr.response);
            const db = new SQL.Database(uInt8Array);
            const contents = db.exec(sqlstring);
            var data = JSON.parse(JSON.stringify(contents));

            if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }

            let htmlString = '';
            for (let i=0; i<data.length;i++){
                var menu_name = data[i][0];
                var menu_active = ' style="border-radius: 5px; padding: 5px 5px;"';
                if (menu_name == urlParams["area"]) {menu_active = 'style="background-color:#b0c4de;border-radius: 5px; padding: 5px 5px;"';}
                htmlString += '<li class="menu_header"><a href="'+pagename+'?s='+s+'&area='+menu_name+'" '+menu_active+'>'+menu_name+'</a></li>';
            }
            document.getElementById('myui-menu').innerHTML = htmlString;
        };
        xhr.send();
    }



    // create movie list 
    function movielists(sqlstring){

        getCount(sqlstring, function pagecountCallback(data) {  pagecount = data; });
        if (typeof pagecount == "undefined" ) { pagecount = 10; }

        const xhr = new XMLHttpRequest();
        xhr.open('GET', db_url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = e => {
            const uInt8Array = new Uint8Array(xhr.response);
            const db = new SQL.Database(uInt8Array);
            
            var page = (parseInt(pg)-1)*30;
            if (sqlstring.includes(" like ")){
                // console.log(sqlstring);
            } else {
                sqlstring += " limit 30 offset " + page;
            }

            // console.log(sqlstring);
            const contents = db.exec(sqlstring);
            var data = JSON.parse(JSON.stringify(contents));
            
            let htmlString = '<ul>';
            
            if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }

            for (var i = 0; i < data.length; i++) {
                var m3u8 = data[i][9];
                var img = data[i][10];
                var title = data[i][1];
                var year = data[i][4];
                var quality = data[i][2];
                var type_name = data[i][13];
                var id = data[i][0];        
                var remarks = data[i][14];
                var state = data[i][11];

                htmlString += '<li class="col-lg-10 col-md-8 col-sm-5 col-xs-3">';
                htmlString += '<div class="myui-vodlist__box">';
                htmlString += '<a class="myui-vodlist__thumb lazyload" href="'+pagename+'?s='+s+'&t=' + t + '&id='+ id + '" ';
                htmlString += 'title="' + title +'" ';
                htmlString += 'data-original="' + img + '" ';
                htmlString += 'style="background-image: url(' + img +')"';

                htmlString += '<span class="play hidden-xs"></span>';
                if (quality != '1'){
                    htmlString += '<span class="pic-tag pic-tag-top" style="background-color: #5bb7fe;">' + quality+'</span>';
                }
                htmlString += '<span class="pic-tag pic-tag-right">'+remarks+'</span>';
                htmlString += '<span class="pic-text text-right">'+year+'</span>';
                htmlString += '<span class="pic-text text-left">'+type_name+'</span>';

                htmlString += '</a>';
                htmlString += '</div>';
                htmlString += '<div class="myui-vodlist__detail">';
                htmlString += '<h4 class="title text-overflow"><a href="'+m3u8+'">'+title+'</a></h4>';
                htmlString += '</div>';
                htmlString += '</li>';
            }

            htmlString += '</ul>';

            document.getElementById('myui-panel').innerHTML = htmlString;
            
            var p = parseInt(pg);
            var bottom_p = parseInt(pagecount);
            var referer = window.location.href.split('&pg=')[0];
            // var referer = pagename+'?s='+s+'&t=' + t
            if (p > 1) { prev_p = p-1;} else { prev_p = 1;}
            if (p < bottom_p) { next_p = p+1;} else { next_p = bottom_p;}
            var nav = '<li class="hidden-xs"><a class="btn btn-default" href="' + referer+'&pg=1">1</a></li>';
            nav += '<li><a class="btn btn-default" href="' + referer+'&pg=' + prev_p +'">Prev</a></li>';
            for (let i = p - 5; i < p + 5; i++) {
                if ( i == p ) {  nav += '<li class="hidden-xs"><a class="btn btn-warm" href="' + referer+'&pg=' + i +'">'+ i +'</a></li>'; }
                else if ( i < bottom_p && i > 0) {  nav += '<li class="hidden-xs"><a class="btn btn-default" href="' + referer+'&pg=' + i +'">'+ i +'</a></li>'; }
            }

            nav += '<li><a class="btn btn-default" href="' + referer + '&pg=' + next_p +'">Next</a></li>';
            nav += '<li class="hidden-xs"><a class="btn btn-default" href="' + referer + '&pg=' + bottom_p +'">'+bottom_p+'</a></li>';

            document.getElementById('myui-page').innerHTML = nav;

        };
        xhr.send();
    }

    // query by movie id
    function movieById(sqlstring){

        var vod_play_url = '';
        getPlaylists(sqlstring,function playlistsCallback(data) {  vod_play_url = data; });
        if (typeof vod_play_url == "undefined" ) { vod_play_url = ''; }


        const xhr = new XMLHttpRequest();
        xhr.open('GET', db_url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = e => {      
            const uInt8Array = new Uint8Array(xhr.response);
            const db = new SQL.Database(uInt8Array);
            const contents = db.exec(sqlstring);
            var data = JSON.parse(JSON.stringify(contents));
            
            let htmlString = '<ul>';
            
            if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }

            for (var i = 0; i < data.length; i++) {
                var id = data[i][0];        
                var m3u8 = data[i][9];
                var img = data[i][10];
                var title = data[i][1];
                var year = data[i][4];
                var quality = data[i][2];
                var type_id = data[i][12];
                var type_name = data[i][13];
                var state = data[i][11];
                var area = data[i][2];
                var lang = data[i][3];
                var actor = data[i][6];
                var director = data[i][7];
                var content = data[i][8];
                var remarks = data[i][14];
                var vod_time = data[i][16];

                const actornames = actor.split(',');
                var actors = '';
                if( actornames.length > 0 ){
                    for (let actorname of actornames){
                        actors += '<a href="'+pagename+'?s='+s+'&actor='+actorname+'">'+actorname+'</a> , ';
                    }
                }
                actors = actors.substring(0, actors.length-3);

                const directornames = director.split(',');
                var directors = '';
                if( directornames.length > 0 ){
                    for (let directorname of directornames){
                        directors += '<a href="'+pagename+'?s='+s+'&director='+directorname+'">'+directorname+'</a> , ';
                    }
                }
                directors = directors.substring(0, directors.length-3);

                htmlString += '<li class="col-lg-4 col-md-4 col-sm-4 col-xs-1">';
                htmlString += '<div class="myui-vodlist__box">';
                htmlString += '<a class="myui-vodlist__thumb lazyload" href="'+ m3u8 + '" ';
                htmlString += 'title="' + title +'" ';
                htmlString += 'data-original="' + img + '" ';
                htmlString += 'style="background-image: url(' + img +')"';

                htmlString += '<span class="play hidden-xs"></span>';
                htmlString += '<span class="pic-tag pic-tag-top" style="background-color: #5bb7fe;">' + quality+'</span>';
                htmlString += '<span class="pic-text text-right">'+year+'</span>';
                htmlString += '<span class="pic-text text-left">'+type_name+'</span>';

                htmlString += '</a>';
                htmlString += '</div>';
                htmlString += '<div class="myui-vodlist__detail">';
                htmlString += '<h4 class="title text-overflow"><a href="'+m3u8+'">'+title+'</a></h4>';
                htmlString += '</div>';
                htmlString += '</li>';

                htmlString += '<li class="col-lg-2 col-md-2 col-sm-2 col-xs-1">';

                htmlString += '<div class="myui-content__detail">';
                htmlString += '<h1 class="title">'+ title +'</h1>';
                htmlString += '<p class="data">';
                htmlString += '<span class="text-muted">分類：</span><a href="'+pagename+'?s='+s+'&t='+type_id+'">'+type_name+'</a>';
                htmlString += '<span class="split-line"></span>';
                htmlString += '<span class="text-muted">地區：</span><a href="'+pagename+'?s='+s+'&area='+area+'">'+area+'</a>';
                htmlString += '<span class="split-line"></span>';
                htmlString += '<span class="text-muted">年份：</span><a href="'+pagename+'?s='+s+'&year='+year+'">'+year+'</a>';
                htmlString += '</p>';
                htmlString += '<p class="data"><span class="text-muted">主演：</span>'+actors+'</p>';
                htmlString += '<p class="data"><span class="text-muted">導演：</span>'+directors+'</p>';
                htmlString += '<p class="data"><span class="text-muted">狀態：</span>'+remarks+'</p>';
                htmlString += '<p class="data"><span class="text-muted">更新：</span>'+vod_time+'</p>';
                htmlString += '<p class="data"><span class="text-muted">簡介：</span></p>'+content;
                htmlString += '</div>';

                htmlString += '</li>';


                //  create playlists buttons
                htmlString += '<li class="col-lg-2 col-md-2 col-sm-2 col-xs-1">';
                // htmlString += '<div class="myui-content__detail">';

                htmlString += '<button class="btn btn-primary" type="button" style="font-size: 24px;margin:2px;">';
                htmlString += '<a href="../vod/playvideo.html?url='+m3u8+'">播放</a></button>';
                htmlString += '<button class="btn btn-secondary" type="button" onclick="setCookieBySourceId(\''+s+'\',\''+id+'\');" id="favorites" '
                htmlString += 'style="font-size: 24px;margin:2px;">收藏</button><br><br>';


                // console.log(vod_play_url);
                // alert(vod_play_url);
                const playlists = vod_play_url.split('#');
                playlists.sort();

                if( playlists.length > 1 ){
                    for (let pl of playlists){
                        const p = pl.split('$');
                        var pl_name = p[0];
                        var pl_m3u8 = p[1];
                        htmlString += '<a href="../vod/playvideo.html?url='+pl_m3u8+'">';
                        htmlString += '<button class="btn btn-outline-primary" type="button" style="margin:2px;font-size: 16px;">';
                        htmlString += pl_name+'</button></a>';
                    }
                }

                // htmlString += '</div>';
                htmlString += '</li>';

            }
            htmlString += '</ul>';
            document.getElementById('myui-panel').innerHTML = htmlString;

            checkCookieBySourceId(s,id);

        }
        xhr.send();
    }


    // append tmdb movie list 
    function tmdblists(sqlstring){

        var tmdb_url = 'https://pkj99.github.io/demo/vod/db/haiwaikan-tmdb.db';

        getCount(sqlstring, function pagecountCallback(data) {  pagecount = data; });
        if (typeof pagecount == "undefined" ) { pagecount = 10; }

        const xhr = new XMLHttpRequest();
        xhr.open('GET', tmdb_url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = e => {
            const uInt8Array = new Uint8Array(xhr.response);
            const db = new SQL.Database(uInt8Array);
            
            var page = (parseInt(pg)-1)*30;
            if (sqlstring.includes(" like ")){
                console.log(sqlstring);
            } else {
                sqlstring += " limit 30 offset " + page;
            }

            // console.log('1',sqlstring);
            const contents = db.exec(sqlstring);
            var data = JSON.parse(JSON.stringify(contents));
            
            let htmlString = '<ul>';
            
            if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }

            for (var i = 0; i < data.length; i++) {
                var m3u8 = data[i][15];
                var img = data[i][12];
                var title = data[i][2];
                var year = data[i][7];
                var quality = data[i][5].toUpperCase();
                var type_name = data[i][10];
                var id = data[i][14];        
                var remarks = data[i][1];
                var state = data[i][11];
                year = year.substring(0,4);

                htmlString += '<li class="col-lg-10 col-md-8 col-sm-5 col-xs-3">';
                htmlString += '<div class="myui-vodlist__box">';
                htmlString += '<a class="myui-vodlist__thumb lazyload" href="'+pagename+'?s='+s+'&t=' + t + '&id='+ id + '" ';
                htmlString += 'title="' + title +'" ';
                htmlString += 'data-original="' + img + '" ';
                htmlString += 'style="background-image: url(' + img +')"';

                htmlString += '<span class="play hidden-xs"></span>';
                if (quality != '1'){
                    htmlString += '<span class="pic-tag pic-tag-top" style="background-color: #5bb7fe;">' + quality+'</span>';
                }
                htmlString += '<span class="pic-tag pic-tag-right">'+remarks+'</span>';
                htmlString += '<span class="pic-text text-right">'+year+'</span>';
                htmlString += '<span class="pic-text text-left">'+type_name+'</span>';

                htmlString += '</a>';
                htmlString += '</div>';
                htmlString += '<div class="myui-vodlist__detail">';
                htmlString += '<h4 class="title text-overflow"><a href="'+m3u8+'">'+title+'</a></h4>';
                htmlString += '</div>';
                htmlString += '</li>';
            }

            htmlString += '</ul>';
            // console.log('2',htmlString);
            document.getElementById('myui-panel2').innerHTML = htmlString;
            
            var p = parseInt(pg);
            var bottom_p = parseInt(pagecount);
            var referer = window.location.href.split('&pg=')[0];
            // var referer = pagename+'?s='+s+'&t=' + t
            if (p > 1) { prev_p = p-1;} else { prev_p = 1;}
            if (p < bottom_p) { next_p = p+1;} else { next_p = bottom_p;}
            var nav = '<li class="hidden-xs"><a class="btn btn-default" href="' + referer+'&pg=1">1</a></li>';
            nav += '<li><a class="btn btn-default" href="' + referer+'&pg=' + prev_p +'">Prev</a></li>';
            for (let i = p - 5; i < p + 5; i++) {
                if ( i == p ) {  nav += '<li class="hidden-xs"><a class="btn btn-warm" href="' + referer+'&pg=' + i +'">'+ i +'</a></li>'; }
                else if ( i < bottom_p && i > 0) {  nav += '<li class="hidden-xs"><a class="btn btn-default" href="' + referer+'&pg=' + i +'">'+ i +'</a></li>'; }
            }

            nav += '<li><a class="btn btn-default" href="' + referer + '&pg=' + next_p +'">Next</a></li>';
            nav += '<li class="hidden-xs"><a class="btn btn-default" href="' + referer + '&pg=' + bottom_p +'">'+bottom_p+'</a></li>';

            document.getElementById('myui-page').innerHTML = nav;

        };
        xhr.send();
    }


    function movieGroup(sqlstring){

        getCount(sqlstring, function pagecountCallback(data) {  pagecount = data; });
        if (typeof pagecount == "undefined" ) { pagecount = 10; }

        const xhr = new XMLHttpRequest();
        xhr.open('GET', db_url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = e => {
            const uInt8Array = new Uint8Array(xhr.response);
            const db = new SQL.Database(uInt8Array);
            
            var page = (parseInt(pg)-1)*30;
            if (sqlstring.includes(" like ")){
                // console.log(sqlstring);
            } else {
                sqlstring += " limit 30 offset " + page;
            }

            // console.log(sqlstring);
            const contents = db.exec(sqlstring);
            var data = JSON.parse(JSON.stringify(contents));
            
            let htmlString = '<ul>';
            
            if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }

            for (var i = 0; i < data.length; i++) {
                var m3u8 = data[i][9];
                var img = data[i][10];
                var title = data[i][1];
                var year = data[i][4];
                var quality = data[i][2];
                var type_name = data[i][13];
                var id = data[i][0];        
                var remarks = data[i][14];
                var serial = data[i][5];

                htmlString += '<li class="col-lg-10 col-md-8 col-sm-5 col-xs-3">';
                htmlString += '<div class="myui-vodlist__box">';
                htmlString += '<a class="myui-vodlist__thumb lazyload" href="'+pagename+'?serial='+serial + '" ';
                htmlString += 'title="' + title +'" ';
                htmlString += 'data-original="' + img + '" ';
                htmlString += 'style="background-image: url(' + img +')"';

                htmlString += '<span class="play hidden-xs"></span>';
                if (quality != '1'){
                    htmlString += '<span class="pic-tag pic-tag-top" style="background-color: #5bb7fe;">' + quality+'</span>';
                }
                htmlString += '<span class="pic-tag pic-tag-right">'+remarks+'</span>';
                htmlString += '<span class="pic-text text-right">'+year+'</span>';
                htmlString += '<span class="pic-text text-left">'+type_name+'</span>';

                htmlString += '</a>';
                htmlString += '</div>';
                htmlString += '<div class="myui-vodlist__detail">';
                htmlString += '<h4 class="title text-overflow"><a href="'+m3u8+'">'+title+'</a></h4>';
                htmlString += '</div>';
                htmlString += '</li>';
            }

            htmlString += '</ul>';

            document.getElementById('myui-panel').innerHTML = htmlString;
            
            var p = parseInt(pg);
            var bottom_p = parseInt(pagecount);
            var referer = window.location.href.split('&pg=')[0];
            // var referer = pagename+'?s='+s+'&t=' + t
            if (p > 1) { prev_p = p-1;} else { prev_p = 1;}
            if (p < bottom_p) { next_p = p+1;} else { next_p = bottom_p;}
            var nav = '<li class="hidden-xs"><a class="btn btn-default" href="' + referer+'&pg=1">1</a></li>';
            nav += '<li><a class="btn btn-default" href="' + referer+'&pg=' + prev_p +'">Prev</a></li>';
            for (let i = p - 5; i < p + 5; i++) {
                if ( i == p ) {  nav += '<li class="hidden-xs"><a class="btn btn-warm" href="' + referer+'&pg=' + i +'">'+ i +'</a></li>'; }
                else if ( i < bottom_p && i > 0) {  nav += '<li class="hidden-xs"><a class="btn btn-default" href="' + referer+'&pg=' + i +'">'+ i +'</a></li>'; }
            }

            nav += '<li><a class="btn btn-default" href="' + referer + '&pg=' + next_p +'">Next</a></li>';
            nav += '<li class="hidden-xs"><a class="btn btn-default" href="' + referer + '&pg=' + bottom_p +'">'+bottom_p+'</a></li>';

            document.getElementById('myui-page').innerHTML = nav;

        };
        xhr.send();
    }


    function movie_slider(){

        var tmdb_url = 'https://pkj99.github.io/demo/vod/db/haiwaikan-tmdb.db';
        var sqlstring = "select movieid,title_tw,movieurl,backdrop_path,original_language from tmdb a where backdrop_path <> '' order by popularity desc LIMIT 10";

        const xhr = new XMLHttpRequest();
        xhr.open('GET', tmdb_url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = e => {
            const uInt8Array = new Uint8Array(xhr.response);
            const db = new SQL.Database(uInt8Array);
            const contents = db.exec(sqlstring);
            var data = JSON.parse(JSON.stringify(contents));
            
            if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }

            var items = '<div id="slider-movies" class="animation-1 slider" style="background-color:black">';
            for (var i = 0; i < data.length; i++) {
                pid = data[i][0];
                title = data[i][1];
                url= data[i][2];
                poster = data[i][3];
                genre = data[i][4].toUpperCase();

                items += '<article class="item" id="'+pid+'">';
                items += '<div class="image">';
                items += '<a href="vod/playvideo.html?url='+url+'&v='+title+'"><img src="'+poster+'" alt="'+title+'" /></a>';
                items += '<a href="'+url+'">';
                items += '<div class="data">';
                items += '<h3 class="title">'+title+'</h3>';
                items += '<span>'+genre+'</span></div>';
                items += '</a>';
                items += '<span class="item_type">熱播</span>';
                items += '</div>';
                items += '</article>';
            }
            items += '</div>';
            document.getElementById('myui-panel').innerHTML = items;
        };
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

    if (urlParams["t"] == null){ var t = "0"; } else { var t = urlParams["t"];}
    if (urlParams["pg"] == null){ var pg = "1"; } else { var pg = urlParams["pg"];}
    if (urlParams["s"] == null){ var s = "haiwaikan"; } else { var s = urlParams["s"];}
    

    var sqlstring = 'select id,name,type_id,type_name,name,time,remarks,play_from,url from movie order by time desc limit 20';
    var vod_play_url = '';
    getPlaylists(sqlstring,function playlistsCallback(data) {  vod_play_url = data; });
    // if (typeof vod_play_url == "undefined" ) { vod_play_url = ''; }

    console.log(vod_play_url);

    // submenuByName();

    // document.write('Hello');

    // if (urlParams["id"] == null) {
    //     if (urlParams["wd"] == null) {
    //         if (t != "0") {
    //             submenuByTypeId(); // 動態產生子選單
    //             var sqlstring = "select * from movie where type_id = "+t+" order by time desc";
    //             movielists(sqlstring);
    //         } else {
    //             // movie_slider();
    //         }
    //     } else {
    //         var keyword_cn = Simplized(urlParams["wd"])  // 繁轉簡
    //         var sqlstring = "select * from movie where name like '%"+keyword_cn+"%' order by year desc";
    //         movielists(sqlstring);

    //         var keyword_tw = Traditionalized(urlParams["wd"])  // 簡轉繁
    //         var sqlstring = "select * from tmdb where title_tw like '%"+keyword_tw+"%' or title_cn like '%"+keyword_cn+"%' order by release_date desc";
    //         tmdblists(sqlstring);
    //     }
    // } else {
    //     submenuByTypeId(); // 動態產生子選單
    //     var id = urlParams["id"];
    //     var sqlstring = "select * from movie where id = "+id;
    //     movieById(sqlstring);
    // }

    // if (t>0 && t<100){ document.getElementById('menu-movie').classList.add("active"); } 
    // if (t>=100 && t<200){ document.getElementById('menu-tvshow').classList.add("active"); } 
    // if (t>=200 && t<300){ document.getElementById('menu-variety').classList.add("active"); } 


    // if (urlParams["year"] != null) {
    //     submenuByYear();
    //     var sqlstring = "select * from movie where year = '"+urlParams["year"]+"' order by time desc";
    //     movielists(sqlstring);
    //     document.getElementById('menu-message').textContent = 'year = '+urlParams["year"];
    // }

    // if (urlParams["area"] != null) {
    //     submenuByArea();
    //     var sqlstring = "select * from movie where area = '"+urlParams["area"]+"' order by time desc";
    //     movielists(sqlstring);
    //     document.getElementById('menu-message').textContent = 'area = '+urlParams["area"];
    // }

    // if (urlParams["actor"] != null) {
    //     var sqlstring = "select * from movie where actor like '%"+urlParams["actor"]+"%' order by year desc, time desc";
    //     movielists(sqlstring);
    //     document.getElementById('menu-message').textContent = 'actor = '+urlParams["actor"];
    // }    

    // if (urlParams["director"] != null) {
    //     var sqlstring = "select * from movie where director like '%"+urlParams["director"]+"%' order by year desc, time desc";
    //     movielists(sqlstring);
    //     document.getElementById('menu-message').textContent = 'director = '+urlParams["director"];
    // }        

    // if (urlParams["serial"] != null) {
    //     var sqlstring = "select * from movie where serial = '"+urlParams["serial"]+"' order by year";
    //     movielists(sqlstring);
    //     document.getElementById('menu-message').textContent = 'serial = '+urlParams["serial"];
    // }

    // if (urlParams["view"] != null) {
    //     // submenuByTypeId(); // 動態產生子選單
    //     if (urlParams["view"] == 'favorites'){
    //         var id = getCookieByName(s);
    //         var sqlstring = "select * from movie where id in (0" + id +")";
    //         movielists(sqlstring);
    //         document.getElementById('menu-favorites').classList.add("active");    
    //     }
    //     if (urlParams["view"] == 'clear'){
    //         document.cookie = s + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    //     }        
    //     if (urlParams["view"] == 'recent'){
    //         var sqlstring = "select * from movie order by time desc";
    //         movielists(sqlstring);
    //         document.getElementById('menu-recent').classList.add("active");
    //     }
    //     if (urlParams["view"] == 'popular'){
    //         var sqlstring = "select * from tmdb order by popularity desc";
    //         tmdblists(sqlstring);
    //         document.getElementById('myui-panel').innerHTML = "";
    //         document.getElementById('menu-popular').classList.add("active");
    //     }
    //     if (urlParams["view"] == 'toprated'){
    //         var sqlstring = "select * from tmdb where vote_count > 1000 order by vote_average desc";
    //         tmdblists(sqlstring);
    //         document.getElementById('myui-panel').innerHTML = "";
    //         document.getElementById('menu-toprated').classList.add("active");
    //     }
    //     if (urlParams["view"] == 'serial'){
    //         var sqlstring = "select * from movie where serial <> '0' and remarks = '1' order by year";
    //         movieGroup(sqlstring);
    //         document.getElementById('menu-serial').classList.add("active");
    //     }
    //     if (urlParams["view"] == 'year'){
    //         var currentTime = new Date();
    //         urlParams["year"] = currentTime.getFullYear();
    //         submenuByYear();
    //         var sqlstring = "select * from movie where year = '"+urlParams["year"]+"' order by time desc";
    //         movielists(sqlstring);
    //         document.getElementById('menu-year').classList.add("active");
    //     }
    // }   
