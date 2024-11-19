export const presetColors = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#14b8a6",
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6"
];


function hexToRgb(hex: string) {
    const [r, g, b] = hex.replace(/#/g, '').match(/.{2}/g)!.map((x) => parseInt(x, 16));
    return { r, g, b };
}

function getRelativeLuminance(channel: number) {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function getLuminance(r: number, g: number, b: number) {
    return 0.2126 * getRelativeLuminance(r)
        + 0.7152 * getRelativeLuminance(g)
        + 0.0722 * getRelativeLuminance(b);
}

function getContrastColorNormal(color: string) {
    const { r, g, b } = hexToRgb(color);
    const luminance = getLuminance(r, g, b);
    return luminance > 0.5 ? '#000000' : '#ffffff';
}

function meetsContrast(fgLuminance: number, bgLuminance: number, threshold = 4.5) {
    const L1 = Math.max(fgLuminance, bgLuminance);
    const L2 = Math.min(fgLuminance, bgLuminance);
    return (L1 + 0.05) / (L2 + 0.05) >= threshold;
}

export function getContrastColor(color: string, options?: {
    threshold?: number,
    defaultColor?: string,
    notMeetsColor?: string,
    colors?: string[]
}): string {

    if (!options) {
        return getContrastColorNormal(color);
    }

    const {
        threshold = 4.5,
        defaultColor = "#000000",
        notMeetsColor = "#ffffff",
        colors = presetColors
    } = options;
    const { r, g, b } = hexToRgb(color);
    const colorL = getLuminance(r, g, b);

    let contrastColor = defaultColor;
    let contrastColorL = getLuminance(0, 0, 0);


    for (const color of colors) {
        const { r, g, b } = hexToRgb(color);
        const luminance = getLuminance(r, g, b);
        if (meetsContrast(luminance, colorL, threshold)) {
            contrastColor = color;
            contrastColorL = luminance;
            break;
        }
    }

    if (!meetsContrast(contrastColorL, colorL, threshold)) {
        contrastColor = notMeetsColor;
    }

    return contrastColor;
}
