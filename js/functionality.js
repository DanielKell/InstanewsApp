
$(document).ready(() => {

  //Starting the JQuery and JS functions when the category is clicked
  $('#category').on('change', () => {
    $('.loader').show();
    $('.footer').css('position', 'relative');
    $('.main-body').addClass('main-body-populated');

    //Defining and setting up the url to pull data based on section chosen
    let newstype = $('#category').val();
    let url = 'https://api.nytimes.com/svc/topstories/v2/'; 
    url += newstype + '.json?' + $.param({
      'api-key': '49ff125fe406457b9390fdf0225c1a6f'
    });

    //Clearing the contents before the data is requested so it's not loaded multiple times.
    $('.news-list li').remove();

    //Begin Ajax call
    $.ajax({
      url: url,
      method: 'GET',
    })

    .done((data) => {

    /*Creating a new array that contains only the data for the first 12 items WITH images. 
    Filter creates a new array and returns only the values that satisfy the condition. We then slice to 
    contain it to the first 12 items, and instead of using data.results in the $.each function, use the new variable.*/
    let imagesTrue = data.results.filter((imagesFilter) => {
    return imagesFilter.multimedia.length > 0;
    }).slice(0,12); 

    //pulling data for each of the filtered elements and creating new data structures to hold the data in the .news-list class

  //   $.each(imagesTrue, (key, article) => {
  //   $('.news-list').append('<li>' 
  //   + '<a href="' 
  //   + article.url
  //   + '">'
  //   + '<div class="inside-wrapper">'
  //   + '<div class="article" style="background-image:url(' + article.multimedia[4].url + ')">'
  //   + '<div class="story-content">'
  //   + '<p>'
  //   + article.abstract
  //   + '</p>'
  //   + '</div>'
  //   + '</div>'
  //   + '</div>'
  //   + '</a>'
  //   + '</li>');
  // })
  
      $.each(imagesTrue, (key, article) => {
    $('.news-list').append(`<li> <a href="${article.url}"> <div class="inside-wrapper"> <div class="article" style="background-image:url(${article.multimedia[4].url})"> <div class="story-content"> <p>${article.abstract}</p></div></div></div></a></li>`);
      })
    }) //Ending .done function

    .fail((err) => {
    throw err;
    })

    .always(() => { //Hide the loader button here; show it on the onclick.
    $('.loader').hide();
    });

  }); //Ending the on change function

}); //Ending the document.ready()
