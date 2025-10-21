# English With Simo - Video Platform

A modern, responsive video platform for English With Simo's second-year baccalaureate students. This platform provides an organized way to access YouTube lessons with a beautiful, mobile-friendly interface.

## 🌟 Features

- **Modern Design**: Beautiful gradient backgrounds, smooth animations, and elegant typography
- **Responsive Layout**: Perfect display on desktop, tablet, and mobile devices
- **Arabic & English Support**: Uses Cairo font for Arabic text and Poppins for English
- **Dynamic Content Loading**: Automatically loads lessons from videos.txt file
- **Search Functionality**: Search through lessons by title or keywords
- **Dark/Light Theme**: Toggle between light and dark modes
- **Unit Organization**: Lessons organized by units with easy navigation
- **YouTube Integration**: Seamless YouTube video embedding
- **Mobile-First Design**: Optimized for mobile devices with touch-friendly interface

## 📁 Project Structure

```
/
├── index.html          # Main HTML file
├── style.css           # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── videos.txt          # Lessons data (units, titles, YouTube links)
└── README.md           # This documentation file
```

## 🚀 Quick Start

1. **Clone or Download** the project files
2. **Edit videos.txt** with your actual YouTube links
3. **Upload to GitHub** (see deployment instructions below)
4. **Enable GitHub Pages** in repository settings
5. **Access your site** at the provided GitHub Pages URL

## 📊 Content Structure

The platform includes 11 units with 60+ total lessons:
1. **مواهب الشباب (The Gifts of Youth)** - 5 lessons
2. **المرح والفكاهة (Humour and Comedy)** - 5 lessons
3. **التربية والتعليم (Education and Learning)** - 5 lessons
4. **التنمية المستدامة (Sustainable Development)** - 5 lessons
5. **المرأة والسلطة (Women and Power)** - 5 lessons
6. **القيم والقضايا الثقافية (Cultural Values and Issues)** - 5 lessons
7. **المواطنة (Citizenship)** - 5 lessons
8. **المنظمات العالمية (International Organizations)** - 5 lessons
9. **العلوم والتكنولوجيا (Science and Technology)** - 5 lessons
10. **هجرة الأدمغة (Brain Drain)** - 5 lessons
11. **تصحيح الامتحانات الوطنية (National Exam Corrections)** - 10 lessons

Each lesson includes:
- Grammar topics
- Reading comprehension
- Writing skills
- Speaking functions
- Real YouTube video content from English With Simo

## 📝 Data Format

The `videos.txt` file should follow this format:

```
Unit 1 - Education
Lesson 1: Talking about school life | https://www.youtube.com/watch?v=VIDEO_ID
Lesson 2: Expressing opinions | https://www.youtube.com/watch?v=VIDEO_ID

Unit 2 - Environment
Lesson 1: Climate Change | https://www.youtube.com/watch?v=VIDEO_ID
Lesson 2: Green energy | https://www.youtube.com/watch?v=VIDEO_ID
```

### Format Rules:
- Each unit starts with `Unit X - Unit Title`
- Each lesson follows with `Lesson X: Title | YouTube URL`
- Empty lines are ignored
- YouTube URLs can be in various formats (watch, youtu.be, embed)

## 🌐 Deployment on GitHub Pages

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click "New repository"
3. Name your repository (e.g., `english-with-simo-platform`)
4. Make it public
5. Click "Create repository"

### Step 2: Upload Files
1. In your repository, click "uploading an existing file"
2. Drag and drop all project files:
   - `index.html`
   - `style.css`
   - `script.js`
   - `videos.txt`
3. Add commit message: "Initial upload of English With Simo platform"
4. Click "Commit changes"

### Step 3: Enable GitHub Pages
1. Go to your repository's **Settings** tab
2. Scroll down to **Pages** section
3. Under **Source**, select "Deploy from a branch"
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

### Step 4: Access Your Site
- Your site will be available at: `https://[your-username].github.io/[repository-name]`
- Example: `https://johndoe.github.io/english-with-simo-platform`
- It may take 5-10 minutes to deploy initially

## 🎨 Customization

### Colors and Themes
Edit CSS variables in `style.css`:
```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    /* ... other variables */
}
```

### Adding New Units
Simply add new units to `videos.txt`:
```
Unit 9 - New Topic
Lesson 1: New lesson title | https://www.youtube.com/watch?v=NEW_VIDEO_ID
```

### Fonts
The platform uses Google Fonts:
- **Arabic**: Cairo (primary), Tajawal (fallback)
- **English**: Poppins (primary), Inter (fallback)

To change fonts, update the Google Fonts link in `index.html` and CSS variables in `style.css`.

## 📱 Mobile Optimization

The platform is fully responsive with:
- **Mobile-first design**: Optimized for touch devices
- **Large tap targets**: Easy to use on mobile
- **Swipe-friendly**: Smooth animations and transitions
- **Fast loading**: Optimized for mobile networks
- **Offline-friendly**: Works with cached content

## 🔍 Search Functionality

The search feature allows users to:
- Search by lesson title
- Search by unit name
- Search by lesson number
- Get instant results with highlighting
- Clear search to return to units view

## 🌙 Dark/Light Mode

- Toggle button in bottom-left corner
- Remembers user preference in localStorage
- Smooth transition between themes
- Optimized colors for both modes

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: No frameworks, pure ES6+ JavaScript
- **Fetch API**: For loading videos.txt data
- **Local Storage**: For theme preferences

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Features
- Lazy loading of video embeds
- Optimized animations with CSS transforms
- Efficient DOM manipulation
- Minimal JavaScript bundle size

## 📊 Adding Real YouTube Videos

Replace the sample YouTube URLs in `videos.txt` with actual video links:

1. **Get YouTube Video ID**: From any YouTube video URL
   - `https://www.youtube.com/watch?v=VIDEO_ID`
   - `https://youtu.be/VIDEO_ID`

2. **Update videos.txt**: Replace sample URLs with real ones

3. **Test**: Refresh your GitHub Pages site to see changes

## 🎯 Future Enhancements

Potential features to add:
- Video progress tracking
- Playlist functionality
- Download links for materials
- Student progress dashboard
- Multi-language support
- Video thumbnails
- Comments system
- Offline video support

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Verify videos.txt format is correct
3. Ensure YouTube URLs are valid
4. Check GitHub Pages deployment status

## 📄 License

© 2025 English With Simo | All rights reserved.

---

**Built with ❤️ for English With Simo students**
