function rgbToHex(color) {
  const [r, g, b] = color.slice(1, -1).split(",");

  const rHex = r >= 16 ? Number(r).toString(16) : "0" + Number(r).toString(16);
  const gHex = g >= 16 ? Number(g).toString(16) : "0" + Number(g).toString(16);
  const bHex = b >= 16 ? Number(b).toString(16) : "0" + Number(b).toString(16);

  return `#${rHex.toUpperCase()}${gHex.toUpperCase()}${bHex.toUpperCase()}`;
}

function hexToRgb(color) {
  const rHex = color.slice(1, 3);
  const gHex = color.slice(3, 5);
  const bHex = color.slice(5, 7);

  const rRGB = parseInt(rHex, 16);
  const gRGB = parseInt(gHex, 16);
  const bRGB = parseInt(bHex, 16);

  return `(${rRGB},${gRGB},${bRGB})`;
}

function rgbToHsl(color) {
  let [r, g, b] = color.slice(1, -1).split(",");

  r = r / 255;
  g = g / 255;
  b = b / 255;

  // Calculate the min and the max values and minMaxDiff
  let minEquivalent = Math.min(r, g, b);
  let maxEquivalent = Math.max(r, g, b);
  let minMaxDiff = maxEquivalent - minEquivalent;

  let h = 0;
  let s = 0;
  let l = 0;

  if (minMaxDiff == 0) h = 0;
  // If Red is the max
  else if (maxEquivalent == r) h = ((g - b) / minMaxDiff) % 6;
  // If Green is the max
  else if (maxEquivalent == g) h = (b - r) / minMaxDiff + 2;
  // If Blue is the max
  else h = (r - g) / minMaxDiff + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  l = (maxEquivalent + minEquivalent) / 2;

  // Calculate saturation
  s = minMaxDiff == 0 ? 0 : minMaxDiff / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `(${h},${s},${l})`;
}

function hslToRgb(color) {
  let [h, s, l] = color.slice(1, -1).split(",");

  // Must be fractions of 1
  s = s / 100;
  l = l / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  // Define RGB values based on you h interval
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `(${r},${g},${b})`;
}

function hexToHsl(color) {
  const rgbColor = hexToRgb(color);
  return rgbToHsl(rgbColor);
}

function hslToHex(color) {
  const rgbColor = hslToRgb(color);
  return rgbToHex(rgbColor);
}

function convertColor(from, to, color) {
  if (from === "rgb" && to === "hsl") {
    return rgbToHsl(color);
  } else if (from === "rgb" && to === "hex") {
    return rgbToHex(color);
  } else if (from === "hex" && to === "rgb") {
    return hexToRgb(color);
  } else if (from === "hex" && to === "hsl") {
    return hexToHsl(color);
  } else if (from === "hsl" && to === "rgb") {
    return hslToRgb(color);
  } else if (from === "hsl" && to === "hex") {
    return hslToHex(color);
  }

  return `No valid transformation with the arguments provided`;
}

console.log(convertColor("hsl", "hex", "(65,80,80)"));
