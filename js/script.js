$(document).ready(function() {
  $('#select-options').on('change', function() {
    const section = $(this).val();
    event.preventDefault();

    let url = 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json';
    url +=
      '?' +
      $.param({
        'api-key': '3a9427a58f294ca2aa06700253bbca28'
      });

    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'JSON'
    })
    .done(function(data) {
      $('.results').empty();

      let filteredData = data.results.filter(function(info) {
        return info.multimedia.length;
      });
      filteredData = filteredData.slice(0, 12);
      $.each(filteredData, function(index, value) {
        $('.results')
          .append(
            `<article style="background: url(${
              value.multimedia[4].url
            }) no-repeat center; background-size: cover;"><p class="abstract">${
              value.abstract
            }</p></article>`
          )
      });
    });
          .fail(function() {
            $('.results').empty();
            $('.results').append(
              '<p>Apologies, this page is not loading...</p>'
            );
          });
    
  });
});
