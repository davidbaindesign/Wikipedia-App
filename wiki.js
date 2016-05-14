
$( document ).ready(function() {
    

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 30;
    var w = $(window).width() - 30;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(a){
    var newq = makeNewPosition();
    var oldq = $(a).offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    if ($(a).width() === 0 || $(a).html() === "") {
    $(a).animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateDiv(a);
      
    });
    };
    
};

function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    
    var speedModifier = .1;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}

animateDiv("#answer1");
animateDiv("#answer2");
animateDiv("#answer3");
animateDiv("#answer4");
animateDiv("#answer5");
animateDiv("#answer6");
animateDiv("#answer7");
animateDiv("#answer8");



$("#input").blur(function(){
  $("#input").css("font-family","FontAwesome");
  $("#input").val('');
});
  
  

$("#input").keypress(function(e) {

  $("#input").css("font-family","Tahoma");
  
  if (e.which == 13) {

    var length = 0;
    var pages = "";

    var whatSearch = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&explaintext=1&callback=?&exlimit=max&gsrsearch=" + $('#input').val();

    $.getJSON(whatSearch, function(json) {

      // not getting anything here
      var string = JSON.stringify(json);
      
 if(string.length != 45) {
      
      var obj = {
        first: 'someVal'
      };
      obj[Object.keys(obj)[0]];

      var obj = JSON.parse(string);

      pages = obj.query.pages;

     

      obj[Object.keys(obj)[0]];

      for (var k in pages) {
        if (pages.hasOwnProperty(k)) {
          length++;
        }
      }
     
   var newWidth = 500;
   
   if ($(window).width() < 540){
     newWidth = $(window).width() * .8;
   }
     
     
      var top = 130;
      var left = $(window).width() / 2 - newWidth/2 - 18;

      $(".top").animate({
        top: "50px",
      }, 500, function() {});
      $(".bottom").animate({
        top: "50px",
      }, 500, function() {});
      
      if(length > 7){length = 8};

      for (i = 0; i < length; i++) {

        var addMe = (i + 1).toString();

        var cId = "#answer" + addMe;
        
        $(cId).stop();

        $(cId).wrap("<a target=_new href= http://en.wikipedia.org/?curid=" + pages[Object.keys(pages)[i]].pageid + "></a>");

        $(cId).html("<p><b>" + pages[Object.keys(pages)[i]].title + " </b></p><p>" + pages[Object.keys(pages)[i]].extract + "</p>");

        $(cId).animate({
          top: top,
          width: newWidth,
          height: "100px",
          borderRadius: "0px",
          borderWidth: "3px",
          left: left
          
        }, 2500, function() {});

        $(cId).hover(function() {
          $(this).css("border-left-color", "#0000ff");
        }, function() {
          $(this).css("border-left-color", "#ffffff");
        });

        top = top + 145;

      }
 }
     if (length < 8) {
        
        
        for (f = length; f < 8; f++) {
          
          var addMe = (f + 1).toString();

          var cId = "#answer" + addMe;
          
          if($(cId).width() > 0){
          
            $(cId).html("");
            
            $(cId).animate({
          
          width: 0,
          height: 0,
          
          borderRadius: 200,
          borderWidth: 0
          
        }, 200, function() {});
            //maybe parent needs gone
            $(cId).unwrap();
            
            animateDiv(cId);
            
          }
        }
        
        
      } 

      $('#input').blur();
      
    });

  };

});

});