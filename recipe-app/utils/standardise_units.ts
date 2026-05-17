const VOLUME_TO_ML: Record<string, number> = {
    cup: 236.588,
    cups: 236.588,
    tablespoon: 14.787,
    tablespoons: 14.787,
    tbsp: 14.787,
    tbs: 14.787,
    tb: 14.787,
    teaspoon: 4.929,
    teaspoons: 4.929,
    tsp: 4.929,
    ts: 4.929,
    'fluid ounce': 29.574,
    'fluid ounces': 29.574,
    'fl oz': 29.574,
    pint: 473.176,
    pints: 473.176,
    pt: 473.176,
    quart: 946.353,
    quarts: 946.353,
    qt: 946.353,
    gallon: 3785.41,
    gallons: 3785.41,
    gal: 3785.41,
    ml: 1,
    milliliter: 1,
    millilitre: 1,
    milliliters: 1,
    millilitres: 1,
    liter: 1000,
    litre: 1000,
    liters: 1000,
    litres: 1000,
};

const WEIGHT_TO_G: Record<string, number> = {
    pound: 453.592,
    pounds: 453.592,
    lb: 453.592,
    lbs: 453.592,
    ounce: 28.349,
    ounces: 28.349,
    oz: 28.349,
    gram: 1,
    grams: 1,
    g: 1,
    kilogram: 1000,
    kilograms: 1000,
    kg: 1000,
};

// Densities for ingredients typically measured by volume but are solids.
// Keyed by substring match (longest key takes priority).
const SOLID_DENSITIES_G_PER_ML: Record<string, number> = {
    'caster sugar': 0.812,
    'sour cream': 1.008,
    'cocoa powder': 0.507,
    'butter': 0.959,
    'flour': 0.529,
    'honey': 1.420,
    'sugar': 0.845,
};

function getSolidDensity(ingredientName: string): number | null {
    const name = ingredientName.toLowerCase().trim();
    const entries = Object.entries(SOLID_DENSITIES_G_PER_ML)
        .sort((a, b) => b[0].length - a[0].length);
    for (const [key, density] of entries) {
        if (name.includes(key)) return density;
    }
    return null;
}

const UNICODE_FRACTIONS: Record<string, number> = {
    '½': 0.5, '¼': 0.25, '¾': 0.75,
    '⅓': 1 / 3, '⅔': 2 / 3, '⅛': 0.125,
    '⅜': 0.375, '⅝': 0.625, '⅞': 0.875,
};

type ParsedMeasure = {
    type: 'volume' | 'weight';
    valueInBase: number;
};

function parseQuantity(raw: string): { quantity: number; remaining: string } | null {
    let s = raw.trim();
    for (const [frac, val] of Object.entries(UNICODE_FRACTIONS)) {
        s = s.replace(frac, `${val}`);
    }

    const mixedMatch = s.match(/^(\d+)\s+(\d+)\/(\d+)(.*)/);
    if (mixedMatch) {
        const whole = parseInt(mixedMatch[1]);
        const num = parseInt(mixedMatch[2]);
        const den = parseInt(mixedMatch[3]);
        return { quantity: whole + num / den, remaining: mixedMatch[4].trim() };
    }

    const fracMatch = s.match(/^(\d+)\/(\d+)(.*)/);
    if (fracMatch) {
        const num = parseInt(fracMatch[1]);
        const den = parseInt(fracMatch[2]);
        return { quantity: num / den, remaining: fracMatch[3].trim() };
    }

    const numMatch = s.match(/^(\d*\.?\d+)(.*)/);
    if (numMatch) {
        return { quantity: parseFloat(numMatch[1]), remaining: numMatch[2].trim() };
    }

    return null;
}

function parseMeasure(measure: string): ParsedMeasure | null {
    const parsed = parseQuantity(measure.trim());
    if (!parsed) return null;

    const { quantity, remaining } = parsed;

    // Try two-word unit first (e.g. "fluid ounce", "fl oz")
    const twoWordMatch = remaining.match(/^([a-zA-Z]+\.?\s+[a-zA-Z]+\.?)/);
    if (twoWordMatch) {
        const unit = twoWordMatch[1].toLowerCase().replace(/\./g, '').trim();
        if (VOLUME_TO_ML[unit] !== undefined) {
            return { type: 'volume', valueInBase: quantity * VOLUME_TO_ML[unit] };
        }
    }

    const oneWordMatch = remaining.match(/^([a-zA-Z]+\.?)/);
    if (oneWordMatch) {
        const unit = oneWordMatch[1].toLowerCase().replace(/\./g, '');
        if (VOLUME_TO_ML[unit] !== undefined) {
            return { type: 'volume', valueInBase: quantity * VOLUME_TO_ML[unit] };
        }
        if (WEIGHT_TO_G[unit] !== undefined) {
            return { type: 'weight', valueInBase: quantity * WEIGHT_TO_G[unit] };
        }
    }

    return null;
}

function formatVolume(ml: number): string {
    if (ml >= 1000) {
        const l = ml / 1000;
        return `${parseFloat(l.toFixed(2))}L`;
    }
    return `${Math.round(ml)}ml`;
}

function formatWeight(g: number): string {
    if (g >= 1000) {
        const kg = g / 1000;
        return `${parseFloat(kg.toFixed(3))}kg`;
    }
    return `${Math.round(g)}g`;
}

export function standardiseMeasures(measures: string[], ingredientName = ''): string {
    const parsed = measures.map(parseMeasure);
    const density = getSolidDensity(ingredientName);

    function resolveVolume(ml: number): string {
        return density !== null ? formatWeight(ml * density) : formatVolume(ml);
    }

    const allParsed = parsed.every(Boolean);
    if (allParsed) {
        const types = new Set(parsed.map((p) => p!.type));
        if (types.size === 1) {
            const total = parsed.reduce((sum, p) => sum + p!.valueInBase, 0);
            const type = [...types][0];
            return type === 'volume' ? resolveVolume(total) : formatWeight(total);
        }
    }

    // Convert what we can, leave the rest as-is
    return parsed
        .map((p, i) => {
            if (!p) return measures[i];
            return p.type === 'volume' ? resolveVolume(p.valueInBase) : formatWeight(p.valueInBase);
        })
        .join(' + ');
}
