// Small enhancements. The site works fully without them.
document.documentElement.classList.add('js');

// Copy buttons: <button class="copy" data-copy="text">. Hidden until this script runs.
document.addEventListener('click', async (event) => {
  const button = event.target.closest('button[data-copy]');
  if (!button) return;
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    button.textContent = 'Copied';
    button.classList.add('done');
  } catch {
    button.textContent = 'Copy failed';
  }
  clearTimeout(button._reset);
  button._reset = setTimeout(() => {
    button.textContent = 'Copy';
    button.classList.remove('done');
  }, 1600);
});

// Policy pages: mark the section being read in the "On this page" column.
document.addEventListener('DOMContentLoaded', () => {
  const links = new Map(
    [...document.querySelectorAll('.toc a[href^="#"]')].map((a) => [a.getAttribute('href').slice(1), a]),
  );
  if (!links.size || !('IntersectionObserver' in window)) return;
  const visible = new Set();
  const headings = [...document.querySelectorAll('.prose h2[id]')];
  const mark = () => {
    // The first heading on screen wins; between headings, the last one passed stays marked.
    const current =
      headings.find((h) => visible.has(h.id)) ??
      [...headings].reverse().find((h) => h.getBoundingClientRect().top < 120);
    links.forEach((a, id) => a.setAttribute('aria-current', String(current?.id === id)));
  };
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
      mark();
    },
    { rootMargin: '-80px 0px -55% 0px' },
  );
  headings.forEach((h) => observer.observe(h));
});
