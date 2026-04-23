# English With Simo Android App (WebView)

This folder contains a ready-to-build Android Studio project that wraps the live site:

- Home URL: `https://www.simofiles.com/`
- Package: `com.englishwithsimo.app`
- Min SDK: 24
- Target/Compile SDK: 34

## What is included

- Production WebView configuration (JavaScript, DOM storage, cookies, mixed content compatibility)
- External link handling:
  - Internal site + YouTube stays inside app
  - `tel:`, `mailto:`, `sms:`, and non-internal hosts open via Android intents
- Back navigation:
  - Goes back inside WebView history first
  - Exits app when history is empty
- Splash screen theme with branded gradient background and logo vector
- Adaptive launcher icon resources

## Open and run

1. Open Android Studio
2. Choose **Open** and select:
   - `android-app/`
3. Let Gradle sync complete
4. Run on emulator or device

## Build APK

In Android Studio:

- **Build > Build Bundle(s) / APK(s) > Build APK(s)**

Or terminal:

```bash
cd android-app
./gradlew assembleDebug
```

Debug APK output:

`app/build/outputs/apk/debug/app-debug.apk`

## Release checklist

- Replace default launcher icons with your final branding assets
- Update `versionCode` and `versionName` in `app/build.gradle.kts`
- Create signed release build in Android Studio
- Test on at least one phone + one tablet

## Optional offline mode

Current app loads the live website URL for automatic content updates.
If you want a fully offline app, move website files into:

`app/src/main/assets/`

and change the load URL in `MainActivity.kt` to:

`file:///android_asset/index.html`
