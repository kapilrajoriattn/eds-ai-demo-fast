/**
 * Decorate the Author Byline block.
 *
 * Expected authored structure (two-column row):
 *   | Author Byline              |
 *   | [author photo] | Name\nOccupations |
 *
 * Optional second row for social links:
 *   | [link1] [link2] [link3] |
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];

  // First row: photo | name + occupations
  const firstRow = rows[0];
  if (!firstRow) return;

  const cells = [...firstRow.children];
  const photoCell = cells[0];
  const infoCell = cells[1] || cells[0];

  // Build byline wrapper
  const byline = document.createElement('div');
  byline.className = 'author-byline-card';

  // Photo
  const photoWrapper = document.createElement('div');
  photoWrapper.className = 'author-byline-photo';
  const picture = photoCell.querySelector('picture, img');
  if (picture) photoWrapper.append(picture.closest('picture') || picture);
  byline.append(photoWrapper);

  // Info: name + occupations
  const info = document.createElement('div');
  info.className = 'author-byline-info';

  const nameEl = infoCell.querySelector('h2, h3, h4, p strong, strong');
  const name = document.createElement('p');
  name.className = 'author-byline-name';
  name.textContent = nameEl ? nameEl.textContent.trim() : infoCell.firstElementChild?.textContent?.trim() || '';

  const occupationsEl = [...infoCell.querySelectorAll('p')].find((p) => p !== nameEl?.closest('p'));
  const occupations = document.createElement('p');
  occupations.className = 'author-byline-occupations';
  occupations.textContent = occupationsEl ? occupationsEl.textContent.trim() : '';

  info.append(name, occupations);
  byline.append(info);

  block.replaceChildren(byline);

  // Social links row (optional second row)
  if (rows[1]) {
    const links = [...rows[1].querySelectorAll('a')];
    if (links.length) {
      const social = document.createElement('div');
      social.className = 'author-byline-social';
      links.forEach((link) => {
        const btn = document.createElement('a');
        btn.href = link.href;
        btn.textContent = link.textContent.trim();
        btn.className = 'author-byline-social-link';
        if (link.target) btn.target = link.target;
        social.append(btn);
      });
      block.append(social);
    }
  }
}
