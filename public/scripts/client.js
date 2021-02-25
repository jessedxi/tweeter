/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//prevents scripts inject via form
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// generates new tweet article based on form input
const createTweetElement = function(tweetObj) {
  const momentDate = moment(tweetObj.created_at).fromNow();
  const article = `<article>
        <header>
          <span class="name"><img src=${tweetObj.user.avatars}></img>${tweetObj.user.name}</span>
          <span class="username">${tweetObj.user.handle} </span>
        </header>
        <p>${escape(tweetObj.content.text)}</p>
        <footer>
          <span class="days">${momentDate}</span>
          <span class="buttons">⚐ 🔄 ❤︎ </span>
        </footer>
      </article>`;

  return article;
};

//clears form and resets counter
const resetForm = function() {
  $('#tweet-text').val("");
  $('.counter').text('140');
};

//loads tweet data into designated container
const renderTweets = function(tweets) {
  $.each(tweets, (index, tweetObj) => {
    $('#tweets-container').append(createTweetElement(tweetObj));
  });
};


$(document).ready(function() {

  //handles form input, calling functions to load tweets on page and validates input form before processing.
  $('#tweet-form').on('submit', function(event) {
    const $parentSection = $(event.target).closest('section');
    const $counter = $parentSection.find('.counter');
    const $textBox = $parentSection.find('#tweet-text');
    
    event.preventDefault();

    if ($counter.val() < 0) {
      $("#error-box-1").slideDown();
      return;
    } else if ($textBox.val() === "" || !$textBox.val().trim().length) {
      $("#error-box-2").slideDown();
      return;
    } else {

      $("#error-box-1").slideUp();
      $("#error-box-2").slideUp();

      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      })
        .done((data) => {
          resetForm();
          $('#tweets-container').empty();
          loadTweets();
        })
        .fail((err) => {
          console.log('Error did not work');
        });
    }
  });

  //loads tweet data onto page
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
      .done((data) =>{
        renderTweets(data.reverse());
      });
  };
  
  

  loadTweets();
});

