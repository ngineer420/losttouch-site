# losttou.ch

A small, dependency-free static website about reconnection, nostalgia, and
memory-keeping. Plain HTML/CSS/JS, hosted for free on GitHub Pages with a
custom domain (`losttou.ch`).

## Structure

```
index.html                     Homepage
about.html                     About page
privacy.html                   Privacy policy
affiliate-disclosure.html      FTC/Amazon-required affiliate disclosure
robots.txt                     Search engine crawl rules
sitemap.xml                    XML sitemap
CNAME                          GitHub Pages custom domain config
DEPLOY.md                      DNS setup + Amazon Associates walkthrough
css/style.css                  All site styling (no framework)
js/affiliate.js                Loads _data/affiliate-links.json and adds
                                tracking tags to affiliate links, if present
_data/affiliate-links.json     Central registry of affiliate link targets
articles/*.html                The eleven guides (see below)
```

No build step, no npm, no Jekyll required — every file here is served
as-is by GitHub Pages.

## Articles

1. `articles/reconnecting-with-old-friend.html` — How to reconnect with an
   old friend after years of silence
2. `articles/digital-nostalgia-old-photos.html` — Digital nostalgia: old
   photos, emails, and social archives
3. `articles/keepsake-box-ideas.html` — Keepsake box ideas
4. `articles/letter-writing-revival.html` — The letter-writing revival
5. `articles/memory-keeping-apps.html` — Memory-keeping apps and services
6. `articles/reconnection-gift-ideas.html` — Gift ideas for reconnecting
7. `articles/estranged-family-reconnection.html` — Reconnecting with an
   estranged family member
8. `articles/apologizing-for-going-quiet.html` — How to apologize for going
   quiet on someone you care about
9. `articles/class-family-reunion-planning.html` — Planning a class or
   family reunion
10. `articles/finding-someone-contact-info.html` — Finding someone's contact
    info online without being creepy
11. `articles/deceased-loved-one-letters-photos.html` — What to do with a
    deceased loved one's letters and photos

## How affiliate links work on this site

Every affiliate mention in an article is written as a normal, working,
**non-tracked** link straight out of the box, e.g.:

```html
<a href="https://www.amazon.com/s?k=wooden+keepsake+memory+box"
   class="affiliate-link"
   data-affiliate="keepsake-box">a keepsake memory box</a>
```

The `data-affiliate="keepsake-box"` attribute is a lookup key into
[`_data/affiliate-links.json`](_data/affiliate-links.json), which holds the
canonical destination URL and (once you have one) your Amazon Associates
tracking tag for every product mentioned on the site:

```json
"keepsake-box": {
  "label": "wooden keepsake memory box",
  "url": "https://www.amazon.com/s?k=wooden+keepsake+memory+box",
  "amazonTag": ""
}
```

On every page load, [`js/affiliate.js`](js/affiliate.js) fetches that JSON
file and, **only if `amazonTag` is non-empty**, appends `?tag=your-tag-here`
(or `&tag=...` if the URL already has query params) to the link's href. If
`amazonTag` is empty, as it is by default, the link is left exactly as
written in the HTML — a plain, functional, non-monetized link. This means
the site is fully compliant and non-broken both before and after your
Associates application is approved, and you never have to touch article
HTML to turn monetization on.

### Swapping in your real Amazon Associates tag

Once your Amazon Associates application is approved (see `DEPLOY.md` for
when/how to apply):

1. Open `_data/affiliate-links.json`.
2. For each product you want to monetize, set `"amazonTag"` to your actual
   Associates tracking ID (it looks like `yourtag-20`).
3. Commit and push. That's it — every article mentioning that product will
   automatically start using your tracked link on the next page load. No
   HTML changes needed.
4. If you add a new product mention in a future article, add a new entry
   to this same JSON file with a short `data-affiliate` key, and reference
   that key from the new `<a data-affiliate="...">` link in the article.

### Adding a new affiliate program (beyond Amazon)

The same pattern works for any affiliate network. Add a new field (e.g.
`"shareASaleId"`) to an entry in the JSON file, and extend the logic in
`js/affiliate.js` to build that network's tracked URL format the same way
it currently handles `amazonTag`.

## Local preview

No build step needed. From this directory, run any static file server, e.g.:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Deployment

See [`DEPLOY.md`](DEPLOY.md) for DNS configuration and the Amazon
Associates application walkthrough.
