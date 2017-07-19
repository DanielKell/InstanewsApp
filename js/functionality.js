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

//Don't forget document.ready()!

var category = "world"; //Replace "world" with the category selected in the button
var url = "https://api.nytimes.com/svc/topstories/v2/"; 
url += category + '.json?' + $.param({
  'api-key': "49ff125fe406457b9390fdf0225c1a6f"
});

//Write function that once you click the button to select the category, you empty the contents of the array: .empty();

$.ajax({
  url: url,
  method: 'GET',
}).done(function(data) {
    
  console.log(data);
  $.each(data.results, function(key, article) {
  $(".test-list").append("<li>" 
  + "Title: " 
  + article.abstract 
  + " Pic: " 
  + "<br></br>" 
  + "<img src='" 
  + article.multimedia[3].url 
  + "'>" 
  + "</li>");
  // Or do something like Contents += "<li>" AND += "Title: " AND += "article.abstract" etc
})

}).fail(function(err) {
  throw err;
});

// + result.title