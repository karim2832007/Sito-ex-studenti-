(function() {
  // 1. All possible themes
  const themes = [
    'spring-day', 'spring-night',
    'summer-day', 'summer-night',
    'autumn-day', 'autumn-night',
    'winter-day', 'winter-night'
  ];

  // 2. Your season + day/night detector
  function getSeasonTheme() {
    const now = new Date();
    const month = now.getMonth(); // 0=Jan … 11=Dec
    const hour  = now.getHours(); // 0–23

    let season;
    if ([11, 0, 1].includes(month)) {
      season = 'winter';
    } else if ([2, 3, 4].includes(month)) {
      season = 'spring';
    } else if ([5, 6, 7].includes(month)) {
      season = 'summer';
    } else {
      season = 'autumn';
    }

    const timeOfDay = (hour >= 6 && hour < 18) ? 'day' : 'night';
    return `${season}-${timeOfDay}`;
  }

  // 3. Applies the data-theme and logs
  function applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    console.log(`Theme applied: ${themeName}`);
  }
  window.setTheme = applyTheme;

  // 4. Auto-apply on page load
  window.addEventListener('DOMContentLoaded', () => {
    applyTheme(getSeasonTheme());
  });

  // 5. Cycle helper
  let _cycleInterval = null;
  function cycleThemes() {
    let idx = 0;

    // If already cycling, reset it
    if (_cycleInterval) {
      clearInterval(_cycleInterval);
    }

    // Immediately apply first theme
    applyTheme(themes[idx]);

    // Then every 10 s, move to next
    _cycleInterval = setInterval(() => {
      idx = (idx + 1) % themes.length;
      applyTheme(themes[idx]);
    }, 10_000);
  }

  // 6. Stop helper
  function stopCycle() {
    if (_cycleInterval) {
      clearInterval(_cycleInterval);
      _cycleInterval = null;
      console.log('Theme cycling stopped');
    } else {
      console.log('No active theme cycle to stop');
    }
  }

  // Expose to console
  window.karim     = cycleThemes;
  window.karimStop = stopCycle;

  console.log('Ready! Use setTheme("autumn-night") to override once, karim() to start cycling, karimStop() to halt.');
})();