(function attachProgressions(global) {
  "use strict";

  const ANSWER_LABELS = {
    major251: "メジャー251",
    minor251: "マイナー251",
    major25: "メジャー25",
    minor25: "マイナー25",
  };

  const CHARTS = [
    {
      title: "課題 01",
      bars: [
        ["D-7", "G7"],
        ["C△"],
        ["F#-7(♭5)", "B7"],
        ["E-7"],
        ["A-7", "D7"],
        ["G△"],
        ["C-7", "F7"],
        ["E-7", "A7"],
        ["B-7(♭5)", "E7"],
        ["A-7"],
        ["E♭-7", "A♭7"],
        ["D♭△"],
        ["G-7(♭5)", "C7"],
        ["F△"],
        ["B♭-7", "E♭7"],
        ["A△"],
      ],
      answers: [
        answer("major251", 0, [0, 1]),
        answer("minor251", 2, [2, 3]),
        answer("major251", 4, [4, 5]),
        answer("major25", 6, [6]),
        answer("minor251", 8, [8, 9]),
        answer("major251", 10, [10, 11]),
        answer("minor25", 12, [12]),
        answer("major25", 14, [14]),
      ],
    },
    {
      title: "課題 02",
      bars: [
        ["C△"],
        ["B-7", "E7"],
        ["A-7(♭5)", "D7"],
        ["G-7"],
        ["G-7", "C7"],
        ["F△"],
        ["E-7", "A7"],
        ["D-7(♭5)", "G7"],
        ["C-7"],
        ["F-7", "B♭7"],
        ["E♭△"],
        ["A♭-7(♭5)", "D♭7"],
        ["E△"],
        ["F#-7", "B7"],
        ["E△"],
        ["C#-7(♭5)", "F#7"],
      ],
      answers: [
        answer("major25", 1, [1]),
        answer("minor251", 2, [2, 3]),
        answer("major251", 4, [4, 5]),
        answer("major25", 6, [6]),
        answer("minor251", 7, [7, 8]),
        answer("major251", 9, [9, 10]),
        answer("minor25", 11, [11]),
        answer("major251", 13, [13, 14]),
        answer("minor25", 15, [15]),
      ],
    },
    {
      title: "課題 03",
      bars: [
        ["F△"],
        ["E-7(♭5)", "A7"],
        ["D-7"],
        ["G-7", "C7"],
        ["F△"],
        ["A-7", "D7"],
        ["A♭△"],
        ["C#-7", "F#7"],
        ["B△"],
        ["B-7(♭5)", "E7"],
        ["A-7"],
        ["E♭-7", "A♭7"],
        ["G△"],
        ["F#-7(♭5)", "B7"],
        ["E△"],
        ["D-7", "G7"],
      ],
      answers: [
        answer("minor251", 1, [1, 2]),
        answer("major251", 3, [3, 4]),
        answer("major25", 5, [5]),
        answer("major251", 7, [7, 8]),
        answer("minor251", 9, [9, 10]),
        answer("major25", 11, [11]),
        answer("minor25", 13, [13]),
        answer("major25", 15, [15]),
      ],
    },
    {
      title: "課題 04",
      bars: [
        ["A-7", "D7"],
        ["G△"],
        ["G#-7(♭5)", "C#7"],
        ["F#-7"],
        ["B-7", "E7"],
        ["A△"],
        ["D-7(♭5)", "G7"],
        ["E♭△"],
        ["E♭-7", "A♭7"],
        ["D♭△"],
        ["C-7", "F7"],
        ["B△"],
        ["F-7(♭5)", "B♭7"],
        ["E♭-7"],
        ["E-7", "A7"],
        ["C△"],
      ],
      answers: [
        answer("major251", 0, [0, 1]),
        answer("minor251", 2, [2, 3]),
        answer("major251", 4, [4, 5]),
        answer("minor25", 6, [6]),
        answer("major251", 8, [8, 9]),
        answer("major25", 10, [10]),
        answer("minor251", 12, [12, 13]),
        answer("major25", 14, [14]),
      ],
    },
    {
      title: "課題 05",
      bars: [
        ["C#-7(♭5)", "F#7"],
        ["B-7"],
        ["E-7", "A7"],
        ["D△"],
        ["G-7", "C7"],
        ["A△"],
        ["B♭-7(♭5)", "E♭7"],
        ["A♭△"],
        ["A♭-7", "D♭7"],
        ["G♭△"],
        ["F-7(♭5)", "B♭7"],
        ["E♭-7"],
        ["D-7", "G7"],
        ["C△"],
        ["B-7", "E7"],
        ["F△"],
      ],
      answers: [
        answer("minor251", 0, [0, 1]),
        answer("major251", 2, [2, 3]),
        answer("major25", 4, [4]),
        answer("minor25", 6, [6]),
        answer("major251", 8, [8, 9]),
        answer("minor251", 10, [10, 11]),
        answer("major251", 12, [12, 13]),
        answer("major25", 14, [14]),
      ],
    },
    {
      title: "課題 06",
      bars: [
        ["E-7", "A7"],
        ["C△"],
        ["D-7(♭5)", "G7"],
        ["C-7"],
        ["C-7", "F7"],
        ["B♭△"],
        ["A-7(♭5)", "D7"],
        ["E△"],
        ["F#-7", "B7"],
        ["E△"],
        ["B-7(♭5)", "E7"],
        ["A-7"],
        ["G-7", "C7"],
        ["D♭△"],
        ["E♭-7", "A♭7"],
        ["D♭△"],
      ],
      answers: [
        answer("major25", 0, [0]),
        answer("minor251", 2, [2, 3]),
        answer("major251", 4, [4, 5]),
        answer("minor25", 6, [6]),
        answer("major251", 8, [8, 9]),
        answer("minor251", 10, [10, 11]),
        answer("major25", 12, [12]),
        answer("major251", 14, [14, 15]),
      ],
    },
  ];

  function answer(type, start, span) {
    return { type, start, span };
  }

  function answerLabel(type) {
    return ANSWER_LABELS[type] || type;
  }

  const api = { ANSWER_LABELS, CHARTS, answerLabel };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.ProgressionData = api;
})(typeof window !== "undefined" ? window : globalThis);
