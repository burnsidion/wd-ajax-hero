(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({
        delay: 50
      }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);
      console.log($col);


      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };
  // ▼▼▼  set up event function for user input ▼▼▼
  const textInput = (event) => {
    //▼▼▼ Make sure the default refresh is deactivated ▼▼▼
    event.preventDefault()
    // ▼▼▼ Splice at first index and adding the length of the movies array ▼▼▼
    movies.splice(0, movies.length)
    // ▼▼▼ Create variable equal to the value of the input in the #search id. IE the text box. This will give the API something to search for later ▼▼▼
    let title = $("#search").val()
    //▼▼▼ Time to make a JSON request and create a function inside it which will recive data. This is where we append the Title variable we just created to the web API in the JSON request. We only want the web address up to the search input (?s=). ▼▼▼
    $.getJSON(`https://omdb-api.now.sh/?s=${title}`, function(data) {

      //▼▼▼ Now to set up a forloop to loop through all the items we get back in the movies array, it will go for the length of the data we get back ▼▼▼
      for (var i = 0; i < data.Search.length; i++) {
        //▼▼▼ We'll now tell the forloop to push each data item it finds into our movies array
        movies.push({
          id: data.Search[i].imdbID,
          poster: data.Search[i].Poster,
          title: data.Search[i].Title,
          year: data.Search[i].Year
        })

      }
      console.log(data.Search);

      renderMovies()




    })
  }
// Waiting to fire all this off until the form hears a submit with textInput
  $("form").submit(textInput);


})();
