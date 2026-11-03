// NihongoSetu Core Vocabulary Datasets & Offline Fallback
export interface VocabWord {
  kanji: string;
  reading: string;
  romaji: string;
  meaning: string;
  category: string;
  exampleJa: string;
  exampleEn: string;
}

const VOCAB_FALLBACK=[
["私","わたし","watashi","I; me","Basics","私は学生です。","I am a student."],
["あなた","あなた","anata","you","Basics","あなたは先生ですか。","Are you a teacher?"],
["人","ひと","hito","person","Basics","あの人は田中さんです。","That person is Tanaka-san."],
["友達","ともだち","tomodachi","friend","People","友達と話します。","I talk with a friend."],
["先生","せんせい","sensei","teacher","People","先生は日本語を教えます。","The teacher teaches Japanese."],
["学生","がくせい","gakusei","student","People","私は学生です。","I am a student."],
["学校","がっこう","gakkou","school","Places","学校へ行きます。","I go to school."],
["家","いえ","ie","house; home","Places","家に帰ります。","I return home."],
["駅","えき","eki","station","Places","駅で会いましょう。","Let's meet at the station."],
["店","みせ","mise","shop; store","Places","店で水を買います。","I buy water at the shop."],
["水","みず","mizu","water","Food & drink","水を飲みます。","I drink water."],
["お茶","おちゃ","ocha","tea","Food & drink","お茶をください。","Tea, please."],
["ご飯","ごはん","gohan","cooked rice; meal","Food & drink","ご飯を食べます。","I eat a meal."],
["パン","パン","pan","bread","Food & drink","パンを買います。","I buy bread."],
["りんご","りんご","ringo","apple","Food & drink","りんごを食べます。","I eat an apple."],
["猫","ねこ","neko","cat","Animals","猫がいます。","There is a cat."],
["犬","いぬ","inu","dog","Animals","犬が好きです。","I like dogs."],
["本","ほん","hon","book","Things","本を読みます。","I read a book."],
["車","くるま","kuruma","car","Things","車で行きます。","I go by car."],
["かばん","かばん","kaban","bag","Things","これは私のかばんです。","This is my bag."],
["大きい","おおきい","ookii","big; large","Adjectives","大きい犬です。","It is a big dog."],
["小さい","ちいさい","chiisai","small","Adjectives","小さい猫です。","It is a small cat."],
["新しい","あたらしい","atarashii","new","Adjectives","新しい本です。","It is a new book."],
["古い","ふるい","furui","old","Adjectives","古い車です。","It is an old car."],
["食べる","たべる","taberu","to eat","Verbs","りんごを食べます。","I eat an apple."],
["飲む","のむ","nomu","to drink","Verbs","水を飲みます。","I drink water."],
["行く","いく","iku","to go","Verbs","学校へ行きます。","I go to school."],
["来る","くる","kuru","to come","Verbs","友達が来ます。","A friend is coming."],
["見る","みる","miru","to see; to watch","Verbs","テレビを見ます。","I watch TV."],
["読む","よむ","yomu","to read","Verbs","本を読みます。","I read a book."]
];

export const CORE_VOCABULARY: VocabWord[] = VOCAB_FALLBACK.map(([kanji, reading, romaji, meaning, category, exampleJa, exampleEn]) => ({
  kanji,
  reading,
  romaji,
  meaning,
  category,
  exampleJa,
  exampleEn
}));

export const VOCAB_TARGET_COUNTS = {
  N5: 800,
  N4: 1500,
  N3: 3750,
  N2: 6000,
  N1: 10000
};
