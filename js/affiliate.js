/**
 * losttou.ch affiliate link loader
 * ---------------------------------
 * Every affiliate mention on the site is a plain, working link out of the
 * box (no tracking tag, so it never violates Amazon's terms while the
 * Associates application is pending). This script only ever ADDS a
 * tracking parameter -- it never changes where a link points to.
 *
 * How it works:
 *   1. Articles mark affiliate mentions like this:
 *      <a href="https://www.amazon.com/s?k=keepsake+box"
 *         class="affiliate-link" data-affiliate="keepsake-box">a keepsake box</a>
 *   2. This script fetches /_data/affiliate-links.json.
 *   3. Every entry uses the top-level "amazonTagGlobal" tag automatically.
 *      A tag is appended to the link's existing href as a `tag=` query
 *      parameter. An entry only needs its own "amazonTag" field if it
 *      should use a *different* tag (e.g. a different affiliate program).
 *   4. If no tag applies (global tag empty and no per-entry override),
 *      links are left exactly as written in the HTML -- plain,
 *      non-monetized, fully functional.
 *
 * To go live with real Amazon Associates tracking, you do NOT need to
 * touch any article HTML or any per-product entry. Just set
 * "amazonTagGlobal" once in _data/affiliate-links.json. See README.md for
 * the full walkthrough.
 */
(function () {
  function addTag(url, tag) {
    try {
      var u = new URL(url);
      u.searchParams.set('tag', tag);
      return u.toString();
    } catch (e) {
      // Fallback for odd URLs that fail URL parsing.
      var sep = url.indexOf('?') === -1 ? '?' : '&';
      return url + sep + 'tag=' + encodeURIComponent(tag);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('[data-affiliate]');
    if (!links.length) return;

    // Absolute path, so it resolves the same from / and /articles/*.
    fetch('/_data/affiliate-links.json')
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) {
        if (!data) return;
        var globalTag = data.amazonTagGlobal;
        links.forEach(function (el) {
          var key = el.getAttribute('data-affiliate');
          var entry = data[key];
          var tag = entry && (entry.amazonTag || globalTag);
          if (entry && tag) {
            el.setAttribute('href', addTag(entry.url, tag));
          }
          el.setAttribute('rel', 'sponsored noopener');
        });
      })
      .catch(function () {
        /* If the fetch fails (e.g. offline), links keep their plain
           hrefs already present in the HTML -- nothing breaks. */
      });
  });
})();
