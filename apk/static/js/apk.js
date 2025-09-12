var apklist = [
    {title:'TVbox_2.3.7.apk',source:'../apk/static/apk/TVbox_2.3.7.apk',icon:'../apk/static/images/icon/TVbox.png'},
    {title:'FreeDTV_1.2.3.apk',source:'../apk/static/apk/FreeDTV_1.2.1.apk',icon:'../apk/static/images/icon/FreeDTV_1.2.1.png'},
    {title:'orionTV.1.3.6.apk',source:'../apk/static/apk/orionTV.1.3.6.apk',icon:'../apk/static/images/icon/OrionTV.png'},
    {title:'KTV_80.3.0.apk',source:'../apk/static/apk/KTV_80.3.0.apk',icon:'../apk/static/images/icon/KTV.png'},
    {title:'WebViewTV_1.13.3.apk',source:'../apk/static/apk/WebViewTV_1.13.3.apk',icon:'../apk/static/images/icon/WebViewTV.png'},
    {title:'MXPlayer_Pro_v1.42.apk',source:'https://www.gdaily.org/4/mx-player-pro-apk-ac3',icon:'../apk/static/images/icon/MXPlayer_Pro_v1.42.png'},
    {title:'沙發管家國際版.apk',source:'http://www.shafa.com/',icon:'../apk/static/images/icon/沙發管家國際版.png'},
    {title:'當貝市場.apk',source:'https://apps.dangbei.net/update/2024-05-08/dangbeimarket_5.0.5_310_znds.apk',icon:'../apk/static/images/icon/當貝市場.png'},
    {title:'艾蒙頓市場.apk',source:'https://app.emotn.com/',icon:'../apk/static/images/icon/艾蒙頓市場.png'},
    {title:'AptoideTV-5.1.2.apk',source:'https://tv.aptoide.com/howtoinstall.html',icon:'../apk/static/images/icon/AptoideTV-5.1.2.png'},
    {title:'當貝投屏.apk',source:'https://webapk.dangbei.net/down/20230509/dbtp_2.5.6_dangbei.apk',icon:'../apk/static/images/icon/當貝投屏.png'},
    {title:'FileManager.apk',source:'https://www.apkmonk.com/download-app/com.alphainventor.filemanager/7_com.alphainventor.filemanager_2022-12-18.apk/',icon:'./static/images/icon/FileManager.png'},
    {title:'SmartTubeNext_14.60.apk',source:'https://www.gdaily.org/25078/smart-tube-next-apk',icon:'../apk/static/images/icon/SmartTubeNext_14.60.png'},
    {title:'ZeroTierOne.apk',source:'https://apkpure.com/tw/zerotier-one/com.zerotier.one/download',icon:'../apk/static/images/icon/ZeroTierOne.png'},
    {title:'Remotemouse.apk',source:'https://apkpure.com/tw/remote-mouse/com.hungrybolo.remotemouseandroid/download',icon:'../apk/static/images/icon/Remotemouse.png'},
    {title:'CrazyKTV.remote.control.apk',source:'https://apkpure.com/tw/crazyktv-remote-control/com.crazyktv.wcf.android/download',icon:'../apk/static/images/icon/CrazyKTV.remote.control_v2.1.2.png'},
    {title:'LiTV',source:'https://release.svc.litv.tv/sarma/LiTV.App/LTWEB00LTV/pkgs/p-Home-pub-release_31202LTV20250825153445.apk',icon:'../apk/static/images/icon/LiTV.3.10.15.png'},
    {title:'4gTV',source:'https://apkpure.com/tw/%E9%9B%BB%E8%A6%96%E7%89%88%E5%9B%9B%E5%AD%A3%E7%B7%9A%E4%B8%8A-4gtv/tv.fourgtv.video/download',icon:'../apk/static/images/icon/4gTV.1.3.1.png'},
    {title:'',source:'',icon:''},
];


let htmlString = '<ul>';

for (let apk of apklist) {
    var title = apk.title;
    var source = apk.source;
    var icon = apk.icon;

    htmlString += '<li class="col-lg-10 col-md-8 col-sm-5 col-xs-3">';
    htmlString += '<div class="myui-vodlist__box">';
    htmlString += '<a class="myui-vodlist__thumb lazyload" href="' + source + '" ';
    htmlString += 'title="' + title + '" ';
    htmlString += 'data-original="' + icon + '" ';
    htmlString += 'style="background-image: url(' + icon + ')">';

    // htmlString += '<span class="play hidden-xs"></span>';
    // if (quality != '1') {
    // htmlString += '<span class="pic-tag pic-tag-top" style="background-color: #5bb7fe;">' + quality + '</span>';
    // }
    // htmlString += '<span class="pic-tag pic-tag-right">' + remarks + '</span>';
    // htmlString += '<span class="pic-text text-right">' + year + '</span>';
    // htmlString += '<span class="pic-text text-left">' + type_name + '</span>';

    htmlString += '</a>';
    htmlString += '</div>';
    htmlString += '<div class="myui-vodlist__detail">';
    htmlString += '<h4 class="title text-overflow"><a href="' + source + '">' + title + '</a></h4>';
    htmlString += '</div>';
    htmlString += '</li>';
}

htmlString += '</ul>';

document.getElementById('apklist').innerHTML = htmlString;