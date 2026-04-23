/**
 * English With Simo Video Platform
 * Dynamic content loading and navigation system
 */

class VideoPlatform {
    constructor() {
        this.videosData = [];
        this.currentView = 'units';
        this.currentUnit = null;
        this.searchResults = [];
        this.interactiveExercisesData = {
            1: [
                {
                    type: 'الوحدة الأولى',
                    title: 'Unit One Interactive Exercises',
                    description: 'Vocabulary, grammar, functions, and writing practice for Unit 1 (Gifts of Youth).',
                    link: 'unit1-interactive-exercises.html',
                    buttonText: 'فتح التمارين التفاعلية'
                }
            ],
            2: [
                {
                    type: 'الوحدة الثانية',
                    title: 'Unit Two Interactive Exercises',
                    description: 'Humour and Comedy practice exercises for vocabulary, language functions, modals, and writing.',
                    link: 'unit2-interactive-exercises.html',
                    buttonText: 'فتح التمارين التفاعلية'
                }
            ],
            3: [
                {
                    type: 'الوحدة الثالثة',
                    title: 'Unit Three Interactive Exercises',
                    description: 'Education and Illiteracy practice for vocabulary, language functions, grammar, and writing.',
                    link: 'unit3-interactive-exercises.html',
                    buttonText: 'فتح التمارين التفاعلية'
                }
            ],
            4: [
                {
                    type: 'الوحدة الرابعة',
                    title: 'Unit Four Interactive Exercises',
                    description: 'Environment and Social Issues practice for vocabulary, language functions, grammar, and writing.',
                    link: 'unit4-interactive-exercises.html',
                    buttonText: 'فتح التمارين التفاعلية'
                }
            ],
            5: [
                {
                    type: 'الوحدة الخامسة',
                    title: 'Unit Five Interactive Exercises',
                    description: 'Women and Society practice for vocabulary, language functions, passive voice, and writing.',
                    link: 'unit5-interactive-exercises.html',
                    buttonText: 'فتح التمارين التفاعلية'
                }
            ],
            6: [
                {
                    type: 'الوحدة السادسة',
                    title: 'Unit Six Interactive Exercises',
                    description: 'Culture and Values practice for vocabulary, language functions, phrasal verbs, and writing.',
                    link: 'unit6-interactive-exercises.html',
                    buttonText: 'فتح التمارين التفاعلية'
                }
            ],
            7: [
                {
                    type: 'الوحدة السابعة',
                    title: 'Unit Seven Interactive Exercises',
                    description: 'Citizenship practice for vocabulary, language functions, reported speech, and writing.',
                    link: 'unit7-interactive-exercises.html',
                    buttonText: 'فتح التمارين التفاعلية'
                }
            ],
            8: [
                {
                    type: 'الوحدة الثامنة',
                    title: 'Unit Eight Interactive Exercises',
                    description: 'International Organizations practice for vocabulary, language functions, linking words, and writing.',
                    link: 'unit8-interactive-exercises.html',
                    buttonText: 'فتح التمارين التفاعلية'
                }
            ],
            9: [
                {
                    type: 'الوحدة التاسعة',
                    title: 'Unit Nine Interactive Exercises',
                    description: 'Science and Technology practice for vocabulary, conditional type three, wishes/regrets, and writing.',
                    link: 'unit9-interactive-exercises.html',
                    buttonText: 'فتح التمارين التفاعلية'
                }
            ],
            10: [
                {
                    type: 'الوحدة العاشرة',
                    title: 'Unit Ten Interactive Exercises',
                    description: 'Brain Drain practice for vocabulary, relative pronouns, wishes/regrets, and writing.',
                    link: 'unit10-interactive-exercises.html',
                    buttonText: 'فتح التمارين التفاعلية'
                }
            ]
        };
        
        // Unit icons mapping (Font Awesome)
        this.unitIcons = {
            1: '<i class="fas fa-star"></i>', // Youth
            2: '<i class="fas fa-smile"></i>', // Humor
            3: '<i class="fas fa-book-open"></i>', // Education
            4: '<i class="fas fa-leaf"></i>', // Sustainable Development
            5: '<i class="fas fa-female"></i>', // Women and Power
            6: '<i class="fas fa-university"></i>', // Cultural Values
            7: '<i class="fas fa-landmark"></i>', // Citizenship
            8: '<i class="fas fa-globe"></i>', // International Organizations
            9: '<i class="fas fa-microscope"></i>', // Science and Technology
            10: '<i class="fas fa-brain"></i>', // Brain Drain
            11: '<i class="fas fa-file-alt"></i>' // Exam Corrections
        };
        
        // Vibrant color schemes for each unit
        this.unitColors = {
            1: 'var(--sunset-gradient)', // Youth - Energetic orange/red
            2: 'var(--cosmic-gradient)', // Humor - Fun purple/magenta
            3: 'var(--ocean-gradient)', // Education - Calming blue
            4: 'var(--forest-gradient)', // Sustainable Development - Natural green
            5: 'var(--royal-gradient)', // Women and Power - Royal purple
            6: 'var(--warning-gradient)', // Cultural Values - Warm amber
            7: 'var(--primary-gradient)', // Citizenship - Primary indigo
            8: 'var(--accent-gradient)', // International Organizations - Teal
            9: 'var(--secondary-gradient)', // Science and Technology - Cyan
            10: 'var(--success-gradient)', // Brain Drain - Success green
            11: 'var(--sunset-gradient)' // Exam Corrections - Urgent orange
        };
        
        this.init();
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            await this.loadVideosData();
            this.syncInteractiveExercisesUnits();
            console.log('Videos data loaded:', this.videosData.length, 'units');
            this.setupEventListeners();
            this.renderUnits();
            this.hideLoading();
        } catch (error) {
            console.error('Error initializing application:', error);
            this.showError('حدث خطأ في تحميل البيانات');
        }
    }

    /**
     * Load videos data from videos.txt file
     */
    async loadVideosData() {
        try {
            const response = await fetch('videos.txt');
            if (!response.ok) {
                throw new Error('Failed to load videos data');
            }
            
            const text = await response.text();
            this.parseVideosData(text);
        } catch (error) {
            console.error('Error loading videos data:', error);
            // Fallback to sample data if file not found
            this.loadSampleData();
        }
    }

    /**
     * Parse videos data from text format
     */
    parseVideosData(text) {
        this.videosData = []; // Reset data
        const lines = text.split('\n').filter(line => line.trim());
        let currentUnit = null;
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            
            // Check if it's a unit line
            if (trimmedLine.startsWith('Unit ')) {
                const unitMatch = trimmedLine.match(/Unit (\d+)\s*-\s*(.+)/);
                if (unitMatch) {
                    currentUnit = {
                        number: parseInt(unitMatch[1]),
                        title: unitMatch[2].trim(),
                        lessons: []
                    };
                    this.videosData.push(currentUnit);
                }
            }
            // Check if it's a lesson line
            else if (trimmedLine.startsWith('Lesson ') && currentUnit) {
                const lessonMatch = trimmedLine.match(/Lesson (\d+):\s*(.+?)\s*\|\s*(.+)/);
                if (lessonMatch) {
                    const lesson = {
                        number: parseInt(lessonMatch[1]),
                        title: lessonMatch[2].trim(),
                        url: lessonMatch[3].trim(),
                        unitNumber: currentUnit.number,
                        unitTitle: currentUnit.title
                    };
                    currentUnit.lessons.push(lesson);
                }
            }
        }
        
        // Sort units by number
        this.videosData.sort((a, b) => a.number - b.number);
        
        // Sort lessons within each unit
        this.videosData.forEach(unit => {
            unit.lessons.sort((a, b) => a.number - b.number);
        });
    }

    /**
     * Load sample data if videos.txt is not available
     */
    loadSampleData() {
        this.videosData = [
            {
                number: 1,
                title: "مواهب الشباب (The Gifts of Youth)",
                lessons: [
                    {
                        number: 1,
                        title: "The Gifts of Youth",
                        url: "https://youtu.be/8EvYzk7qOrg",
                        unitNumber: 1,
                        unitTitle: "مواهب الشباب (The Gifts of Youth)"
                    },
                    {
                        number: 2,
                        title: "Expressing Opinion - Agreeing and Disagreeing",
                        url: "https://youtu.be/2uaEYxM_0NA",
                        unitNumber: 1,
                        unitTitle: "مواهب الشباب (The Gifts of Youth)"
                    },
                    {
                        number: 3,
                        title: "Gerund and Infinitive",
                        url: "https://youtu.be/eLfbcNUydiA",
                        unitNumber: 1,
                        unitTitle: "مواهب الشباب (The Gifts of Youth)"
                    }
                ]
            },
            {
                number: 2,
                title: "المرح والفكاهة (Humour and Comedy)",
                lessons: [
                    {
                        number: 1,
                        title: "Humour and Comedy",
                        url: "https://youtu.be/7Y4FXYJeE44",
                        unitNumber: 2,
                        unitTitle: "المرح والفكاهة (Humour and Comedy)"
                    },
                    {
                        number: 2,
                        title: "Expressing Lack of Understanding and Asking for Clarification",
                        url: "https://youtu.be/3frmP1QsToI",
                        unitNumber: 2,
                        unitTitle: "المرح والفكاهة (Humour and Comedy)"
                    }
                ]
            }
        ];
    }


    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Back button
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.showUnits());
        }

        // Clear search button
        const clearSearchBtn = document.getElementById('clearSearchBtn');
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => this.clearSearch());
        }

        // Interactive exercises buttons
        const interactiveExercisesBtn = document.getElementById('interactiveExercisesBtn');
        if (interactiveExercisesBtn) {
            interactiveExercisesBtn.addEventListener('click', () => this.showInteractiveExercises());
        }

        const backToLessonsBtn = document.getElementById('backToLessonsBtn');
        if (backToLessonsBtn) {
            backToLessonsBtn.addEventListener('click', () => {
                if (this.currentUnit) {
                    this.showView('lessons');
                } else {
                    this.showUnits();
                }
            });
        }

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query.length > 2) {
                    this.performSearch(query);
                } else if (query.length === 0) {
                    this.clearSearch();
                }
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const query = e.target.value.trim();
                    if (query.length > 0) {
                        this.performSearch(query);
                    }
                }
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const query = searchInput.value.trim();
                if (query.length > 0) {
                    this.performSearch(query);
                }
            });
        }

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Initialize theme
        this.initializeTheme();
    }

    /**
     * Render units view
     */
    renderUnits() {
        const unitsGrid = document.getElementById('unitsGrid');
        if (!unitsGrid) return;

        unitsGrid.innerHTML = '';

        if (this.videosData.length === 0) {
            unitsGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary);"><p>لا توجد وحدات متاحة</p></div>';
            return;
        }

        this.videosData.forEach(unit => {
            const unitCard = this.createUnitCard(unit);
            unitsGrid.appendChild(unitCard);
        });

        this.showView('units');
    }

    /**
     * Convert number to Arabic ordinal
     */
    getArabicOrdinal(number) {
        const arabicOrdinals = {
            1: 'الأولى',
            2: 'الثانية',
            3: 'الثالثة',
            4: 'الرابعة',
            5: 'الخامسة',
            6: 'السادسة',
            7: 'السابعة',
            8: 'الثامنة',
            9: 'التاسعة',
            10: 'العاشرة',
            11: 'الحادية عشرة'
        };
        return arabicOrdinals[number] || `ال${number}`;
    }
    
    getArabicLessonTitle(englishTitle) {
        const arabicTitles = {
            'The Gifts of Youth': 'مواهب الشباب',
            'Expressing Opinion - Agreeing and Disagreeing': 'التعبير عن الرأي - الموافقة والاختلاف',
            'Gerund and Infinitive': 'المصدر والفعل المضارع',
            'Reading Comprehension': 'فهم المقروء',
            'Writing a Descriptive Paragraph': 'كتابة فقرة وصفية',
            'Humour and Comedy': 'المرح والفكاهة',
            'Expressing Lack of Understanding and Asking for Clarification': 'التعبير عن عدم الفهم وطلب التوضيح',
            'Simple Modals and Perfect Modals': 'الأفعال المساعدة البسيطة والكاملة',
            'Writing a Funny Story': 'كتابة قصة مضحكة',
            'Education and Learning': 'التربية والتعليم',
            'Expressing Purpose': 'التعبير عن الهدف',
            'Simple Past and Past Perfect': 'الماضي البسيط والماضي التام',
            'Writing a Report': 'كتابة تقرير',
            'Sustainable Development': 'التنمية المستدامة',
            'Expressing Cause and Effect': 'التعبير عن السبب والنتيجة',
            'Future Perfect and Future Perfect Continuous': 'المستقبل التام والمستقبل التام المستمر',
            'Writing an Article': 'كتابة مقال',
            'Women and Power': 'المرأة والقوة',
            'Expressing Contrast': 'التعبير عن التباين',
            'Passive Voice': 'المبني للمجهول',
            'Writing a Biography': 'كتابة سيرة ذاتية',
            'Cultural Values': 'القيم الثقافية',
            'Expressing Addition': 'التعبير عن الإضافة',
            'Reported Speech': 'الكلام المنقول',
            'Writing a Formal Letter': 'كتابة رسالة رسمية',
            'Citizenship': 'المواطنة',
            'Expressing Condition': 'التعبير عن الشرط',
            'Conditional Type 2 and 3': 'الجملة الشرطية النوع الثاني والثالث',
            'Writing an Argumentative Essay': 'كتابة مقال جدلي',
            'International Organizations': 'المنظمات الدولية',
            'Expressing Emphasis': 'التعبير عن التأكيد',
            'Cleft Sentences': 'الجمل المنقسمة',
            'Writing a Summary': 'كتابة ملخص',
            'Science and Technology': 'العلم والتكنولوجيا',
            'Expressing Certainty and Uncertainty': 'التعبير عن اليقين وعدم اليقين',
            'Present Perfect Continuous and Past Perfect Continuous': 'المضارع التام المستمر والماضي التام المستمر',
            'Writing a Research Paper': 'كتابة ورقة بحثية',
            'Brain Drain': 'هجرة الأدمغة',
            'Expressing Concession': 'التعبير عن التنازل',
            'Subjunctive Mood': 'صيغة الشرط',
            'Writing a Proposal': 'كتابة اقتراح',
            'Exam Corrections': 'تصحيح الامتحانات'
        };
        return arabicTitles[englishTitle] || englishTitle;
    }

    /**
     * Create unit card element
     */
    createUnitCard(unit) {
        const card = document.createElement('div');
        card.className = 'unit-card fade-in';
        
        // Extract Arabic and English titles
        const titleParts = unit.title.split(' (');
        const arabicTitle = titleParts[0];
        const englishTitle = titleParts[1] ? titleParts[1].replace(')', '') : '';
        
        // Get icon for this unit
        const icon = this.unitIcons[unit.number] || '<i class="fas fa-book"></i>';
        
        // Get Arabic ordinal number
        const arabicOrdinal = this.getArabicOrdinal(unit.number);
        
        // Get vibrant color for this unit
        const unitColor = this.unitColors[unit.number] || 'var(--primary-gradient)';
        
        // Apply dynamic color to the card
        card.style.setProperty('--unit-gradient', unitColor);
        
        card.innerHTML = `
            <div class="unit-icon">${icon}</div>
            <div class="unit-number">الوحدة ${arabicOrdinal}</div>
            <div class="unit-titles">
                <div class="unit-title-arabic">${arabicTitle}</div>
                <div class="unit-title-english">${englishTitle}</div>
            </div>
            <div class="unit-lessons-count"><i class="fas fa-play-circle"></i> ${unit.lessons.length} ${unit.lessons.length === 1 ? 'درس' : 'دروس'}</div>
        `;

        card.addEventListener('click', () => this.showUnit(unit));
        return card;
    }

    /**
     * Show specific unit lessons
     */
    showUnit(unit) {
        this.currentUnit = unit;
        this.currentView = 'lessons';
        
        const currentUnitTitle = document.getElementById('currentUnitTitle');
        if (currentUnitTitle) {
            currentUnitTitle.textContent = `الوحدة ${unit.number} - ${unit.title}`;
        }

        this.renderLessons(unit.lessons);
        this.updateInteractiveExercisesButton(unit);
        this.showView('lessons');
    }

    /**
     * Ensure each unit has an interactive exercises slot
     */
    syncInteractiveExercisesUnits() {
        const syncedData = {};

        this.videosData.forEach(unit => {
            syncedData[unit.number] = this.interactiveExercisesData[unit.number] || [];
        });

        this.interactiveExercisesData = syncedData;
    }

    /**
     * Return interactive exercises for a unit
     */
    getInteractiveExercisesForUnit(unitNumber) {
        return this.interactiveExercisesData[unitNumber] || [];
    }

    /**
     * Update interactive exercises button label based on current unit
     */
    updateInteractiveExercisesButton(unit) {
        const interactiveExercisesBtn = document.getElementById('interactiveExercisesBtn');
        if (!interactiveExercisesBtn) return;

        if (!unit) {
            interactiveExercisesBtn.innerHTML = '<i class="fas fa-pen-ruler"></i><span>تمارين تفاعلية</span>';
            interactiveExercisesBtn.disabled = true;
            return;
        }

        const exercisesCount = this.getInteractiveExercisesForUnit(unit.number).length;
        const label = exercisesCount > 0 ? `تمارين تفاعلية (${exercisesCount})` : 'تمارين تفاعلية';

        interactiveExercisesBtn.innerHTML = `<i class="fas fa-pen-ruler"></i><span>${label}</span>`;
        interactiveExercisesBtn.disabled = false;
    }

    /**
     * Show interactive exercises for the selected unit
     */
    showInteractiveExercises() {
        if (!this.currentUnit) return;

        this.currentView = 'interactiveExercises';
        this.renderInteractiveExercises(this.currentUnit);
        this.showView('interactiveExercises');
    }

    /**
     * Render interactive exercises for a unit
     */
    renderInteractiveExercises(unit) {
        const interactiveExercisesTitle = document.getElementById('interactiveExercisesTitle');
        const interactiveExercisesGrid = document.getElementById('interactiveExercisesGrid');
        if (!interactiveExercisesGrid) return;

        if (interactiveExercisesTitle) {
            interactiveExercisesTitle.textContent = `تمارين تفاعلية - الوحدة ${unit.number}`;
        }

        const exercises = this.getInteractiveExercisesForUnit(unit.number);
        interactiveExercisesGrid.innerHTML = '';

        if (exercises.length === 0) {
            interactiveExercisesGrid.innerHTML = `
                <div class="exercise-card exercise-card-empty">
                    <div class="exercise-empty-icon"><i class="fas fa-hourglass-half"></i></div>
                    <h3 class="exercise-title">لا توجد تمارين تفاعلية بعد</h3>
                    <p class="exercise-description">
                        سيتم إضافة تمارين تفاعلية للوحدة ${unit.number} قريباً.
                    </p>
                </div>
            `;
            return;
        }

        exercises.forEach((exercise, index) => {
            const exerciseCard = this.createInteractiveExerciseCard(exercise, index);
            interactiveExercisesGrid.appendChild(exerciseCard);
        });
    }

    /**
     * Create interactive exercise card
     */
    createInteractiveExerciseCard(exercise, index) {
        const card = document.createElement('div');
        card.className = 'exercise-card fade-in';
        card.style.animationDelay = `${index * 0.08}s`;

        const typeLabel = exercise.type || 'تمرين تفاعلي';
        const title = exercise.title || `تمرين ${index + 1}`;
        const description = exercise.description || 'حل هذا التمرين لقياس فهمك للدروس.';
        const buttonText = exercise.buttonText || 'ابدأ التمرين';

        card.innerHTML = `
            <div class="exercise-card-header">
                <span class="exercise-badge">${typeLabel}</span>
            </div>
            <h3 class="exercise-title">${title}</h3>
            <p class="exercise-description">${description}</p>
            ${
                exercise.link
                    ? `<a href="${exercise.link}" target="_blank" rel="noopener noreferrer" class="exercise-link">${buttonText}</a>`
                    : '<span class="exercise-link disabled">سيتم نشر التمرين قريباً</span>'
            }
        `;

        return card;
    }

    /**
     * Render lessons for a unit
     */
    renderLessons(lessons) {
        const lessonsGrid = document.getElementById('lessonsGrid');
        if (!lessonsGrid) return;

        lessonsGrid.innerHTML = '';

        lessons.forEach((lesson, index) => {
            const lessonCard = this.createLessonCard(lesson, index);
            lessonsGrid.appendChild(lessonCard);
        });
    }

    /**
     * Create lesson card element
     */
    createLessonCard(lesson, index) {
        const card = document.createElement('div');
        card.className = 'lesson-card fade-in';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const embedUrl = this.convertToEmbedUrl(lesson.url);
        
        card.innerHTML = `
            <div class="lesson-title-container">
                <div class="lesson-title-arabic">الدرس ${lesson.number}: ${this.getArabicLessonTitle(lesson.title)}</div>
                <div class="lesson-title-english">${lesson.title}</div>
            </div>
            <div class="video-container">
                <iframe 
                    src="${embedUrl}" 
                    title="${lesson.title}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    loading="lazy"
                    referrerpolicy="strict-origin-when-cross-origin">
                </iframe>
            </div>
        `;

        return card;
    }

    /**
     * Convert YouTube URL to embed URL
     */
    convertToEmbedUrl(url) {
        // If already an embed URL, return as is
        if (url.includes('embed')) {
            return url;
        }
        
        // Extract video ID from various YouTube URL formats
        let videoId = '';
        
        // Handle youtu.be format
        if (url.includes('youtu.be/')) {
            const match = url.match(/youtu\.be\/([^&\n?#]+)/);
            if (match) {
                videoId = match[1];
            }
        }
        // Handle youtube.com/watch format
        else if (url.includes('youtube.com/watch')) {
            const match = url.match(/[?&]v=([^&\n?#]+)/);
            if (match) {
                videoId = match[1];
            }
        }
        // Handle youtube.com/embed format
        else if (url.includes('youtube.com/embed/')) {
            const match = url.match(/embed\/([^&\n?#]+)/);
            if (match) {
                videoId = match[1];
            }
        }
        
        // Return proper embed URL with enhanced parameters for better playback
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&autoplay=0&controls=1&fs=1&iv_load_policy=3`;
        }
        
        console.warn('Could not extract video ID from URL:', url);
        return url; // Return original if no pattern matches
    }

    /**
     * Perform search functionality
     */
    performSearch(query) {
        this.searchResults = [];
        
        this.videosData.forEach(unit => {
            unit.lessons.forEach(lesson => {
                if (this.matchesSearch(lesson, query)) {
                    this.searchResults.push(lesson);
                }
            });
        });

        this.renderSearchResults();
        this.showView('searchResults');
    }

    /**
     * Check if lesson matches search query
     */
    matchesSearch(lesson, query) {
        const searchText = `${lesson.title} ${lesson.unitTitle} درس ${lesson.number} وحدة ${lesson.unitNumber}`.toLowerCase();
        const queryLower = query.toLowerCase();
        return searchText.includes(queryLower);
    }

    /**
     * Render search results
     */
    renderSearchResults() {
        const searchResultsTitle = document.getElementById('searchResultsTitle');
        const searchResultsGrid = document.getElementById('searchResultsGrid');
        
        if (searchResultsTitle) {
            searchResultsTitle.textContent = `نتائج البحث (${this.searchResults.length} ${this.searchResults.length === 1 ? 'درس' : 'دروس'})`;
        }
        
        if (searchResultsGrid) {
            searchResultsGrid.innerHTML = '';
            
            if (this.searchResults.length === 0) {
                searchResultsGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary);">
                        <p>لم يتم العثور على نتائج</p>
                    </div>
                `;
                return;
            }
            
            this.searchResults.forEach((lesson, index) => {
                const lessonCard = this.createLessonCard(lesson, index);
                searchResultsGrid.appendChild(lessonCard);
            });
        }
    }

    /**
     * Clear search and return to units view
     */
    clearSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }
        
        this.searchResults = [];
        this.showUnits();
    }

    /**
     * Show units view
     */
    showUnits() {
        this.currentView = 'units';
        this.currentUnit = null;
        this.updateInteractiveExercisesButton(null);
        this.showView('units');
    }

    /**
     * Show specific view and hide others
     */
    showView(viewName) {
        const views = ['units', 'lessons', 'interactiveExercises', 'searchResults'];
        
        views.forEach(view => {
            const element = document.getElementById(`${view}View`);
            if (element) {
                if (view === viewName) {
                    element.classList.remove('hidden');
                } else {
                    element.classList.add('hidden');
                }
            }
        });
    }

    /**
     * Toggle dark/light theme
     */
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        }
    }

    /**
     * Initialize theme from localStorage
     */
    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        }
    }

    /**
     * Hide loading animation
     */
    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 500);
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        const mainContent = document.querySelector('.main-content .container');
        if (mainContent) {
            mainContent.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    <h2>⚠️ ${message}</h2>
                    <p>يرجى المحاولة مرة أخرى</p>
                </div>
            `;
        }
        this.hideLoading();
    }
}

// GitHub Pages Deployment Instructions
/*
=== DEPLOYMENT INSTRUCTIONS ===

1. Upload Files to GitHub:
   - Create a new repository on GitHub
   - Upload all files (index.html, style.css, script.js, videos.txt)
   - Commit and push to the main branch

2. Enable GitHub Pages:
   - Go to repository Settings
   - Scroll down to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. Access Your Site:
   - Your site will be available at: https://[your-username].github.io/[repository-name]
   - It may take a few minutes to deploy

4. Custom Domain (Optional):
   - In Pages settings, add your custom domain
   - Update DNS settings with your domain provider

5. Updating Content:
   - Edit videos.txt file to add/remove lessons
   - Commit and push changes
   - GitHub Pages will automatically update

=== FILE STRUCTURE ===
/
├── index.html          (Main HTML file)
├── style.css           (CSS styles)
├── script.js           (JavaScript functionality)
├── videos.txt          (Lessons data)
└── README.md           (Optional documentation)
*/

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideoPlatform();
});
