// Japanese Kana (Hiragana & Katakana) Master Dataset
export interface KanaItem {
  hira: string;
  kata: string;
  romaji: string;
  strokes?: number;
}

export const BASIC_KANA: KanaItem[] = [
  {
    "hira": "あ",
    "kata": "ア",
    "romaji": "a",
    "strokes": 3
  },
  {
    "hira": "い",
    "kata": "イ",
    "romaji": "i",
    "strokes": 2
  },
  {
    "hira": "う",
    "kata": "ウ",
    "romaji": "u",
    "strokes": 2
  },
  {
    "hira": "え",
    "kata": "エ",
    "romaji": "e",
    "strokes": 2
  },
  {
    "hira": "お",
    "kata": "オ",
    "romaji": "o",
    "strokes": 3
  },
  {
    "hira": "か",
    "kata": "カ",
    "romaji": "ka",
    "strokes": 3
  },
  {
    "hira": "き",
    "kata": "キ",
    "romaji": "ki",
    "strokes": 4
  },
  {
    "hira": "く",
    "kata": "ク",
    "romaji": "ku",
    "strokes": 1
  },
  {
    "hira": "け",
    "kata": "ケ",
    "romaji": "ke",
    "strokes": 3
  },
  {
    "hira": "こ",
    "kata": "コ",
    "romaji": "ko",
    "strokes": 2
  },
  {
    "hira": "さ",
    "kata": "サ",
    "romaji": "sa",
    "strokes": 3
  },
  {
    "hira": "し",
    "kata": "シ",
    "romaji": "shi",
    "strokes": 1
  },
  {
    "hira": "す",
    "kata": "ス",
    "romaji": "su",
    "strokes": 2
  },
  {
    "hira": "せ",
    "kata": "セ",
    "romaji": "se",
    "strokes": 3
  },
  {
    "hira": "そ",
    "kata": "ソ",
    "romaji": "so",
    "strokes": 1
  },
  {
    "hira": "た",
    "kata": "タ",
    "romaji": "ta",
    "strokes": 4
  },
  {
    "hira": "ち",
    "kata": "チ",
    "romaji": "chi",
    "strokes": 2
  },
  {
    "hira": "つ",
    "kata": "ツ",
    "romaji": "tsu",
    "strokes": 1
  },
  {
    "hira": "て",
    "kata": "テ",
    "romaji": "te",
    "strokes": 1
  },
  {
    "hira": "と",
    "kata": "ト",
    "romaji": "to",
    "strokes": 2
  },
  {
    "hira": "な",
    "kata": "ナ",
    "romaji": "na",
    "strokes": 4
  },
  {
    "hira": "に",
    "kata": "ニ",
    "romaji": "ni",
    "strokes": 3
  },
  {
    "hira": "ぬ",
    "kata": "ヌ",
    "romaji": "nu",
    "strokes": 2
  },
  {
    "hira": "ね",
    "kata": "ネ",
    "romaji": "ne",
    "strokes": 2
  },
  {
    "hira": "の",
    "kata": "ノ",
    "romaji": "no",
    "strokes": 1
  },
  {
    "hira": "は",
    "kata": "ハ",
    "romaji": "ha",
    "strokes": 3
  },
  {
    "hira": "ひ",
    "kata": "ヒ",
    "romaji": "hi",
    "strokes": 1
  },
  {
    "hira": "ふ",
    "kata": "フ",
    "romaji": "fu",
    "strokes": 4
  },
  {
    "hira": "へ",
    "kata": "ヘ",
    "romaji": "he",
    "strokes": 1
  },
  {
    "hira": "ほ",
    "kata": "ホ",
    "romaji": "ho",
    "strokes": 4
  },
  {
    "hira": "ま",
    "kata": "マ",
    "romaji": "ma",
    "strokes": 3
  },
  {
    "hira": "み",
    "kata": "ミ",
    "romaji": "mi",
    "strokes": 2
  },
  {
    "hira": "む",
    "kata": "ム",
    "romaji": "mu",
    "strokes": 3
  },
  {
    "hira": "め",
    "kata": "メ",
    "romaji": "me",
    "strokes": 2
  },
  {
    "hira": "も",
    "kata": "モ",
    "romaji": "mo",
    "strokes": 3
  },
  {
    "hira": "や",
    "kata": "ヤ",
    "romaji": "ya",
    "strokes": 3
  },
  {
    "hira": "ゆ",
    "kata": "ユ",
    "romaji": "yu",
    "strokes": 2
  },
  {
    "hira": "よ",
    "kata": "ヨ",
    "romaji": "yo",
    "strokes": 2
  },
  {
    "hira": "ら",
    "kata": "ラ",
    "romaji": "ra",
    "strokes": 2
  },
  {
    "hira": "り",
    "kata": "リ",
    "romaji": "ri",
    "strokes": 2
  },
  {
    "hira": "る",
    "kata": "ル",
    "romaji": "ru",
    "strokes": 1
  },
  {
    "hira": "れ",
    "kata": "レ",
    "romaji": "re",
    "strokes": 2
  },
  {
    "hira": "ろ",
    "kata": "ロ",
    "romaji": "ro",
    "strokes": 1
  },
  {
    "hira": "わ",
    "kata": "ワ",
    "romaji": "wa",
    "strokes": 2
  },
  {
    "hira": "を",
    "kata": "ヲ",
    "romaji": "wo",
    "strokes": 3
  },
  {
    "hira": "ん",
    "kata": "ン",
    "romaji": "n",
    "strokes": 1
  }
];
export const DAKUON_KANA: KanaItem[] = [
  {
    "hira": "が",
    "kata": "ガ",
    "romaji": "ga",
    "strokes": 5
  },
  {
    "hira": "ぎ",
    "kata": "ギ",
    "romaji": "gi",
    "strokes": 6
  },
  {
    "hira": "ぐ",
    "kata": "グ",
    "romaji": "gu",
    "strokes": 3
  },
  {
    "hira": "げ",
    "kata": "ゲ",
    "romaji": "ge",
    "strokes": 5
  },
  {
    "hira": "ご",
    "kata": "ゴ",
    "romaji": "go",
    "strokes": 4
  },
  {
    "hira": "ざ",
    "kata": "ザ",
    "romaji": "za",
    "strokes": 5
  },
  {
    "hira": "じ",
    "kata": "ジ",
    "romaji": "ji",
    "strokes": 3
  },
  {
    "hira": "ず",
    "kata": "ズ",
    "romaji": "zu",
    "strokes": 4
  },
  {
    "hira": "ぜ",
    "kata": "ゼ",
    "romaji": "ze",
    "strokes": 5
  },
  {
    "hira": "ぞ",
    "kata": "ゾ",
    "romaji": "zo",
    "strokes": 3
  },
  {
    "hira": "だ",
    "kata": "ダ",
    "romaji": "da",
    "strokes": 6
  },
  {
    "hira": "ぢ",
    "kata": "ヂ",
    "romaji": "ji",
    "strokes": 4
  },
  {
    "hira": "づ",
    "kata": "ヅ",
    "romaji": "zu",
    "strokes": 3
  },
  {
    "hira": "で",
    "kata": "デ",
    "romaji": "de",
    "strokes": 3
  },
  {
    "hira": "ど",
    "kata": "ド",
    "romaji": "do",
    "strokes": 4
  },
  {
    "hira": "ば",
    "kata": "バ",
    "romaji": "ba",
    "strokes": 5
  },
  {
    "hira": "び",
    "kata": "ビ",
    "romaji": "bi",
    "strokes": 3
  },
  {
    "hira": "ぶ",
    "kata": "ブ",
    "romaji": "bu",
    "strokes": 6
  },
  {
    "hira": "べ",
    "kata": "ベ",
    "romaji": "be",
    "strokes": 3
  },
  {
    "hira": "ぼ",
    "kata": "ボ",
    "romaji": "bo",
    "strokes": 6
  },
  {
    "hira": "ぱ",
    "kata": "パ",
    "romaji": "pa",
    "strokes": 4
  },
  {
    "hira": "ぴ",
    "kata": "ピ",
    "romaji": "pi",
    "strokes": 2
  },
  {
    "hira": "ぷ",
    "kata": "プ",
    "romaji": "pu",
    "strokes": 5
  },
  {
    "hira": "ぺ",
    "kata": "ペ",
    "romaji": "pe",
    "strokes": 2
  },
  {
    "hira": "ぽ",
    "kata": "ポ",
    "romaji": "po",
    "strokes": 5
  }
];
export const YOON_KANA: KanaItem[] = [
  {
    "hira": "きゃ",
    "kata": "キャ",
    "romaji": "kya"
  },
  {
    "hira": "きゅ",
    "kata": "キュ",
    "romaji": "kyu"
  },
  {
    "hira": "きょ",
    "kata": "キョ",
    "romaji": "kyo"
  },
  {
    "hira": "しゃ",
    "kata": "シャ",
    "romaji": "sha"
  },
  {
    "hira": "しゅ",
    "kata": "シュ",
    "romaji": "shu"
  },
  {
    "hira": "しょ",
    "kata": "ショ",
    "romaji": "sho"
  },
  {
    "hira": "ちゃ",
    "kata": "チャ",
    "romaji": "cha"
  },
  {
    "hira": "ちゅ",
    "kata": "チュ",
    "romaji": "chu"
  },
  {
    "hira": "ちょ",
    "kata": "チョ",
    "romaji": "cho"
  },
  {
    "hira": "にゃ",
    "kata": "ニャ",
    "romaji": "nya"
  },
  {
    "hira": "にゅ",
    "kata": "ニュ",
    "romaji": "nyu"
  },
  {
    "hira": "にょ",
    "kata": "ニョ",
    "romaji": "nyo"
  },
  {
    "hira": "ひゃ",
    "kata": "ヒャ",
    "romaji": "hya"
  },
  {
    "hira": "ひゅ",
    "kata": "ヒュ",
    "romaji": "hyu"
  },
  {
    "hira": "ひょ",
    "kata": "ヒョ",
    "romaji": "hyo"
  },
  {
    "hira": "みゃ",
    "kata": "ミャ",
    "romaji": "mya"
  },
  {
    "hira": "みゅ",
    "kata": "ミュ",
    "romaji": "myu"
  },
  {
    "hira": "みょ",
    "kata": "ミョ",
    "romaji": "myo"
  },
  {
    "hira": "りゃ",
    "kata": "リャ",
    "romaji": "rya"
  },
  {
    "hira": "りゅ",
    "kata": "リュ",
    "romaji": "ryu"
  },
  {
    "hira": "りょ",
    "kata": "リョ",
    "romaji": "ryo"
  }
];

export const ALL_KANA: KanaItem[] = [...BASIC_KANA, ...DAKUON_KANA];
