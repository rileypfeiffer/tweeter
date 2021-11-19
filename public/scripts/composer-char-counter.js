$(document).ready(function() {
  $(".placeholder").on("input", function() {
    let character = $(this).val().length;
    const parent = $(this).parent();
    let counter = $(parent).children().children("output").eq(0)["0"];
    counter.innerHTML = 140 - character;

    if (counter.innerHTML < 0) {
      counter.style.color = "#FF0000";
    }
    if (counter.innerHTML >= 0) {
      counter.style.color = "#545149";
    }
  });
});
