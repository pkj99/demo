  
    // 收藏設定 Cookie 
  
    function parseCookie() {
        var cookieObj = {};
        var cookieAry = document.cookie.split(';');
        var cookie;
        
        for (var i=0, l=cookieAry.length; i<l; ++i) {
            cookie = jQuery.trim(cookieAry[i]);
            cookie = cookie.split('=');
            cookieObj[cookie[0]] = cookie[1];
        }
        return cookieObj;
    } 

    function getCookieByName(name) {
        var value = parseCookie()[name];
        if (value) {
            value = decodeURIComponent(value);
        }

        return value;
    }

    function setCookieBySourceId(source,id) {
        var ids = getCookieByName(source);
        if (ids == null) { ids = '';}
        var idNew = ',' + id ;
        if (ids.includes(idNew)){
        document.getElementById('favorites').textContent = '收藏';
        document.getElementById('favorites').className = 'btn btn-secondary';
        ids = ids.replace(idNew,'');
        document.cookie = source + '=' + ids ;
        } else {
        document.getElementById('favorites').textContent = '已收藏';
        document.getElementById('favorites').className = 'btn btn-danger';
        ids += idNew ;
        document.cookie = source + '=' + ids ;
        }
    }

    function checkCookieBySourceId(source,id) {
        var ids = getCookieByName(source);
        if (ids == null) { ids = '';}
        var idsAry = ids.split(',');
        for (var i=0, l=idsAry.length; i<l; ++i) {
            if (id == idsAry[i]){
                document.getElementById('favorites').textContent = '已收藏';
                document.getElementById('favorites').className = 'btn btn-danger';
            }
        }      
    }

    function getCount(sqlstring,callback){
        var pagecount;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', db_url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = e => {      
            const uInt8Array = new Uint8Array(xhr.response);
            const db = new SQL.Database(uInt8Array);
            const contents = db.exec(sqlstring);
            var data = JSON.parse(JSON.stringify(contents));
            data = data[0].values;
            pagecount = parseInt(data[0][0] / 30)+1;
            callback(pagecount);
        }
        xhr.send();
    }


    // create sub menu 
    function submenu(sqlstring){
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

    // create movie list 
    function movielists(sqlstring){

        getCount(sqlstring.replace('select * ','select count(*) '),function mycallback(data) {  pagecount = data; });
        if (typeof pagecount == "undefined" ) { pagecount = 10; }

        const xhr = new XMLHttpRequest();
        xhr.open('GET', db_url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = e => {
            const uInt8Array = new Uint8Array(xhr.response);
            const db = new SQL.Database(uInt8Array);
            
            var page = (parseInt(pg)-1)*30;
            if (sqlstring.includes("where name like")){
                console.log(sqlstring);
            } else {
                sqlstring += " limit 30 offset " + page;
            }
            
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
            var referer = pagename+'?s='+s+'&t=' + t
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
        const xpl = new XMLHttpRequest();
        xpl.open('GET', db_url, true);
        xpl.responseType = 'arraybuffer';

        xpl.onload = e => {      
            const uInt8Array = new Uint8Array(xpl.response);
            const xpldb = new SQL.Database(uInt8Array);
            const xplcontents = xpldb.exec(sqlstring.replace('movie','movielink')+' order by seq');
            var data = JSON.parse(JSON.stringify(xplcontents));
            data = data[0].values;
            for (var i = 0; i < data.length; i++) {
                var id = data[i][0];        
                var seq = data[i][1];
                if (seq<10) {seq='0'+seq}
                var url = data[i][2];
                vod_play_url = vod_play_url+seq+'$'+url+'#';
            }
            vod_play_url = vod_play_url.replace(/#$/,'');
            // console.log(vod_play_url);
        }
        xpl.send();


        const xhr = new XMLHttpRequest();
        xhr.open('GET', db_url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = e => {      
            const uInt8Array = new Uint8Array(xhr.response);
            const db = new SQL.Database(uInt8Array);
            
            // var pagecount = 100;
            // var page = (parseInt(pg)-1)*30;
            // sqlstring += " limit 30 offset " + page
            
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

                htmlString += '<li class="col-lg-4 col-md-3 col-sm-2 col-xs-1">';
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

                htmlString += '<li class="col-lg-2 col-md-2 col-sm-1 col-xs-1">';

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
                htmlString += '<p class="data"><span class="text-muted">導演：</span><a href="'+pagename+'?s='+s+'&director='+director+'">'+director+'</a></p>';
                htmlString += '<p class="data"><span class="text-muted">狀態：</span>'+remarks+'</p>';
                htmlString += '<p class="data"><span class="text-muted">更新：</span>'+vod_time+'</p>';
                htmlString += '<p class="data"><span class="text-muted">簡介：</span></p>'+content;
                htmlString += '</div>';

                htmlString += '</li>';


                //  create playlists buttons
                htmlString += '<li class="col-lg-2 col-md-2 col-sm-2 col-xs-1">';
                htmlString += '<div class="myui-content__detail">';

                htmlString += '<button class="btn btn-primary" type="button" style="font-size: 24px;margin:2px;">';
                htmlString += '<a href="../vod/playvideo.html?url='+m3u8+'">播放</a></button>';
                htmlString += '<button class="btn btn-secondary" type="button" onclick="setCookieBySourceId(\''+s+'\',\''+id+'\');" id="favorites" '
                htmlString += 'style="font-size: 24px;margin:2px;">收藏</button><br><br>';

                const playlists = vod_play_url.split('#');
                playlists.sort();
                // const playlists = [m3u8];

                if( playlists.length > 0 ){
                    for (let pl of playlists){
                        const p = pl.split('$');
                        var pl_name = p[0];
                        var pl_m3u8 = p[1];
                        htmlString += '<a href="../vod/playvideo.html?url='+pl_m3u8+'">';
                        htmlString += '<button class="btn btn-outline-primary" type="button" style="margin:2px;font-size: 16px;">';
                        htmlString += pl_name+'</button></a>';
                    }
                }

                htmlString += '</div>';
                htmlString += '</li>';

            }
            htmlString += '</ul>';
            document.getElementById('myui-panel').innerHTML = htmlString;
        }
        xhr.send();
    }

    // get params
    let pagename = window.location.pathname.split('/').slice(-1);
    var db_url = 'https://pkj99.github.io/demo/vod/db/haiwaikan-movie.db';
    var pagecount;
    var urlParams;
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
        

    if (urlParams["ids"] == null) {
        if (urlParams["id"] == null) {
            if (urlParams["wd"] == null) {
                if (t != "0") {
                    submenu('select distinct type_id,type_name from movie order by type_id'); // 動態產生子選單
                    var sqlstring = "select * from movie where type_id = "+t+" order by time desc";
                    movielists(sqlstring);
                }
            } else {
            var keyword = Simplized(urlParams["wd"])  // 繁轉簡
            var sqlstring = "select * from movie where name like '%"+keyword+"%'";
            movielists(sqlstring);
            }
        } else {
            submenu('select distinct type_id,type_name from movie order by type_id'); // 動態產生子選單
            var id = urlParams["id"];
            var sqlstring = "select * from movie where id = "+id;
            movieById(sqlstring);
        }
        } else {
        if (urlParams["ids"] == 'clear'){
            // console.log(urlParams["ids"]);
            document.cookie = s + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            // console.log(document.cookie);
        } else {
            var id = getCookieByName(s);
            var sqlstring = "select * from movie where id in (0" + id +")";
            // console.log(sqlstring);
            movielists(sqlstring);
        }
    }

    if (urlParams["year"] != null) {
        var sqlstring = "select * from movie where year = '"+urlParams["year"]+"' order by time desc";
        movielists(sqlstring);
    }

    if (urlParams["area"] != null) {
        var sqlstring = "select * from movie where area = '"+urlParams["area"]+"' order by time desc";
        movielists(sqlstring);
    }

    if (urlParams["actor"] != null) {
        var sqlstring = "select * from movie where actor like '%"+urlParams["actor"]+"%' order by time desc";
        movielists(sqlstring);
    }    

    if (urlParams["direcor"] != null) {
        var sqlstring = "select * from movie where actor direcor '%"+urlParams["direcor"]+"%' order by time desc";
        movielists(sqlstring);
    }        