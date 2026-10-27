/* Three city compositions share a small, geometric landmark vocabulary. */
(() => {
  const arrow = '<svg class="city-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
  const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  /* Large primitives only: no spires, crosses, tiny windows or decorative hatching. */
  const cityArt = [
    {
      moscow: `<path class="city-horizon" d="M24 184H336"/><g class="landmark-main"><rect x="46" y="80" width="48" height="104"/><rect x="57" y="61" width="26" height="19"/><circle cx="70" cy="108" r="10"/><path d="M70 102v7h6M25 184v-31h21"/><rect x="139" y="133" width="44" height="51"/><path d="M139 133a22 22 0 0 1 44 0Z"/><rect x="194" y="113" width="54" height="71"/><path d="M194 113a27 27 0 0 1 54 0Z"/><rect x="260" y="143" width="42" height="41"/><path d="M260 143a21 21 0 0 1 42 0Z"/></g>`,
      spb: `<path class="city-horizon" d="M24 184H336"/><g class="landmark-main"><rect x="43" y="104" width="30" height="80"/><rect x="50" y="80" width="16" height="24"/><rect x="111" y="119" width="121" height="65"/><path d="M135 119v-17a36 36 0 0 1 73 0v17M107 119h129M139 137v47m34-47v47m34-47v47"/><rect x="161" y="59" width="21" height="10"/><path d="M265 184v-15l25-25 7 7-22 22v11m55 0v-15l-21-21-7 7 18 18v11"/></g><path class="city-water" d="M111 197H331"/>`,
      kazan: `<path class="city-horizon" d="M24 184H336"/><g class="landmark-main"><rect x="39" y="140" width="46" height="44"/><rect x="46" y="108" width="32" height="32"/><rect x="52" y="82" width="20" height="26"/><rect x="148" y="99" width="19" height="85"/><rect x="144" y="89" width="27" height="10"/><rect x="286" y="99" width="19" height="85"/><rect x="282" y="89" width="27" height="10"/><rect x="180" y="122" width="93" height="62"/><path d="M190 122a36 36 0 0 1 73 0Z M215 184v-18a12 12 0 0 1 24 0v18"/></g>`
    },
    {
      moscow: `<path class="city-horizon" d="M25 185H336"/><g stroke="#B46B77" fill="#D73B4A13"><rect x="31" y="159" width="297" height="26"/><rect x="249" y="75" width="47" height="110"/><rect x="259" y="55" width="27" height="20"/><circle cx="272.5" cy="104" r="10" fill="#FFF9FA"/><path d="M273 98v7h5" fill="none"/><rect x="57" y="131" width="43" height="54"/><path d="M57 131a21.5 21.5 0 0 1 43 0Z"/><rect x="111" y="109" width="53" height="76"/><path d="M111 109a26.5 26.5 0 0 1 53 0Z"/><rect x="175" y="139" width="39" height="46"/><path d="M175 139a19.5 19.5 0 0 1 39 0Z"/></g>`,
      spb: `<path class="city-horizon" d="M25 185H336"/><g stroke="#6386AF" fill="#2869D016"><rect x="33" y="135" width="50" height="50"/><rect x="43" y="104" width="30" height="31"/><rect x="50" y="82" width="16" height="22"/><rect x="109" y="126" width="141" height="59"/><rect x="122" y="113" width="115" height="13"/><path d="M143 113V97a37 37 0 0 1 74 0v16Z"/><rect x="169" y="52" width="22" height="10"/><path d="M140 141v44m40-44v44m40-44v44" fill="none"/><rect x="270" y="160" width="58" height="12"/><rect x="278" y="172" width="10" height="13"/><rect x="310" y="172" width="10" height="13"/></g><path class="city-water" d="M264 198H334"/>`,
      kazan: `<path class="city-horizon" d="M25 185H336"/><g stroke="#6386AF" fill="#2869D016"><rect x="45" y="107" width="20" height="78"/><rect x="40" y="96" width="30" height="11"/><rect x="179" y="107" width="20" height="78"/><rect x="174" y="96" width="30" height="11"/><rect x="78" y="126" width="88" height="59"/><path d="M88 126a34 34 0 0 1 68 0Z"/><path d="M111 185v-17a11 11 0 0 1 22 0v17" fill="none"/></g><g stroke="#B46B77" fill="#D73B4A12"><rect x="252" y="144" width="49" height="41"/><rect x="258" y="111" width="37" height="33"/><rect x="265" y="82" width="23" height="29"/><rect x="270" y="63" width="13" height="19"/></g>`
    },
    {
      moscow: `<path class="city-horizon" d="M28 185H333"/><g class="landmark-main"><rect x="153" y="78" width="48" height="107"/><rect x="164" y="60" width="26" height="18"/><circle cx="177" cy="108" r="10"/><path d="M177 102v7h5"/><rect x="49" y="137" width="61" height="48"/><path d="M49 137a30.5 30.5 0 0 1 61 0Z"/><rect x="244" y="127" width="61" height="58"/><path d="M244 127a30.5 30.5 0 0 1 61 0Z"/></g>`,
      spb: `<path class="city-horizon" d="M28 185H333"/><g class="landmark-main"><rect x="135" y="123" width="164" height="62"/><path d="M168 123v-20a49 49 0 0 1 98 0v20Z"/><rect x="207" y="46" width="20" height="10"/><path d="M176 142v43m41-43v43m41-43v43"/><rect x="48" y="114" width="30" height="71"/><rect x="55" y="91" width="16" height="23"/><path d="M29 166h78m-65 0v19m52-19v19"/></g><path class="city-water" d="M29 198H111"/>`,
      kazan: `<path class="city-horizon" d="M28 185H333"/><g class="landmark-main"><rect x="41" y="131" width="47" height="54"/><rect x="49" y="98" width="31" height="33"/><rect x="56" y="75" width="17" height="23"/><rect x="157" y="125" width="128" height="60"/><path d="M180 125a41 41 0 0 1 82 0Z"/><rect x="135" y="93" width="16" height="92"/><rect x="292" y="93" width="16" height="92"/><path d="M130 93h26m131 0h26M210 185v-18a11 11 0 0 1 22 0v18"/></g>`
    }
  ];
  const cities = [
    { name: 'Москва', code: '01', key: 'moscow', note: 'Кремль · собор Василия Блаженного', description: 'Москва: башня с часами и купола из простых геометрических фигур' },
    { name: 'Санкт-Петербург', code: '02', key: 'spb', note: 'Исаакиевский собор · разводной мост', description: 'Санкт-Петербург: купол, башня и мост из простых геометрических фигур' },
    { name: 'Казань', code: '03', key: 'kazan', note: 'Кул-Шариф · башня Сююмбике', description: 'Казань: купол мечети и ступенчатая башня из простых геометрических фигур' }
  ];
  const illustration = (city, variant) => `<svg class="city-landmark city-art-v${variant}" viewBox="0 0 360 225" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="${city.description}">${cityArt[variant - 1][city.key]}</svg>`;
  const card = (city, variant) => `<a class="landmark-card landmark-${city.key}" href="${document.body.classList.contains('mobile-home')?'category.html':'category.html'}?city=${encodeURIComponent(city.name)}" aria-label="${city.name} — перейти к рейтингам города">
      <div class="city-card-cap"><span>Город в деталях</span><span class="city-card-code">${city.code}</span></div>
      <div class="city-picture">${illustration(city, variant)}</div>
      <div class="city-card-title"><h3>${city.name}</h3></div>
      <p class="city-landmark-caption">${city.note}</p>
      <div class="city-card-bottom"><span>К темам города</span>${arrow}</div>
    </a>`;

  window.cityVariantNames = ['Простые силуэты', 'Город из кубиков', 'Минимальная панорама'];
  window.renderCities = variant => {
    const v = Math.max(1, Math.min(3, Number(variant) || 1));
    return `<section id="cities" class="chosen-cities city-v2 art-v${v}" aria-labelledby="cities-heading"><div class="wrap">
      <div class="cities-heading"><div><p class="cities-kicker">География выбора</p><h2 id="cities-heading">Начните<br>со своего города</h2></div><p class="cities-intro">Локальные условия важны: расписание, адреса, цены и доступность услуг.</p></div>
      <div class="cities-grid">${cities.map(city => card(city, v)).join('')}</div>
      <div class="cities-tail"><p>Три города. Свои условия. Один подход к сравнению.</p><button type="button" data-city-open>${pin}<span>Другой город</span>${arrow}</button></div>
    </div></section>`;
  };
})();
