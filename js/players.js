/* ============================================
   Players Module — 3D Flip Cards
   ============================================ */

function renderPlayers(players, container) {
  if (!players || !players.length || !container) return;

  var fragment = document.createDocumentFragment();

  players.forEach(function (player, index) {
    var card = document.createElement('div');
    card.className = 'player-card reveal reveal--scale';
    card.style.setProperty('--delay', (index * 100) + 'ms');

    var initials = player.name.split(' ').map(function (n) { return n[0]; }).join('');

    // Build stats for the back face
    var backStatsHTML = '';
    if (player.appearances) {
      backStatsHTML += flipStat(player.appearances, 'Appearances');
    }
    if (player.goals !== undefined && player.goals !== null) {
      backStatsHTML += flipStat(player.goals, 'Goals');
    }
    if (player.cleanSheets) {
      backStatsHTML += flipStat(player.cleanSheets, 'Clean Sheets');
    }
    if (player.assists) {
      backStatsHTML += flipStat(player.assists, 'Assists');
    }

    card.innerHTML =
      '<div class="player-card__inner">' +
        // --- FRONT FACE ---
        '<div class="player-card__front">' +
          '<div class="player-card__image">' +
            '<span class="player-card__initials">' + initials + '</span>' +
          '</div>' +
          '<div class="player-card__body">' +
            '<h3 class="player-card__name">' + player.name + '</h3>' +
            '<div class="player-card__position">' + player.position + '</div>' +
            '<p class="player-card__tagline">' + player.tagline + '</p>' +
            '<div class="player-card__seasons">' + player.seasons + '</div>' +
          '</div>' +
          '<div class="player-card__flip-hint">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>' +
            '<span>Hover for stats</span>' +
          '</div>' +
        '</div>' +
        // --- BACK FACE ---
        '<div class="player-card__back">' +
          '<div class="player-card__back-header">' +
            '<span class="player-card__back-initials">' + initials + '</span>' +
            '<h3 class="player-card__back-name">' + player.name + '</h3>' +
            '<div class="player-card__back-position">' + player.position + '</div>' +
          '</div>' +
          '<div class="player-card__back-stats">' + backStatsHTML + '</div>' +
          '<p class="player-card__back-tagline">' + player.tagline + '</p>' +
          '<div class="player-card__back-seasons">' + player.seasons + '</div>' +
        '</div>' +
      '</div>';

    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

function flipStat(value, label) {
  return (
    '<div class="player-card__back-stat">' +
      '<span class="player-card__back-stat-value">' + value + '</span>' +
      '<span class="player-card__back-stat-label">' + label + '</span>' +
    '</div>'
  );
}
