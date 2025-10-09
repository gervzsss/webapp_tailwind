$(document).ready(function () {
  console.log("✅ jQuery navbar & modal system ready");

  // loads the modal
  $.get("/components/modal.html", function (data) {
    $("body").append(data);
    initializeModalLogic();
  });

  // navbar toggle
  $("#nav-toggle").click(function () {
    const menu = $("#nav-menu");
    menu.slideToggle(200);
    const expanded = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", !expanded);
    $(this).find("svg").toggleClass("rotate-90");
  });

  // login/signup
  function initializeModalLogic() {
    console.log("✅ Modal logic initialized");

    function openModal(modalId) {
      $("#modal-overlay").show().css("display", "flex");
      $("#modal-overlay > div").hide();
      $(modalId).show().removeClass("opacity-0").addClass("opacity-100");
      $(modalId).find("input").first().focus();
    }

    function closeModals() {
      $("#modal-overlay").fadeOut(150);
      $("#modal-overlay > div").addClass("opacity-0");
      setTimeout(function () {
        $("#modal-overlay > div").hide();
      }, 200);
    }

    // open login
    $(document).on("click", "#open-login", function (e) {
      e.preventDefault();
      $("#signup-modal").hide();
      openModal("#login-modal");
    });

    // open signup
    $(document).on("click", "#open-signup", function (e) {
      e.preventDefault();
      $("#login-modal").hide();
      openModal("#signup-modal");
    });

    // close buttons
    $(document).on("click", "#close-login, #close-signup", function () {
      closeModals();
    });

    // switch login/signup
    $(document).on("click", "#switch-to-signup", function (e) {
      e.preventDefault();
      $("#login-modal").hide();
      openModal("#signup-modal");
    });

    $(document).on("click", "#switch-to-login", function (e) {
      e.preventDefault();
      $("#signup-modal").hide();
      openModal("#login-modal");
    });

    // close on Escape
    $(document).on("keydown", function (e) {
      if (e.key === "Escape") {
        closeModals();
      }
    });

    // submit demo
    $(document).on("submit", "#login-form, #signup-form", function (e) {
      e.preventDefault();
      closeModals();
      alert("Thanks — form submitted (demo)");
    });
  }
});
