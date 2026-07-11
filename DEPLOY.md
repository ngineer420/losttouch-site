# Deploying losttou.ch

This repo is served by GitHub Pages directly from the `main` branch (root),
with a `CNAME` file already in the repo pointing Pages at `losttou.ch`.
GitHub Pages hosting itself is free. The only thing left to do is point
your domain's DNS at GitHub, and (later) apply for Amazon Associates.

## 1. DNS setup at your domain registrar

Log into wherever `losttou.ch` is registered and edit its DNS records.

### Apex domain (`losttou.ch` with no subdomain) — required

Add four **A** records, all for the bare/apex domain (leave the "host" or
"name" field blank, or set it to `@`, depending on your registrar's UI):

| Type | Name/Host | Value           |
|------|-----------|-----------------|
| A    | @         | 185.199.108.153 |
| A    | @         | 185.199.109.153 |
| A    | @         | 185.199.110.153 |
| A    | @         | 185.199.111.153 |

Optional but recommended, IPv6 equivalents (**AAAA** records), same host:

| Type | Name/Host | Value                                |
|------|-----------|---------------------------------------|
| AAAA | @         | 2606:50c0:8000::153                    |
| AAAA | @         | 2606:50c0:8001::153                    |
| AAAA | @         | 2606:50c0:8002::153                    |
| AAAA | @         | 2606:50c0:8003::153                    |

### `www` subdomain — optional, if you also want www.losttou.ch to work

Add a **CNAME** record:

| Type  | Name/Host | Value              |
|-------|-----------|--------------------|
| CNAME | www       | ngineer420.github.io |

(GitHub Pages will redirect `www` to the apex domain automatically once
both the CNAME file in this repo and your DNS are set correctly — the
apex domain, `losttou.ch`, is the canonical one used throughout the site.)

### Notes

- DNS changes can take anywhere from a few minutes to 24-48 hours to fully
  propagate, depending on your registrar and previous DNS TTL settings.
- Once DNS resolves correctly, go to the repo's **Settings → Pages** in
  GitHub and check the "Enforce HTTPS" box (it may take a few minutes to
  become available after DNS first resolves — GitHub needs to issue a
  TLS certificate for the domain first).
- You can confirm Pages already has the custom domain configured by
  checking Settings → Pages in the repo, or via
  `gh api repos/ngineer420/losttouch-site/pages`.

## 2. Applying for Amazon Associates

Do this only after the site above is live at `losttou.ch` (or at least
reachable at its `github.io` URL) with the real content already published
— Amazon's reviewers check that the site is live and has genuine content
before approving an application; a bare domain or parked page will likely
get rejected.

1. Go to [affiliate-program.amazon.com](https://affiliate-program.amazon.com/)
   and sign up with your own Amazon account (or create one for this
   purpose). This step requires your own personal/tax/bank information —
   nobody else should do this step for you.
2. When asked for your website URL, provide `https://losttou.ch`.
3. When asked what your site is about, describe it honestly: an
   independent content site with original articles about reconnecting
   with old friends and family, digital nostalgia, and memory-keeping.
4. Amazon typically requires you to make **3 qualifying sales within 180
   days** of approval to keep the account active, so it's worth sharing
   a few links (e.g. on social media, with friends) once your tag is live.
5. Once approved, you'll be issued a tracking ID that looks like
   `yourname-20`.
6. Open `_data/affiliate-links.json` in this repo and paste that tracking
   ID into the top-level `"amazonTagGlobal"` field — one edit activates
   every product on the site. Commit and push — see the README's "Swapping
   in your real Amazon Associates tag" section for the full walkthrough. No
   other files need to change.
7. Double check `affiliate-disclosure.html` still accurately describes
   your participation status (it's already written to be accurate both
   before and after approval, but re-read it once you're live to be sure).

## 3. Ongoing content

Amazon and most affiliate programs periodically review sites for
continued compliance — keep publishing genuine, original articles rather
than only adding affiliate links to existing ones, and keep the
disclosure pages up to date if your monetization setup changes.
