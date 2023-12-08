

let pagename = window.location.pathname.split('/').slice(-1);
var urlParams;
(window.onpopstate = function () {
  var match,
    pl = /\+/g,  // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
    query = window.location.search.substring(1);

  urlParams = {};
  while (match = search.exec(query))
    urlParams[decode(match[1])] = decode(match[2]);
})();


if (urlParams["t"] == null) { var t = ""; } else { var t = urlParams["t"]; }
if (urlParams["pg"] == null) { var pg = "1"; } else { var pg = urlParams["pg"]; }
if (urlParams["s"] == null) { var s = "haiwaikan"; } else { var s = urlParams["s"]; }

document.getElementById('s').value = s;

// 來源分類
switch (s) {
  case 'haiwaikan':
    var menuAPI = 'https://haiwaikan.com/api.php/provide/vod/at/xml';
    var urlAPI = 'https://haiwaikan.com/api.php/provide/vod/?ac=detail';
    var player = 'playvideo.html?url=';
    document.getElementById('menu-movie').href = 'home.html?s=' + s + '&t=30';
    document.getElementById('menu-tvshow').href = 'home.html?s=' + s + '&t=125';
    document.getElementById('menu-variety').href = 'home.html?s=' + s + '&t=133';
    document.getElementById('menu-animation').href = 'home.html?s=' + s + '&t=136';
    document.getElementById('menu-favorites').href = 'home.html?s=' + s + '&ids=favorites';
    document.getElementById('haiwaikan').style = "background-color: #0d9156;"
    break;
  case 'kuaibozy':
    var menuAPI = 'https://www.kuaibozy.com/api.php/provide/vod/from/kbm3u8/at/xml';
    var urlAPI = 'https://www.kuaibozy.com/api.php/provide/vod/?ac=detail';
    var player = 'playvideo.html?url=';
    document.getElementById('menu-movie').href = 'home.html?s=' + s + '&t=6';
    document.getElementById('menu-tvshow').href = 'home.html?s=' + s + '&t=13';
    document.getElementById('menu-variety').href = 'home.html?s=' + s + '&t=3';
    document.getElementById('menu-animation').href = 'home.html?s=' + s + '&t=4';
    document.getElementById('menu-favorites').href = 'home.html?s=' + s + '&ids=favorites';
    document.getElementById('kuaibozy').style = "background-color: #0d9156;"
    break;
  case 'guangsu':
    var menuAPI = 'https://api.guangsuapi.com/api.php/provide/vod/at/xml/';
    var urlAPI = 'https://api.guangsuapi.com/api.php/provide/vod/from/gsm3u8/at/json?ac=detail';
    var player = '';
    document.getElementById('menu-movie').href = 'home.html?s=' + s + '&t=6';
    document.getElementById('menu-tvshow').href = 'home.html?s=' + s + '&t=22';
    document.getElementById('menu-variety').href = 'home.html?s=' + s + '&t=3';
    document.getElementById('menu-animation').href = 'home.html?s=' + s + '&t=4';
    document.getElementById('menu-favorites').href = 'home.html?s=' + s + '&ids=favorites';
    document.getElementById('guangsu').style = "background-color: #0d9156;"
    break;
  case 'xinlang':
    var menuAPI = 'https://api.xinlangapi.com/xinlangapi.php/provide/vod/at/xml';
    var urlAPI = 'https://api.xinlangapi.com/xinlangapi.php/provide/vod/at/json?ac=detail';
    var player = 'playvideo.html?url=';
    document.getElementById('menu-movie').href = 'home.html?s=' + s + '&t=6';
    document.getElementById('menu-tvshow').href = 'home.html?s=' + s + '&t=15';
    document.getElementById('menu-variety').href = 'home.html?s=' + s + '&t=4';
    document.getElementById('menu-animation').href = 'home.html?s=' + s + '&t=17';
    document.getElementById('menu-favorites').href = 'home.html?s=' + s + '&ids=favorites';
    document.getElementById('xinlang').style = "background-color: #0d9156;"
    break;
  case 'bdzy':
    var menuAPI = 'https://api.apibdzy.com/api.php/provide/vod/from/dbm3u8/at/xml';
    var urlAPI = 'https://api.apibdzy.com/api.php/provide/vod/?ac=detail';
    var player = '';
    document.getElementById('menu-movie').href = 'home.html?s=' + s + '&t=6';
    document.getElementById('menu-tvshow').href = 'home.html?s=' + s + '&t=21';
    document.getElementById('menu-variety').href = 'home.html?s=' + s + '&t=27';
    document.getElementById('menu-animation').href = 'home.html?s=' + s + '&t=31';
    // document.getElementById('search').style.visibility = 'hidden';
    document.getElementById('menu-favorites').href = 'home.html?s=' + s + '&ids=favorites';
    document.getElementById('bdzy').style = "background-color: #0d9156;"
    break;
  case '1080zyku':
    var menuAPI = 'https://api.1080zyku.com/inc/ldg_api.php';
    var urlAPI = 'https://api.1080zyku.com/inc/apijson.php?ac=detail';
    var player = 'playvideo.html?url=';
    document.getElementById('menu-movie').href = 'home.html?s=' + s + '&t=5';
    document.getElementById('menu-tvshow').href = 'home.html?s=' + s + '&t=13';
    document.getElementById('menu-variety').href = 'home.html?s=' + s + '&t=63';
    document.getElementById('menu-animation').href = 'home.html?s=' + s + '&t=68';
    document.getElementById('menu-favorites').href = 'home.html?s=' + s + '&ids=favorites';
    document.getElementById('1080zyku').style = "background-color: #0d9156;"
    break;
  case 'hongniuzy2':
    var menuAPI = 'https://www.hongniuzy2.com/api.php/provide/vod/from/hnm3u8/at/xml';
    var urlAPI = 'https://www.hongniuzy2.com/api.php/provide/vod/?ac=detail';
    var player = '';
    document.getElementById('menu-movie').href = 'home.html?s=' + s + '&t=5';
    document.getElementById('menu-tvshow').href = 'home.html?s=' + s + '&t=16';
    document.getElementById('menu-variety').href = 'home.html?s=' + s + '&t=3';
    document.getElementById('menu-animation').href = 'home.html?s=' + s + '&t=4';
    document.getElementById('menu-favorites').href = 'home.html?s=' + s + '&ids=favorites';
    document.getElementById('hongniuzy2').style = "background-color: #0d9156;"
    break;
  case 'ffzy':
    var menuAPI = 'http://cj.ffzyapi.com/api.php/provide/vod/from/hnm3u8/at/xml';
    var urlAPI = 'http://cj.ffzyapi.com/api.php/provide/vod/?ac=detail';
    var player = 'playvideo.html?url=';
    document.getElementById('menu-movie').href = 'home.html?s=' + s + '&t=6';
    document.getElementById('menu-tvshow').href = 'home.html?s=' + s + '&t=21';
    document.getElementById('menu-variety').href = 'home.html?s=' + s + '&t=26';
    document.getElementById('menu-animation').href = 'home.html?s=' + s + '&t=4';
    document.getElementById('menu-favorites').href = 'home.html?s=' + s + '&ids=favorites';
    document.getElementById('ffzy').style = "background-color: #0d9156;"
    break;
  case 'lzi':
    var menuAPI = 'https://cj.lziapi.com/api.php/provide/vod/from/hnm3u8/at/xml';
    var urlAPI = 'https://cj.lziapi.com/api.php/provide/vod/?ac=detail';
    var player = '';
    document.getElementById('menu-movie').href = 'home.html?s=' + s + '&t=6';
    document.getElementById('menu-tvshow').href = 'home.html?s=' + s + '&t=21';
    document.getElementById('menu-variety').href = 'home.html?s=' + s + '&t=26';
    document.getElementById('menu-animation').href = 'home.html?s=' + s + '&t=4';
    document.getElementById('menu-favorites').href = 'home.html?s=' + s + '&ids=favorites';
    document.getElementById('lzi').style = "background-color: #0d9156;"
    break;
  case 'ikun':
    var menuAPI = 'https://ikunzyapi.com/api.php/provide/vod/from/hnm3u8/at/xml';
    var urlAPI = 'https://ikunzyapi.com/api.php/provide/vod/?ac=detail';
    var player = 'playvideo.html?url=';
    document.getElementById('menu-movie').href = 'home.html?s=' + s + '&t=6';
    document.getElementById('menu-tvshow').href = 'home.html?s=' + s + '&t=27';
    document.getElementById('menu-variety').href = 'home.html?s=' + s + '&t=32';
    document.getElementById('menu-animation').href = 'home.html?s=' + s + '&t=4';
    document.getElementById('menu-favorites').href = 'home.html?s=' + s + '&ids=favorites';
    document.getElementById('ikun').style = "background-color: #0d9156;"
    break;
  case 'tiankong':
    var menuAPI = 'https://m3u8.tiankongapi.com/api.php/provide/vod/from/hnm3u8/at/xml';
    var urlAPI = 'https://m3u8.tiankongapi.com/api.php/provide/vod/?ac=detail';
    var player = 'playvideo.html?url=';
    document.getElementById('menu-movie').href = 'home.html?s=' + s + '&t=6';
    document.getElementById('menu-tvshow').href = 'home.html?s=' + s + '&t=23';
    document.getElementById('menu-variety').href = 'home.html?s=' + s + '&t=27';
    document.getElementById('menu-animation').href = 'home.html?s=' + s + '&t=4';
    document.getElementById('menu-favorites').href = 'home.html?s=' + s + '&ids=favorites';
    document.getElementById('tiankong').style = "background-color: #0d9156;"
    break;
  case 'sdzy':
    var menuAPI = 'https://sdzyapi.com/api.php/provide/vod/from/hnm3u8/at/xml';
    var urlAPI = 'https://sdzyapi.com/api.php/provide/vod/?ac=detail';
    var player = '';
    document.getElementById('menu-movie').href = 'home.html?s=' + s + '&t=6';
    document.getElementById('menu-tvshow').href = 'home.html?s=' + s + '&t=18';
    document.getElementById('menu-variety').href = 'home.html?s=' + s + '&t=27';
    document.getElementById('menu-animation').href = 'home.html?s=' + s + '&t=4';
    document.getElementById('menu-favorites').href = 'home.html?s=' + s + '&ids=favorites';
    document.getElementById('sdzy').style = "background-color: #0d9156;"
    break;
  default:
    var menuAPI = 'https://haiwaikan.com/api.php/provide/vod/at/xml';
    var urlAPI = 'https://haiwaikan.com/api.php/provide/vod/?ac=detail';
    var player = 'playvideo.html?url=';
    document.getElementById('menu-movie').href = 'home.html?s=' + s + '&t=28';
    document.getElementById('menu-tvshow').href = 'home.html?s=' + s + '&t=119';
    document.getElementById('menu-variety').href = 'home.html?s=' + s + '&t=128';
    document.getElementById('menu-animation').href = 'home.html?s=' + s + '&t=135';
    document.getElementById('menu-favorites').href = 'home.html?s=' + s + '&ids=favorites';
    document.getElementById('haiwaikan').style = "background-color: #0d9156;"
    break;
}

// 收藏設定 Cookie 

function parseCookie() {
  var cookieObj = {};
  var cookieAry = document.cookie.split(';');
  var cookie;

  for (var i = 0, l = cookieAry.length; i < l; ++i) {
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

function setCookieBySourceId(source, id) {
  var ids = getCookieByName(source);
  var idNew = ',' + id;
  const d = new Date();
  d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();

  if (ids == null) { ids = ''; }
  if (ids.includes(idNew)) {
    document.getElementById('favorites').textContent = '收藏';
    document.getElementById('favorites').className = 'btn btn-secondary';
    ids = ids.replace(idNew, '');
    document.cookie = source + '=' + ids + ";" + expires + ";path=/";
  } else {
    document.getElementById('favorites').textContent = '已收藏';
    document.getElementById('favorites').className = 'btn btn-danger';
    ids += idNew;
    document.cookie = source + '=' + ids + ";" + expires + ";path=/";
  }
}

function checkCookieBySourceId(source, id) {
  var ids = getCookieByName(source);
  if (ids == null) { ids = ''; }
  var idsAry = ids.split(',');
  for (var i = 0, l = idsAry.length; i < l; ++i) {
    if (id == idsAry[i]) {
      document.getElementById('favorites').textContent = '已收藏';
      document.getElementById('favorites').className = 'btn btn-danger';
    }
  }
}



// 解決CORS問題
// var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
var cors_api_url = 'https://api.allorigins.win/get?url=';


function doCORSRequestMenu(options, printResult) {
  var x = new XMLHttpRequest();
  x.open(options.method, cors_api_url + encodeURIComponent(options.url));
  x.onload = x.onerror = function () {
    var data = JSON.parse(x.responseText).contents;

    const parser = new DOMParser();
    // const d = parser.parseFromString(x.responseText, "text/html");
    const d = parser.parseFromString(data, "text/html");
    var list = d.getElementsByTagName('ty');
    let menu_type = '';
    for (let i = 0; i < list.length; i++) {
      var menu_id = list[i].id;
      var menu_name = list[i].textContent;
      if (menu_id == t) {
        menu_type = menu_name.substring(menu_name.length - 1);
      }
    }
    let htmlString = '';
    for (let i = 0; i < list.length; i++) {
      var menu_id = list[i].id;
      var menu_name = list[i].textContent;
      const cate = ['电影', '电视剧', '综艺', '动漫'];
      var menu_active = ' style="border-radius: 5px; padding: 2px 2px;"';
      if (!cate.includes(menu_name)) {
        if (menu_name.substring(menu_name.length - 1) == menu_type) {
          if (menu_id == t) { menu_active = 'style="background-color:#b0c4de;border-radius: 5px; padding: 2px 2px;"'; }
          // menu_name = menu_name.replace("片","").replace("剧","").replace("综艺","").replace("动漫","");
          htmlString += '<li class="menu_header"><a href="' + pagename + '?s=' + s + '&t=' + menu_id + '" ' + menu_active + '>' + menu_name + '</a></li>';
        }
      }
    }
    document.getElementById('myui-menu').innerHTML = htmlString;
  }
  x.send(options.data);
}


function doCORSRequest(options, printResult) {
  var x = new XMLHttpRequest();
  x.open(options.method, cors_api_url + encodeURIComponent(options.url));
  x.onload = x.onerror = function () {
    var contents = JSON.parse(x.responseText).contents;
    var data = JSON.parse(contents);
    // var data = JSON.parse(x.responseText);

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
      htmlString += '<a class="myui-vodlist__thumb lazyload" href="' + pagename + '?s=' + s + '&t=' + t + '&id=' + id + '" ';
      htmlString += 'title="' + title + '" ';
      htmlString += 'data-original="' + img + '" ';
      htmlString += 'style="background-image: url(' + img + ')">';

      htmlString += '<span class="play hidden-xs"></span>';
      if (quality != '1') {
        htmlString += '<span class="pic-tag pic-tag-top" style="background-color: #5bb7fe;">' + quality + '</span>';
      }
      htmlString += '<span class="pic-tag pic-tag-right">' + remarks + '</span>';
      htmlString += '<span class="pic-text text-right">' + year + '</span>';
      htmlString += '<span class="pic-text text-left">' + type_name + '</span>';

      htmlString += '</a>';
      htmlString += '</div>';
      htmlString += '<div class="myui-vodlist__detail">';
      htmlString += '<h4 class="title text-overflow"><a href="' + m3u8 + '">' + title + '</a></h4>';
      htmlString += '</div>';
      htmlString += '</li>';
    }

    htmlString += '</ul>';

    document.getElementById('myui-panel').innerHTML = htmlString;


    var p = parseInt(page);
    var bottom_p = parseInt(pagecount);
    var referer = pagename + '?s=' + s + '&t=' + t
    if (p > 1) { prev_p = p - 1; } else { prev_p = 1; }
    if (p < bottom_p) { next_p = p + 1; } else { next_p = bottom_p; }
    var nav = '<li><a class="btn btn-default" href="' + referer + '&pg=1">1</a></li>';
    nav += '<li><a class="btn btn-default" href="' + referer + '&pg=' + prev_p + '">Prev</a></li>';
    for (let i = p - 5; i < p + 5; i++) {
      if (i == p) { nav += '<li class="hidden-xs"><a class="btn btn-warm" href="' + referer + '&pg=' + i + '">' + i + '</a></li>'; }
      else if (i < bottom_p && i > 0) { nav += '<li class="hidden-xs"><a class="btn btn-default" href="' + referer + '&pg=' + i + '">' + i + '</a></li>'; }
    }

    nav += '<li><a class="btn btn-default" href="' + referer + '&pg=' + next_p + '">Next</a></li>';
    nav += '<li><a class="btn btn-default" href="' + referer + '&pg=' + bottom_p + '">' + bottom_p + '</a></li>';

    document.getElementById('myui-page').innerHTML = nav;

  }
  x.send(options.data);
}


function doCORSRequestById(options, printResult) {
  var x = new XMLHttpRequest();
  x.open(options.method, cors_api_url + encodeURIComponent(options.url));
  x.onload = x.onerror = function () {
    var contents = JSON.parse(x.responseText).contents;
    var data = JSON.parse(contents);
    // var data = JSON.parse(x.responseText);

    page = data.page;
    pagecount = data.pagecount;

    let htmlString = '<ul class="row row-cols-2">';

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
      htmlString += '<a class="myui-vodlist__thumb lazyload" href="' + m3u8 + '" ';
      htmlString += 'title="' + title + '" ';
      htmlString += 'data-original="' + img + '" ';
      htmlString += 'style="background-image: url(' + img + ')">';

      htmlString += '<span class="play hidden-xs"></span>';
      htmlString += '<span class="pic-tag pic-tag-top" style="background-color: #5bb7fe;">' + quality + '</span>';
      htmlString += '<span class="pic-text text-right">' + year + '</span>';
      htmlString += '<span class="pic-text text-left">' + type_name + '</span>';

      htmlString += '</a>';
      htmlString += '</div>';
      htmlString += '<div class="myui-vodlist__detail">';
      htmlString += '<h4 class="title text-overflow"><a href="' + m3u8 + '">' + title + '</a></h4>';
      htmlString += '</div>';
      htmlString += '</li>';

      htmlString += '<li class="col-lg-2 col-md-2 col-sm-2 col-xs-1">';

      htmlString += '<div class="myui-content__detail">';
      htmlString += '<h1 class="title">' + title + '</h1>';
      htmlString += '<p class="data">';
      htmlString += '<span class="text-muted">分類：</span><a href="' + pagename + '?s=' + s + '&t=' + type_id + '">' + type_name + '</a>';
      htmlString += '<span class="split-line"></span>';
      htmlString += '<span class="text-muted hidden-xs">地區：</span>' + area;
      htmlString += '<span class="split-line"></span>';
      htmlString += '<span class="text-muted hidden-xs">年份：</span>' + year;
      htmlString += '</p>';
      htmlString += '<p class="data"><span class="text-muted">主演：</span>' + actor + '</p>';
      htmlString += '<p class="data"><span class="text-muted">導演：</span>' + director + '</p>';
      htmlString += '<p class="data"><span class="text-muted">狀態：</span>' + remarks + '</p>';
      htmlString += '<p class="data"><span class="text-muted">更新：</span>' + vod_time + '</p>';
      htmlString += '<p class="data"><span class="text-muted">簡介：</span></p>' + content;
      htmlString += '</div>';

      htmlString += '</li>';


      //  create playlists buttons
      htmlString += '<li class="col-lg-2 col-md-2 col-sm-2 col-xs-1">';
      htmlString += '<button class="btn btn-primary" type="button" style="font-size: 24px;margin:2px;">';
      if (player==''){ var imgstring = ''; } else {var imgstring = '&img='+img;}
      htmlString += '<a href="' + player + m3u8 + imgstring +'">播放</a></button>';
      htmlString += '<button class="btn btn-secondary" type="button" onclick="setCookieBySourceId(\'' + s + '\',\'' + id + '\');" id="favorites" '
      htmlString += 'style="font-size: 24px;margin:2px;">收藏</button><br><br>';

      const playlists = file.vod_play_url.split('$$$')[0].split('#');
      // console.log(file.vod_play_url);
      if (playlists.length > 100) { var ep = -30; } else { var ep = 0; }
      if (playlists.length > 1) {
        for (let pl of playlists.slice(ep)) {
          const p = pl.split('$');
          var pl_name = p[0];
          var pl_m3u8 = p[1];
          htmlString += '<a href="'+ player + pl_m3u8 + imgstring + '">';
          htmlString += '<button class="btn btn-outline-primary" type="button" style="width:110px;margin:2px;font-size: 14px;">';
          htmlString += pl_name + '</button></a>';
        }
      }

      // htmlString += '</div>';
      htmlString += '</li>';

    }
    htmlString += '</ul>';
    document.getElementById('myui-panel').innerHTML = htmlString;

    checkCookieBySourceId(s, id);

  }
  x.send(options.data);
}


function doCORSSearch(options, printResult) {

  var s = options.s;
  console.log(s);
  switch (s) {
    case 'haiwaikan':
      var urlAPI = 'https://haiwaikan.com/api.php/provide/vod/?ac=detail';
      var source = '海外看';
      break;
    case 'guangsu':
      var urlAPI = 'https://api.guangsuapi.com/api.php/provide/vod/from/gsm3u8/at/json?ac=detail';
      var source = '光速';
      break;
    case 'xinlang':
      var urlAPI = 'https://api.xinlangapi.com/xinlangapi.php/provide/vod/at/json?ac=detail';
      var source = '新浪';
      break;
    case 'bdzy':
      var urlAPI = 'https://api.apibdzy.com/api.php/provide/vod/?ac=detail';
      var source = '百度';
      break;
    case '1080zyku':
      var urlAPI = 'https://api.1080zyku.com/inc/apijson.php?ac=detail';
      var source = '高清';
      break;
    case 'hongniuzy2':
      var urlAPI = 'https://www.hongniuzy2.com/api.php/provide/vod/?ac=detail';
      var source = '紅牛';
      break;
    case 'ffzy':
      var urlAPI = 'http://cj.ffzyapi.com/api.php/provide/vod/?ac=detail';
      var source = '非凡';
      break;
    case 'lzi':
      var urlAPI = 'https://cj.lziapi.com/api.php/provide/vod/?ac=detail';
      var source = '量子';
      break;
    case 'ikun':
      var urlAPI = 'https://ikunzyapi.com/api.php/provide/vod/?ac=detail';
      var source = '愛看';
      break;
    case 'tiankong':
      var urlAPI = 'https://m3u8.tiankongapi.com/api.php/provide/vod/?ac=detail';
      var source = '天空';
      break;
    case 'sdzy':
      var urlAPI = 'https://sdzyapi.com/api.php/provide/vod/?ac=detail';
      var source = '閃電';
      break;


    default:
      var urlAPI = 'https://haiwaikan.com/api.php/provide/vod/?ac=detail';
      var source = '海外看';
      break;
  }

  document.getElementById('myui-panel').innerHTML = '';

  console.log(urlAPI + '&wd=' + options.wd);

  var x = new XMLHttpRequest();
  x.open(options.method, cors_api_url + encodeURIComponent(urlAPI + '&wd=' + options.wd));
  x.onload = x.onerror = function () {
    console.log(x.responseText);
    var contents = JSON.parse(x.responseText).contents;
    var data = JSON.parse(contents);
    // var data = JSON.parse(x.responseText);

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
      htmlString += '<a class="myui-vodlist__thumb lazyload" href="' + pagename + '?s=' + s + '&t=' + t + '&id=' + id + '" ';
      htmlString += 'title="' + title + '" ';
      htmlString += 'data-original="' + img + '" ';
      htmlString += 'style="background-image: url(' + img + ')"';

      htmlString += '<span class="play hidden-xs"></span>';
      if (quality != '1') {
        htmlString += '<span class="pic-tag pic-tag-top" style="background-color: #5bb7fe;">' + quality + '</span>';
      }
      // htmlString += '<span class="pic-tag pic-tag-right">' + remarks + '</span>';
      htmlString += '<span class="pic-tag pic-tag-right">' + source + '</span>';
      htmlString += '<span class="pic-text text-right">' + year + '</span>';
      htmlString += '<span class="pic-text text-left">' + type_name + '</span>';

      htmlString += '</a>';
      htmlString += '</div>';
      htmlString += '<div class="myui-vodlist__detail">';
      htmlString += '<h4 class="title text-overflow"><a href="' + m3u8 + '">' + title + '</a></h4>';
      htmlString += '</div>';
      htmlString += '</li>';
    }

    htmlString += '</ul>';

    document.getElementById('myui-panel').innerHTML += htmlString;


    var p = parseInt(page);
    var bottom_p = parseInt(pagecount);
    var referer = pagename + '?s=' + s + '&t=' + t
    if (p > 1) { prev_p = p - 1; } else { prev_p = 1; }
    if (p < bottom_p) { next_p = p + 1; } else { next_p = bottom_p; }
    var nav = '<li><a class="btn btn-default" href="' + referer + '&pg=1">1</a></li>';
    nav += '<li><a class="btn btn-default" href="' + referer + '&pg=' + prev_p + '">Prev</a></li>';
    for (let i = p - 5; i < p + 5; i++) {
      if (i == p) { nav += '<li class="hidden-xs"><a class="btn btn-warm" href="' + referer + '&pg=' + i + '">' + i + '</a></li>'; }
      else if (i < bottom_p && i > 0) { nav += '<li class="hidden-xs"><a class="btn btn-default" href="' + referer + '&pg=' + i + '">' + i + '</a></li>'; }
    }

    nav += '<li><a class="btn btn-default" href="' + referer + '&pg=' + next_p + '">Next</a></li>';
    nav += '<li><a class="btn btn-default" href="' + referer + '&pg=' + bottom_p + '">' + bottom_p + '</a></li>';

    document.getElementById('myui-page').innerHTML = nav;

  }
  x.send(options.data);
}




// create menu items
var urlField = menuAPI;
var outputField = document.getElementById('output');
var j = doCORSRequestMenu({ method: 'GET', url: urlField, }, function printResult(result) { outputField.value = result; })

// if (t!=""){
//   document.getElementById('msg').src = "../images/loading_eng.gif";
// }


// create movie lists, keyword search and vod by id
if (urlParams["ids"] == null) {
  if (urlParams["id"] == null) {
    if (urlParams["wd"] == null) {
      if (t != "") {
        document.getElementById('msg').src = "images/loading_eng.gif";
        var urlField = urlAPI + '&t=' + t + '&pg=' + pg;
        var j = doCORSRequest({ method: 'GET', url: urlField, }, function printResult(result) { outputField.value = result; })
      }
    } else {
      var keyword = Simplized(urlParams["wd"])  // 繁轉簡
      var urlField = urlAPI + '&wd=' + keyword;
      // console.log(urlField);
      // var j = doCORSRequest({ method: 'GET', url: urlField, }, function printResult(result) { outputField.value = result; })
      var j = doCORSSearch({ method: 'GET', wd: keyword, s: 'haiwaikan' }, function printResult(result) { outputField.value = result; })
      var j = doCORSSearch({ method: 'GET', wd: keyword, s: 'guangsu' }, function printResult(result) { outputField.value = result; })
      var j = doCORSSearch({ method: 'GET', wd: keyword, s: 'xinlang' }, function printResult(result) { outputField.value = result; })
      // var j = doCORSSearch({ method: 'GET', wd: keyword, s:'bdzy'}, function printResult(result) { outputField.value = result; })
      var j = doCORSSearch({ method: 'GET', wd: keyword, s: '1080zyku' }, function printResult(result) { outputField.value = result; })
      var j = doCORSSearch({ method: 'GET', wd: keyword, s: 'hongniuzy2' }, function printResult(result) { outputField.value = result; })
      var j = doCORSSearch({ method: 'GET', wd: keyword, s: 'lzi' }, function printResult(result) { outputField.value = result; })
      var j = doCORSSearch({ method: 'GET', wd: keyword, s: 'ikun' }, function printResult(result) { outputField.value = result; })
      var j = doCORSSearch({ method: 'GET', wd: keyword, s: 'sdzy' }, function printResult(result) { outputField.value = result; })
    }
  } else {
    var id = urlParams["id"];
    var urlField = urlAPI + '&ids=' + id;
    var j = doCORSRequestById({ method: 'GET', url: urlField, }, function printResult(result) { outputField.value = result; })
  }
} else {
  if (urlParams["ids"] == 'clear') {
    console.log(urlParams["ids"]);
    document.cookie = s + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    console.log(document.cookie);
  } else {
    var id = getCookieByName(s);
    var urlField = urlAPI + '&ids=' + id;
    var j = doCORSRequest({ method: 'GET', url: urlField, }, function printResult(result) { outputField.value = result; })
  }
}


