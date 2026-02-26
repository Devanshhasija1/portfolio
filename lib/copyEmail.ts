const EMAIL = 'hdevansh@gmail.com';
let activeToast: HTMLElement | null = null;

export async function copyEmail() {
  await navigator.clipboard.writeText(EMAIL);

  if (activeToast) {
    activeToast.remove();
    activeToast = null;
  }

  const toast = document.createElement('div');
  toast.className = 'email-toast';
  toast.textContent = 'Email copied';
  document.body.appendChild(toast);
  activeToast = toast;

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    toast.addEventListener('transitionend', () => {
      toast.remove();
      if (activeToast === toast) activeToast = null;
    }, { once: true });
  }, 2000);
}
