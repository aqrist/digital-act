// Document ready function
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initTehPersonality();
    initSpiritSwap();
    initBlendGame();
    initFortuneTeller();
    initSipSnap();
});

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
function initSpiritSwap() {
    const characterCards = document.querySelectorAll('.character-card');
    const captureFaceBtn = document.getElementById('capture-face');
    const retryCaptureBtn = document.getElementById('retry-capture');
    const initialSpiritMessage = document.querySelector('.initial-spirit-message');
    const spiritResultContainer = document.querySelector('.spirit-result-container');
    const spiritResultTitle = document.getElementById('spirit-result-title');
    const spiritWebcam = document.getElementById('spirit-webcam');

    // Initialize webcam simulation
    if (spiritWebcam) {
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

            spiritWebcam.src = ctx.canvas.toDataURL();
            requestAnimationFrame(drawWebcamSimulation);
        }

        drawWebcamSimulation();
    }

    if (characterCards.length) {
        characterCards.forEach(card => {
            card.addEventListener('click', function () {
                // Remove selected class from all cards
                characterCards.forEach(c => c.classList.remove('selected'));

                // Add selected class to clicked card
                this.classList.add('selected');

                // Enable capture button
                if (captureFaceBtn) captureFaceBtn.disabled = false;

                // Update result title based on selected character
                const character = this.getAttribute('data-character');
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

    if (captureFaceBtn) {
        captureFaceBtn.addEventListener('click', function () {
            // Disable capture button
            captureFaceBtn.disabled = true;

            // Simulate processing
            setTimeout(() => {
                // Show result
                initialSpiritMessage.classList.add('d-none');
                spiritResultContainer.classList.remove('d-none');

                captureFaceBtn.classList.add('d-none');
                if (retryCaptureBtn) retryCaptureBtn.classList.remove('d-none');
            }, 2000);
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
        });
    }
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

// 5. Sip & Snap Challenge
function initSipSnap() {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const uploadPreview = document.querySelector('.upload-preview');
    const previewImage = document.getElementById('preview-image');
    const analyzePhotoBtn = document.getElementById('analyze-photo');
    const reuploadBtn = document.getElementById('reupload');
    const ratingResult = document.querySelector('.rating-result');

    if (dropArea && fileInput) {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false);
        });

        function highlight() {
            dropArea.classList.add('dragover');
        }

        function unhighlight() {
            dropArea.classList.remove('dragover');
        }

        // Handle dropped files
        dropArea.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;

            if (files.length) {
                // Show preview
                showUploadPreview();
            }
        }

        // Handle file input changes
        fileInput.addEventListener('change', function () {
            if (this.files.length) {
                // Show preview
                showUploadPreview();
            }
        });

        // Click on drop area also triggers file input
        dropArea.addEventListener('click', function () {
            fileInput.click();
        });

        function showUploadPreview() {
            dropArea.style.display = 'none';
            uploadPreview.style.display = 'block';

            // Create random image preview for demo
            if (previewImage) {
                const randomImage = createRandomTeaImage();
                previewImage.src = randomImage;
            }
        }

        function createRandomTeaImage() {
            // Create a canvas for generating a random tea image
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 400;
            canvas.height = 300;

            // Draw background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#f5f5f5');
            gradient.addColorStop(1, '#e0e0e0');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw a tea cup
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI, true);
            ctx.lineTo(canvas.width / 2 - 100, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2 + 20, 100, Math.PI, 0, true);
            ctx.lineTo(canvas.width / 2 + 100, canvas.height / 2);
            ctx.fillStyle = '#8B4513';
            ctx.fill();

            // Draw the tea liquid
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 75, 0, Math.PI, true);
            ctx.lineTo(canvas.width / 2 - 75, canvas.height / 2);
            ctx.lineTo(canvas.width / 2 + 75, canvas.height / 2);
            ctx.fillStyle = '#d4a76a';
            ctx.fill();

            // Draw cup handle
            ctx.beginPath();
            ctx.ellipse(canvas.width / 2 + 120, canvas.height / 2 + 20, 20, 40, 0, Math.PI * 1.5, Math.PI * 0.5);
            ctx.strokeStyle = '#8B4513';
            ctx.lineWidth = 10;
            ctx.stroke();

            // Add some steam
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                const startX = canvas.width / 2 - 30 + i * 30;
                const startY = canvas.height / 2 - 10;
                ctx.moveTo(startX, startY);

                ctx.bezierCurveTo(
                    startX - 10, startY - 30,
                    startX + 10, startY - 60,
                    startX - 5, startY - 90
                );

                ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
                ctx.lineWidth = 3;
                ctx.stroke();
            }

            // Add "Tong Tji" text
            ctx.font = 'bold 24px Arial';
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.fillText('Tong Tji', canvas.width / 2, canvas.height / 2 + 10);

            return canvas.toDataURL();
        }

        if (analyzePhotoBtn) {
            analyzePhotoBtn.addEventListener('click', function () {
                // Simulate analysis
                analyzePhotoBtn.disabled = true;
                analyzePhotoBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Menganalisis...';

                setTimeout(() => {
                    // Show result
                    if (ratingResult) ratingResult.style.display = 'block';
                    analyzePhotoBtn.disabled = false;
                    analyzePhotoBtn.innerHTML = '<i class="fas fa-magic me-1"></i> Analisis Tea Vibe';
                }, 2000);
            });
        }

        if (reuploadBtn) {
            reuploadBtn.addEventListener('click', function () {
                // Reset to initial state
                dropArea.style.display = 'block';
                uploadPreview.style.display = 'none';
                if (ratingResult) ratingResult.style.display = 'none';
            });
        }
    }
}