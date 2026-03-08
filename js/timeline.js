/* ============================================
   Timeline Module
   ============================================ */

function renderTimeline(events, container) {
  if (!events || !events.length || !container) return;

  const fragment = document.createDocumentFragment();

  events.forEach(function (event, index) {
    var side = index % 2 === 0 ? 'left' : 'right';
    var revealDir = side === 'left' ? 'reveal--left' : 'reveal--right';

    var item = document.createElement('div');
    item.className = 'timeline__item timeline__item--' + side + ' reveal ' + revealDir;
    item.style.setProperty('--delay', (index * 100) + 'ms');

    var dotClass = 'timeline__dot';
    if (event.category) dotClass += ' timeline__dot--' + event.category;

    // Set category color for the date text
    var categoryColors = {
      ownership: '#F0C040',
      promotion: '#008B5E',
      signing: '#60A5FA',
      match: '#C0C0C0',
      milestone: '#F0C040'
    };
    if (categoryColors[event.category]) {
      item.style.setProperty('--category-color', categoryColors[event.category]);
    }

    var categoryClass = 'timeline__category';
    if (event.category) categoryClass += ' timeline__category--' + event.category;

    var dateFormatted = formatDate(event.date);

    item.innerHTML =
      '<div class="' + dotClass + '"></div>' +
      '<div class="timeline__date">' + dateFormatted + '</div>' +
      '<h3 class="timeline__title">' + event.title + '</h3>' +
      '<p class="timeline__desc">' + event.description + '</p>' +
      '<span class="' + categoryClass + '">' + event.category + '</span>';

    fragment.appendChild(item);
  });

  container.appendChild(fragment);
}

function formatDate(dateStr) {
  var months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  var parts = dateStr.split('-');
  var year = parts[0];
  var monthIndex = parseInt(parts[1], 10) - 1;
  var day = parseInt(parts[2], 10);
  return months[monthIndex] + ' ' + day + ', ' + year;
}
