/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Creates and loads tweets
$(document).ready(function() {
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      let newTweet = createTweetElement(tweet);
      $('.tweets').prepend(newTweet);
    }
  };
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: 'json',
      success: function(res) {
        $(".tweets").html("");
        renderTweets(res);
      }
    });
  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  

  const createTweetElement = function(tweets) {
    const date = timeago.format(tweets.created_at);
    const article = '<article class="tweet">';
    const header = `<header class="tweetHeader"><span class="name"><i class="fas fa-smile-beam paddingRight"></i>${escape(tweets.user.name)}</span><span class="handle">${escape(tweets.user.handle)}</span></header>`;
    const body = `<div class="content"><span>${escape(tweets.content.text)}</span></div>`;
    const footer = `<footer class="tweetFooter"><div class="underline"><span class="time paddingTop">${date}</span><span class="buttons paddingTop"><i class="fas fa-flag flag"></i><i class="fas fa-retweet retweet"></i><i class="fas fa-heart favourite"></i></span></div></footer>`;
    const $tweet = $(`${article}${header}${body}${footer}</article>`);
    return $tweet;
  };

  // Submits tweet if it is 140 characters or less, uses ajax to render the tweet without a page refresh/reload
  $("#form-submit-tweet").submit(function(event) {
    const formData = $(this).serialize();
    const tweetTextLength = $("#tweet-text").val().length;
    event.preventDefault();
    $("#error").slideUp("fast");
    if (tweetTextLength <= 140 && tweetTextLength > 0) {
      $.ajax('/tweets/', {
        method: 'POST',
        data: formData
      })
        .then(function() {
          loadTweets();
          $('#form-submit-tweet').trigger("reset");
          $('.counter').val("140");
        });
    // if tweet is longer than 140 characters or blank, appropriate error displays
    } else if (tweetTextLength > 140) {
      $("#error").html("<p>Tweet too long!</p>").slideDown("slow");
    } else if (tweetTextLength === 0) {
      $("#error").html("<p>Tweet is empty! Try entering some text.</p>").slideDown("slow");
    }
  });

  loadTweets();
});

