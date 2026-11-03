// JLPT Examination Questions Bank
export interface ExamQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category?: 'Vocabulary' | 'Grammar' | 'Reading' | 'Listening';
}

const MOCK_BANK={
N5:[
["「山」の読み方は？",["やま","かわ","うみ","そら"],0,"山 is read やま."],
["「昨日」の意味は？",["today","yesterday","tomorrow","morning"],1,"昨日（きのう）means yesterday."],
["わたしは毎朝、パン___食べます。",["を","に","で","が"],0,"を marks the direct object of 食べます."],
["田中さん___学生です。",["は","を","で","に"],0,"は marks the topic: Tanaka is a student."],
["「安い」の反対は？",["高い","古い","近い","少ない"],0,"高い means expensive/high; it contrasts with 安い (cheap)."],
["図書館で本を読みます。どこで本を読みますか。",["学校","図書館","家","駅"],1,"The sentence says 図書館で."],
["毎日六時___起きます。",["に","を","で","へ"],0,"に marks a specific clock time."],
["「友達」の読み方は？",["ともだち","ともたち","ゆうだち","とももち"],0,"友達 is read ともだち."],
["これはだれ___かばんですか。",["の","を","に","で"],0,"だれの asks whose; の marks possession."],
["雨が降っています。外へ行きますか。",["雨なので傘を持って行きます","昨日は晴れでした","毎日泳ぎます","駅で本を買います"],0,"雨が降っています means it is raining; carrying an umbrella fits."],
],
N4:[
["「準備」の読み方は？",["じゅんび","じゅびん","しゅんび","じゅんぴ"],0,"準備 is read じゅんび."],
["会議に間に合う___、早く出ました。",["ように","そうに","ためで","ことに"],0,"ように expresses doing something so that a goal can be achieved."],
["この料理は思った___おいしかった。",["より","まで","ほどに","しか"],0,"思ったより means more/different than expected."],
["電車が遅れたので、学校に遅刻しました。なぜ遅刻しましたか。",["電車が遅れたから","寝なかったから","雨が降ったから","道に迷ったから"],0,"The passage directly gives the train delay as the reason."],
["「経験」に近い意味は？",["体験","予定","説明","連絡"],0,"経験 and 体験 both refer to experience."],
["薬を飲ん___、少し休んでください。",["でから","だから","ても","ながらに"],0,"てから indicates the next action after taking medicine."],
["部屋をきれいに___ください。",["して","なって","あって","おいてて"],0,"きれいにする means to make/keep clean."],
["雨が降りそうです。",["It looks like it will rain","It rained yesterday","It never rains","It stopped raining"],0,"〜そうです here expresses appearance or likelihood."],
["約束の時間を忘れない___、メモしました。",["ように","ためで","そうで","ながら"],0,"ように expresses taking care not to forget."],
["この道をまっすぐ行くと、右に銀行があります。銀行はどこですか。",["まっすぐ進んで右","左に曲がる","後ろに戻る","駅の中"],0,"The directions say straight ahead, then on the right."],
],
N3:[
["「影響」の読み方は？",["えいきょう","えいこう","いんきょう","えんきょう"],0,"影響 is read えいきょう."],
["雨にも___、試合は行われた。",["かかわらず","つれて","おいて","よって"],0,"〜にもかかわらず means despite."],
["彼は忙しい___、毎日運動している。",["ながらも","うえで","とおりに","ばかりに"],0,"〜ながらも expresses contrast: although."],
["新しい制度の導入によって、仕事の効率が上がった。何が効率を上げましたか。",["新しい制度","休日の増加","人員の減少","機械の故障"],0,"The sentence identifies the introduction of a new system."],
["「維持」の意味は？",["keep something in the same state","make something disappear","change completely","put something off"],0,"維持 means maintenance or keeping a state."],
["説明を聞いた___、まだよく分からない。",["ものの","うえで","ところで","かわりに"],0,"〜ものの means although; the result contrasts with expectation."],
["彼は約束した___、来なかった。",["にもかかわらず","にしたがって","にとって","に比べて"],0,"〜にもかかわらず marks an unexpected contrast."],
["この薬は食後に飲む___書いてあります。",["ように","ことに","ためで","ものを"],0,"〜ように書いてある indicates written instructions."],
["利用者が増える___、サービスの改善も必要になる。",["につれて","として","にしても","に限って"],0,"〜につれて expresses change in parallel."],
["調査の結果、利用者の多くが簡単な操作を望んでいることが分かった。利用者は何を望んでいますか。",["簡単な操作","高い料金","複雑な機能","長い説明"],0,"The passage says users want simple operation."],
],
N2:[
["「傾向」の読み方は？",["けいこう","けいごう","きょうこう","けんこう"],0,"傾向 is read けいこう."],
["この計画は費用の面___問題がある。",["で","に","を","へ"],0,"費用の面で means in terms of cost."],
["努力した___、必ず成功するとは限らない。",["からといって","ものなら","どころか","に先立って"],0,"からといって rejects an automatic conclusion."],
["新製品は性能だけでなく、価格の面でも競争力がある。新製品の特徴は？",["性能と価格の両方で強みがある","価格だけが高い","性能が低い","販売を終了した"],0,"The sentence states strengths in both performance and price."],
["「懸念」の意味に最も近いものは？",["心配","期待","満足","確信"],0,"懸念 means concern or worry."],
["会議の開始___、資料を全員に配布した。",["に先立ち","に反して","に応じて","に基づき"],0,"に先立ち means prior to."],
["彼の説明は事実___いる。",["に基づいて","を問わず","にかけて","とともに"],0,"に基づいて means based on."],
["需要の増加に伴い、生産量を拡大した。何に伴って生産量を拡大しましたか。",["需要の増加","人員の減少","設備の故障","価格の下落"],0,"The increase in demand led to expanded production."],
["この規則は年齢___、すべての参加者に適用される。",["を問わず","に限り","に沿って","に反して"],0,"を問わず means regardless of."],
["十分に検討した___、結論を出すべきだ。",["うえで","ばかりに","どころか","ものの"],0,"うえで means after doing something / on that basis."],
],
N1:[
["「顕著」の読み方は？",["けんちょ","けんしょう","げんちょ","けんじょ"],0,"顕著 is read けんちょ."],
["彼の説明は要___得ている。",["を","に","が","で"],0,"要を得る is the idiom meaning to be to the point."],
["計画の変更を余儀なくされた。意味は？",["変更せざるを得なかった","自由に変更した","変更を拒否した","変更を忘れた"],0,"余儀なくされる means to be forced/compelled."],
["新制度は導入されたものの、現場では十分に機能していない。状況は？",["導入済みだが十分に働いていない","導入が中止された","現場で高く評価された","以前より単純になった"],0,"The sentence says it was introduced but is not functioning sufficiently."],
["「妥協」の意味は？",["互いに譲り合って折り合うこと","一方的に命令すること","問題を先送りすること","事実を隠すこと"],0,"妥協 means compromise."],
["彼は周囲の反対を押し切って実行した。",["反対があっても実行した","賛成を待って中止した","周囲に相談せず忘れた","反対意見に従った"],0,"押し切る means to push through despite opposition."],
["状況を鑑みて、対応を再検討する。鑑みてに近い意味は？",["考慮して","無視して","比較せず","疑って"],0,"鑑みて means taking something into consideration."],
["彼の発言は誤解を招きかねない。",["誤解を生む可能性がある","誤解を必ず解消する","誤解とは無関係だ","誤解を避けた"],0,"〜かねない expresses a possibility of an undesirable result."],
["予算が限られている以上、優先順位をつけるほかない。どうする必要がありますか。",["優先順位を決める","予算を無制限に増やす","計画をすべて中止する","支出を記録しない"],0,"ほかない means there is no choice but to do it."],
["彼は失敗をものともせず、研究を続けた。",["失敗を気にせず","失敗を恐れて","失敗を隠して","失敗を喜んで"],0,"ものともせず means without being daunted by."],
]};

// Additional original question sets: each JLPT level has 20 questions total.
const MOCK_BANK_EXTRA={
N5:[
["「午後」の読み方は？",["ごぜん","ごご","あさ","よる"],1,"午後 is read ごご and means afternoon."],
["「病院」はどこですか。",["本を買うところ","病気の人が行くところ","電車に乗るところ","ご飯を食べるところ"],1,"病院（びょういん）is a hospital."],
["きのう、映画を___。",["見ます","見ました","見ません","見ましょう"],1,"きのう indicates the past; 見ました is the polite past."],
["机の上に本が二___あります。",["人","本","冊","匹"],2,"冊 is the counter for books."],
["「暑い」の意味は？",["cold weather","hot weather","expensive","busy"],1,"暑い describes hot weather."],
["わたしは日本語___勉強します。",["を","が","に","へ"],0,"を marks the object of 勉強します."],
["駅___友達を待ちます。",["を","で","が","へ"],1,"で marks the place where an action occurs."],
["日曜日は学校へ___。",["行きません","行きましたか","行きますか","行って"],0,"行きません means do not go."],
["「毎週」の読み方は？",["まいにち","まいしゅう","まいつき","まいとし"],1,"毎週 is read まいしゅう."],
["A: いっしょに昼ご飯を食べませんか。 B: ___。",["はい、食べましょう","いただきますでした","おやすみなさい","いってきます"],0,"食べましょう is a natural acceptance of the invitation."]
],
N4:[
["「連絡」の読み方は？",["れんらく","れんろく","ねんらく","れんがく"],0,"連絡 is read れんらく."],
["宿題をした___、テレビを見ました。",["あとで","まえに","ながら","までに"],0,"あとで means after doing the homework."],
["この店は駅から近い___、便利です。",["ので","のに","でも","なら"],0,"ので gives the reason: because it is close."],
["窓が開いています。だれかが___ようです。",["開けた","開ける","開けて","開けない"],0,"The open window suggests someone opened it."],
["「間に合う」の意味は？",["to be on time","to get lost","to be absent","to forget"],0,"間に合う means to be in time."],
["日本へ行く___、日本語を勉強しています。",["ために","そうに","ながら","ばかり"],0,"ために expresses purpose: in order to go to Japan."],
["ここに車を止め___はいけません。",["て","た","る","ない"],0,"てはいけません expresses prohibition."],
["彼は毎日練習しているので、上手に___ようになりました。",["話せる","話す","話して","話した"],0,"Potential form + ようになる describes becoming able to do something."],
["「残念」の意味に近いものは？",["disappointing","convenient","careful","healthy"],0,"残念 means regrettable or disappointing."],
["このボタンを押すと、ドアが開きます。何をするとドアが開きますか。",["ボタンを押す","窓を閉める","電気を消す","名前を書く"],0,"The sentence says the door opens when the button is pressed."]
],
N3:[
["「比較」の読み方は？",["ひかく","ひがく","びかく","ひこう"],0,"比較 is read ひかく."],
["この町は昔に比べて、ずいぶん便利に___。",["なった","した","して","なる"],0,"便利になる describes a change of state."],
["時間がない___、急いでください。",["のだから","ところで","ものの","ばかりに"],0,"のだから gives a reason or premise."],
["彼は説明を聞いたうえで、参加するかどうか決めた。いつ決めましたか。",["説明を聞いてから","説明を聞く前に","説明を聞かずに","説明の途中で"],0,"うえで means after doing something."],
["「改善」の意味は？",["making something better","making something smaller","putting something away","making a copy"],0,"改善 means improvement."],
["毎日運動すること___、健康になった。",["によって","にとって","について","に対して"],0,"によって can express the means or cause."],
["彼女は歌が上手な___、ピアノも弾ける。",["うえに","かわりに","せいで","ところが"],0,"うえに adds another positive point: in addition."],
["電車に傘を忘れてしまった。話し手はどうしましたか。",["傘を電車に置き忘れた","傘を買いに行った","電車を降りなかった","傘を友達に貸した"],0,"忘れてしまった indicates the speaker accidentally left the umbrella."],
["この仕事は一人では無理だ。",["一人で行うのは難しい","一人で簡単にできる","誰でもすぐできる","仕事をする必要がない"],0,"無理 means impossible or too difficult under the circumstances."],
["雨が強くなるにつれて、川の水位も上がってきた。何が起きましたか。",["雨が強まり川の水位が上がった","雨が止み水位が下がった","川が乾いてきた","水位は変わらなかった"],0,"につれて shows two changes progressing together."]
],
N2:[
["「促進」の読み方は？",["そくしん","そくじん","ぞくしん","そっしん"],0,"促進 is read そくしん."],
["彼の説明は具体例を___、分かりやすかった。",["交えて","除いて","問わず","反して"],0,"交えて means incorporating or mixing in examples."],
["この結果は予想___のものだった。",["に反する","に限る","に沿う","に応じる"],0,"予想に反する means contrary to expectations."],
["制度を変更するにあたって、利用者の意見を調査した。何をする前に調査しましたか。",["制度の変更","商品の発送","会議の中止","人員の採用"],0,"にあたって means on the occasion of or when undertaking a task."],
["「著しい」の意味に近いものは？",["remarkable","ordinary","temporary","uncertain"],0,"著しい means remarkable or significant."],
["彼は忙しい___、毎日欠かさず運動している。",["にもかかわらず","に応じて","に基づいて","に先立って"],0,"にもかかわらず expresses despite a contrary condition."],
["この資料は最新のデータ___作成された。",["に基づいて","を問わず","に限って","と比べてから"],0,"に基づいて means based on."],
["交通規制に伴い、バスの運行ルートが変更された。何が変更されましたか。",["バスの運行ルート","電車の料金","道路の幅","駅の営業時間"],0,"The sentence states the bus route changed due to traffic restrictions."],
["彼の提案は検討に値する。",["検討する価値がある","検討する必要がない","すでに却下された","実行が禁止されている"],0,"に値する means worth doing."],
["計画を実行するかどうかは、予算___だ。",["次第","一方","以来","最中"],0,"次第 means depending on; the decision depends on the budget."]
],
N1:[
["「踏まえる」の意味に最も近いものは？",["to take into account","to overlook","to postpone","to deny"],0,"踏まえる means to take something into account or base something on it."],
["彼の説明は論理に___。",["かなっている","かけている","とどまっている","およんでいる"],0,"理にかなう means to be reasonable or logical."],
["この問題は一概に結論づける___。",["わけにはいかない","にほかならない","にすぎない","ものがある"],0,"一概に結論づけるわけにはいかない means it cannot be concluded categorically."],
["彼女は困難をものともせず、研究を続けた。どのような態度ですか。",["困難に負けず続けた","困難を避けてやめた","困難を他人に任せた","困難に気づかなかった"],0,"ものともせず means without being daunted by."],
["「懸命」の意味は？",["doing one's utmost","being careless","being indifferent","being hesitant"],0,"懸命 means with all one's effort."],
["彼の発言は誤解を招き___。",["かねない","がたい","かねる","ぬく"],0,"〜かねない indicates a possibility of an undesirable outcome."],
["実情を___、現実的な対策を立てる必要がある。",["踏まえて","問わず","抜きにして","よそに"],0,"踏まえて means taking the actual circumstances into account."],
["新技術の導入を___、作業工程を見直した。",["機に","限り","問わず","皮切りにしても"],0,"機に means taking an event as an opportunity or turning point."],
["彼は批判を___、自分の信念を貫いた。",["よそに","もとに","皮切りに","限りに"],0,"批判をよそに means disregarding or setting criticism aside."],
["議論は平行線をたどり、結論には至らなかった。",["意見が対立したまま進展しなかった","全員がすぐに賛成した","結論がすでに決まった","議論が予定より早く終わった"],0,"平行線をたどる describes a discussion that makes no progress toward agreement."]
]};

export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
export type RawQuestionTuple = [string, string[], number, string];

export function getQuestionsForLevel(level: JLPTLevel): ExamQuestion[] {
  const primary = ((MOCK_BANK as unknown) as Record<string, RawQuestionTuple[]>)[level] || [];
  const extra = ((MOCK_BANK_EXTRA as unknown) as Record<string, RawQuestionTuple[]>)[level] || [];
  const combined = [...primary, ...extra];
  return combined.map(([question, options, correctIndex, explanation]) => ({
    question,
    options,
    correctIndex,
    explanation,
    category: question.includes('読み方') || question.includes('意味') ? 'Vocabulary' : 'Grammar'
  }));
}
