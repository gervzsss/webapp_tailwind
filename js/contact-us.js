const $contactForm = $("#contact-form");
if ($contactForm.length) {
  // --- toast ---
  function ensureToastContainer() {
    let $c = $("#toast-container");
    if (!$c.length) {
      $c = $('<div id="toast-container" class="fixed top-4 right-4 z-50 flex flex-col gap-3"></div>');
      $("body").append($c);
    }
    return $c;
  }

  function showToast(message) {
    const $c = ensureToastContainer();
    const $toast = $('<div class="pointer-events-auto select-none rounded-md bg-amber-600 px-4 py-3 text-sm font-medium text-white shadow-lg ring-1 ring-amber-500/50 opacity-0 -translate-y-2 transition duration-300"></div>').text(message);
    $c.append($toast);
    requestAnimationFrame(() => {
      $toast.removeClass("opacity-0 -translate-y-2").addClass("opacity-100 translate-y-0");
    });
    setTimeout(() => {
      $toast.addClass("opacity-0 -translate-y-2");
      setTimeout(() => $toast.remove(), 300);
    }, 3000);
  }

  // --- field error display ---
  function setFieldError($field, message) {
    const id = $field.attr("id");
    const $err = $('.contact-error[data-error-for="' + id + '"]');
    if (message) {
      $err.text(message).removeClass("hidden");
      $field.addClass("border-red-400 focus:border-red-400 focus:ring-red-400");
    } else {
      $err.text("").addClass("hidden");
      $field.removeClass("border-red-400 focus:border-red-400 focus:ring-red-400");
    }
  }

  // --- regex ---
  const nameRegex = /^[A-Za-z\s.\-']+$/;
  const emailRegex = /^[A-Za-z0-9._\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;

  function validateName() {
    const $f = $("#contact-name");
    const v = $.trim($f.val());
    if (!v) return "Name is required.";
    if (!nameRegex.test(v)) return "Please enter a valid name.";
    return null;
  }

  function validateEmail() {
    const $f = $("#contact-email");
    const v = $.trim($f.val());
    if (!v) return "Email is required.";
    if (!emailRegex.test(v)) return "Please enter a valid email address.";
    return null;
  }

  function validateMessage() {
    const $f = $("#contact-message");
    const v = $.trim($f.val());
    if (!v) return "Message is required.";
    return null;
  }

  const validators = {
    "contact-name": validateName,
    "contact-email": validateEmail,
    "contact-message": validateMessage,
  };

  let formSubmitted = false;
  const fieldInteraction = {};

  // realtime validation
  $(document).on("input", "#contact-name, #contact-email, #contact-message", function () {
    const id = $(this).attr("id");
    fieldInteraction[id] = true;
    const error = validators[id]();
    setFieldError($(this), error);
  });

  // blur will not trigger until form submission
  $(document).on("blur", "#contact-name, #contact-email, #contact-message", function () {
    const id = $(this).attr("id");
    if (formSubmitted) {
      const error = validators[id]();
      setFieldError($(this), error);
    } else {
      if (fieldInteraction[id]) {
        const error = validators[id]();
        setFieldError($(this), error);
      }
    }
  });

  // --- enter does not submit the form ---
  $contactForm.on("keydown", "input, textarea", function (e) {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      return false;
    }
  });

  // --- form submission ---
  $contactForm.on("submit", function (e) {
    e.preventDefault();
    formSubmitted = true;

    let allValid = true;
    for (const id in validators) {
      const $field = $("#" + id);
      const error = validators[id]();
      setFieldError($field, error);
      if (error) allValid = false;
    }

    if (!allValid) return;
    showToast("Message submitted successfully!");
    $("#contact-name, #contact-email, #contact-subject, #contact-message").val("");
    $(".contact-error").text("").addClass("hidden");
    $("input, textarea").removeClass("border-red-400 focus:border-red-400 focus:ring-red-400");

    formSubmitted = false;
    for (const key in fieldInteraction) fieldInteraction[key] = false;
  });
}
