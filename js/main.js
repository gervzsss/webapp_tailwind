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

    function ensureToastContainer() {
      let $c = $("#toast-container");
      if (!$c.length) {
        $c = $('<div id="toast-container" class="fixed top-4 right-4 z-50 flex flex-col gap-3"></div>');
        $("body").append($c);
      }
      return $c;
    }
    function showToast(message) {
      if (typeof window.showToast === 'function') return window.showToast(message);
      const $c = ensureToastContainer();
      const $toast = $('<div class="pointer-events-auto select-none rounded-md bg-amber-600 px-4 py-3 text-sm font-medium text-white shadow-lg ring-1 ring-amber-500/50 opacity-0 -translate-y-2 transition duration-300"></div>').text(message);
      $c.append($toast);
      requestAnimationFrame(() => {
        $toast.removeClass('opacity-0 -translate-y-2').addClass('opacity-100 translate-y-0');
      });
      setTimeout(() => {
        $toast.addClass('opacity-0 -translate-y-2');
        setTimeout(() => $toast.remove(), 300);
      }, 2800);
    }

    // --- validation Regex ---
    const nameRegex = /^[A-Za-z\s.\-']+$/;
    const emailRegex = /^[A-Za-z0-9._\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^\+?\d+$/;

    function setFieldError($field, message) {
      const id = $field.attr('id');
      const $err = $('[data-error-for="' + id + '"]');
      if (message) {
        $err.text(message).removeClass('hidden');
        $field.addClass('border-red-400 focus:border-red-400 focus:ring-red-400');
      } else {
        $err.text('').addClass('hidden');
        $field.removeClass('border-red-400 focus:border-red-400 focus:ring-red-400');
      }
    }

    // --- field validators ---
    function validateLoginEmail() {
      const $f = $('#login-email');
      const v = $.trim($f.val());
      if (!v) return setFieldError($f, 'Email is required.'), false;
      if (!emailRegex.test(v)) return setFieldError($f, 'Enter a valid email.'), false;
      setFieldError($f, null); return true;
    }
    function validateLoginPassword() {
      const $f = $('#login-password');
      const v = $.trim($f.val());
      if (!v) return setFieldError($f, 'Password is required.'), false;
      if (v.length < 6) return setFieldError($f, 'Minimum 6 characters.'), false;
      setFieldError($f, null); return true;
    }

    function validateFirst() {
      const $f = $('#reg-first'); const v = $.trim($f.val());
      if (!v) return setFieldError($f, 'First name required.'), false;
      if (!nameRegex.test(v)) return setFieldError($f, 'Invalid characters.'), false;
      setFieldError($f, null); return true;
    }
    function validateLast() {
      const $f = $('#reg-last'); const v = $.trim($f.val());
      if (!v) return setFieldError($f, 'Last name required.'), false;
      if (!nameRegex.test(v)) return setFieldError($f, 'Invalid characters.'), false;
      setFieldError($f, null); return true;
    }
    function validateAddress() {
      const $f = $('#reg-address'); const v = $.trim($f.val());
      if (!v) return setFieldError($f, 'Address required.'), false;
      setFieldError($f, null); return true;
    }
    function validateEmail() {
      const $f = $('#reg-email'); const v = $.trim($f.val());
      if (!v) return setFieldError($f, 'Email required.'), false;
      if (!emailRegex.test(v)) return setFieldError($f, 'Enter a valid email.'), false;
      setFieldError($f, null); return true;
    }
    function validatePhone() {
      const $f = $('#reg-phone'); const v = $.trim($f.val());
      if (!v) return setFieldError($f, 'Contact number required.'), false;
      if (!phoneRegex.test(v)) return setFieldError($f, 'Digits only (optional +).'), false;
      setFieldError($f, null); return true;
    }
    function validatePass() {
      const $f = $('#reg-pass'); const v = $.trim($f.val());
      if (!v) return setFieldError($f, 'Password required.'), false;
      if (v.length < 6) return setFieldError($f, 'Minimum 6 characters.'), false;
      setFieldError($f, null); validatePassConfirm(); return true;
    }
    function validatePassConfirm() {
      const $f = $('#reg-pass-confirm'); const v = $.trim($f.val());
      const p = $.trim($('#reg-pass').val());
      if (!v) return setFieldError($f, 'Please confirm password.'), false;
      if (v !== p) return setFieldError($f, 'Passwords do not match.'), false;
      setFieldError($f, null); return true;
    }

    // --- animations ---
    function animateIn($m) {
      $m.show();
      requestAnimationFrame(() => {
        $m.removeClass('opacity-0 scale-95').addClass('opacity-100 scale-100');
      });
    }
    function animateOut($m) {
      $m.addClass('opacity-0 scale-95').removeClass('opacity-100 scale-100');
      setTimeout(() => { $m.hide(); }, 180);
    }

    function openModal(modalId) {
      const $overlay = $('#modal-overlay');
      $overlay.removeClass('hidden');
      $overlay.css('display', 'flex');
      $('.modal-panel').each(function () { $(this).hide(); });
      const $m = $(modalId);
      $m.addClass('opacity-0 scale-95');
      animateIn($m);
      $m.find('input').first().focus();
    }

    function closeModals() {
      const $overlay = $('#modal-overlay');
      $('.modal-panel:visible').each(function () { animateOut($(this)); });
      setTimeout(() => { $overlay.addClass('hidden').hide(); }, 200);
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

    // close on overlay click (outside panel)
    // $(document).on('mousedown', function (e) {
    //   const $o = $('#modal-overlay');
    //   if ($o.is(':visible') && $o[0] === e.target) {
    //     closeModals();
    //   }
    // });

    // close on escape
    $(document).on('keydown', function (e) {
      if (e.key === 'Escape') closeModals();
    });

    // focus
    // $(document).on('input blur', '#login-email', validateLoginEmail);
    // $(document).on('input blur', '#login-password', validateLoginPassword);

    // $(document).on('input blur', '#reg-first', validateFirst);
    // $(document).on('input blur', '#reg-last', validateLast);
    // $(document).on('input blur', '#reg-address', validateAddress);
    // $(document).on('input blur', '#reg-email', validateEmail);
    // $(document).on('input blur', '#reg-phone', validatePhone);
    // $(document).on('input blur', '#reg-pass', validatePass);
    // $(document).on('input blur', '#reg-pass-confirm', validatePassConfirm());

    // form submissions
    $(document).on('submit', '#login-form', function (e) {
      e.preventDefault();
      const ok = validateLoginEmail() & validateLoginPassword();
      if (!ok) return;
      closeModals();
      showToast('Logged in successfully!');
      $('#login-email, #login-password').val('');
    });

    $(document).on('submit', '#signup-form', function (e) {
      e.preventDefault();
      const ok = validateFirst() & validateLast() & validateAddress() & validateEmail() & validatePhone() & validatePass() & validatePassConfirm();
      if (!ok) return;
      closeModals();
      showToast('Account created successfully!');
      $('#reg-first, #reg-last, #reg-address, #reg-email, #reg-phone, #reg-pass, #reg-pass-confirm').val('');
    });
  }
});
