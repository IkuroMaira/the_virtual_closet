export function getContrastColor(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16) / 255
    const g = parseInt(hexColor.slice(3, 5), 16) / 255
    const b = parseInt(hexColor.slice(5, 7), 16) / 255

    const toLinear = (c) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    const luminance = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)

    const contrastWithWhite = 1.05 / (luminance + 0.05)
    const contrastWithBlack = (luminance + 0.05) / 0.05

    return contrastWithWhite >= contrastWithBlack ? '#ffffff' : '#000000'
}
