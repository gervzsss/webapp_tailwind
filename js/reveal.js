$(function () {
  const $headers = $("header").filter(function () {
    const $h = $(this);
    if ($h.is("[data-hero]")) return true;
    if ($h.hasClass("hero") || $h.hasClass("hero-section")) return true;
    if ($h.find(".animate-glow").length) return true;
    return false;
  });

  if (!$headers.length) return;

  let $nodes = $();
  $headers.each(function () {
    const $h = $(this);
    const $targets = $h
      .find("h1.animate-glow, h2.animate-glow, .animate-glow, h1, h2, p")
      .filter(":visible");
    $nodes = $nodes.add($targets);
  });

  if (!$nodes.length) return;

  $nodes.css({
    opacity: 0,
    transform: "translateY(8px)",
  });

  $nodes.each(function (i) {
    const $el = $(this);
    setTimeout(
      function () {
        $el.css({
          transition:
            "opacity .5s cubic-bezier(.2,.8,.2,1), transform .5s cubic-bezier(.2,.8,.2,1)",
          opacity: 1,
          transform: "translateY(0)",
        });
      },
      120 + i * 110,
    );
  });
});
