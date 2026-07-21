/* ==========================================================================
   form.js — client-side waitlist form feedback. There is no backend wired
   up in this microsite; this validates the email and swaps in a confirmed
   state so the interaction reads as complete. Replace the submit handler
   with a real API call when connecting this to a service.
   ========================================================================== */

export function initAccessForm(){
  const form = document.getElementById('accessForm');
  if (!form) return;

  const input = document.getElementById('accessEmail');
  const label = document.getElementById('accessSubmitLabel');
  const note = document.getElementById('accessNote');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!input.checkValidity()){
      gsap.fromTo(form, { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
      note.textContent = 'That email address looks incomplete — double check it.';
      note.style.color = 'var(--synapse)';
      input.focus();
      return;
    }

    submitBtn.disabled = true;
    label.textContent = 'Added to the list';
    note.textContent = `We'll reach out to ${input.value} as an invite opens up.`;
    note.style.color = 'var(--glia)';
    input.value = '';

    gsap.fromTo(submitBtn, { scale: 0.96 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
  });
}
