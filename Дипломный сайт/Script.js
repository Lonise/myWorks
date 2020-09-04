function showNews1()
{
     let infoNews  = getComputedStyle(document.querySelector('.newsInfo1'));
      ((infoNews.display) =='none') ? ( document.querySelector('.newsInfo1').style.display = 'block') : ( document.querySelector('.newsInfo1').style.display = 'none')
}
function showNews2()
{
     let infoNews  = getComputedStyle(document.querySelector('.newsInfo2'));
      ((infoNews.display) =='none') ? ( document.querySelector('.newsInfo2').style.display = 'block') : ( document.querySelector('.newsInfo2').style.display = 'none')
}

function ratingClick() {
     let information  = getComputedStyle(document.querySelector('.ratingInfo'));
      ((information.display) =='none') ? ( document.querySelector('.ratingInfo').style.display = 'block') : ( document.querySelector('.ratingInfo').style.display = 'none')

}
function ratingPart() {
     let information  = getComputedStyle(document.querySelector('.ratingPart'));
      ((information.display) =='none') ? ( document.querySelector('.ratingPart').style.display = 'block') : ( document.querySelector('.ratingPart').style.display = 'none')

}
function ratingUp() {
     let information  = getComputedStyle(document.querySelector('.ratingUp'));
      ((information.display) =='none') ? ( document.querySelector('.ratingUp').style.display = 'block') : ( document.querySelector('.ratingUp').style.display = 'none')

}
function ratingFor() {
     let information  = getComputedStyle(document.querySelector('.ratingFor'));
      ((information.display) =='none') ? ( document.querySelector('.ratingFor').style.display = 'block') : ( document.querySelector('.ratingFor').style.display = 'none')

}

function upRatingPopup(){
     document.querySelector('.popup').style.display = 'block';
     document.querySelector('.imgArrowUP').style.display = 'none';
}
function closePopup() {
     document.querySelector('.popup').style.display = 'none';
     document.querySelector('.imgArrowUP').style.display = 'block';
   }
/*function openLections1() {
          let information  = getComputedStyle(document.querySelector('.data-base'));
           ((information.display) =='none') ? ( document.querySelector('.data-base').style.display = 'block') : ( document.querySelector('.data-base').style.display = 'none')

}
function openLections2() {
     let information  = getComputedStyle(document.querySelector('.form-creation'));
      ((information.display) =='none') ? ( document.querySelector('.form-creation').style.display = 'block') : ( document.querySelector('.form-creation').style.display = 'none')

}
function openLections3() {
     let information  = getComputedStyle(document.querySelector('.create-queries'));
      ((information.display) =='none') ? ( document.querySelector('.create-queries').style.display = 'block') : ( document.querySelector('.create-queries').style.display = 'none')

}
function openLections4() {
     let information  = getComputedStyle(document.querySelector('.creating-media-objects'));
      ((information.display) =='none') ? ( document.querySelector('.creating-media-objects').style.display = 'block') : ( document.querySelector('.creating-media-objects').style.display = 'none')

}
function openLections5() {
     let information  = getComputedStyle(document.querySelector('.computer-presentations'));
      ((information.display) =='none') ? ( document.querySelector('.computer-presentations').style.display = 'block') : ( document.querySelector('.computer-presentations').style.display = 'none')

}*/

