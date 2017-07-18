// /* When the user clicks on the button, 
// toggle between hiding and showing the dropdown content */
// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
// }

// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {

//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }

var category = "world"; //Replace "world" with the category selected in the button
var url = "https://api.nytimes.com/svc/topstories/v2/"; 
url += category + '.json?' + $.param({
  'api-key': "49ff125fe406457b9390fdf0225c1a6f"
});

$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
  $.each(result.results, function(key, result) {
  $(".test-list").append("<li>" + "Title: " + result.abstract + " Pic: " + "<br></br>" + "<img src='" + result.multimedia[3].url + "'>" + "</li>");
})

}).fail(function(err) {
  throw err;
});

// + result.title