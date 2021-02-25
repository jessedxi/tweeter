// handles character counter for tweet form

$(document).ready(function() {
  $('#tweet-text').on('input', function(event) {
    
    const $parentSection = $(event.target).closest('section');
    const $counter = $parentSection.find('.counter');
    const charsTyped = (event.target.value.length);
    
    $counter.val(140 - charsTyped);
    if($counter.val() < 0) {
    $counter.addClass('overCount');
    } 
    if($counter.val() >= 0) {
      $counter.removeClass('overCount')
    }
  })
});