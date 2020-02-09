'use strict';
let actionButtonsDiv = document.getElementsByClassName('fixed-action-btn')

if(actionButtonsDiv.length > 0) {
  actionButtonsDiv[0].innerHTML += `<a id="save-all-button" onclick="addAllToWardrobe()" class="btn-floating btn-large waves-effect waves-light scale-transition" style="margin:5px;">
                                                                                    <i id="save-button-text" class="material-icons">done_all</i>
                                                                                </a>`
}
const altSheet = Array.from(document.head.getElementsByTagName('link')).filter( x => x.rel==='alternate stylesheet')

if(altSheet.length > 0){
  chrome.storage.local.set({['darkMode']: altSheet.length > 0 && !altSheet[0].disabled}, function(){})
}
else{
chrome.storage.local.get(['darkMode'], function(res){
  if(res.darkMode){
    const cssPath="https://ln.nikkis.info/css/alternate.css"
    let l = document.createElement('link'); l.rel = 'stylesheet'; l.href = cssPath;
    let h = document.getElementsByTagName('head')[0]; h.appendChild(l)
  }
})
}

let script = document.createElement('script')
script.textContent = `
function addAllToWardrobe() {
  const wardrobeItems = $('.collection-item.witem'), suitItems = $('.collection-item.sitem'), state = wardrobeItems.not('.have-witem').length <= 0
  wardrobeItems.each((i, x)=>{
    selectActions.push((state ? '-' : '+') + $(x).attr('wid'))
  })
    state ? wardrobeItems.removeClass("have-witem") : wardrobeItems.addClass("have-witem")
    state ? suitItems.removeClass("have-sitem") : suitItems.addClass("have-sitem")
  saveSelectMode()
}
`;

(document.body || document.documentElement).appendChild(script)

