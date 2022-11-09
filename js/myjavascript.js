function vip() {
    var keyword = document.getElementById("keyword").value;
    var ss = Simplized(keyword);
    location.href = 'https://z1.m1907.cn/?jx=' + ss;
}
function logout() {
    location.href = '/logout';
}
function copy_to_clipboard(id) {
    var copyText = document.getElementById(id);
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(copyText.value);
    alert("Copied the text: " + copyText.value);
}
