package com.englishwithsimo.app

import android.annotation.SuppressLint
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.webkit.CookieManager
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webView)
        configureWebView(webView)

        if (savedInstanceState == null) {
            webView.loadUrl(HOME_URL)
        } else {
            webView.restoreState(savedInstanceState)
        }

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    finish()
                }
            }
        })
    }

    private fun configureWebView(view: WebView) {
        val settings = view.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true
        settings.loadsImagesAutomatically = true
        settings.useWideViewPort = true
        settings.loadWithOverviewMode = true
        settings.builtInZoomControls = false
        settings.displayZoomControls = false
        settings.mediaPlaybackRequiresUserGesture = false
        settings.cacheMode = WebSettings.LOAD_DEFAULT
        settings.allowFileAccess = false
        settings.allowContentAccess = false
        settings.mixedContentMode = WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE

        CookieManager.getInstance().setAcceptCookie(true)
        CookieManager.getInstance().setAcceptThirdPartyCookies(view, true)

        view.scrollBarStyle = View.SCROLLBARS_INSIDE_OVERLAY
        view.webChromeClient = WebChromeClient()
        view.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(
                view: WebView?,
                request: WebResourceRequest?
            ): Boolean {
                val uri = request?.url ?: return false
                return handleSpecialUrls(uri)
            }

            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                val uri = url?.let { Uri.parse(it) } ?: return false
                return handleSpecialUrls(uri)
            }
        }
    }

    private fun handleSpecialUrls(uri: Uri): Boolean {
        val host = uri.host.orEmpty()
        val scheme = uri.scheme.orEmpty()

        if (scheme == "tel" || scheme == "mailto" || scheme == "sms") {
            startActivity(Intent(Intent.ACTION_VIEW, uri))
            return true
        }

        if (scheme == "intent") {
            runCatching {
                val intent = Intent.parseUri(uri.toString(), Intent.URI_INTENT_SCHEME)
                startActivity(intent)
            }
            return true
        }

        val isInternalHost = INTERNAL_HOSTS.any { allowed ->
            host == allowed || host.endsWith(".$allowed")
        }

        if (isInternalHost) {
            return false
        }

        startActivity(Intent(Intent.ACTION_VIEW, uri))
        return true
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        webView.saveState(outState)
    }

    companion object {
        private const val HOME_URL = "https://www.simofiles.com/"
        private val INTERNAL_HOSTS = setOf(
            "simofiles.com",
            "www.simofiles.com",
            "englishwithsimo.github.io",
            "youtube.com",
            "www.youtube.com",
            "youtu.be"
        )
    }
}
