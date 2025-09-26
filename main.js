const book = document.querySelector("#book");
const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");
const paper5 = document.querySelector("#p5");
const paper6 = document.querySelector("#p6");

// Business Logic
let currentLocation = 1;
let numOfPapers = 6;
let maxLocation = numOfPapers + 1;

function openBook() {
    book.style.transform = "translateX(50%)";
    book.style.animation = "bookOpen 0.6s ease-in-out";
    setTimeout(() => book.style.animation = "", 600);
}

function closeBook(isAtBeginning) {
    book.style.transform = isAtBeginning ? "translateX(0%)" : "translateX(100%)";
    book.style.animation = "bookClose 0.6s ease-in-out";
    setTimeout(() => book.style.animation = "", 600);
}

function goNextPage() {
  if (currentLocation < maxLocation) {
    switch (currentLocation) {
      case 1:
        openBook();
        paper1.classList.add("flipped");
        paper1.style.zIndex = 1;
        break;
      case 2:
        paper2.classList.add("flipped");
        paper2.style.zIndex = 2;
        break;
      case 3:
        paper3.classList.add("flipped");
        paper3.style.zIndex = 3;
        break;
      case 4:
        paper4.classList.add("flipped");
        paper4.style.zIndex = 4;
        break;
      case 5:
        paper5.classList.add("flipped");
        paper5.style.zIndex = 5;
        break;
      case 6:
        paper6.classList.add("flipped");
        paper6.style.zIndex = 6;
        closeBook(false);
        break;
    }
    currentLocation++;
  }
}

function goPrevPage() {
    if (currentLocation > 1) {
        switch (currentLocation) {
            case 2: // Balik ke halaman awal
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 6;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 5;
                break;
            case 4:
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 4;
                break;
            case 5:
                paper4.classList.remove("flipped");
                paper4.style.zIndex = 3;
                break;
            case 6:
                paper5.classList.remove("flipped");
                paper5.style.zIndex = 2;
                break;
            case 7: // Tutup halaman terakhir (paper6)
                openBook(); // kembalikan posisi book
                paper6.classList.remove("flipped");
                paper6.style.zIndex = 1;
                break;
        }
        currentLocation--;
        createSparkles();
    }
}

// Klik area kiri/kanan halaman
book.addEventListener("click", (e) => {
    const rect = book.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) {
        goPrevPage();
    } else {
        goNextPage();
    }
});

// Keyboard nav
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goNextPage();
    else if (e.key === 'ArrowLeft') goPrevPage();
});

// Animasi welcome
window.addEventListener('load', () => {
    book.style.animation = 'bookOpen 1s ease-in-out';
    setTimeout(() => { book.style.animation = ''; }, 1000);
});

// Sparkle effect
function createSparkles() {
    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1'];
    for(let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'temp-sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            animation: sparkleUp 1s ease-out forwards;
            z-index: 1000;
        `;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
}
