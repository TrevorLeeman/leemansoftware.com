// Copy buttons: <button class="copy" data-copy="text">. Without JavaScript they stay hidden.
document.documentElement.classList.add('js');
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
