<img src="icon.png" alt="Dreame" align="left" width="64" height="64" style="margin-right: 16px;">

# Dreame Vacuum Map Card

Home Assistant Lovelace -käyttöliittymäkortti Dreame-robotti-imureiden ohjaukseen. Toteutettu TypeScriptillä, Reactilla ja SCSS:llä.

> **Huomautus:** Tämä projekti on 100 % vibekoodattu.

<br clear="left">

---

## Ominaisuudet

- Tuki **Huone-**, **Kaikki-**, **Alue-** ja **Pistesiivous** -tiloille (mukaan lukien useat alueet tai pisteet).
- Interaktiivinen karttanäkymä huone- ja alievalinnoilla.
- **Suomenkielinen lokalisointi (Suomi):** Kaikki kortin valikot, tilat, asetukset ja ilmoitukset suomeksi.
- **Roskakoripainike:** Erillinen painike toimintopalkissa imurin ajamiseksi roskakorille tyhjennystä varten.
- Huonekohtainen mukautettu siivous: imuteho, kosteus ja siivouskerrat määritettävissä huoneittain.
- Telakkanäkymä: telakan tila ja toiminnot imurin ollessa telakoituna.
- Pikavalinnat (Shortcuts): Dreame-sovellukseen tallennettujen pikavalintojen käynnistys.
- Vaakanäkymä (Landscape layout): ohjaimet kartan sivussa laajalla kojelaudalla.
- Reaaliaikainen imurin tila ja akun varaustaso.
- Teematuki: noudattaa Home Assistantin aktiivista teemaa (vaalea ja tumma tila).

---

## Asennus

### HACS (Suositeltu tapa)

1. Avaa Home Assistant ja siirry kohtaan **HACS** -> **Frontend**.
2. Klikkaa oikean yläkulman valikkoa `⋮` ja valitse **Custom repositories** (Omat tietovarastot).
3. Syötä tiedot:
   - **Repository:** `https://github.com/Valtteri-H/dreame-vacuum-map-card`
   - **Category / Luokka:** `Lovelace` (tai `Plugin`)
4. Valitse **Add** (Lisää).
5. Etsi kortti **Dreame Vacuum Map Card**, valitse **Download** ja tyhjennä selaimen välimuisti.

### Manuaalinen asennus

1. Lataa `dreame-vacuum-map-card.js` [Releases-sivulta](https://github.com/Valtteri-H/dreame-vacuum-map-card/releases).
2. Kopioi tiedosto Home Assistantin hakemistoon:
   ```
   /config/www/dreame-vacuum-map-card/dreame-vacuum-map-card.js
   ```
3. Lisää resurssi Home Assistantiin kohdassa **Asetukset** -> **Kojelaudat** -> **Resurssit** -> **Lisää resurssi**:
   - URL: `/local/dreame-vacuum-map-card/dreame-vacuum-map-card.js`
   - Resurssin tyyppi: `JavaScript-moduuli`

---

## Käyttö ja konfigurointi

Lisää kortti kojelaudan näkymään YAML-koodilla:

```yaml
type: custom:dreame-vacuum-map-card
entity: vacuum.dreame_vacuum
title: Robotti-imuri
map_entity: camera.dreame_vacuum_map # Valinnainen
language: fi # Valinnainen ('auto' seuraa Home Assistantin kieltä)
default_mode: all # Valinnainen: 'all', 'room' tai 'zone'
```

---

## Kehitys ja kääntäminen

### Esivaatimukset
- Node.js 20+
- npm

### Asennus ja testaus
```bash
npm install
npm test -- --run
npm run build
```

Käännetty valmis tiedosto sijoittuu polkuun `dist/dreame-vacuum-map-card.js`.

---

## Lisenssi ja tekijänoikeudet

- Alkuperäinen projekti: [noambergauz/dreame-vacuum-map-card](https://github.com/noambergauz/dreame-vacuum-map-card) (MIT License, Copyright (c) 2023 Noam Bergauz)
- Lisenssi: [MIT License](LICENSE)

---
---

# English Documentation

A modern Home Assistant Lovelace card for controlling Dreame robot vacuums. Built with React, TypeScript, and SCSS.

> **Note:** This project is 100% vibe coded.

---

## Features

- Support for **Room**, **All**, **Zone**, and **Spot** cleaning modes.
- Interactive map with room and zone selection.
- **Finnish localization** included alongside other major languages.
- **Trash Bin action button**: Dedicated button on the action bar to send the vacuum directly to the trash bin for manual emptying.
- Per-room customized cleaning: Configure suction level, wetness, and cleaning cycles per room.
- Dock popup: station status and dock tasks while the robot is docked.
- Shortcuts: start shortcuts saved in the Dreame app.
- Landscape layout: controls positioned beside the map on wide dashboards.
- Real-time vacuum status and battery monitoring.
- Follows active Home Assistant themes and dark/light modes.

---

## Installation

### Via HACS (Recommended)

1. Open Home Assistant and navigate to **HACS** -> **Frontend**.
2. Click the top-right three dots `⋮` and select **Custom repositories**.
3. Fill in the repository details:
   - **Repository:** `https://github.com/Valtteri-H/dreame-vacuum-map-card`
   - **Category:** `Lovelace` (or `Plugin`)
4. Click **Add**.
5. Find **Dreame Vacuum Map Card**, select **Download**, and clear your browser cache.

### Manual Installation

1. Download `dreame-vacuum-map-card.js` from the [Releases page](https://github.com/Valtteri-H/dreame-vacuum-map-card/releases).
2. Copy the file into your Home Assistant directory:
   ```
   /config/www/dreame-vacuum-map-card/dreame-vacuum-map-card.js
   ```
3. Add the resource in **Settings** -> **Dashboards** -> **Resources** -> **Add Resource**:
   - URL: `/local/dreame-vacuum-map-card/dreame-vacuum-map-card.js`
   - Resource type: `JavaScript Module`

---

## Configuration

Add the card to your dashboard via YAML:

```yaml
type: custom:dreame-vacuum-map-card
entity: vacuum.dreame_vacuum
title: Dreame Vacuum
map_entity: camera.dreame_vacuum_map # Optional
language: auto # Optional ('auto' follows Home Assistant language)
default_mode: all # Optional: 'all', 'room', or 'zone'
```

---

## Supported Languages

- **Finnish (fi)** - Suomi
- **English (en)** - Default
- **German (de)** - Deutsch
- **Russian (ru)** - Русский
- **Polish (pl)** - Polski
- **Italian (it)** - Italiano
- **Dutch (nl)** - Nederlands
- **Spanish (es)** - Español
- **French (fr_FR)** - Français
- **Chinese (zh)** - 中文
- **Traditional Chinese (zh_TW)** - 繁體中文
- **Korean (ko)** - 한국어
- **Hebrew (he)** - עברית (RTL supported)
- **Czech (cs)** - Čeština
- **Slovak (sk)** - Slovenčina
- **Hungarian (hu_HU)** - Magyar
- **Ukrainian (uk)** - Українська
- **Lithuanian (lt)** - Lietuvių

---

## Build from Source

```bash
npm install
npm test -- --run
npm run build
```

The production bundle is generated at `dist/dreame-vacuum-map-card.js`.

---

## License & Credits

- Upstream Project: [noambergauz/dreame-vacuum-map-card](https://github.com/noambergauz/dreame-vacuum-map-card) (MIT License, Copyright (c) 2023 Noam Bergauz)
- License: [MIT License](LICENSE)
