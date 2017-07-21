
$(document).ready(function(){

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById('myDropdown').classList.toggle('show');
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName('dropdown-content');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Triggering button press for dropdown menu

  $('button').on('click', function() {
    event.preventDefault();
    myFunction();
  });




// Declaring the variable that will be changed when a button is selected
  var newstype = "home";

  $('.dropdown-content a').on('click', function(){
    // var tmp = $(this).data('name');
    newstype = $(this).prop('id');
    console.log(newstype); 

var url = 'https://api.nytimes.com/svc/topstories/v2/'; 
url += newstype + '.json?' + $.param({
  'api-key': '49ff125fe406457b9390fdf0225c1a6f'
});

//Clear the contents before the data is requested.
 $('.test-list li').remove();

$.ajax({
  url: url,
  method: 'GET',
}).done(function(data) {
    
  console.log(data);

  $.each(data.results, function(key, article) {
  $('.test-list').append('<li  a href="' + article.url +'">' 
  + '<div class="inside-wrapper">'
  // + '<img src="'
  // + article.multimedia[4].url //Switch to background image
  // + '">' 
  // + '<div>'
  + '<div class="article" style="background-image:url(' + article.multimedia[4].url + ')">'
  + '<div class="story-content">'
  + '<p>'
  + article.abstract
  + '</p>'
  + '</div>'
  + '</div>'
  + '</div>'
  + '</li>');
  // Or do something like Contents += '<li>' AND += 'Title: ' AND += 'article.abstract' etc
})

}).fail(function(err) {
  throw err;
});

  });


}); //Ending the document.ready()

//Write function that once you click the button to select the category, you empty the contents of the array: .empty();

// + result.title

// Code from example:

// ! function(a) {
//     "use strict";
//     a(function() {
//         var e, i, t, s = a(".ajax-loader"),
//             l = a(".stories");
//         a("#sections").on("change", function() {
//             var n = a(this).val();
//             n.length && (t = "http://api.nytimes.com/svc/topstories/v2/" + n + ".json?api-key=0751ffff01d7a70710354972fa0ad4a9:19:75124095", l.empty(), e = "", i = "", a(".logo img").css({
//                 height: "50%",
//                 width: "50%"
//             }), a(".site-header").css({
//                 "align-items": "flex-start",
//                 flex: "1 0 auto",
//                 height: "auto",
//                 "max-width": "600px"
//             }), a(".search-placeholder").hide(), s.css("display", "block"), a.ajax({
//                 method: "GET",
//                 url: t,
//                 dataType: "json"
//             }).done(function(t) {
//                 e = t.results;
//                 var s, n, r;
//                 if (0 !== e.length) {
//                     var o = e.filter(function(a) {
//                         return a.multimedia.length
//                     }).slice(0, 12);
//                     i += "<ul>", a.each(o, function(a, e) {
//                         r = e.multimedia[4].url, n = e["abstract"], s = e.url, i += '<li class="article-item">', i += '<a href="' + s + '" target="_blank">', i += '<div class="inner-item-wrapper">', i += '<div class="article" style="background-image:url(' + r + ')">', i += '<div class="story-meta">', i += "<p>" + (n || "This story has no description.") + "</p>", i += "</div>", i += "</div>", i += "</div>", i += "</a>", i += "</li>"
//                     }), i += "</ul>"
//                 } else i += '<p class="feedback">Sorry, nothing found! Please try again.</p>';
//                 l.hide().fadeIn("fast").append(i)
//             }).fail(function() {
//                 l.append('<p class="feedback">Sorry! There was a problem, please try again.</p>')
//             }).always(function() {
//                 s.hide()
//             }))
//         })
//     })
// }(jQuery);

