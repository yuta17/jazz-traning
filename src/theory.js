(function attachTheory(global) {
  "use strict";

  const VARIATIONS = ["RRR", "R2R", "2R2"];
  const ROUND_SIZE = 12;

  const KEYS = [
    {
      id: "C",
      label: "C",
      major: ["Dm7", "G7", "Cmaj7"],
      minor: ["D-7(♭5)", "G7", "C-7"],
    },
    {
      id: "F",
      label: "F",
      major: ["Gm7", "C7", "Fmaj7"],
      minor: ["G-7(♭5)", "C7", "F-7"],
    },
    {
      id: "Bb",
      label: "B♭",
      major: ["Cm7", "F7", "B♭maj7"],
      minor: ["C-7(♭5)", "F7", "B♭-7"],
    },
    {
      id: "Eb",
      label: "E♭",
      major: ["Fm7", "B♭7", "E♭maj7"],
      minor: ["F-7(♭5)", "B♭7", "E♭-7"],
    },
    {
      id: "Ab",
      label: "A♭",
      major: ["B♭m7", "E♭7", "A♭maj7"],
      minor: ["B♭-7(♭5)", "E♭7", "A♭-7"],
    },
    {
      id: "Db",
      label: "D♭",
      major: ["E♭m7", "A♭7", "D♭maj7"],
      minor: ["E♭-7(♭5)", "A♭7", "D♭-7"],
    },
    {
      id: "Gb",
      label: "G♭",
      major: ["A♭m7", "D♭7", "G♭maj7"],
      minor: ["A♭-7(♭5)", "D♭7", "G♭-7"],
    },
    {
      id: "B",
      label: "B",
      major: ["C♯m7", "F♯7", "Bmaj7"],
      minor: ["C♯-7(♭5)", "F♯7", "B-7"],
    },
    {
      id: "E",
      label: "E",
      major: ["F♯m7", "B7", "Emaj7"],
      minor: ["F♯-7(♭5)", "B7", "E-7"],
    },
    {
      id: "A",
      label: "A",
      major: ["Bm7", "E7", "Amaj7"],
      minor: ["B-7(♭5)", "E7", "A-7"],
    },
    {
      id: "D",
      label: "D",
      major: ["Em7", "A7", "Dmaj7"],
      minor: ["E-7(♭5)", "A7", "D-7"],
    },
    {
      id: "G",
      label: "G",
      major: ["Am7", "D7", "Gmaj7"],
      minor: ["A-7(♭5)", "D7", "G-7"],
    },
  ];

  const ROMAN = {
    major: ["II", "V", "I"],
    minor: ["IIø", "V", "I-"],
  };

  function sanitizeSettings(settings) {
    const clean = { major: [], minor: [] };

    ["major", "minor"].forEach((quality) => {
      const selected = Array.isArray(settings && settings[quality])
        ? settings[quality]
        : [];

      clean[quality] = VARIATIONS.filter((variation) =>
        selected.includes(variation),
      );
    });

    return clean;
  }

  function selectedQualities(settings) {
    const clean = sanitizeSettings(settings);
    return ["major", "minor"].filter((quality) => clean[quality].length > 0);
  }

  function cycleSize(settings) {
    return selectedQualities(settings).length > 0 ? ROUND_SIZE : 0;
  }

  function shuffle(items, random) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function balancedVariations(variations, count, random) {
    const pool = [];
    while (pool.length < count) {
      pool.push(...shuffle(variations, random));
    }
    return pool.slice(0, count);
  }

  function balancedQualities(qualities, count, random) {
    const pool = [];
    while (pool.length < count) {
      pool.push(...shuffle(qualities, random));
    }
    return pool.slice(0, count);
  }

  function buildDeck(settings, random = Math.random) {
    const clean = sanitizeSettings(settings);
    const qualities = selectedQualities(clean);
    const deck = [];

    if (qualities.length === 0) return deck;

    const keyOrder = shuffle(KEYS, random);
    const qualityOrder = balancedQualities(qualities, ROUND_SIZE, random);
    const variationOrders = {};
    const variationIndexes = {};

    qualities.forEach((quality) => {
      const count = qualityOrder.filter((item) => item === quality).length;
      variationOrders[quality] = balancedVariations(
        clean[quality],
        count,
        random,
      );
      variationIndexes[quality] = 0;
    });

    keyOrder.forEach((key, index) => {
      const quality = qualityOrder[index];
      const variation = variationOrders[quality][variationIndexes[quality]];
      variationIndexes[quality] += 1;

      deck.push({
        id: `${quality}:${key.id}:${variation}`,
        keyId: key.id,
        keyLabel: key.label,
        quality,
        variation,
        chords: key[quality].map((symbol, chordIndex) => ({
          degree: ROMAN[quality][chordIndex],
          symbol,
        })),
      });
    });

    return shuffle(deck, random);
  }

  function statKey(quality, keyId, variation) {
    return `${quality}:${keyId}:${variation}`;
  }

  function labelForQuality(quality) {
    return quality === "minor" ? "マイナー" : "メジャー";
  }

  const api = {
    VARIATIONS,
    ROUND_SIZE,
    KEYS,
    ROMAN,
    sanitizeSettings,
    selectedQualities,
    cycleSize,
    buildDeck,
    statKey,
    labelForQuality,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.JazzTheory = api;
})(typeof window !== "undefined" ? window : globalThis);
