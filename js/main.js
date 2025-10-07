//hamburger
$(document).ready(function () {
  console.log("✅ jQuery navbar toggle is ready");

  $("#nav-toggle").click(function () {
    const menu = $("#nav-menu");

    // Toggle visibility with a smooth animation
    menu.slideToggle(200);

    // Toggle aria-expanded for accessibility
    const expanded = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", !expanded);

    // Optional: animate the hamburger icon into an "X"
    $(this).find("svg").toggleClass("rotate-90");
  });

  // Optional: hide menu when clicking outside (on mobile)
  $(document).click(function (e) {
    const isClickInside = $(e.target).closest("#nav-menu, #nav-toggle").length > 0;
    if (!isClickInside && window.innerWidth < 768) {
      $("#nav-menu").slideUp(200);
      $("#nav-toggle").attr("aria-expanded", "false");
    }
  });
});
