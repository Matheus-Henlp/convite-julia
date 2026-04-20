document.addEventListener('DOMContentLoaded', () => {
    // Flow Logic
    const mailboxScreen = document.getElementById('mailbox-screen');
    const viewLetterBtn = document.getElementById('view-letter-btn');
    const envelopeContainer = document.getElementById('envelope-container');
    const openBtn = document.getElementById('open-invitation');
    const invitationContent = document.getElementById('invitation-content');
    const envelope = document.querySelector('.envelope');

    // Step 1: Mailbox to Envelope
    viewLetterBtn.addEventListener('click', () => {
        mailboxScreen.classList.add('fade-out');
        setTimeout(() => {
            mailboxScreen.style.display = 'none';
            envelopeContainer.classList.remove('hidden');
            // Force reflow
            void envelopeContainer.offsetWidth;
            envelopeContainer.classList.add('active');
        }, 1000);
    });

    // Step 2: Envelope to Invitation
    openBtn.addEventListener('click', () => {
        envelope.classList.add('open');

        setTimeout(() => {
            envelopeContainer.classList.add('fade-out');

            setTimeout(() => {
                envelopeContainer.style.display = 'none';
                invitationContent.classList.remove('hidden');
                void invitationContent.offsetWidth;
                invitationContent.classList.add('visible');
            }, 1000);
        }, 800);
    });

    // RSVP Logic with WhatsApp Redirection
    const rsvpBtn = document.querySelector('.btn-rsvp');
    const guestNameInput = document.getElementById('guest-name');
    const guestCountInput = document.getElementById('guest-count');
    const whatsappNumber = '5569999763445';

    rsvpBtn.addEventListener('click', () => {
        const name = guestNameInput.value.trim();
        const count = guestCountInput.value.trim();

        if (!name || !count) {
            alert('Por favor, preencha seu nome e o número de convidados para confirmar.');
            return;
        }

        const message = `Olá, meu nome é ${name}. Confirmo minha presença no aniversário de 15 anos da Julia Caroline. Total de convidados: ${count}.`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Redirect to WhatsApp
        window.open(whatsappUrl, '_blank');
    });

    // Countdown Timer Logic
    const countdownDate = new Date('July 4, 2026 19:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById('countdown').innerHTML = "<span class='celebration'>É HOJE!</span>";
        }
    };

    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Run immediately

    // Particle Background Effect
    const createParticles = () => {
        const bg = document.querySelector('.background-overlay');
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random positions and sizes
            const size = Math.random() * 4 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;

            bg.appendChild(particle);
        }
    };

    createParticles();
});
