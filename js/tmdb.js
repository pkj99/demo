
    let pagename = window.location.pathname.split('/').slice(-1);
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


    var db_url = 'https://pkj99.github.io/demo/vod/db/haiwaikan-tmdb.db';

    // create movie list 
    function movielists(sqlstring){

      var pagecount = 320;

      const xhr = new XMLHttpRequest();
      xhr.open('GET', db_url, true);
      xhr.responseType = 'arraybuffer';

      xhr.onload = e => {
        const uInt8Array = new Uint8Array(xhr.response);
        const db = new SQL.Database(uInt8Array);
        
        var page = (parseInt(pg)-1)*15;
        if (sqlstring.includes(" like ")){
          console.log(sqlstring);
        } else {
          sqlstring += " limit 15 offset " + page
        }
        
        // console.log(sqlstring);
        const contents = db.exec(sqlstring);
        var data = JSON.parse(JSON.stringify(contents));
        // console.log(data);
        
        let htmlString = '';

        htmlString += '<div class="container">';
        htmlString += '<table class="table table-hover">';
        htmlString += '<thead>';
        htmlString += '<tr>';
        htmlString += '<td>台灣片名</td>';
        htmlString += '<td>大陸片名</td>';
        htmlString += '<td>來源國</td>';
        htmlString += '<td>原始片名</td>';
        htmlString += '<td>發行日期</td>';
        htmlString += '<td>熱門度</td>';
        htmlString += '<td>評分</td>';
        htmlString += '<td>投票數</td>';
        htmlString += '</tr>';
        htmlString += '</thead>';

        htmlString += '<tbody>';
        
        if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }

        for (var i = 0; i < data.length; i++) {

            var id=data[i][0];
            var title_tw = data[i][2];
            var title_cn = data[i][3];
            var original_language =data[i][5];
            var original_title = data[i][6];
            var release_date = data[i][7];
            var popularity = data[i][9];
            var vote_average = data[i][10];
            var vote_count = data[i][11];
            var movieid = data[i][14];
            var movieurl = data[i][15];

            htmlString += '<tr>';
            htmlString += '<td><a href="'+movieurl+'">'+title_tw+'</a></td> ';
            htmlString += '<td><a href="index.html?id='+movieid+'">'+title_cn+'</a></td> ';
            htmlString += '<td>'+original_language+'</td> ';
            htmlString += '<td><a href="https://www.themoviedb.org/movie/'+id+'" target="_blank">'+original_title+'</a></td> ';
            htmlString += '<td>'+release_date+'</td> ';
            htmlString += '<td align="right">'+popularity+'</td> ';
            htmlString += '<td align="right">'+vote_average+'</td> ';
            htmlString += '<td align="right">'+vote_count+'</td> ';
            htmlString += '</tr> ';

        }

        htmlString += '</tbody>';
        htmlString += '</table>';
        htmlString += '</div>';
        
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

        var db_url = 'https://pkj99.github.io/demo/vod/db/haiwaikan-movie.db';

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
        console.log(vod_play_url);
        }
        xpl.send();


        const xhr = new XMLHttpRequest();
        xhr.open('GET', db_url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = e => {      
        const uInt8Array = new Uint8Array(xhr.response);
        const db = new SQL.Database(uInt8Array);
        
        var pagecount = 100;
        var page = (parseInt(pg)-1)*30;
        sqlstring += " limit 30 offset " + page
        
        const contents = db.exec(sqlstring);
        var data = JSON.parse(JSON.stringify(contents));
        // console.log(data);
        
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
            htmlString += '<span class="text-muted hidden-xs">地區：</span>'+area;
            htmlString += '<span class="split-line"></span>';
            htmlString += '<span class="text-muted hidden-xs">年份：</span>'+year;
            htmlString += '</p>';
            htmlString += '<p class="data"><span class="text-muted">主演：</span>'+actor+'</p>';
            htmlString += '<p class="data"><span class="text-muted">導演：</span>'+director+'</p>';
            htmlString += '<p class="data"><span class="text-muted">狀態：</span>'+remarks+'</p>';
            htmlString += '<p class="data"><span class="text-muted">更新：</span>'+vod_time+'</p>';
            htmlString += '<p class="data"><span class="text-muted">簡介：</span></p>'+content;
            htmlString += '</div>';

            htmlString += '</li>';


            //  create playlists buttons
            htmlString += '<li class="col-lg-2 col-md-2 col-sm-2 col-xs-1">';
            htmlString += '<div class="myui-content__detail">';

            const playlists = vod_play_url.split('#');
            playlists.sort();
            // const playlists = [m3u8];
            if( playlists.length == 1 ){
                htmlString += '<button class="btn btn-primary" type="button" style="font-size: 24px;margin:2px;">';
                htmlString += '<a href="../vod/playvideo.html?url='+m3u8+'">播放</a></button>';
            } else {
            for (let pl of playlists){
                const p = pl.split('$');
                var pl_name = p[0];
                var pl_m3u8 = p[1];
                htmlString += '<a href="'+pl_m3u8+'">';
                htmlString += '<button class="btn btn-outline-primary" type="button" style="margin:2px;font-size: 16px;">';
                htmlString += pl_name+'</button></a>';
            }
            }

            htmlString += '<button class="btn btn-secondary" type="button" onclick="setCookieBySourceId(\''+s+'\',\''+id+'\');" id="favorites" '
            htmlString += 'style="font-size: 24px;margin:2px;">收藏</button>';

            // htmlString += '<button class="btn btn-secondary" type="button">';
            // htmlString += '<a style="font-size: 24px;" href="" onclick="setCookieBySourceId('+s+','+id+')" id="favorites">收藏</a></button>';

            htmlString += '</div>';
            htmlString += '</li>';

        }
        htmlString += '</ul>';
        document.getElementById('myui-panel').innerHTML = htmlString;
        // checkCookieBySourceId(s,id);
        }
        xhr.send();
    }


    var pagecount;

    if (urlParams["id"] == null) {
        if (urlParams["wd"] == null || urlParams["wd"] == '') {
            var sqlstring = "select * from tmdb where same_title = 0 order by vote_count desc";
            movielists(sqlstring);
        } else {
            var keyword_tw = urlParams["wd"]
            var keyword_cn = Simplized(urlParams["wd"])  // 繁轉簡
            var sqlstring = "select * from tmdb where title_tw like '%"+keyword_tw+"%' or title_cn like '%"+keyword_cn+"%'";
            // var sqlstring = "select * from tmdb where title_tw like '%"+keyword_tw+"%' order by title_tw";
            movielists(sqlstring);
        }
    } else {
        var id = urlParams["id"];
        var sqlstring = "select * from movie where id = "+id;
        movieById(sqlstring);
        }