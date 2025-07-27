console.log("🟢 flourishrender.js loaded");

function runFlourish() {
  if (window.Flourish && typeof window.Flourish.live === 'function') {
    console.log("📈 Calling Flourish.live()");
    window.Flourish.live();
  } else {
    console.warn("❌ Flourish not available when called");
  }
}

// Wait for Flourish script to load
function waitForFlourish(callback, attempt = 0) {
  if (window.Flourish && typeof window.Flourish.live === 'function') {
    console.log("✅ Flourish is ready");
    callback();
  } else if (attempt < 20) {
    console.log(`⏳ Waiting for Flourish... attempt ${attempt + 1}`);
    setTimeout(() => waitForFlourish(callback, attempt + 1), 200);
  } else {
    console.warn("❌ Flourish script did not load after multiple attempts");
  }
}

waitForFlourish(() => {
  // Observe for any added Flourish embeds
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (
          node.nodeType === 1 &&
          node.classList.contains('flourish-embed')
        ) {
          console.log("🔍 New Flourish embed detected");
          runFlourish();
          return;
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Also call once on full load just in case
  window.addEventListener('load', runFlourish);
});
