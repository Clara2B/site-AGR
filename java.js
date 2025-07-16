document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll('.banner-item');
  const next = document.querySelector('.next');
  const prev = document.querySelector('.prev');
  let index = 0;
  let interval;

  function showImage(i) {
    items.forEach((item, idx) => {
      item.classList.remove('active');
      item.style.opacity = '0';
      item.style.zIndex = '0';
    });
    items[i].classList.add('active');
    items[i].style.opacity = '1';
    items[i].style.zIndex = '1';
  }

  function nextImage() {
    index = (index + 1) % items.length;
    showImage(index);
  }

  function prevImage() {
    index = (index - 1 + items.length) % items.length;
    showImage(index);
  }

  function startAutoScroll() {
    interval = setInterval(nextImage, 8000);
  }

  function resetAutoScroll() {
    clearInterval(interval);
    startAutoScroll();
  }

  function animateButton(button) {
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 150);
  }

  if (next && prev) {
    next.addEventListener('click', () => {
      nextImage();
      resetAutoScroll();
      animateButton(next);
    });

    prev.addEventListener('click', () => {
      prevImage();
      resetAutoScroll();
      animateButton(prev);
    });
  }

  const depoimentos = document.querySelectorAll('.depoimentos-slider .depoimento');
let indexAtivo = 0;

function mostrarDepoimento(i) {
  depoimentos.forEach((dep, idx) => {
    dep.classList.toggle('active', idx === i);
  });
}

function slideAutomatico() {
  indexAtivo = (indexAtivo + 1) % depoimentos.length;
  mostrarDepoimento(indexAtivo);
}

mostrarDepoimento(indexAtivo); // mostra o primeiro depoimento
setInterval(slideAutomatico, 5000); // troca a cada 5 segundos


// Início
  showImage(index);
  startAutoScroll();
});
