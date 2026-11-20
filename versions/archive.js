const control = document.querySelector('#portfolio-archive details');
document.addEventListener('pointerdown', event => {
  if (!control.contains(event.target)) control.open = false;
});
control.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !control.open) return;
  event.stopPropagation();
  control.open = false;
  control.querySelector('summary').focus();
});
