function getRandomBaseColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16); // Generate a random hex color
  return `#${randomColor.padStart(6, "0")}`; // Ensure it's 6 digits
}

function generateMatchingColor(baseColor) {
  // Convert hex to HSL
  const hsl = hexToHSL(baseColor);
  // Adjust the hue by +/- 30 degrees for a harmonious color
  const newHue = (hsl.h + 30) % 360; // Change this value to adjust color harmony
  return hslToHex(newHue, hsl.s, hsl.l);
}

export function generateMatchingGradient() {
  const baseColor = getRandomBaseColor();
  const matchingColor = generateMatchingColor(baseColor);
  console.log(`Gradient: ${baseColor} - ${matchingColor}`);
  return `linear-gradient( 30deg, ${baseColor}, ${matchingColor})`; // Use a CSS gradient
}

function hexToHSL(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s, l };
}

function hslToHex(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hueToRgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h / 360 + 1 / 3);
    g = hueToRgb(p, q, h / 360);
    b = hueToRgb(p, q, h / 360 - 1 / 3);
  }

  return `#${(
    (1 << 24) +
    (Math.round(r * 255) << 16) +
    (Math.round(g * 255) << 8) +
    Math.round(b * 255)
  )
    .toString(16)
    .slice(1)}`;
}
