/*team creation*/

$('.dropdown').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropdown-menu').slideToggle(300);
    });
    $('.dropdown').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(300);
    });
    $('.dropdown .dropdown-menu li').click(function () {
        $(this).parents('.dropdown').find('span').text($(this).text());
        $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
    });



$('.dropdown-menu li').click(function () {
  var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
      msg = '<span class="msg">Game selected: ';
  $('.msg').html(msg + input + '</span>');
}); 

/* all nav bar*/
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("all").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("all").style.marginLeft= "0";
}

/*drop down menu on team app*/
(function() {

  document.querySelector('.nav-button').addEventListener('click', function() {
 
    this.parentNode.parentNode.classList.toggle('closed')
  }, false);
})();
 
/*file upload*/

 

 
function requestcheck() {
//var count =0;
  //if(count===0){
      alert("request sent");
    //  count++;
    //}else if(count>0){
//alert("exceeded number of requests sent");
 //   }
   //s console.log(count);

   
}