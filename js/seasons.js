/* ============================================
   Seasons Module
   ============================================ */

function renderSeasons(seasons, container) {
  if (!seasons || !seasons.length || !container) return;

  var fragment = document.createDocumentFragment();

  seasons.forEach(function (season, index) {
    var card = document.createElement('div');
    var classes = 'season-card reveal';
    if (season.promoted) classes += ' season-card--promoted';
    if (season.ongoing) classes += ' season-card--ongoing';
    card.className = classes;
    card.style.setProperty('--delay', (index * 150) + 'ms');

    var badgeHtml = '';
    if (season.ongoing) {
      badgeHtml = '<span class="season-card__badge season-card__badge--ongoing">In Progress</span>';
    }

    card.innerHTML =
      '<div class="season-card__header">' +
        '<span class="season-card__season">' + season.season + '</span>' +
        '<span class="season-card__league">' + season.league + '</span>' +
        badgeHtml +
      '</div>' +
      '<div class="season-card__stats">' +
        statBlock(season.position, 'Position', true) +
        statBlock(season.played, 'Played') +
        statBlock(season.won, 'Won') +
        statBlock(season.drawn, 'Drawn') +
        statBlock(season.lost, 'Lost') +
        statBlock(season.goalsFor, 'GF') +
        statBlock(season.goalsAgainst, 'GA') +
        statBlock(season.points, 'Points') +
      '</div>' +
      '<p class="season-card__highlight">' + season.highlight + '</p>';

    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

function statBlock(value, label, isPosition) {
  var valueClass = 'season-card__stat-value counter-target';
  if (isPosition) valueClass += ' season-card__stat-value--position';

  return (
    '<div class="season-card__stat">' +
      '<span class="' + valueClass + '" data-count="' + value + '">0</span>' +
      '<span class="season-card__stat-label">' + label + '</span>' +
    '</div>'
  );
}

function animateCounters(container) {
  var counters = container.querySelectorAll('.counter-target');
  counters.forEach(function (counter) {
    if (counter.dataset.animated) return;
    counter.dataset.animated = 'true';

    var target = parseInt(counter.dataset.count, 10);
    var duration = 1500;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      counter.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(step);
  });
}
