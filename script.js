// Document ready function
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initTehPersonality();
    initSpiritSwap();
    initBlendGame();
    initFortuneTeller();
});

window.addEventListener('orientationchange', function () {
    // Adjust UI elements based on orientation
    adjustForOrientation();
});


// Initial adjustment
adjustForOrientation();

function adjustForOrientation() {
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    const isTablet = window.matchMedia("(max-width: 991px) and (min-width: 576px)").matches;

    if (isTablet && isPortrait) {
        // Adjust UI for tablet portrait mode
        document.body.classList.add('tablet-portrait');

        // Adjust webcam containers
        const webcamContainers = document.querySelectorAll('.webcam-container');
        webcamContainers.forEach(container => {
            container.style.maxHeight = '300px';
        });

        // Make character selection scrollable
        const characterSelection = document.querySelector('.character-selection');
        if (characterSelection) {
            characterSelection.style.overflowX = 'auto';
            characterSelection.style.flexWrap = 'nowrap';
        }

        // Adjust tea selector
        const teaSelector = document.querySelector('.tea-selector');
        if (teaSelector) {
            teaSelector.style.overflowX = 'auto';
            teaSelector.style.flexWrap = 'nowrap';
        }
    } else {
        // Reset adjustments
        document.body.classList.remove('tablet-portrait');

        // Reset webcam containers
        const webcamContainers = document.querySelectorAll('.webcam-container');
        webcamContainers.forEach(container => {
            container.style.maxHeight = '';
        });

        // Reset character selection
        const characterSelection = document.querySelector('.character-selection');
        if (characterSelection) {
            characterSelection.style.overflowX = '';
            characterSelection.style.flexWrap = '';
        }

        // Reset tea selector
        const teaSelector = document.querySelector('.tea-selector');
        if (teaSelector) {
            teaSelector.style.overflowX = '';
            teaSelector.style.flexWrap = '';
        }
    }
}

// Navigation and section switching
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section-container');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Show the corresponding section
            const targetSection = this.getAttribute('data-section');
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

// 1. Teh Personality AI
function initTehPersonality() {
    const startScanBtn = document.getElementById('start-scan');
    const retryScanBtn = document.getElementById('retry-scan');
    const scanOverlay = document.querySelector('.scan-overlay');
    const resultContainer = document.querySelector('.result-container');
    const initialMessage = document.querySelector('.initial-message');
    const webcam = document.getElementById('webcam');

    // Initialize webcam simulation
    if (webcam) {
        // Simulating webcam with a gradient animation
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.canvas.width = 640;
        ctx.canvas.height = 480;

        function drawWebcamSimulation() {
            const time = Date.now() * 0.001;
            const hue = (time * 10) % 360;

            ctx.fillStyle = `hsl(${hue}, 50%, 80%)`;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            // Draw a simulated face outline
            ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(ctx.canvas.width / 2, ctx.canvas.height / 2, 100, 130, 0, 0, 2 * Math.PI);
            ctx.stroke();

            // Add eyes
            ctx.beginPath();
            ctx.ellipse(ctx.canvas.width / 2 - 40, ctx.canvas.height / 2 - 30, 15, 10, 0, 0, 2 * Math.PI);
            ctx.ellipse(ctx.canvas.width / 2 + 40, ctx.canvas.height / 2 - 30, 15, 10, 0, 0, 2 * Math.PI);
            ctx.stroke();

            // Add smile
            ctx.beginPath();
            ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2 + 20, 50, 0.2, Math.PI - 0.2);
            ctx.stroke();

            webcam.src = ctx.canvas.toDataURL();
            requestAnimationFrame(drawWebcamSimulation);
        }

        drawWebcamSimulation();
    }

    // Button event handlers
    if (startScanBtn) {
        startScanBtn.addEventListener('click', function () {
            // Start webcam simulation
            scanOverlay.style.display = 'block';
            startScanBtn.disabled = true;

            // Simulate scanning process
            setTimeout(() => {
                scanOverlay.style.display = 'none';
                startScanBtn.classList.add('d-none');
                retryScanBtn.classList.remove('d-none');

                // Show results
                initialMessage.style.display = 'none';
                resultContainer.style.display = 'block';
            }, 3000);
        });
    }

    if (retryScanBtn) {
        retryScanBtn.addEventListener('click', function () {
            // Reset to initial state
            startScanBtn.classList.remove('d-none');
            startScanBtn.disabled = false;
            retryScanBtn.classList.add('d-none');

            initialMessage.style.display = 'block';
            resultContainer.style.display = 'none';
        });
    }
}

// 2. Tea Spirit Swap
// 2. Tea Spirit Swap
function initSpiritSwap() {
    const characterCards = document.querySelectorAll('.character-card');
    const captureFaceBtn = document.getElementById('capture-face');
    const retryCaptureBtn = document.getElementById('retry-capture');
    const initialSpiritMessage = document.querySelector('.initial-spirit-message');
    const spiritResultContainer = document.querySelector('.spirit-result-container');
    const spiritResultTitle = document.getElementById('spirit-result-title');
    const spiritWebcam = document.getElementById('spirit-webcam');
    const spiritResultImage = document.getElementById('spirit-result-image');

    // API configuration - replace with your actual API key
    const API_KEY = 'sk_nawW_pElWkoL2dHmZ1QspTbpvUj8kDVpLgiH76mg2kc';

    let selectedCharacter = null;
    let stream = null;

    // Initialize real webcam
    async function startWebcam() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: "user"
                }
            });

            if (spiritWebcam) {
                spiritWebcam.srcObject = stream;
                spiritWebcam.play();
            }
        } catch (err) {
            console.error("Error accessing webcam:", err);
            alert("Could not access webcam. Please check your camera permissions.");
        }
    }

    // Start webcam when section becomes active
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const targetSection = this.getAttribute('data-section');
            if (targetSection === 'spiritswap') {
                startWebcam();
            } else if (stream) {
                // Stop webcam when navigating away
                stream.getTracks().forEach(track => track.stop());
                stream = null;
            }
        });
    });

    // Also start webcam if Spirit Swap is the initial active section
    const spiritSwapSection = document.getElementById('spiritswap');
    if (spiritSwapSection && spiritSwapSection.classList.contains('active')) {
        startWebcam();
    }

    // Character selection
    if (characterCards.length) {
        characterCards.forEach(card => {
            card.addEventListener('click', function () {
                // Remove selected class from all cards
                characterCards.forEach(c => c.classList.remove('selected'));

                // Add selected class to clicked card
                this.classList.add('selected');

                // Enable capture button
                if (captureFaceBtn) captureFaceBtn.disabled = false;

                // Store selected character
                selectedCharacter = this.getAttribute('data-character');

                // Update result title based on selected character
                if (character === 'jasmine') {
                    spiritResultTitle.innerText = 'Spirit of Jasmine';
                } else if (character === 'blacktea') {
                    spiritResultTitle.innerText = 'Black Tea Warrior';
                } else if (character === 'greentea') {
                    spiritResultTitle.innerText = 'Green Tea Guardian';
                }
            });
        });
    }

    // Get character image as base64
    async function getCharacterImageBase64(character) {
        // Get the image URL based on the selected character
        const characterImageUrl = `images/${character}.png`;

        // Fetch the image and convert to base64
        try {
            const response = await fetch(characterImageUrl);
            const blob = await response.blob();

            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    // Remove data:image/jpeg;base64, prefix
                    const base64data = reader.result.split(',')[1];
                    resolve(base64data);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error('Error loading character image:', error);
            alert('Failed to load character image. Please try again.');
            captureFaceBtn.disabled = false;
            captureFaceBtn.innerHTML = '<i class="fas fa-camera me-1"></i> Capture Wajah';
            return null;
        }
    }

    // Merge faces using Novita AI API
    async function mergeFaces(faceImage, characterImage) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                face_image_file: faceImage,
                image_file: characterImage,
                extra: {
                    response_image_type: "png",
                    enterprise_plan: {
                        enabled: false
                    }
                }
            })
        };

        try {
            const response = await fetch('https://api.novita.ai/v3/merge-face', options);
            const data = await response.json();

            if (data.image_file) {
                // Display the result
                spiritResultImage.src = `data:image/png;base64,${data.image_file}`;

                // Show result
                initialSpiritMessage.classList.add('d-none');
                spiritResultContainer.classList.remove('d-none');

                captureFaceBtn.classList.add('d-none');
                if (retryCaptureBtn) retryCaptureBtn.classList.remove('d-none');
            } else {
                throw new Error('No image returned from API');
            }
        } catch (error) {
            console.error('Error merging faces:', error);
            alert('Failed to merge faces. Please try again.');

            // Reset UI
            captureFaceBtn.disabled = false;
            captureFaceBtn.innerHTML = '<i class="fas fa-camera me-1"></i> Capture Wajah';
        }
    }

    if (captureFaceBtn) {
        captureFaceBtn.addEventListener('click', async function () {
            if (!selectedCharacter) {
                alert('Please select a character first!');
                return;
            }

            if (!stream) {
                alert('Webcam is not active. Please refresh and try again.');
                return;
            }

            // Create a canvas to capture the current frame
            const canvas = document.createElement('canvas');
            canvas.width = spiritWebcam.videoWidth;
            canvas.height = spiritWebcam.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(spiritWebcam, 0, 0);

            // Get the captured image data (remove data:image/png;base64, prefix)
            const capturedImage = canvas.toDataURL('image/jpeg').split(',')[1];

            // Disable capture button and show loading state
            captureFaceBtn.disabled = true;
            captureFaceBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Processing...';

            // Get the character image
            const characterImage = await getCharacterImageBase64(selectedCharacter);

            // Call Novita AI API to merge faces
            if (characterImage) {
                mergeFaces(capturedImage, characterImage);
            }
        });
    }

    if (retryCaptureBtn) {
        retryCaptureBtn.addEventListener('click', function () {
            // Reset to initial state
            initialSpiritMessage.classList.remove('d-none');
            spiritResultContainer.classList.add('d-none');

            captureFaceBtn.classList.remove('d-none');
            retryCaptureBtn.classList.add('d-none');

            // Keep the character selected but enable the capture button
            captureFaceBtn.disabled = false;
            captureFaceBtn.innerHTML = '<i class="fas fa-camera me-1"></i> Capture Wajah';
        });
    }

    // Clean up webcam resources when component is unmounted
    function cleanupWebcam() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
    }

    // Clean up when window is closed
    window.addEventListener('beforeunload', cleanupWebcam);
}

// 3. Blend Your Tea Game
function initBlendGame() {
    const ingredients = document.querySelectorAll('.ingredient');
    const analyzeBlendBtn = document.getElementById('analyze-blend');
    const resetBlendBtn = document.getElementById('reset-blend');
    const selectedIngredientsContainer = document.getElementById('selected-ingredients');
    const blendResult = document.querySelector('.blend-result');

    // Track selected ingredients
    let selectedBase = null;
    let selectedHerbs = [];
    let selectedSweetener = null;

    if (ingredients.length) {
        ingredients.forEach(ing => {
            ing.addEventListener('click', function () {
                const type = this.parentElement.className.split(' ')[1];
                const ingredient = this.getAttribute('data-ingredient');

                if (type === 'base-tea') {
                    // For base tea, only one can be selected
                    ingredients.forEach(i => {
                        if (i.parentElement.className.split(' ')[1] === 'base-tea') {
                            i.classList.remove('selected');
                        }
                    });

                    this.classList.add('selected');
                    selectedBase = ingredient;
                } else if (type === 'herbs') {
                    // For herbs, max 2 can be selected
                    if (this.classList.contains('selected')) {
                        this.classList.remove('selected');
                        selectedHerbs = selectedHerbs.filter(h => h !== ingredient);
                    } else {
                        if (selectedHerbs.length < 2) {
                            this.classList.add('selected');
                            selectedHerbs.push(ingredient);
                        }
                    }
                } else if (type === 'sweetener') {
                    // For sweetener, only one can be selected
                    ingredients.forEach(i => {
                        if (i.parentElement.className.split(' ')[1] === 'sweetener') {
                            i.classList.remove('selected');
                        }
                    });

                    this.classList.add('selected');
                    selectedSweetener = ingredient;
                }

                // Update selected ingredients display
                updateSelectedIngredients();
            });
        });
    }

    function updateSelectedIngredients() {
        if (!selectedIngredientsContainer) return;

        if (!selectedBase && selectedHerbs.length === 0 && !selectedSweetener) {
            selectedIngredientsContainer.innerHTML = `
                <div class="alert alert-info">
                    Pilih bahan-bahan di sebelah kiri untuk mulai meracik teh.
                </div>
            `;
            return;
        }

        let html = '<ul class="list-group">';

        if (selectedBase) {
            html += `<li class="list-group-item">Dasar: <span class="fw-bold">${formatIngredientName(selectedBase)}</span></li>`;
        }

        if (selectedHerbs.length > 0) {
            html += `<li class="list-group-item">Rempah/Herbal: <span class="fw-bold">${selectedHerbs.map(formatIngredientName).join(', ')}</span></li>`;
        }

        if (selectedSweetener) {
            html += `<li class="list-group-item">Pemanis: <span class="fw-bold">${formatIngredientName(selectedSweetener)}</span></li>`;
        }

        html += '</ul>';

        selectedIngredientsContainer.innerHTML = html;
    }

    function formatIngredientName(code) {
        const names = {
            'black': 'Teh Hitam',
            'green': 'Teh Hijau',
            'jasmine': 'Teh Jasmine',
            'white': 'Teh Putih',
            'oolong': 'Teh Oolong',
            'ginger': 'Jahe',
            'cinnamon': 'Kayu Manis',
            'lemongrass': 'Serai',
            'mint': 'Mint',
            'lemon': 'Lemon',
            'honey': 'Madu',
            'clove': 'Cengkeh',
            'vanilla': 'Vanilla',
            'sugar': 'Gula',
            'brown-sugar': 'Gula Aren',
            'none': 'Tanpa Pemanis'
        };

        return names[code] || code;
    }

    if (analyzeBlendBtn) {
        analyzeBlendBtn.addEventListener('click', function () {
            if (!selectedBase) {
                alert('Harap pilih dasar teh terlebih dahulu!');
                return;
            }

            // Simulate analysis
            analyzeBlendBtn.disabled = true;
            analyzeBlendBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Menganalisis...';

            setTimeout(() => {
                // Show result
                blendResult.style.display = 'block';
                analyzeBlendBtn.disabled = false;
                analyzeBlendBtn.innerHTML = '<i class="fas fa-magic me-1"></i> Analisis Racikan';
            }, 2000);
        });
    }

    if (resetBlendBtn) {
        resetBlendBtn.addEventListener('click', function () {
            // Reset all selections
            ingredients.forEach(ing => ing.classList.remove('selected'));
            selectedBase = null;
            selectedHerbs = [];
            selectedSweetener = null;

            updateSelectedIngredients();

            // Hide result
            if (blendResult) blendResult.style.display = 'none';
        });
    }
}

// 4. Tea Fortune Teller
function initFortuneTeller() {
    const teaOptions = document.querySelectorAll('.tea-option');
    const fortuneResult = document.querySelector('.fortune-result');

    if (teaOptions.length) {
        teaOptions.forEach(option => {
            option.addEventListener('click', function () {
                const teaType = this.getAttribute('data-tea');

                // Update fortune title based on selected tea
                const fortuneTitle = document.querySelector('.fortune-result h4');
                if (fortuneTitle) {
                    fortuneTitle.innerText = `Ramalan ${formatTeaName(teaType)}`;
                }

                // Simulate fortune telling
                setTimeout(() => {
                    if (fortuneResult) {
                        fortuneResult.style.display = 'block';

                        // Scroll to fortune result
                        fortuneResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 1000);
            });
        });
    }

    function formatTeaName(code) {
        const names = {
            'jasmine': 'Teh Jasmine',
            'black': 'Teh Hitam',
            'green': 'Teh Hijau',
            'peppermint': 'Teh Peppermint',
            'oolong': 'Teh Oolong'
        };

        return names[code] || code;
    }
}