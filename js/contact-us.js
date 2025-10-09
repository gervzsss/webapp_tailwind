const $contactForm = $("#contact-form");
if ($contactForm.length) {
  console.log("✅ Contact form detected");

  // Toast container
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
      $toast.removeClass('opacity-0 -translate-y-2').addClass('opacity-100 translate-y-0');
    });
    setTimeout(() => {
      $toast.addClass('opacity-0 -translate-y-2');
      setTimeout(() => $toast.remove(), 300);
    }, 3000);
  }

  function setFieldError($field, message) {
    const id = $field.attr('id');
    const $err = $('.contact-error[data-error-for="' + id + '"]');
    if (message) {
      $err.text(message).removeClass('hidden');
      $field.addClass('border-red-400 focus:border-red-400 focus:ring-red-400');
    } else {
      $err.text('').addClass('hidden');
      $field.removeClass('border-red-400 focus:border-red-400 focus:ring-red-400');
    }
  }

  const nameRegex = /^[A-Za-z\s.\-']+$/;
  const emailRegex = /^[A-Za-z0-9._\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;

  function validateName() {
    const $f = $('#contact-name');
    const v = $.trim($f.val());
    if (!v) { setFieldError($f, 'Name is Required.'); return false; }
    if (!nameRegex.test(v)) { setFieldError($f, 'Please enter a valid name.'); return false; }
    setFieldError($f, null); return true;
  }
  function validateEmail() {
    const $f = $('#contact-email');
    const v = $.trim($f.val());
    if (!v) { setFieldError($f, 'Email is Required.'); return false; }
    if (!emailRegex.test(v)) { setFieldError($f, 'Please enter a valid email address.'); return false; }
    setFieldError($f, null); return true;
  }
  function validateMessage() {
    const $f = $('#contact-message');
    const v = $.trim($f.val());
    if (!v) { setFieldError($f, 'Message is required.'); return false; }
    setFieldError($f, null); return true;
  }

  // real-time / blur validation
  $(document).on('blur input', '#contact-name', function () { validateName(); });
  $(document).on('blur input', '#contact-email', function () { validateEmail(); });
  $(document).on('blur input', '#contact-message', function () { validateMessage(); });

  $contactForm.on('submit', function (e) {
    e.preventDefault();
    const ok = validateName() & validateEmail() & validateMessage();
    if (!ok) return;
    showToast('Message submitted successfully!');
    $('#contact-name, #contact-email, #contact-subject, #contact-message').val('');
  });
}