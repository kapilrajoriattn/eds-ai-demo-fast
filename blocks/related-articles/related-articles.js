/**
 * Decorate the Related Articles block.
 *
 * Expected authored structure:
 *   | Related Articles                                      |
 *   | [link to article 1]  (optional: date text in same row)|
 *   | [link to article 2]                                   |
 *
 * Each row after the heading row is a linked article.
 * If a row has two cells, the second cell is treated as the date.
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  // Check if first row is a heading (single cell, no link)
  let headingEl = null;
  let articleRows = rows;

  const firstCells = [...rows[0].children];
  const firstLink = rows[0].querySelector('a');
  const firstHeading = rows[0].querySelector('h2, h3, h4, h5, h6');

  if (firstHeading && !firstLink) {
    headingEl = firstHeading;
    articleRows = rows.slice(1);
  } else if (firstCells.length === 1 && !firstLink) {
    headingEl = document.createElement('h3');
    headingEl.textContent = rows[0].textContent.trim();
    articleRows = rows.slice(1);
  }

  // Build the widget
  const widget = document.createElement('div');
  widget.className = 'related-articles-widget';

  if (headingEl) {
    const header = document.createElement('div');
    header.className = 'related-articles-header';
    if (headingEl.parentNode) {
      headingEl.parentNode.removeChild(headingEl);
    }
    header.append(headingEl);
    widget.append(header);
  }

  const list = document.createElement('ul');
  list.className = 'related-articles-list';

  articleRows.forEach((row) => {
    const cells = [...row.children];
    const link = row.querySelector('a');
    if (!link) return;

    const li = document.createElement('li');
    li.className = 'related-articles-item';

    const titleLink = document.createElement('a');
    titleLink.href = link.href;
    titleLink.className = 'related-articles-link';
    titleLink.textContent = link.textContent.trim();

    li.append(titleLink);

    // Optional date in second cell
    if (cells[1]) {
      const date = document.createElement('span');
      date.className = 'related-articles-date';
      date.textContent = cells[1].textContent.trim();
      li.append(date);
    }

    list.append(li);
  });

  widget.append(list);
  block.replaceChildren(widget);
}
