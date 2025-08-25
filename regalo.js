// Variables globales
let giftOpened = false;
let candlesBlown = 0;
let pinataBroken = false;

// Array con las rutas de las imágenes para el regalo final
const imagePaths = [
    "img/oso.jpg",
    "img/muñeca.jpg",
    "img/mono.png"
];

// Descripciones alternativas para cada imagen
const imageDescriptions = [
    "Un regalo lleno de buenos deseos para ti.",
    "Has ganado una experiencia única e inolvidable.",
    "Este regalo simboliza toda la alegría de tu día especial."
];

// Inicializar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Configurar eventos de botones
    document.getElementById('openGiftBtn').addEventListener('click', startGiftAnimation);
    document.getElementById('blowCandlesBtn').addEventListener('click', showCandles);
    document.getElementById('breakPinataBtn').addEventListener('click', breakPinata);
    
    // Ocultar botones finales completamente al inicio
    document.getElementById('finalButtons').style.display = 'none';
    
    // Iniciar música de fondo
    const audio = document.getElementById('birthdaySong');
    audio.volume = 0.5;
    audio.play().catch(e => console.log("La reproducción automática está bloqueada"));
});

// Función para mostrar una imagen aleatoria
function showRandomImage() {
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    const imageElement = document.getElementById('randomGiftImage');
    const descriptionElement = document.querySelector('.gift-description');
    
    // Crear confeti
    createConfetti();
    
    // Cambiar la imagen y descripción
    imageElement.src = imagePaths[randomIndex];
    imageElement.style.display = 'block';
    descriptionElement.textContent = imageDescriptions[randomIndex];
    
    // Efecto de transición
    imageElement.style.opacity = '0';
    setTimeout(() => {
        imageElement.style.opacity = '1';
        imageElement.style.transition = 'opacity 0.5s ease-in-out';
    }, 10);
}

// Función para crear efecto de confeti
function createConfetti() {
    const colors = ['#ff5e62', '#ffbd03', '#00c9ff', '#6decb9', '#ff6b6b', '#ffdd59'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(confetti);
        
        // Eliminar el confeti después de que termine la animación
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 10000);
    }
}

// Función para iniciar la animación del regalo
function startGiftAnimation() {
    if (giftOpened) return;
    
    // Ocultar botón de abrir regalo
    document.getElementById('openGiftBtn').style.display = 'none';
    
    // Iniciar animación de apertura del regalo
    const giftBox = document.querySelector('.gift-box');
    const boxTop = document.querySelector('.box-top');
    
    // Aplicar animaciones
    giftBox.style.animation = 'giftEntrance 1.5s ease-out forwards';
    boxTop.style.animation = 'openTop 2s forwards';
    boxTop.style.animationDelay = '1.5s';
    
    // Mostrar efecto de luz con retraso
    const lightEffect = document.querySelector('.light-effect');
    lightEffect.style.animation = 'lightAppear 2s forwards';
    lightEffect.style.animationDelay = '3s';
    
    // Mostrar brillo con retraso
    const sparkle = document.querySelector('.sparkle');
    sparkle.style.animation = 'sparklePulse 2s infinite';
    sparkle.style.animationDelay = '3s';
    
    // Después de que se complete la animación, mostrar la explosión
    setTimeout(() => {
        hideGiftAndShowLetter();
    }, 5000); // 5 segundos para completar todas las animaciones
}

// Función para crear efecto de explosión de confeti a pantalla completa
function createMassiveExplosion() {
    const explosionEffect = document.getElementById('explosionEffect');
    const confettiFloor = document.getElementById('confettiFloor');
    
    // Efecto de cámara temblando
    document.body.classList.add('shaking');
    setTimeout(() => {
        document.body.classList.remove('shaking');
    }, 500);
    
    // Crear efecto de destello
    const flashOverlay = document.createElement('div');
    flashOverlay.className = 'flash-overlay';
    document.body.appendChild(flashOverlay);
    flashOverlay.style.animation = 'flash 1s forwards';
    
    // Crear partículas de confeti
    for (let i = 0; i < 400; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            
            // Asignar forma aleatoria
            const shapes = ['circle', 'rectangle', 'star', 'heart'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.classList.add(shape);
            
            // Colores vibrantes
            const colors = [
                '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
                '#ff8800', '#88ff00', '#00ff88', '#0088ff', '#8800ff', '#ff0088',
                '#ff3366', '#66ff33', '#3366ff', '#ff33cc', '#33ccff', '#ccff33'
            ];
            confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
            
            // Posición inicial (centro de la pantalla)
            confetti.style.left = '50%';
            confetti.style.top = '50%';
            
            // Tamaño aleatorio
            const size = Math.random() * 15 + 8;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            
            // Variables CSS para la animación
            const translateX = (Math.random() * 2000 - 1000) + 'px';
            const translateY = (Math.random() * 2000 - 1000) + 'px';
            const rotation = (Math.random() * 1080 - 540) + 'deg';
            const duration = (Math.random() * 3 + 2) + 's';
            const delay = (Math.random() * 0.5) + 's';
            
            confetti.style.setProperty('--translate-x', translateX);
            confetti.style.setProperty('--translate-y', translateY);
            confetti.style.setProperty('--rotation', rotation);
            
            // Animación
            confetti.style.animation = `massiveExplosion ${duration} forwards`;
            confetti.style.animationDelay = delay;
            
            explosionEffect.appendChild(confetti);
        }, i * 5);
    }
    
    // Crear confeti que cae al suelo y se queda
    createFloorConfetti();
    
    // Crear globos que suben desde abajo
    createFloatingBalloons();
    
    // Mostrar efecto de explosión
    explosionEffect.style.animation = 'explosion 2s forwards';
    
    // Crear sonido de explosión más impactante
    playMassivePopSound();
    
    // Limpiar el destello después de la animación
    setTimeout(() => {
        if (flashOverlay.parentNode) {
            flashOverlay.parentNode.removeChild(flashOverlay);
        }
    }, 1000);
}

// Función para crear confeti que permanece en el suelo
function createFloorConfetti() {
    const confettiFloor = document.getElementById('confettiFloor');
    
    // Crear entre 30-50 piezas de confeti en el suelo
    const confettiCount = Math.floor(Math.random() * 20) + 30;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'floor-confetti';
            
            // Asignar forma aleatoria
            const shapes = ['circle', 'rectangle', 'star', 'heart'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.classList.add(shape);
            
            // Colores vibrantes
            const colors = [
                '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
                '#ff8800', '#88ff00', '#00ff88', '#0088ff', '#8800ff', '#ff0088'
            ];
            confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
            
            // Posición horizontal aleatoria
            const leftPosition = Math.random() * 100;
            confetti.style.left = `${leftPosition}%`;
            
            // Tamaño aleatorio
            const size = Math.random() * 12 + 6;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            
            // Variables CSS para la animación
            const translateX = (Math.random() * 40 - 20) + 'px';
            const translateY = (Math.random() * -300 - 100) + 'px';
            const rotation = (Math.random() * 360) + 'deg';
            const duration = (Math.random() * 2 + 1.5) + 's';
            const delay = (Math.random() * 0.5) + 's';
            
            confetti.style.setProperty('--translate-x', translateX);
            confetti.style.setProperty('--translate-y', translateY);
            confetti.style.setProperty('--rotation', rotation);
            
            // Animación para caer y quedarse
            confetti.style.animation = `fallToGround ${duration} forwards`;
            confetti.style.animationDelay = delay;
            
            confettiFloor.appendChild(confetti);
        }, i * 50);
    }
}

// Función para crear globos que suben desde abajo
function createFloatingBalloons() {
    const balloonColors = ['🎈', '🎈', '🎈', '🎈', '🎈'];
    const colors = ['#ff6b6b', '#ffdd59', '#4cd964', '#5ac8fa', '#007aff'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.textContent = balloonColors[i % balloonColors.length];
            balloon.style.left = `${Math.random() * 100}%`;
            balloon.style.color = colors[i % colors.length];
            balloon.style.fontSize = `${Math.random() * 20 + 30}px`;
            balloon.style.animationDuration = `${Math.random() * 10 + 15}s`;
            balloon.style.animationDelay = `${i * 0.3}s`;
            
            document.body.appendChild(balloon);
            
            // Eliminar el globo después de que termine la animación
            setTimeout(() => {
                if (balloon.parentNode) {
                    balloon.parentNode.removeChild(balloon);
                }
            }, 25000);
        }, i * 300);
    }
}

// Función para reproducir sonido de explosión masiva
function playMassivePopSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Crear múltiples osciladores para sonido más complejo
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.type = ['sine', 'triangle', 'sawtooth'][i % 3];
                oscillator.frequency.setValueAtTime(800 - (i * 100), audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
                
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.3);
            }, i * 50);
        }
    } catch (e) {
        console.log("El audio no está soportado en este navegador");
    }
}

// Modificar la función hideGiftAndShowLetter para incluir la explosión masiva
function hideGiftAndShowLetter() {
    if (giftOpened) return;
    giftOpened = true;
    
    const giftContainer = document.getElementById('giftContainer');
    const letterContainer = document.getElementById('letterContainer');
    
    // Crear explosión masiva
    createMassiveExplosion();
    
    // Ocultar el regalo después de un breve momento
    setTimeout(() => {
        giftContainer.classList.add('hidden');
    }, 500);
    
    // Mostrar la carta después de que termine la explosión
    setTimeout(() => {
        letterContainer.classList.add('visible');
        
        // Mostrar botón de soplar velas después de que termine la canción
        setTimeout(() => {
            document.getElementById('blowCandlesBtn').style.display = 'flex';
        }, 35000); // Después de 45 segundos (duración de la animación de la carta)
    }, 2000);
}

// Función para mostrar las velas
// Función para mostrar las velas (y el pastel se mostrará automáticamente)
function showCandles() {
    const letterContainer = document.getElementById('letterContainer');
    const candleContainer = document.getElementById('candleContainer');
    
    // Ocultar botón de soplar velas y carta
    document.getElementById('blowCandlesBtn').style.display = 'none';
    letterContainer.classList.remove('visible');
    
    // Mostrar velas (el pastel se mostrará automáticamente por cake.js)
    setTimeout(() => {
        candleContainer.classList.add('visible');
        
        // Configurar el evento de soplar para las velas
        setupBlowDetection();
    }, 1000);
}

// Función para configurar la detección de soplo
function setupBlowDetection() {
    // Detección por clic
    const candles = document.querySelectorAll('.candle');
    candles.forEach(candle => {
        candle.addEventListener('click', () => {
            blowCandle(candle);
        });
    });
    
    // Detección por micrófono (si está disponible)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const audioContext = new AudioContext();
                const microphone = audioContext.createMediaStreamSource(stream);
                const analyser = audioContext.createAnalyser();
                microphone.connect(analyser);
                
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                
                function checkBlowing() {
                    if (candlesBlown >= 5) return; // Todas las velas sopladas
                    
                    analyser.getByteFrequencyData(dataArray);
                    let sum = 0;
                    for (let i = 0; i < dataArray.length; i++) {
                        sum += dataArray[i];
                    }
                    const average = sum / dataArray.length;
                    
                    if (average > 70) { // Nivel de sonido alto indica soplo
                        const unblownCandles = document.querySelectorAll('.candle:not(.blown)');
                        if (unblownCandles.length > 0) {
                            blowCandle(unblownCandles[0]);
                        }
                    }
                    
                    requestAnimationFrame(checkBlowing);
                }
                
                checkBlowing();
            })
            .catch(err => {
                console.log('No se pudo acceder al micrófono: ', err);
            });
    }
}

// Función para soplar una vela
function blowCandle(candle) {
    if (candle.classList.contains('blown')) return;
    
    candle.classList.add('blown');
    candlesBlown++;
    
    // Reproducir sonido de soplo
    const blowSound = document.getElementById('blowSound');
    blowSound.currentTime = 0;
    blowSound.play();
    
    // Verificar si todas las velas están sopladas
    if (candlesBlown >= 5) {
        setTimeout(() => {
            // Ocultar velas y mostrar piñata
            const candleContainer = document.getElementById('candleContainer');
            const pinataContainer = document.getElementById('pinataContainer');
            
            candleContainer.classList.remove('visible');
            setTimeout(() => {
                pinataContainer.classList.add('visible');
            }, 1000);
        }, 1000);
    }
}

// Función para romper la piñata
function breakPinata() {
    if (pinataBroken) return;
    pinataBroken = true;
    
    const pinata = document.getElementById('pinata');
    const pinataContainer = document.getElementById('pinataContainer');
    const finalGiftContainer = document.getElementById('finalGiftContainer');
    
    // Ocultar botón de romper piñata
    document.getElementById('breakPinataBtn').style.display = 'none';
    
    // Reproducir sonido
    const pinataSound = document.getElementById('pinataSound');
    pinataSound.currentTime = 0;
    pinataSound.play();
    
    // Animación de romper piñata
    pinata.classList.add('broken');
    
    // Crear explosión de dulces
    setTimeout(() => {
        createMassiveExplosion();
        
        // Ocultar la piñata después de la animación y mostrar regalo final
        setTimeout(() => {
            pinataContainer.classList.remove('visible');
            finalGiftContainer.classList.add('visible');
            
            // Mostrar botones finales
            document.getElementById('finalButtons').style.display = 'flex';
            setTimeout(() => {
                document.getElementById('finalButtons').classList.add('visible');
            }, 50);
            
            // Mostrar imagen aleatoria
            showRandomImage();
        }, 1000);
    }, 500);
}

// Función para reiniciar animaciones
function restartAnimations() {
    const giftContainer = document.getElementById('giftContainer');
    const letterContainer = document.getElementById('letterContainer');
    const explosionEffect = document.getElementById('explosionEffect');
    const confettiFloor = document.getElementById('confettiFloor');
    const candleContainer = document.getElementById('candleContainer');
    const pinataContainer = document.getElementById('pinataContainer');
    const finalGiftContainer = document.getElementById('finalGiftContainer');
    
    // Limpiar confeti existente
    explosionEffect.innerHTML = '';
    explosionEffect.style.animation = 'none';
    confettiFloor.innerHTML = '';
    
    // Eliminar globos
    document.querySelectorAll('.balloon').forEach(balloon => {
        balloon.remove();
    });
    
    // Reiniciar variables de estado
    giftOpened = false;
    candlesBlown = 0;
    pinataBroken = false;
    
    // Reiniciar velas
    document.querySelectorAll('.candle').forEach(candle => {
        candle.classList.remove('blown');
    });
    
    // Reiniciar piñata
    const pinata = document.getElementById('pinata');
    pinata.classList.remove('broken');
    
    // Mostrar botones nuevamente
    document.getElementById('openGiftBtn').style.display = 'flex';
    document.getElementById('blowCandlesBtn').style.display = 'none'; // Oculto inicialmente
    document.getElementById('breakPinataBtn').style.display = 'flex';
    
    // Ocultar elementos
    letterContainer.classList.remove('visible');
    candleContainer.classList.remove('visible');
    pinataContainer.classList.remove('visible');
    finalGiftContainer.classList.remove('visible');
    
    // Ocultar botones finales completamente
    document.getElementById('finalButtons').style.display = 'none';
    document.getElementById('finalButtons').classList.remove('visible');
    
    // Ocultar imagen de regalo
    document.getElementById('randomGiftImage').style.display = 'none';
    
    // Mostrar regalo
    giftContainer.classList.remove('hidden');
    
    // Reiniciar animación del regalo
    const giftBox = document.querySelector('.gift-box');
    const boxTop = document.querySelector('.box-top');
    const lightEffect = document.querySelector('.light-effect');
    const sparkle = document.querySelector('.sparkle');
    
    giftBox.style.animation = 'none';
    boxTop.style.animation = 'none';
    lightEffect.style.animation = 'none';
    sparkle.style.animation = 'none';
    
    // Forzar reflow
    void giftBox.offsetWidth;
    void boxTop.offsetWidth;
    void lightEffect.offsetWidth;
    void sparkle.offsetWidth;
}
// Función para crear el pastel debajo de las velas
function createCakeUnderCandles() {
    // Crear el contenedor del pastel
    const cakeContainer = document.createElement('div');
    cakeContainer.className = 'cake-under-candles';
    cakeContainer.id = 'cakeUnderCandles';
    
    // Crear el cuerpo del pastel
    const cakeBody = document.createElement('div');
    cakeBody.className = 'cake-body';
    
    // Crear la base del pastel
    const cakeBase = document.createElement('div');
    cakeBase.className = 'cake-base';
    
    // Crear el frosting (cubierta)
    const cakeFrosting = document.createElement('div');
    cakeFrosting.className = 'cake-frosting';
    
    // Crear decoraciones (sprinkles)
    const cakeDecoration = document.createElement('div');
    cakeDecoration.className = 'cake-decoration';
    
    // Añadir sprinkles
    for (let i = 0; i < 12; i++) {
        const sprinkle = document.createElement('div');
        sprinkle.className = 'cake-sprinkle';
        cakeDecoration.appendChild(sprinkle);
    }
    
    // Ensamblar el pastel
    cakeBody.appendChild(cakeFrosting);
    cakeBody.appendChild(cakeDecoration);
    cakeContainer.appendChild(cakeBody);
    cakeContainer.appendChild(cakeBase);
    
    // Insertar el pastel debajo del contenedor de velas
    const candleContainer = document.getElementById('candleContainer');
    candleContainer.parentNode.insertBefore(cakeContainer, candleContainer.nextSibling);
    
    // Añadir efecto de brillo al pastel
    addCakeSparkleEffect();
    
    return cakeContainer;
}

// Función para añadir efecto de brillo al pastel
function addCakeSparkleEffect() {
    const cakeBody = document.querySelector('.cake-body');
    const sparkleInterval = setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.width = '5px';
        sparkle.style.height = '5px';
        sparkle.style.backgroundColor = '#fff';
        sparkle.style.borderRadius = '50%';
        sparkle.style.boxShadow = '0 0 10px 2px #ffeb3b';
        sparkle.style.left = Math.random() * 300 + 'px';
        sparkle.style.top = Math.random() * 40 + 'px';
        sparkle.style.opacity = '0';
        sparkle.style.transition = 'opacity 0.5s, transform 0.5s';
        sparkle.style.zIndex = '6';
        
        cakeBody.appendChild(sparkle);
        
        // Animación de aparición
        setTimeout(() => {
            sparkle.style.opacity = '1';
            sparkle.style.transform = 'scale(1.5)';
        }, 10);
        
        // Animación de desaparición
        setTimeout(() => {
            sparkle.style.opacity = '0';
        }, 500);
        
        // Eliminar el elemento después de la animación
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }, 300);
}

// Añadir interacción al pastel
function setupCakeInteraction() {
    const cake = document.getElementById('cakeUnderCandles');
    if (cake) {
        cake.addEventListener('click', function() {
            // Efecto de temblor al hacer clic
            this.style.animation = 'cake-shake 0.5s';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
            
            // Reproducir sonido de golpe suave
            const tapSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-mouse-click-close-1113.mp3');
            tapSound.volume = 0.3;
            tapSound.play();
        });
    }
}

// Llamar a la función para crear el pastel cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    createCakeUnderCandles();
    setupCakeInteraction();
});

