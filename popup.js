$(function() {
  $('#select').change(function() {
    // console.log($('#select').val());
    $('#bookmarks').empty();
    dumpBookmarks($('#select').val());
 });
 $('#button').click(function(){
    console.log("click");
    $('#msg').html("wait");
    chrome.bookmarks.getTree(
      function(bookmarkTreeNodes) {
        transToHttps(bookmarkTreeNodes);
      });
    $('#bookmarks').empty();
    dumpBookmarks("http");
    $('#msg').html("ok");
 });
});
// Traverse the bookmark tree, and print the folder and nodes.
function dumpBookmarks(query) {
  chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {
      $('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
    });
}
function dumpTreeNodes(bookmarkNodes, query) {
  var list = $('<ul>');
  var i;
  for (i = 0; i < bookmarkNodes.length; i++) {
    list.append(dumpNode(bookmarkNodes[i], query));
  }
  return list;
}
function dumpNode(bookmarkNode, query) {
  var flag=-1;
  if(query == "http") flag=0;
  else flag=-1;
  if (bookmarkNode.title) {
    if (query && !bookmarkNode.children) {
      if (String(bookmarkNode.url).indexOf("https") == flag) {
        return $('<span></span>');
      }
    }
    var anchor = $('<a>');
    anchor.attr('href', bookmarkNode.url);
    anchor.text(bookmarkNode.title);
    /*
     * When clicking on a bookmark in the extension, a new tab is fired with
     * the bookmark url.
     */
    anchor.click(function() {
      chrome.tabs.create({url: bookmarkNode.url});
    });
    var span = $('<span>');
    span.append(anchor);
  }
  var li = $(bookmarkNode.title ? '<li>' : '<div>').append(span);
  if (bookmarkNode.children && bookmarkNode.children.length > 0) {
    li.append(dumpTreeNodes(bookmarkNode.children, query));
  }
  return li;
}
function transToHttps(bookmarkNodes){
  var i;
  // console.log(bookmarkNodes.length);
  for(i=0;i<bookmarkNodes.length;++i){
    if(bookmarkNodes[i].url && String(bookmarkNodes[i].url).indexOf("https") == -1){
      console.log(bookmarkNodes[i].title);
      var url=String(bookmarkNodes[i].url).replace("http","https");
      console.log(url);
      urlExists(bookmarkNodes[i], function(exists, bookmarkNode){
        if(exists){
          console.log(bookmarkNode.url);
          chrome.bookmarks.update(String(bookmarkNode.id), {
            url: String(bookmarkNode.url).replace("http","https")
          });
        }
        else{
          console.log("no");
        }
      });
    }
    if (bookmarkNodes[i].children && bookmarkNodes[i].children.length > 0) {
      transToHttps(bookmarkNodes[i].children);
    }
  }
}
function urlExists(bookmarkNode, callback){
  var url=String(bookmarkNode.url).replace("http","https");
  $.ajax({
    type: 'HEAD',
    url: url,
    success: function(){
      callback(true, bookmarkNode);
    },
    error: function() {
      callback(false, bookmarkNode);
    }
  });
}
document.addEventListener('DOMContentLoaded', function () {//popup被打開就執行
  dumpBookmarks("http");
});
