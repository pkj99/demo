

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


  if (urlParams["t"] == null){ var t = ""; } else { var t = urlParams["t"];}
  if (urlParams["pg"] == null){ var pg = "1"; } else { var pg = urlParams["pg"];}
  if (urlParams["s"] == null){ var s = "haiwaikan"; } else { var s = urlParams["s"];}


  // 來源分類
  switch(s){
    case 'haiwaikan':
      var menuAPI = 'https://haiwaikan.com/api.php/provide/vod/at/xml';
      var urlAPI = 'https://haiwaikan.com/api.php/provide/vod/?ac=detail';
      document.getElementById('menu-movie').href = 'api.html?s='+s+'&t=28';
      document.getElementById('menu-tvshow').href = 'api.html?s='+s+'&t=119';
      document.getElementById('menu-variety').href = 'api.html?s='+s+'&t=128';
      document.getElementById('menu-animation').href = 'api.html?s='+s+'&t=135';
      document.getElementById('menu-favorites').href = 'api.html?s='+s+'&ids=favorites';
      break;
    case 'kuaibozy':
      var menuAPI = 'https://www.kuaibozy.com/api.php/provide/vod/from/kbm3u8/at/xml';
      var urlAPI = 'https://www.kuaibozy.com/api.php/provide/vod/?ac=detail';
      document.getElementById('menu-movie').href = 'api.html?s='+s+'&t=6';
      document.getElementById('menu-tvshow').href = 'api.html?s='+s+'&t=13';
      document.getElementById('menu-variety').href = 'api.html?s='+s+'&t=3';
      document.getElementById('menu-animation').href = 'api.html?s='+s+'&t=4';
      document.getElementById('menu-favorites').href = 'api.html?s='+s+'&ids=favorites';
      break;
    case 'guangsu':
      var menuAPI = 'https://api.guangsuapi.com/api.php/provide/vod/at/xml/';
      var urlAPI = 'https://api.guangsuapi.com/api.php/provide/vod/from/gsm3u8/at/json?ac=detail';
      document.getElementById('menu-movie').href = 'api.html?s='+s+'&t=6';
      document.getElementById('menu-tvshow').href = 'api.html?s='+s+'&t=13';
      document.getElementById('menu-variety').href = 'api.html?s='+s+'&t=3';
      document.getElementById('menu-animation').href = 'api.html?s='+s+'&t=4';
      document.getElementById('menu-favorites').href = 'api.html?s='+s+'&ids=favorites';
      break;
    case 'xinlang':
      var menuAPI = 'https://api.xinlangapi.com/xinlangapi.php/provide/vod/at/xml';
      var urlAPI = 'https://api.xinlangapi.com/xinlangapi.php/provide/vod/at/json?ac=detail';
      document.getElementById('menu-movie').href = 'api.html?s='+s+'&t=6';
      document.getElementById('menu-tvshow').href = 'api.html?s='+s+'&t=13';
      document.getElementById('menu-variety').style.visibility = 'hidden';
      document.getElementById('menu-animation').href = 'api.html?s='+s+'&t=3';
      document.getElementById('menu-favorites').href = 'api.html?s='+s+'&ids=favorites';
      break;
    case 'bdzy':
      var menuAPI = 'https://api.apibdzy.com/api.php/provide/vod/from/dbm3u8/at/xml';
      var urlAPI = 'https://api.apibdzy.com/api.php/provide/vod/?ac=detail';
      document.getElementById('menu-movie').href = 'api.html?s='+s+'&t=6';
      document.getElementById('menu-tvshow').href = 'api.html?s='+s+'&t=13';
      document.getElementById('menu-variety').style.visibility = 'hidden';
      document.getElementById('menu-animation').style.visibility = 'hidden';
      document.getElementById('search').style.visibility = 'hidden';
      document.getElementById('menu-favorites').href = 'api.html?s='+s+'&ids=favorites';
      break;
    case '1080zyku':
      var menuAPI = 'https://api.1080zyku.com/inc/ldg_api.php';
      var urlAPI = 'https://api.1080zyku.com/inc/apijson.php?ac=detail';
      document.getElementById('menu-movie').href = 'api.html?s='+s+'&t=5';
      document.getElementById('menu-tvshow').href = 'api.html?s='+s+'&t=12';
      document.getElementById('menu-variety').href = 'api.html?s='+s+'&t=3';
      document.getElementById('menu-animation').href = 'api.html?s='+s+'&t=4';
      document.getElementById('menu-favorites').href = 'api.html?s='+s+'&ids=favorites';
      break;
    default:
      var menuAPI = 'https://haiwaikan.com/api.php/provide/vod/at/xml';
      var urlAPI = 'https://haiwaikan.com/api.php/provide/vod/?ac=detail';
      document.getElementById('menu-movie').href = 'api.html?s='+s+'&t=28';
      document.getElementById('menu-tvshow').href = 'api.html?s='+s+'&t=119';
      document.getElementById('menu-variety').href = 'api.html?s='+s+'&t=128';
      document.getElementById('menu-animation').href = 'api.html?s='+s+'&t=135';
      document.getElementById('menu-favorites').href = 'api.html?s='+s+'&ids=favorites';
      break;
  }

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
      var idNew = ',' + id ;
      const d = new Date();
      d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
      let expires = "expires="+d.toUTCString();

      if (ids == null) { ids = '';}
      if (ids.includes(idNew)){
        document.getElementById('favorites').textContent = '收藏';
        document.getElementById('favorites').className = 'btn btn-secondary';
        ids = ids.replace(idNew,'');
        document.cookie = source + '=' + ids + ";" + expires + ";path=/";
      } else {
        document.getElementById('favorites').textContent = '已收藏';
        document.getElementById('favorites').className = 'btn btn-danger';
        ids += idNew ;
        document.cookie = source + '=' + ids + ";" + expires + ";path=/";
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



// 解決CORS問題
  var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
  // var cors_api_url = 'https://pkjcors.herokuapp.com/';
  

  function doCORSRequestMenu(options, printResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function() 
    {
      const parser = new DOMParser();
      const d = parser.parseFromString(x.responseText, "text/html");
      var list = d.getElementsByTagName('ty');
      let menu_type = '';
      for (let i=0; i<list.length;i++){
        var menu_id = list[i].id;
        var menu_name = list[i].textContent;
        if (menu_id == t){
          menu_type = menu_name.substring(menu_name.length-1);
        }
      }
      let htmlString = '';
      for (let i=0; i<list.length;i++){
        var menu_id = list[i].id;
        var menu_name = list[i].textContent;
        const cate = ['电影','电视剧','综艺','动漫'];
        var menu_active = ' style="border-radius: 5px; padding: 5px 10px;"';
        if (!cate.includes(menu_name)) {
          if (menu_name.substring(menu_name.length-1) == menu_type){
            if (menu_id == t) {menu_active = 'style="background-color:#b0c4de;border-radius: 5px; padding: 5px 10px;"';}
            htmlString += '<li class="menu_header"><a href="'+pagename+'?s='+s+'&t='+menu_id+'" '+menu_active+'>'+menu_name+'</a></li>';
          }
        }
      }
      document.getElementById('myui-menu').innerHTML = htmlString;
    }
    x.send(options.data);
  } 


  function doCORSRequest(options, printResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function() 
    {
      var data = JSON.parse(x.responseText);

      page = data.page;
      pagecount = data.pagecount;

      let htmlString = '<ul>';
      
      for (let file of data.list) {
        var m3u8 = file.vod_play_url.split('$')[1];
        var img = file.vod_pic;
        var title = file.vod_name;
        var year = file.vod_year;
        var quality = file.vod_play_url.split('$')[0];
        var type_name = file.type_name;
        var id = file.vod_id;        
        var remarks = file.vod_remarks;
        var state = file.vod_state;

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
    
     
      var p = parseInt(page);
      var bottom_p = parseInt(pagecount);
      var referer = pagename+'?s='+s+'&t=' + t
      if (p > 1) { prev_p = p-1;} else { prev_p = 1;}
      if (p < bottom_p) { next_p = p+1;} else { next_p = bottom_p;}
      var nav = '<li><a class="btn btn-default" href="' + referer+'&pg=1">1</a></li>';
      nav += '<li><a class="btn btn-default" href="' + referer+'&pg=' + prev_p +'">Prev</a></li>';
      for (let i = p - 5; i < p + 5; i++) {
          if ( i == p ) {  nav += '<li class="hidden-xs"><a class="btn btn-warm" href="' + referer+'&pg=' + i +'">'+ i +'</a></li>'; }
          else if ( i < bottom_p && i > 0) {  nav += '<li class="hidden-xs"><a class="btn btn-default" href="' + referer+'&pg=' + i +'">'+ i +'</a></li>'; }
      }

      nav += '<li><a class="btn btn-default" href="' + referer + '&pg=' + next_p +'">Next</a></li>';
      nav += '<li><a class="btn btn-default" href="' + referer + '&pg=' + bottom_p +'">'+bottom_p+'</a></li>';
      
      document.getElementById('myui-page').innerHTML = nav;

    }
    x.send(options.data);
  }


  function doCORSRequestById(options, printResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function() 
    {
      var data = JSON.parse(x.responseText);

      page = data.page;
      pagecount = data.pagecount;

      let htmlString = '<ul>';
      
      for (let file of data.list) {
        var m3u8 = file.vod_play_url.split('#')[0].split('$')[1];
        var img = file.vod_pic;
        var title = file.vod_name;
        var year = file.vod_year;
        var quality = file.vod_play_url.split('#')[0].split('$')[0];
        var type_id = file.type_id;
        var type_name = file.type_name;
        var area = file.vod_area;
        var lang = file.vod_lang;
        var actor = file.vod_actor;
        var director = file.vod_director;
        var content = file.vod_content;
        var remarks = file.vod_remarks;
        var vod_time = file.vod_time;

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
        // htmlString += '<div class="myui-content__detail">';

        htmlString += '<button class="btn btn-primary" type="button" style="font-size: 24px;margin:2px;">';
        htmlString += '<a href="../vod/playvideo.html?url='+m3u8+'">播放</a></button>';
        htmlString += '<button class="btn btn-secondary" type="button" onclick="setCookieBySourceId(\''+s+'\',\''+id+'\');" id="favorites" '
        htmlString += 'style="font-size: 24px;margin:2px;">收藏</button><br><br>';

        const playlists = file.vod_play_url.split('$$$')[0].split('#');
        console.log(file.vod_play_url);
        if ( playlists.length > 1 ){
          for (let pl of playlists){
              const p = pl.split('$');
              var pl_name = p[0];
              var pl_m3u8 = p[1];
              htmlString += '<a href="../vod/playvideo.html?url='+pl_m3u8+'">';
              htmlString += '<button class="btn btn-outline-primary" type="button" style="width:120px;margin:2px;font-size: 16px;">';
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
    x.send(options.data);
  }

  // create menu items
  var urlField = menuAPI;
  var outputField = document.getElementById('output');
  var j = doCORSRequestMenu( { method: 'GET', url: urlField, },  function printResult(result) { outputField.value = result; } )

  // create movie lists, keyword search and vod by id
  if (urlParams["ids"] == null) {
    if (urlParams["id"] == null) {
      if (urlParams["wd"] == null) {
        var urlField = urlAPI + '&t=' + t + '&pg=' + pg;
        var j = doCORSRequest( { method: 'GET', url: urlField, }, function printResult(result) {outputField.value = result; } )
      } else {
        var keyword = Simplized(urlParams["wd"])  // 繁轉簡
        var urlField = urlAPI + '&wd=' + keyword;
        var j = doCORSRequest( { method: 'GET', url: urlField, }, function printResult(result) {outputField.value = result; } )
      }
    } else {
      var id = urlParams["id"];
      var urlField = urlAPI + '&ids=' + id;
      var j = doCORSRequestById( { method: 'GET', url: urlField, }, function printResult(result) { outputField.value = result; } )
    }
  } else {
    if (urlParams["ids"] == 'clear'){
      console.log(urlParams["ids"]);
      document.cookie = s + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      console.log(document.cookie);
    } else {
      var id = getCookieByName(s);
      var urlField = urlAPI + '&ids=' + id;
      var j = doCORSRequest( { method: 'GET', url: urlField, }, function printResult(result) { outputField.value = result; } )
    }
  }


