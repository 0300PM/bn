import { mkdir, writeFile } from 'node:fs/promises';
import nodePath from 'node:path';
import sharp from 'sharp';

const OUT_DIR = nodePath.join(process.cwd(), 'public', 'products');

const mix = (hex, target, amount) => {
  const parse = (value) => [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16));
  const [r1, g1, b1] = parse(hex);
  const [r2, g2, b2] = parse(target);
  const channel = (a, b) => Math.round(a + (b - a) * amount).toString(16).padStart(2, '0');
  return `#${channel(r1, r2)}${channel(g1, g2)}${channel(b1, b2)}`;
};

const light = (hex, amount) => mix(hex, '#ffffff', amount);
const dark = (hex, amount) => mix(hex, '#000000', amount);

let uid = 0;
const nextId = (prefix) => `${prefix}${(uid += 1)}`;

const rr = (x, y, w, h, r, fill, extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;

const ellipse = (cx, cy, rx, ry, fill, extra = '') =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`;

const svgPath = (d, fill, extra = '') => `<path d="${d}" fill="${fill}" ${extra}/>`;

const strokePath = (d, color, width, extra = '') =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" ${extra}/>`;

const fabricFill = (hex) => {
  const id = nextId('fab');
  return {
    id,
    def: `<linearGradient id="${id}" x1="0.1" y1="0" x2="0.55" y2="1">
      <stop offset="0" stop-color="${light(hex, 0.2)}"/>
      <stop offset="0.5" stop-color="${hex}"/>
      <stop offset="1" stop-color="${dark(hex, 0.14)}"/>
    </linearGradient>`,
    fill: `url(#${id})`,
  };
};

const solidFill = (hex, from = 0.16, to = 0.12) => {
  const id = nextId('sol');
  return {
    id,
    def: `<linearGradient id="${id}" x1="0.15" y1="0" x2="0.5" y2="1">
      <stop offset="0" stop-color="${light(hex, from)}"/>
      <stop offset="0.55" stop-color="${hex}"/>
      <stop offset="1" stop-color="${dark(hex, to)}"/>
    </linearGradient>`,
    fill: `url(#${id})`,
  };
};

const woodFill = (hex) => {
  const id = nextId('wood');
  return {
    id,
    def: `<linearGradient id="${id}" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0" stop-color="${light(hex, 0.18)}"/>
      <stop offset="0.5" stop-color="${hex}"/>
      <stop offset="1" stop-color="${dark(hex, 0.2)}"/>
    </linearGradient>`,
    fill: `url(#${id})`,
  };
};

const leg = (x, top, height, width, fill, taper = 6) =>
  svgPath(`M${x} ${top} L${x + width} ${top} L${x + width - taper} ${top + height} L${x + 1} ${top + height} Z`,
    fill,
  );

const softShadow = (cx, cy, rx, ry) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#3d4450" opacity="0.2" filter="url(#blurBig)"/>`;

const upholstery = (hex) => {
  const body = fabricFill(hex);
  const soft = fabricFill(light(hex, 0.06));
  const deep = solidFill(dark(hex, 0.08));
  return {
    defs: body.def + soft.def + deep.def,
    body: body.fill,
    soft: soft.fill,
    deep: deep.fill,
    edge: light(hex, 0.34),
    shade: dark(hex, 0.22),
  };
};

const sofaThree = (d) => `
  ${softShadow(450, 694, 300, 26)}
  ${leg(232, 646, 52, 12, d.wood, 4)}
  ${leg(656, 646, 52, 12, d.wood, 4)}
  ${leg(340, 640, 46, 12, d.wood, 4)}
  ${leg(548, 640, 46, 12, d.wood, 4)}
  ${rr(196, 540, 508, 112, 16, d.u.deep)}
  ${rr(222, 318, 456, 240, 24, d.u.body)}
  ${rr(238, 336, 140, 196, 18, d.u.soft)}
  ${rr(381, 336, 140, 196, 18, d.u.soft)}
  ${rr(524, 336, 140, 196, 18, d.u.soft)}
  ${rr(252, 514, 130, 46, 16, d.u.soft)}
  ${rr(388, 514, 130, 46, 16, d.u.soft)}
  ${rr(524, 514, 130, 46, 16, d.u.soft)}
  ${rr(178, 424, 74, 226, 30, d.u.body)}
  ${rr(648, 424, 74, 226, 30, d.u.body)}
  ${rr(178, 424, 74, 18, 9, d.u.edge, 'opacity="0.55"')}
  ${rr(648, 424, 74, 18, 9, d.u.edge, 'opacity="0.55"')}
  ${strokePath('M232 566 L668 566', d.u.shade, 2, 'opacity="0.35"')}
`;

const sofaTwo = (d) => `
  ${softShadow(450, 694, 250, 24)}
  ${leg(288, 648, 50, 12, d.wood, 4)}
  ${leg(600, 648, 50, 12, d.wood, 4)}
  ${rr(250, 540, 400, 112, 16, d.u.deep)}
  ${rr(274, 344, 352, 218, 24, d.u.body)}
  ${rr(288, 362, 160, 176, 18, d.u.soft)}
  ${rr(452, 362, 160, 176, 18, d.u.soft)}
  ${rr(300, 514, 148, 46, 16, d.u.soft)}
  ${rr(452, 514, 148, 46, 16, d.u.soft)}
  ${rr(232, 440, 66, 210, 28, d.u.body)}
  ${rr(602, 440, 66, 210, 28, d.u.body)}
  ${rr(232, 440, 66, 16, 8, d.u.edge, 'opacity="0.5"')}
  ${rr(602, 440, 66, 16, 8, d.u.edge, 'opacity="0.5"')}
  ${strokePath('M282 566 L618 566', d.u.shade, 2, 'opacity="0.32"')}
`;

const sofaCorner = (d) => `
  ${softShadow(452, 698, 316, 26)}
  ${leg(214, 650, 48, 12, d.wood, 4)}
  ${leg(596, 650, 48, 12, d.wood, 4)}
  ${leg(654, 676, 22, 11, d.wood, 3)}
  ${rr(180, 548, 466, 106, 16, d.u.deep)}
  ${rr(640, 566, 130, 124, 18, d.u.deep)}
  ${rr(198, 340, 416, 216, 24, d.u.body)}
  ${rr(212, 358, 188, 174, 18, d.u.soft)}
  ${rr(410, 358, 188, 174, 18, d.u.soft)}
  ${rr(216, 520, 176, 46, 16, d.u.soft)}
  ${rr(404, 520, 176, 46, 16, d.u.soft)}
  ${rr(176, 436, 62, 214, 28, d.u.body)}
  ${rr(600, 396, 152, 62, 22, d.u.body)}
  ${rr(616, 410, 124, 40, 16, d.u.soft)}
  ${rr(736, 400, 32, 288, 14, d.u.body)}
  ${rr(176, 436, 62, 16, 8, d.u.edge, 'opacity="0.5"')}
  ${rr(736, 400, 32, 14, 7, d.u.edge, 'opacity="0.5"')}
  ${svgPath('M186 566 L640 566', d.u.shade, 'opacity="0.32" stroke-width="2" stroke-linejoin="round"')}
`;
const sofaModular = (d) => `
  ${softShadow(450, 698, 300, 25)}
  ${leg(242, 650, 48, 12, d.wood, 4)}
  ${leg(652, 650, 48, 12, d.wood, 4)}
  ${rr(196, 548, 508, 104, 16, d.u.deep)}
  ${rr(198, 344, 504, 214, 24, d.u.body)}
  ${rr(214, 362, 156, 168, 18, d.u.soft)}
  ${rr(378, 362, 156, 168, 18, d.u.soft)}
  ${rr(542, 362, 146, 168, 18, d.u.soft)}
  ${rr(220, 518, 146, 46, 16, d.u.soft)}
  ${rr(378, 518, 146, 46, 16, d.u.soft)}
  ${rr(536, 518, 146, 46, 16, d.u.soft)}
  ${rr(180, 452, 34, 198, 15, d.u.body)}
  ${rr(686, 452, 34, 198, 15, d.u.body)}
  ${rr(180, 452, 34, 14, 7, d.u.edge, 'opacity="0.5"')}
  ${rr(686, 452, 34, 14, 7, d.u.edge, 'opacity="0.5"')}
  ${svgPath('M378 356 L378 552', d.u.shade, 'opacity="0.22" stroke-width="2"')}
  ${svgPath('M536 356 L536 552', d.u.shade, 'opacity="0.22" stroke-width="2"')}
  ${svgPath('M210 564 L690 564', d.u.shade, 'opacity="0.3" stroke-width="2"')}
`;
const sofaCurved = (d) => `
  ${softShadow(450, 700, 310, 24)}
  ${svgPath('M196 690 C 150 660 158 560 196 520 C 214 436 300 392 450 392 C 600 392 686 436 704 520 C 742 560 750 660 704 690 Z', d.u.deep, 'opacity="0.9"')}
  ${svgPath('M212 520 C 196 396 300 306 450 306 C 600 306 704 396 688 520 C 704 570 660 606 450 606 C 240 606 196 570 212 520 Z', d.u.body)}
  ${rr(232, 460, 436, 120, 60, d.u.soft)}
  ${svgPath('M262 430 C 300 402 380 392 450 392 C 520 392 600 402 638 430', 'none', `stroke="${d.u.edge}" stroke-width="4" opacity="0.45"`)}
  ${strokePath('M262 574 L638 574', d.u.shade, 3, 'opacity="0.18"')}
  ${ellipse(450, 690, 250, 18, dark(d.hex, 0.3), 'opacity="0.10"')}
`;

const sofaBed = (d) => `
  ${softShadow(450, 700, 288, 24)}
  ${leg(258, 668, 28, 10, d.wood, 3)}
  ${leg(632, 668, 28, 10, d.wood, 3)}
  ${rr(220, 528, 460, 140, 16, d.u.deep)}
  ${rr(236, 372, 428, 190, 22, d.u.body)}
  ${rr(252, 390, 194, 156, 18, d.u.soft)}
  ${rr(452, 390, 194, 156, 18, d.u.soft)}
  ${rr(206, 460, 56, 186, 25, d.u.body)}
  ${rr(638, 460, 56, 186, 25, d.u.body)}
  ${rr(220, 528, 460, 74, 14, d.u.soft)}
  ${rr(220, 602, 460, 12, 5, d.u.shade, 'opacity="0.35"')}
  ${rr(384, 616, 132, 12, 5, d.u.edge, 'opacity="0.55"')}
  ${svgPath('M220 600 L680 600', d.u.edge, 'opacity="0.45" stroke-width="2"')}
`;
const armchair = (d) => `
  ${softShadow(450, 694, 190, 20)}
  ${leg(332, 640, 52, 11, d.wood, 4)}
  ${leg(558, 640, 52, 11, d.wood, 4)}
  ${rr(320, 556, 260, 96, 16, d.u.deep)}
  ${rr(340, 358, 220, 212, 22, d.u.body)}
  ${rr(354, 374, 192, 174, 18, d.u.soft)}
  ${rr(356, 532, 188, 44, 15, d.u.soft)}
  ${rr(298, 442, 58, 208, 26, d.u.body)}
  ${rr(544, 442, 58, 208, 26, d.u.body)}
  ${rr(298, 442, 58, 15, 7, d.u.edge, 'opacity="0.5"')}
  ${rr(544, 442, 58, 15, 7, d.u.edge, 'opacity="0.5"')}
  ${strokePath('M334 574 L566 574', d.u.shade, 2, 'opacity="0.3"')}
`;

const wingback = (d) => `
  ${softShadow(450, 696, 190, 20)}
  ${leg(352, 654, 44, 11, d.wood, 4)}
  ${leg(538, 654, 44, 11, d.wood, 4)}
  ${rr(330, 566, 240, 90, 16, d.u.deep)}
  ${svgPath('M334 560 L334 392 C 316 420 302 470 316 512 L334 500 Z', d.u.body)}
  ${svgPath('M566 560 L566 392 C 584 420 598 470 584 512 L566 500 Z', d.u.body)}
  ${rr(340, 300, 220, 280, 26, d.u.body)}
  ${rr(356, 320, 188, 104, 20, d.u.soft)}
  ${rr(356, 440, 188, 122, 20, d.u.soft)}
  ${rr(352, 546, 196, 44, 15, d.u.soft)}
  ${rr(312, 470, 50, 172, 22, d.u.body)}
  ${rr(538, 470, 50, 172, 22, d.u.body)}
  ${strokePath('M356 432 L544 432', d.u.shade, 2, 'opacity="0.28"')}
`;

const officeChair = (d) => `
  ${softShadow(450, 706, 180, 16)}
  ${[0, 72, 144, 216, 288].map((angle) => {
    const rad = (angle * Math.PI) / 180;
    const x = 450 + Math.cos(rad) * 140;
    const y = 690 + Math.sin(rad) * 34;
    return `${strokePath(`M450 640 L${x.toFixed(1)} ${y.toFixed(1)}`, d.frameFill, 12)}
      ${ellipse(x.toFixed(1), (y + 6).toFixed(1), 13, 10, d.frameFill)}`;
  }).join('')}
  ${rr(444, 600, 12, 84, 6, d.metal)}
  ${rr(392, 548, 116, 46, 18, d.u.body)}
  ${rr(372, 320, 156, 250, 30, d.u.body)}
  ${rr(388, 336, 124, 216, 24, dark(d.hex, 0.24), 'opacity="0.45"')}
  ${[0, 1, 2, 3, 4, 5].map((i) => strokePath(`M${404 + i * 18} 348 L${404 + i * 18} 540`, d.u.edge, 2, 'opacity="0.25"')).join('')}
  ${rr(390, 286, 120, 54, 22, d.u.body)}
  ${strokePath('M372 470 C 336 468 330 512 344 534', d.frameFill, 10)}
  ${strokePath('M528 470 C 564 468 570 512 556 534', d.frameFill, 10)}
  ${rr(336, 528, 44, 12, 6, d.u.body)}
  ${rr(520, 528, 44, 12, 6, d.u.body)}
`;

const diningChair = (d) => `
  ${softShadow(450, 700, 160, 16)}
  ${leg(368, 560, 140, 11, d.wood, 5)}
  ${leg(522, 560, 140, 11, d.wood, 5)}
  ${svgPath('M382 556 L382 420 C 382 352 420 322 450 322 C 480 322 518 352 518 420 L518 556 Z', d.u.body)}
  ${svgPath('M400 540 L400 428 C 400 380 420 356 450 356 C 480 356 500 380 500 428 L500 540 Z', d.u.soft)}
  ${svgPath('M382 556 L382 420 C 382 352 420 322 450 322 C 480 322 518 352 518 420 L518 556', 'none', `stroke="${d.wood}" stroke-width="10" opacity="0.85"`)}
  ${rr(348, 538, 200, 34, 14, d.u.body)}
  ${rr(356, 544, 184, 10, 4, d.u.edge, 'opacity="0.4"')}
`;

const pouf = (d) => `
  ${softShadow(450, 690, 150, 16)}
  ${svgPath('M330 512 L330 620 C 330 664 390 690 450 690 C 510 690 570 664 570 620 L570 512 Z', d.u.body)}
  ${ellipse(450, 512, 120, 40, d.u.soft)}
  ${svgPath('M330 560 C 330 604 390 630 450 630 C 510 630 570 604 570 560', 'none', `stroke="${d.u.shade}" stroke-width="3" opacity="0.35"`)}
  ${strokePath('M336 618 C 350 652 396 672 450 672 C 504 672 550 652 564 618', d.u.edge, 3, 'opacity="0.35"')}
`;

const rockingChair = (d) => `
  ${softShadow(450, 706, 208, 16)}
  ${svgPath('M252 662 C 330 702 570 702 648 662', d.wood, 'stroke-width="16" stroke-linecap="round"')}
  ${svgPath('M330 566 L300 676', d.wood, 'stroke-width="11" stroke-linecap="round"')}
  ${svgPath('M570 566 L600 676', d.wood, 'stroke-width="11" stroke-linecap="round"')}
  ${rr(316, 540, 268, 32, 14, d.u.body)}
  ${svgPath('M352 552 L352 400 C 336 428 334 470 346 500 L352 498 Z', d.u.body)}
  ${svgPath('M548 552 L548 400 C 564 428 566 470 554 500 L548 498 Z', d.u.body)}
  ${rr(348, 330, 204, 226, 78, d.u.body)}
  ${rr(372, 352, 156, 184, 62, d.u.soft)}
  ${rr(334, 540, 232, 26, 12, d.u.deep)}
`;
const diningTableRect = (d) => `
  ${softShadow(450, 706, 316, 20)}
  ${leg(300, 404, 268, 18, light(d.surfaceLight, 0.12), 5)}
  ${leg(582, 404, 268, 18, light(d.surfaceLight, 0.12), 5)}
  ${rr(228, 392, 444, 20, 4, d.surfaceShade)}
  ${leg(212, 402, 300, 26, d.surfaceShade, 8)}
  ${leg(662, 402, 300, 26, d.surfaceShade, 8)}
  ${rr(158, 372, 584, 44, 7, d.surface)}
  ${rr(158, 372, 584, 14, 6, light(d.surface, 0.34), 'opacity="0.5"')}
  ${svgPath('M170 408 L730 408', d.surfaceShade, 'stroke-width="2" opacity="0.55"')}
`;
const diningTableRound = (d) => `
  ${softShadow(450, 700, 260, 20)}
  ${ellipse(450, 684, 148, 24, d.frameFill)}
  ${svgPath('M414 452 L486 452 L500 672 L400 672 Z', d.frameFill)}
  ${rr(392, 664, 116, 22, 8, d.frameFill)}
  ${ellipse(450, 428, 264, 56, d.surfaceShade)}
  ${svgPath('M186 428 L186 400 A 264 56 0 0 1 714 400 L714 428 A 264 56 0 0 1 186 428 Z', d.surface)}
  ${ellipse(450, 400, 264, 56, d.surfaceLight)}
  ${strokePath('M214 392 A 236 44 0 0 1 686 392', light(d.surface, 0.4), 3, 'opacity="0.35"')}
`;

const coffeeRound = (d) => `
  ${softShadow(450, 700, 210, 18)}
  ${strokePath('M400 540 L332 692', d.frameFill, 13)}
  ${strokePath('M500 540 L568 692', d.frameFill, 13)}
  ${strokePath('M450 548 L450 684', d.frameShade, 12)}
  ${ellipse(450, 528, 196, 46, d.surfaceShade)}
  ${svgPath('M254 528 L254 506 A 196 46 0 0 1 646 506 L646 528 A 196 46 0 0 1 254 528 Z', d.surface)}
  ${ellipse(450, 506, 196, 46, d.surfaceLight)}
  ${strokePath('M280 500 A 170 34 0 0 1 620 500', light(d.surface, 0.4), 3, 'opacity="0.3"')}
`;

const coffeeRect = (d) => `
  ${softShadow(450, 704, 260, 18)}
  ${leg(222, 486, 214, 14, d.frameFill, 5)}
  ${leg(664, 486, 214, 14, d.frameFill, 5)}
  ${rr(248, 596, 404, 18, 5, d.surfaceShade)}
  ${rr(200, 470, 500, 34, 8, d.surface)}
  ${rr(200, 470, 500, 10, 5, light(d.surface, 0.3), 'opacity="0.5"')}
  ${strokePath('M208 496 L692 496', d.surfaceShade, 2, 'opacity="0.45"')}
`;

const desk = (d) => `
  ${softShadow(450, 704, 296, 18)}
  ${svgPath('M236 502 L272 700', d.frameFill, 'stroke-width="12" stroke-linecap="round"')}
  ${svgPath('M300 502 L264 700', d.frameFill, 'stroke-width="12" stroke-linecap="round"')}
  ${svgPath('M664 502 L628 700', d.frameFill, 'stroke-width="12" stroke-linecap="round"')}
  ${rr(544, 500, 176, 96, 7, d.surface)}
  ${rr(556, 512, 152, 34, 4, d.surfaceTint)}
  ${rr(556, 552, 152, 34, 4, d.surfaceTint)}
  ${rr(608, 526, 48, 6, 3, d.frameFill)}
  ${rr(608, 566, 48, 6, 3, d.frameFill)}
  ${rr(168, 472, 564, 32, 6, d.surface)}
  ${rr(168, 472, 564, 10, 4, light(d.surface, 0.32), 'opacity="0.5"')}
  ${svgPath('M176 500 L724 500', d.surfaceShade, 'stroke-width="2" opacity="0.5"')}
`;
const consoleTable = (d) => `
  ${softShadow(450, 704, 240, 16)}
  ${strokePath('M268 454 L262 698', d.frameFill, 10)}
  ${strokePath('M632 454 L638 698', d.frameFill, 10)}
  ${strokePath('M300 612 L600 612', d.frameFill, 8)}
  ${rr(250, 594, 400, 20, 5, d.surfaceShade)}
  ${rr(240, 432, 420, 26, 6, d.surface)}
  ${rr(240, 432, 420, 8, 4, light(d.surface, 0.3), 'opacity="0.5"')}
`;

const glow = (defsId) => `
  <ellipse cx="450" cy="330" rx="230" ry="150" fill="url(#${defsId})"/>
`;

const floorLamp = (d) => {
  const id = nextId('glow');
  return {
    defs: `<radialGradient id="${id}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#fff4d8" stop-opacity="0.85"/>
      <stop offset="1" stop-color="#fff4d8" stop-opacity="0"/>
    </radialGradient>`,
    body: `
      <ellipse cx="450" cy="352" rx="220" ry="170" fill="url(#${id})"/>
      ${softShadow(450, 700, 120, 16)}
      ${ellipse(450, 692, 74, 16, d.metalFill)}
      ${rr(444, 350, 12, 342, 6, d.metalFill)}
      <path d="M366 216 L534 216 L566 344 L334 344 Z" fill="${d.shadeFill}"/>
      <path d="M366 216 L450 216 L450 344 L334 344 Z" fill="${light(d.hex, 0.12)}" opacity="0.35"/>
      ${ellipse(450, 344, 116, 16, light('#fff4d8', 0.2))}
      <ellipse cx="450" cy="360" rx="120" ry="30" fill="url(#${id})" opacity="0.7"/>
    `,
  };
};

const arcLamp = (d) => {
  const id = nextId('glow');
  return {
    defs: `<radialGradient id="${id}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#fff4d8" stop-opacity="0.8"/>
      <stop offset="1" stop-color="#fff4d8" stop-opacity="0"/>
    </radialGradient>`,
    body: `
      <ellipse cx="640" cy="330" rx="240" ry="190" fill="url(#${id})"/>
      ${softShadow(300, 706, 140, 16)}
      ${ellipse(300, 694, 116, 24, '#eeece7')}
      ${ellipse(300, 688, 116, 24, '#f6f4f0')}
      ${strokePath('M300 680 C 300 420 372 214 606 214', d.metalFill, 11)}
      <path d="M540 224 C 540 176 664 176 664 224 L664 274 C 664 306 540 306 540 274 Z" fill="${d.shadeFill}"/>
      ${ellipse(602, 292, 62, 14, light('#fff4d8', 0.25))}
      <ellipse cx="602" cy="318" rx="94" ry="26" fill="url(#${id})" opacity="0.75"/>
    `,
  };
};

const tableLamp = (d) => {
  const id = nextId('glow');
  return {
    defs: `<radialGradient id="${id}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#fff4d8" stop-opacity="0.8"/>
      <stop offset="1" stop-color="#fff4d8" stop-opacity="0"/>
    </radialGradient>`,
    body: `
      <ellipse cx="450" cy="430" rx="230" ry="200" fill="url(#${id})"/>
      ${softShadow(450, 696, 110, 14)}
      ${strokePath('M450 610 L356 692', d.metalFill, 9)}
      ${strokePath('M450 610 L544 692', d.metalFill, 9)}
      ${strokePath('M450 610 L450 686', d.metalFill, 9)}
      ${rr(440, 372, 20, 244, 8, d.metalFill)}
      <ellipse cx="450" cy="612" rx="34" ry="10" fill="${d.metalFill}"/>
      <path d="M362 250 L538 250 L572 396 L328 396 Z" fill="${d.shadeFill}"/>
      <path d="M362 250 L450 250 L450 396 L328 396 Z" fill="${light(d.hex, 0.14)}" opacity="0.32"/>
      ${ellipse(450, 396, 122, 15, light('#fff4d8', 0.2))}
    `,
  };
};

const pendant = (d) => {
  const id = nextId('glow');
  return {
    defs: `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff6de" stop-opacity="0.85"/>
        <stop offset="1" stop-color="#fff6de" stop-opacity="0"/>
      </linearGradient>`,
    body: `
      <path d="M340 300 L560 300 L720 760 L180 760 Z" fill="url(#${id})" opacity="0.55"/>
      ${ellipse(450, 62, 54, 12, d.metalFill)}
      ${rr(446, 62, 8, 244, 4, d.metalFill)}
      <path d="M334 306 A 116 104 0 0 0 566 306 Z" fill="${d.shadeFill}"/>
      <path d="M334 306 A 116 104 0 0 0 450 306 Z" fill="${light(d.hex, 0.16)}" opacity="0.4"/>
      ${ellipse(450, 306, 116, 12, light('#fff4d8', 0.25))}
      ${ellipse(450, 318, 18, 14, '#fff6de')}
    `,
  };
};

const sconce = (d) => {
  const id = nextId('glow');
  return {
    defs: `<radialGradient id="${id}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#fff4d8" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#fff4d8" stop-opacity="0"/>
    </radialGradient>`,
    body: `
      ${softShadow(450, 700, 130, 12)}
      <ellipse cx="470" cy="470" rx="230" ry="210" fill="url(#${id})"/>
      <rect x="252" y="196" width="300" height="404" rx="16" fill="#efeeea"/>
      <rect x="252" y="196" width="300" height="404" rx="16" fill="none" stroke="#e4e2dd" stroke-width="2"/>
      <rect x="426" y="300" width="30" height="70" rx="8" fill="${d.metalFill}"/>
      <rect x="440" y="292" width="8" height="86" rx="4" fill="${d.metalFill}"/>
      <rect x="382" y="356" width="136" height="10" rx="5" fill="${d.metalFill}"/>
      <path d="M404 366 L496 366 L536 470 L364 470 Z" fill="${d.shadeFill}"/>
      <ellipse cx="450" cy="470" rx="86" ry="12" fill="${light(d.hex, 0.24)}"/>
      <ellipse cx="450" cy="474" rx="66" ry="8" fill="#fff6de" opacity="0.9"/>
    `,
  };
};

const domeLamp = (d) => {
  const id = nextId('glow');
  return {
    defs: `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff6de" stop-opacity="0.8"/>
        <stop offset="1" stop-color="#fff6de" stop-opacity="0"/>
      </linearGradient>`,
    body: `
      <rect x="150" y="120" width="600" height="14" rx="4" fill="#e2dfd8"/>
      <path d="M270 160 L630 160 L720 640 L180 640 Z" fill="url(#${id})" opacity="0.5"/>
      <path d="M232 168 A 218 190 0 0 0 668 168 Z" fill="${d.shadeFill}"/>
      ${ellipse(450, 168, 218, 26, light(d.hex, 0.3))}
      ${ellipse(450, 176, 150, 18, '#fff6de', 'opacity="0.85"')}
      ${svgPath('M232 168 A 218 190 0 0 0 668 168', d.shadeFill, 'stroke-width="0"')}
    `,
  };
};
const SHAPES = {
  sofa3: sofaThree,
  sofa2: sofaTwo,
  sofaCorner,
  sofaModular,
  sofaCurved,
  sofaBed,
  armchair,
  wingback,
  officeChair,
  diningChair,
  pouf,
  rockingChair,
  diningTableRect,
  diningTableRound,
  coffeeRound,
  coffeeRect,
  desk,
  console: consoleTable,
  floorLamp,
  arcLamp,
  tableLamp,
  pendant,
  sconce,
  dome: domeLamp,
};

const CROP_BY_CATEGORY = {
  sofas: '190 320 520 400',
  chairs: '250 300 400 420',
  tables: '200 340 500 380',
  lamps: '250 180 440 520',
};

const buildContext = (model, hex) => {
  const u = upholstery(hex);
  const surface = solidFill(hex);
  const wood = woodFill(model.frame.hex);
  const metal = solidFill(model.frame.hex === '#c8a16b' ? '#b99c63' : model.frame.hex, 0.18, 0.22);
  const shade = solidFill(hex, 0.2, 0.16);
  return {
    hex,
    u,
    surface: surface.fill,
    surfaceLight: light(hex, 0.16),
    surfaceShade: dark(hex, 0.2),
    surfaceTint: dark(hex, 0.06),
    wood: wood.fill,
    frameFill: model.frame.type === 'wood' ? wood.fill : metal.fill,
    metal: metal.fill,
    metalFill: metal.fill,
    shadeFill: shade.fill,
    frameShade: dark(model.frame.hex, 0.22),
    defs: u.defs + surface.def + wood.def + metal.def + shade.def,
  };
};

const FRAMES = {
  sofa3: [150, 230, 600, 600],
  sofa2: [190, 260, 520, 520],
  sofaCorner: [130, 236, 640, 640],
  sofaModular: [130, 200, 640, 640],
  sofaCurved: [130, 200, 640, 640],
  sofaBed: [170, 250, 560, 560],
  armchair: [270, 320, 360, 360],
  wingback: [240, 260, 420, 420],
  officeChair: [220, 250, 460, 460],
  diningChair: [250, 290, 400, 400],
  pouf: [280, 320, 340, 340],
  rockingChair: [210, 240, 480, 480],
  diningTableRect: [140, 210, 620, 620],
  diningTableRound: [170, 250, 560, 560],
  coffeeRound: [210, 300, 480, 480],
  coffeeRect: [180, 250, 540, 540],
  desk: [150, 240, 600, 600],
  console: [230, 330, 440, 440],
  floorLamp: [190, 190, 520, 520],
  arcLamp: [160, 180, 580, 580],
  tableLamp: [210, 230, 480, 480],
  pendant: [230, 44, 440, 440],
  sconce: [250, 180, 400, 400],
  dome: [200, 104, 500, 500],
};

const background = (frame, scene) => {
  const [x, y, w, h] = frame;
  const center = x + w / 2;
  const floor = y + h * 0.86;
  const tone = scene === 'styled' ? '#eae7e1' : '#f1f1ef';
  return `
    <rect x="${x - 800}" y="${y - 800}" width="${w + 1600}" height="${h + 1600}" fill="#f5f5f3"/>
    <linearGradient id="wall" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0" stop-color="#fcfcfb"/>
      <stop offset="0.55" stop-color="#f4f4f2"/>
      <stop offset="1" stop-color="${tone}"/>
    </linearGradient>
    <rect x="${x - 800}" y="${y - 800}" width="${w + 1600}" height="${h + 1600}" fill="url(#wall)"/>
    <g opacity="0.55">
      <ellipse cx="${center - w * 0.34}" cy="${y + h * 0.16}" rx="${w * 0.5}" ry="${h * 0.42}" fill="#ffffff" filter="url(#blurSoft)"/>
    </g>
    <rect x="${x - 800}" y="${floor}" width="${w + 1600}" height="${h}" fill="${scene === 'styled' ? '#ded9d0' : '#e7e5e0'}"/>
    <rect x="${x - 800}" y="${floor}" width="${w + 1600}" height="2" fill="#ffffff" opacity="0.5"/>
    <g opacity="${scene === 'styled' ? 0.5 : 0.3}">
      <ellipse cx="${center}" cy="${floor}" rx="${w * 0.42}" ry="${h * 0.05}" fill="#ffffff" filter="url(#blurSoft)"/>
    </g>
  `;
};

const svgDocument = ({ content, frame, scene }) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${frame.join(' ')}" width="900" height="900">
  <defs>
    <filter id="blurBig" x="-40%" y="-60%" width="180%" height="240%">
      <feGaussianBlur stdDeviation="16"/>
    </filter>
    <filter id="blurSoft" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="40"/>
    </filter>
    <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.72">
      <stop offset="0.5" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.07"/>
    </radialGradient>
    ${content.defs}
  </defs>
  ${background(frame, scene)}
  ${content.body}
  <rect x="${frame[0]}" y="${frame[1]}" width="${frame[2]}" height="${frame[3]}" fill="url(#vignette)"/>
</svg>
`;

const detailFrame = (frame, category) => {
  const size = frame[2] * 0.42;
  const x = frame[0] + frame[2] * 0.2;
  const y = frame[1] + frame[3] * (category === 'chairs' || category === 'lamps' ? 0.1 : 0.2);
  return [Math.round(x), Math.round(y), Math.round(size), Math.round(size)];
};

const renderVariant = ({ shape, model, hex, scene }) => {
  const context = buildContext(model, hex);
  const render = SHAPES[shape](context);
  const body = typeof render === 'string' ? render : render.body;
  const defs = context.defs + (typeof render === 'string' ? '' : render.defs);
  const content = { defs, body };
  const frame = FRAMES[shape];

  if (scene === 'detail') {
    return svgDocument({ content, frame: detailFrame(frame, model.category), scene });
  }

  if (scene === 'styled') {
    const [x, y, w, h] = frame;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${frame.join(' ')}" width="900" height="900">
      <defs>
        <filter id="blurBig" x="-40%" y="-60%" width="180%" height="240%"><feGaussianBlur stdDeviation="16"/></filter>
        <filter id="blurSoft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="40"/></filter>
        <filter id="blurReflect" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>
        ${defs}
      </defs>
      ${background(frame, scene)}
      ${body}
      <g transform="translate(0 ${(y + h * 0.96) * 2}) scale(1 -1)" opacity="0.09" filter="url(#blurReflect)">
        ${body}
      </g>
    </svg>`;
  }

  return svgDocument({ content, frame, scene });
};

const slugify = (value) =>
  value
    .toLowerCase()
    .replaceAll('ą', 'a')
    .replaceAll('ć', 'c')
    .replaceAll('ę', 'e')
    .replaceAll('ł', 'l')
    .replaceAll('ń', 'n')
    .replaceAll('ó', 'o')
    .replaceAll('ś', 's')
    .replaceAll('ź', 'z')
    .replaceAll('ż', 'z')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const catalog = JSON.parse(
  await import('node:fs/promises').then((fs) =>
    fs.readFile(nodePath.join(process.cwd(), 'src/lib/catalog/models.json'), 'utf8'),
  ),
);

await mkdir(OUT_DIR, { recursive: true });

const manifest = [];

for (const model of catalog.models) {
  for (const [colorIndex, color] of model.colors.entries()) {
    const slug = `${model.id}-${slugify(color.name)}`;
    const files = {};
    for (const scene of ['main', 'detail', 'styled']) {
      const svg = renderVariant({ shape: model.shape, model, hex: color.hex, scene });
      const file = nodePath.join(OUT_DIR, `${slug}-${scene}.jpg`);
      await sharp(Buffer.from(svg)).jpeg({ quality: 86, chromaSubsampling: '4:4:4' }).toFile(file);
      files[scene] = `/products/${slug}-${scene}.jpg`;
    }
    manifest.push({ model: model.id, colorIndex, color: color.name, slug, files });
  }
}

await writeFile(
  nodePath.join(process.cwd(), 'src/lib/catalog/images.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
);

console.log(`Wygenerowano ${manifest.length * 3} grafik dla ${manifest.length} wariantów.`);
