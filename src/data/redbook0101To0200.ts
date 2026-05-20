import type { SentenceStudyItem } from "../types/sentence";
import { redbook0101To0200WordById } from "./redbook0101To0200Words";

const redbook0101To0200Items = [
  {
    "id": "0101",
    "targetWord": "妹（いもうと）",
    "jpSentence": "ヒナタの妹はハナビだ。",
    "kanaSentence": "ひなたのいもうとははなびだ。",
    "cnTranslation": "雏田的妹妹是花火。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0101.wav",
    "hint": {
      "firstKana": "ひ",
      "difficultWordReading": "妹：いもうと",
      "cnKeyword": "妹妹"
    },
    "wordNotes": [
      "妹：妹妹。",
      "读音：いもうと。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0102",
    "targetWord": "嫌（いや）",
    "jpSentence": "サイタマは面倒なことが嫌だ。",
    "kanaSentence": "さいたまはめんどうなことがいやだ。",
    "cnTranslation": "埼玉讨厌麻烦事。",
    "work": "一拳超人",
    "audioSrc": "/assets/audio/sentences/0102.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "嫌：いや",
      "cnKeyword": "讨厌、不喜欢"
    },
    "wordNotes": [
      "嫌：讨厌、不喜欢。",
      "读音：いや。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0103",
    "targetWord": "入り口（いりぐち）",
    "jpSentence": "木ノ葉の入り口にナルトが立つ。",
    "kanaSentence": "このはのいりぐちになるとがたつ。",
    "cnTranslation": "鸣人站在木叶的入口。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0103.wav",
    "hint": {
      "firstKana": "こ",
      "difficultWordReading": "入り口：いりぐち",
      "cnKeyword": "入口"
    },
    "wordNotes": [
      "入り口：入口。",
      "读音：いりぐち。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0104",
    "targetWord": "いる",
    "jpSentence": "ルフィは船にいる。",
    "kanaSentence": "るふぃはふねにいる。",
    "cnTranslation": "路飞在船上。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0104.wav",
    "hint": {
      "firstKana": "る",
      "difficultWordReading": "いる：いる",
      "cnKeyword": "在、有"
    },
    "wordNotes": [
      "いる：在、有。",
      "读音：いる。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0105",
    "targetWord": "要る（いる）",
    "jpSentence": "この任務には仲間が要る。",
    "kanaSentence": "このにんむにはなかまがいる。",
    "cnTranslation": "这项任务需要伙伴。",
    "work": "红宝书 N5·N4",
    "audioSrc": "/assets/audio/sentences/0105.wav",
    "hint": {
      "firstKana": "こ",
      "difficultWordReading": "要る：いる",
      "cnKeyword": "需要"
    },
    "wordNotes": [
      "要る：需要。",
      "读音：いる。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0106",
    "targetWord": "入れる（いれる）",
    "jpSentence": "レムは紅茶に砂糖を入れる。",
    "kanaSentence": "れむはこうちゃにさとうをいれる。",
    "cnTranslation": "蕾姆往红茶里加糖。",
    "work": "Re:从零开始的异世界生活",
    "audioSrc": "/assets/audio/sentences/0106.wav",
    "hint": {
      "firstKana": "れ",
      "difficultWordReading": "入れる：いれる",
      "cnKeyword": "放入、倒入"
    },
    "wordNotes": [
      "入れる：放入、倒入。",
      "读音：いれる。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0107",
    "targetWord": "色（いろ）",
    "jpSentence": "エミリアの髪の色は銀色だ。",
    "kanaSentence": "えみりあのかみのいろはぎんいろだ。",
    "cnTranslation": "爱蜜莉雅的发色是银色。",
    "work": "Re:从零开始的异世界生活",
    "audioSrc": "/assets/audio/sentences/0107.wav",
    "hint": {
      "firstKana": "え",
      "difficultWordReading": "色：いろ",
      "cnKeyword": "颜色"
    },
    "wordNotes": [
      "色：颜色。",
      "读音：いろ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0108",
    "targetWord": "いろいろ",
    "jpSentence": "ナミはいろいろな地図を持つ。",
    "kanaSentence": "なみはいろいろなちずをもつ。",
    "cnTranslation": "娜美有各种各样的地图。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0108.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "いろいろ：いろいろ",
      "cnKeyword": "各种各样"
    },
    "wordNotes": [
      "いろいろ：各种各样。",
      "读音：いろいろ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0109",
    "targetWord": "集まる（あつまる）",
    "jpSentence": "木ノ葉の隊員が集まる。",
    "kanaSentence": "このはのたいいんがあつまる。",
    "cnTranslation": "木叶的队员集合起来。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0109.wav",
    "hint": {
      "firstKana": "こ",
      "difficultWordReading": "集まる：あつまる",
      "cnKeyword": "聚集、集合"
    },
    "wordNotes": [
      "集まる：聚集、集合。",
      "读音：あつまる。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0110",
    "targetWord": "印刷する（いんさつする）",
    "jpSentence": "斉木は資料を印刷する。",
    "kanaSentence": "さいきはしりょうをいんさつする。",
    "cnTranslation": "齐木打印资料。",
    "work": "齐木楠雄的灾难",
    "audioSrc": "/assets/audio/sentences/0110.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "印刷する：いんさつする",
      "cnKeyword": "打印、印刷"
    },
    "wordNotes": [
      "印刷する：打印、印刷。",
      "读音：いんさつする。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0111",
    "targetWord": "第一印象（だいいちいんしょう）",
    "jpSentence": "サスケの第一印象は静かだ。",
    "kanaSentence": "さすけのだいいちいんしょうはしずかだ。",
    "cnTranslation": "佐助给人的第一印象很安静。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0111.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "第一印象：だいいちいんしょう",
      "cnKeyword": "第一印象"
    },
    "wordNotes": [
      "第一印象：第一印象。",
      "读音：だいいちいんしょう。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0112",
    "targetWord": "飲食（いんしょく）",
    "jpSentence": "ナルトは祭りで飲食を楽しむ。",
    "kanaSentence": "なるとはまつりでいんしょくをたのしむ。",
    "cnTranslation": "鸣人在祭典上享受饮食。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0112.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "飲食：いんしょく",
      "cnKeyword": "饮食"
    },
    "wordNotes": [
      "飲食：饮食。",
      "读音：いんしょく。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0113",
    "targetWord": "インターネット（いんたーねっと）",
    "jpSentence": "斉木はインターネットで情報を見る。",
    "kanaSentence": "さいきはいんたーねっとでじょうほうをみる。",
    "cnTranslation": "齐木在互联网上看信息。",
    "work": "齐木楠雄的灾难",
    "audioSrc": "/assets/audio/sentences/0113.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "インターネット：いんたーねっと",
      "cnKeyword": "互联网"
    },
    "wordNotes": [
      "インターネット：互联网。",
      "读音：いんたーねっと。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0114",
    "targetWord": "ウーロン茶（うーろんちゃ）",
    "jpSentence": "サンジはウーロン茶を出す。",
    "kanaSentence": "さんじはうーろんちゃをだす。",
    "cnTranslation": "山治端出乌龙茶。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0114.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "ウーロン茶：うーろんちゃ",
      "cnKeyword": "乌龙茶"
    },
    "wordNotes": [
      "ウーロン茶：乌龙茶。",
      "读音：うーろんちゃ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0115",
    "targetWord": "ううん",
    "jpSentence": "ルフィは「ううん」と首を振る。",
    "kanaSentence": "るふぃは「ううん」とくびをふる。",
    "cnTranslation": "路飞说“不”，摇了摇头。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0115.wav",
    "hint": {
      "firstKana": "る",
      "difficultWordReading": "ううん：ううん",
      "cnKeyword": "不、不是"
    },
    "wordNotes": [
      "ううん：不、不是。",
      "读音：ううん。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0116",
    "targetWord": "上（うえ）",
    "jpSentence": "ナルトは屋根の上に立つ。",
    "kanaSentence": "なるとはやねのうえにたつ。",
    "cnTranslation": "鸣人站在屋顶上。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0116.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "上：うえ",
      "cnKeyword": "上、上面"
    },
    "wordNotes": [
      "上：上、上面。",
      "读音：うえ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0117",
    "targetWord": "牛（うし）",
    "jpSentence": "悟空は牛を見て笑う。",
    "kanaSentence": "ごくうはうしをみてわらう。",
    "cnTranslation": "悟空看着牛笑了。",
    "work": "龙珠",
    "audioSrc": "/assets/audio/sentences/0117.wav",
    "hint": {
      "firstKana": "ご",
      "difficultWordReading": "牛：うし",
      "cnKeyword": "牛"
    },
    "wordNotes": [
      "牛：牛。",
      "读音：うし。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0118",
    "targetWord": "後ろ（うしろ）",
    "jpSentence": "サスケはナルトの後ろにいる。",
    "kanaSentence": "さすけはなるとのうしろにいる。",
    "cnTranslation": "佐助在鸣人后面。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0118.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "後ろ：うしろ",
      "cnKeyword": "后面"
    },
    "wordNotes": [
      "後ろ：后面。",
      "读音：うしろ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0119",
    "targetWord": "薄い（うすい）",
    "jpSentence": "斉木のノートは薄い。",
    "kanaSentence": "さいきののーとはうすい。",
    "cnTranslation": "齐木的笔记本很薄。",
    "work": "齐木楠雄的灾难",
    "audioSrc": "/assets/audio/sentences/0119.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "薄い：うすい",
      "cnKeyword": "薄的"
    },
    "wordNotes": [
      "薄い：薄的。",
      "读音：うすい。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0120",
    "targetWord": "右折する（うせつする）",
    "jpSentence": "サクラは右折して病院へ行く。",
    "kanaSentence": "さくらはうせつしてびょういんへいく。",
    "cnTranslation": "小樱右转后去医院。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0120.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "右折する：うせつする",
      "cnKeyword": "右转"
    },
    "wordNotes": [
      "右折する：右转。",
      "读音：うせつする。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0121",
    "targetWord": "歌（うた）",
    "jpSentence": "ブルックの歌は明るい。",
    "kanaSentence": "ぶるっくのうたはあかるい。",
    "cnTranslation": "布鲁克的歌很明朗。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0121.wav",
    "hint": {
      "firstKana": "ぶ",
      "difficultWordReading": "歌：うた",
      "cnKeyword": "歌"
    },
    "wordNotes": [
      "歌：歌。",
      "读音：うた。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0122",
    "targetWord": "歌う（うたう）",
    "jpSentence": "ブルックは船で歌う。",
    "kanaSentence": "ぶるっくはふねでうたう。",
    "cnTranslation": "布鲁克在船上唱歌。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0122.wav",
    "hint": {
      "firstKana": "ぶ",
      "difficultWordReading": "歌う：うたう",
      "cnKeyword": "唱歌"
    },
    "wordNotes": [
      "歌う：唱歌。",
      "读音：うたう。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0123",
    "targetWord": "家（いえ）",
    "jpSentence": "ナルトは家に帰る。",
    "kanaSentence": "なるとはいえにかえる。",
    "cnTranslation": "鸣人回家。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0123.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "家：いえ",
      "cnKeyword": "家"
    },
    "wordNotes": [
      "家：家。",
      "读音：いえ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0124",
    "targetWord": "内（うち）",
    "jpSentence": "ナザリックの内は静かだ。",
    "kanaSentence": "なざりっくのうちはしずかだ。",
    "cnTranslation": "纳萨力克内部很安静。",
    "work": "Overlord",
    "audioSrc": "/assets/audio/sentences/0124.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "内：うち",
      "cnKeyword": "里面、内部"
    },
    "wordNotes": [
      "内：里面、内部。",
      "读音：うち。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0125",
    "targetWord": "打ち合わせ（うちあわせ）",
    "jpSentence": "ナミとサンジは作戦の打ち合わせをする。",
    "kanaSentence": "なみとさんじはさくせんのうちあわせをする。",
    "cnTranslation": "娜美和山治开作战碰头会。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0125.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "打ち合わせ：うちあわせ",
      "cnKeyword": "碰头、商量"
    },
    "wordNotes": [
      "打ち合わせ：碰头、商量。",
      "读音：うちあわせ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0126",
    "targetWord": "打ち合わせる（うちあわせる）",
    "jpSentence": "ナミは仲間と作戦を打ち合わせる。",
    "kanaSentence": "なみはなかまとさくせんをうちあわせる。",
    "cnTranslation": "娜美和伙伴商量作战。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0126.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "打ち合わせる：うちあわせる",
      "cnKeyword": "商量、预先讨论"
    },
    "wordNotes": [
      "打ち合わせる：商量、预先讨论。",
      "读音：うちあわせる。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0127",
    "targetWord": "美しい（うつくしい）",
    "jpSentence": "エミリアは美しい。",
    "kanaSentence": "えみりあはうつくしい。",
    "cnTranslation": "爱蜜莉雅很美。",
    "work": "Re:从零开始的异世界生活",
    "audioSrc": "/assets/audio/sentences/0127.wav",
    "hint": {
      "firstKana": "え",
      "difficultWordReading": "美しい：うつくしい",
      "cnKeyword": "美丽的"
    },
    "wordNotes": [
      "美しい：美丽的。",
      "读音：うつくしい。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0128",
    "targetWord": "うどん",
    "jpSentence": "ナルトはうどんも食べる。",
    "kanaSentence": "なるとはうどんもたべる。",
    "cnTranslation": "鸣人也吃乌冬面。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0128.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "うどん：うどん",
      "cnKeyword": "乌冬面"
    },
    "wordNotes": [
      "うどん：乌冬面。",
      "读音：うどん。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0129",
    "targetWord": "生まれる（うまれる）",
    "jpSentence": "悟飯は地球で生まれた。",
    "kanaSentence": "ごはんはちきゅうでうまれた。",
    "cnTranslation": "悟饭出生在地球。",
    "work": "龙珠",
    "audioSrc": "/assets/audio/sentences/0129.wav",
    "hint": {
      "firstKana": "ご",
      "difficultWordReading": "生まれる：うまれる",
      "cnKeyword": "出生"
    },
    "wordNotes": [
      "生まれる：出生。",
      "读音：うまれる。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0130",
    "targetWord": "海（うみ）",
    "jpSentence": "ルフィは海を見る。",
    "kanaSentence": "るふぃはうみをみる。",
    "cnTranslation": "路飞看着大海。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0130.wav",
    "hint": {
      "firstKana": "る",
      "difficultWordReading": "海：うみ",
      "cnKeyword": "海"
    },
    "wordNotes": [
      "海：海。",
      "读音：うみ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0131",
    "targetWord": "売り切れ（うりきれ）",
    "jpSentence": "サイタマが店に行くと、卵は売り切れだ。",
    "kanaSentence": "さいたまがみせにいくと、たまごはうりきれだ。",
    "cnTranslation": "埼玉到店里时，鸡蛋已经卖完了。",
    "work": "一拳超人",
    "audioSrc": "/assets/audio/sentences/0131.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "売り切れ：うりきれ",
      "cnKeyword": "售罄、卖完"
    },
    "wordNotes": [
      "売り切れ：售罄、卖完。",
      "读音：うりきれ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0132",
    "targetWord": "売り場（うりば）",
    "jpSentence": "ナミは売り場で服を見る。",
    "kanaSentence": "なみはうりばでふくをみる。",
    "cnTranslation": "娜美在卖场看衣服。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0132.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "売り場：うりば",
      "cnKeyword": "柜台、卖场"
    },
    "wordNotes": [
      "売り場：柜台、卖场。",
      "读音：うりば。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0133",
    "targetWord": "売る（うる）",
    "jpSentence": "商人はルフィに地図を売る。",
    "kanaSentence": "しょうにんはるふぃにちずをうる。",
    "cnTranslation": "商人把地图卖给路飞。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0133.wav",
    "hint": {
      "firstKana": "し",
      "difficultWordReading": "売る：うる",
      "cnKeyword": "卖"
    },
    "wordNotes": [
      "売る：卖。",
      "读音：うる。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0134",
    "targetWord": "うるさい",
    "jpSentence": "燃堂は少しうるさい。",
    "kanaSentence": "ねんどうはすこしうるさい。",
    "cnTranslation": "燃堂有点吵。",
    "work": "齐木楠雄的灾难",
    "audioSrc": "/assets/audio/sentences/0134.wav",
    "hint": {
      "firstKana": "ね",
      "difficultWordReading": "うるさい：うるさい",
      "cnKeyword": "吵闹的"
    },
    "wordNotes": [
      "うるさい：吵闹的。",
      "读音：うるさい。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0135",
    "targetWord": "嬉しい（うれしい）",
    "jpSentence": "ナルトは仲間の言葉が嬉しい。",
    "kanaSentence": "なるとはなかまのことばがうれしい。",
    "cnTranslation": "鸣人听到伙伴的话很高兴。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0135.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "嬉しい：うれしい",
      "cnKeyword": "高兴的"
    },
    "wordNotes": [
      "嬉しい：高兴的。",
      "读音：うれしい。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0136",
    "targetWord": "上着（うわぎ）",
    "jpSentence": "サスケは黒い上着を着る。",
    "kanaSentence": "さすけはくろいうわぎをきる。",
    "cnTranslation": "佐助穿黑色外套。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0136.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "上着：うわぎ",
      "cnKeyword": "外套、上衣"
    },
    "wordNotes": [
      "上着：外套、上衣。",
      "读音：うわぎ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0137",
    "targetWord": "うん",
    "jpSentence": "ナルトは「うん」と答える。",
    "kanaSentence": "なるとは「うん」とこたえる。",
    "cnTranslation": "鸣人回答“嗯”。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0137.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "うん：うん",
      "cnKeyword": "嗯、是"
    },
    "wordNotes": [
      "うん：嗯、是。",
      "读音：うん。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0138",
    "targetWord": "運転（うんてん）",
    "jpSentence": "悟空は車の運転を練習する。",
    "kanaSentence": "ごくうはくるまのうんてんをれんしゅうする。",
    "cnTranslation": "悟空练习开车。",
    "work": "龙珠",
    "audioSrc": "/assets/audio/sentences/0138.wav",
    "hint": {
      "firstKana": "ご",
      "difficultWordReading": "運転：うんてん",
      "cnKeyword": "驾驶"
    },
    "wordNotes": [
      "運転：驾驶。",
      "读音：うんてん。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0139",
    "targetWord": "運動（うんどう）",
    "jpSentence": "サイタマは毎日運動する。",
    "kanaSentence": "さいたまはまいにちうんどうする。",
    "cnTranslation": "埼玉每天运动。",
    "work": "一拳超人",
    "audioSrc": "/assets/audio/sentences/0139.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "運動：うんどう",
      "cnKeyword": "运动"
    },
    "wordNotes": [
      "運動：运动。",
      "读音：うんどう。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0140",
    "targetWord": "運動会（うんどうかい）",
    "jpSentence": "木ノ葉の子どもたちは運動会を楽しむ。",
    "kanaSentence": "このはのこどもたちはうんどうかいをたのしむ。",
    "cnTranslation": "木叶的孩子们享受运动会。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0140.wav",
    "hint": {
      "firstKana": "こ",
      "difficultWordReading": "運動会：うんどうかい",
      "cnKeyword": "运动会"
    },
    "wordNotes": [
      "運動会：运动会。",
      "读音：うんどうかい。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0141",
    "targetWord": "運動場（うんどうじょう）",
    "jpSentence": "ナルトは運動場で走る。",
    "kanaSentence": "なるとはうんどうじょうではしる。",
    "cnTranslation": "鸣人在运动场跑步。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0141.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "運動場：うんどうじょう",
      "cnKeyword": "运动场"
    },
    "wordNotes": [
      "運動場：运动场。",
      "读音：うんどうじょう。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0142",
    "targetWord": "絵（え）",
    "jpSentence": "サイは絵を描く。",
    "kanaSentence": "さいはえをえがく。",
    "cnTranslation": "佐井画画。",
    "work": "红宝书 N5·N4",
    "audioSrc": "/assets/audio/sentences/0142.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "絵：え",
      "cnKeyword": "画、图画"
    },
    "wordNotes": [
      "絵：画、图画。",
      "读音：え。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0143",
    "targetWord": "エアコン（えあこん）",
    "jpSentence": "サイタマは夏にエアコンをつける。",
    "kanaSentence": "さいたまはなつにえあこんをつける。",
    "cnTranslation": "埼玉夏天开空调。",
    "work": "一拳超人",
    "audioSrc": "/assets/audio/sentences/0143.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "エアコン：えあこん",
      "cnKeyword": "空调"
    },
    "wordNotes": [
      "エアコン：空调。",
      "读音：えあこん。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0144",
    "targetWord": "エアメール（えあめーる）",
    "jpSentence": "ナミはエアメールを受け取る。",
    "kanaSentence": "なみはえあめーるをうけとる。",
    "cnTranslation": "娜美收到航空邮件。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0144.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "エアメール：えあめーる",
      "cnKeyword": "航空邮件"
    },
    "wordNotes": [
      "エアメール：航空邮件。",
      "读音：えあめーる。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0145",
    "targetWord": "映画（えいが）",
    "jpSentence": "斉木は映画を見る。",
    "kanaSentence": "さいきはえいがをみる。",
    "cnTranslation": "齐木看电影。",
    "work": "齐木楠雄的灾难",
    "audioSrc": "/assets/audio/sentences/0145.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "映画：えいが",
      "cnKeyword": "电影"
    },
    "wordNotes": [
      "映画：电影。",
      "读音：えいが。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0146",
    "targetWord": "映画館（えいがかん）",
    "jpSentence": "サイタマは映画館へ行く。",
    "kanaSentence": "さいたまはえいがかんへいく。",
    "cnTranslation": "埼玉去电影院。",
    "work": "一拳超人",
    "audioSrc": "/assets/audio/sentences/0146.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "映画館：えいがかん",
      "cnKeyword": "电影院"
    },
    "wordNotes": [
      "映画館：电影院。",
      "读音：えいがかん。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0147",
    "targetWord": "営業する（えいぎょうする）",
    "jpSentence": "バラティエは夜まで営業する。",
    "kanaSentence": "ばらてぃえはよるまでえいぎょうする。",
    "cnTranslation": "巴拉蒂营业到晚上。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0147.wav",
    "hint": {
      "firstKana": "ば",
      "difficultWordReading": "営業する：えいぎょうする",
      "cnKeyword": "营业"
    },
    "wordNotes": [
      "営業する：营业。",
      "读音：えいぎょうする。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0148",
    "targetWord": "営業部（えいぎょうぶ）",
    "jpSentence": "ジェノスは営業部の資料を見る。",
    "kanaSentence": "じぇのすはえいぎょうぶのしりょうをみる。",
    "cnTranslation": "杰诺斯看营业部的资料。",
    "work": "一拳超人",
    "audioSrc": "/assets/audio/sentences/0148.wav",
    "hint": {
      "firstKana": "じ",
      "difficultWordReading": "営業部：えいぎょうぶ",
      "cnKeyword": "营业部"
    },
    "wordNotes": [
      "営業部：营业部。",
      "读音：えいぎょうぶ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0149",
    "targetWord": "英語（えいご）",
    "jpSentence": "ルフィは英語が分からない。",
    "kanaSentence": "るふぃはえいごがわからない。",
    "cnTranslation": "路飞不懂英语。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0149.wav",
    "hint": {
      "firstKana": "る",
      "difficultWordReading": "英語：えいご",
      "cnKeyword": "英语"
    },
    "wordNotes": [
      "英語：英语。",
      "读音：えいご。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0150",
    "targetWord": "ええ",
    "jpSentence": "レムは「ええ」と静かに答える。",
    "kanaSentence": "れむは「ええ」としずかにこたえる。",
    "cnTranslation": "蕾姆安静地回答“是”。",
    "work": "Re:从零开始的异世界生活",
    "audioSrc": "/assets/audio/sentences/0150.wav",
    "hint": {
      "firstKana": "れ",
      "difficultWordReading": "ええ：ええ",
      "cnKeyword": "是、嗯"
    },
    "wordNotes": [
      "ええ：是、嗯。",
      "读音：ええ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0151",
    "targetWord": "駅（えき）",
    "jpSentence": "サイタマは駅で待つ。",
    "kanaSentence": "さいたまはえきでまつ。",
    "cnTranslation": "埼玉在车站等。",
    "work": "一拳超人",
    "audioSrc": "/assets/audio/sentences/0151.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "駅：えき",
      "cnKeyword": "车站"
    },
    "wordNotes": [
      "駅：车站。",
      "读音：えき。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0152",
    "targetWord": "駅員（えきいん）",
    "jpSentence": "駅員はサイタマに道を教える。",
    "kanaSentence": "えきいんはさいたまにみちをおしえる。",
    "cnTranslation": "车站工作人员给埼玉指路。",
    "work": "一拳超人",
    "audioSrc": "/assets/audio/sentences/0152.wav",
    "hint": {
      "firstKana": "え",
      "difficultWordReading": "駅員：えきいん",
      "cnKeyword": "车站工作人员"
    },
    "wordNotes": [
      "駅員：车站工作人员。",
      "读音：えきいん。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0153",
    "targetWord": "液晶テレビ（えきしょうてれび）",
    "jpSentence": "斉木は液晶テレビを見る。",
    "kanaSentence": "さいきはえきしょうてれびをみる。",
    "cnTranslation": "齐木看液晶电视。",
    "work": "齐木楠雄的灾难",
    "audioSrc": "/assets/audio/sentences/0153.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "液晶テレビ：えきしょうてれび",
      "cnKeyword": "液晶电视"
    },
    "wordNotes": [
      "液晶テレビ：液晶电视。",
      "读音：えきしょうてれび。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0154",
    "targetWord": "駅前（えきまえ）",
    "jpSentence": "サイタマは駅前の店へ行く。",
    "kanaSentence": "さいたまはえきまえのみせへいく。",
    "cnTranslation": "埼玉去车站前的店。",
    "work": "一拳超人",
    "audioSrc": "/assets/audio/sentences/0154.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "駅前：えきまえ",
      "cnKeyword": "车站前"
    },
    "wordNotes": [
      "駅前：车站前。",
      "读音：えきまえ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0155",
    "targetWord": "えっ",
    "jpSentence": "ナルトは「えっ」と驚く。",
    "kanaSentence": "なるとは「えっ」とおどろく。",
    "cnTranslation": "鸣人“诶”地一声感到惊讶。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0155.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "えっ：えっ",
      "cnKeyword": "诶、惊讶声"
    },
    "wordNotes": [
      "えっ：诶、惊讶声。",
      "读音：えっ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0156",
    "targetWord": "絵葉書（えはがき）",
    "jpSentence": "ナミは絵葉書を書く。",
    "kanaSentence": "なみはえはがきをかく。",
    "cnTranslation": "娜美写明信片。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0156.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "絵葉書：えはがき",
      "cnKeyword": "明信片"
    },
    "wordNotes": [
      "絵葉書：明信片。",
      "读音：えはがき。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0157",
    "targetWord": "エレベーター（えれべーたー）",
    "jpSentence": "斉木はエレベーターに乗る。",
    "kanaSentence": "さいきはえれべーたーにのる。",
    "cnTranslation": "齐木坐电梯。",
    "work": "齐木楠雄的灾难",
    "audioSrc": "/assets/audio/sentences/0157.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "エレベーター：えれべーたー",
      "cnKeyword": "电梯"
    },
    "wordNotes": [
      "エレベーター：电梯。",
      "读音：えれべーたー。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0158",
    "targetWord": "円（えん）",
    "jpSentence": "ルフィは肉を五百円で買う。",
    "kanaSentence": "るふぃはにくをごひゃくえんでかう。",
    "cnTranslation": "路飞用五百日元买肉。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0158.wav",
    "hint": {
      "firstKana": "る",
      "difficultWordReading": "円：えん",
      "cnKeyword": "日元"
    },
    "wordNotes": [
      "円：日元。",
      "读音：えん。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0159",
    "targetWord": "遠足（えんそく）",
    "jpSentence": "木ノ葉の子どもたちは遠足へ行く。",
    "kanaSentence": "このはのこどもたちはえんそくへいく。",
    "cnTranslation": "木叶的孩子们去郊游。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0159.wav",
    "hint": {
      "firstKana": "こ",
      "difficultWordReading": "遠足：えんそく",
      "cnKeyword": "郊游"
    },
    "wordNotes": [
      "遠足：郊游。",
      "读音：えんそく。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0160",
    "targetWord": "園長（えんちょう）",
    "jpSentence": "木ノ葉の園長が子どもに話す。",
    "kanaSentence": "このはのえんちょうがこどもにはなす。",
    "cnTranslation": "木叶的园长和孩子说话。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0160.wav",
    "hint": {
      "firstKana": "こ",
      "difficultWordReading": "園長：えんちょう",
      "cnKeyword": "园长"
    },
    "wordNotes": [
      "園長：园长。",
      "读音：えんちょう。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0161",
    "targetWord": "鉛筆（えんぴつ）",
    "jpSentence": "サクラは鉛筆でメモを書く。",
    "kanaSentence": "さくらはえんぴつでめもをかく。",
    "cnTranslation": "小樱用铅笔记笔记。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0161.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "鉛筆：えんぴつ",
      "cnKeyword": "铅笔"
    },
    "wordNotes": [
      "鉛筆：铅笔。",
      "读音：えんぴつ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0162",
    "targetWord": "お茶（おちゃ）",
    "jpSentence": "レムはお茶を出す。",
    "kanaSentence": "れむはおちゃをだす。",
    "cnTranslation": "蕾姆端出茶。",
    "work": "Re:从零开始的异世界生活",
    "audioSrc": "/assets/audio/sentences/0162.wav",
    "hint": {
      "firstKana": "れ",
      "difficultWordReading": "お茶：おちゃ",
      "cnKeyword": "茶"
    },
    "wordNotes": [
      "お茶：茶。",
      "读音：おちゃ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0163",
    "targetWord": "おいしい",
    "jpSentence": "サンジの料理はおいしい。",
    "kanaSentence": "さんじのりょうりはおいしい。",
    "cnTranslation": "山治的料理很好吃。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0163.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "おいしい：おいしい",
      "cnKeyword": "好吃的"
    },
    "wordNotes": [
      "おいしい：好吃的。",
      "读音：おいしい。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0164",
    "targetWord": "往復（おうふく）",
    "jpSentence": "ナルトは里と山を往復する。",
    "kanaSentence": "なるとはさととやまをおうふくする。",
    "cnTranslation": "鸣人在村子和山之间往返。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0164.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "往復：おうふく",
      "cnKeyword": "往返"
    },
    "wordNotes": [
      "往復：往返。",
      "读音：おうふく。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0165",
    "targetWord": "多い（おおい）",
    "jpSentence": "中忍試験には人が多い。",
    "kanaSentence": "ちゅうにんしけんにはひとがおおい。",
    "cnTranslation": "中忍考试里人很多。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0165.wav",
    "hint": {
      "firstKana": "ち",
      "difficultWordReading": "多い：おおい",
      "cnKeyword": "多的"
    },
    "wordNotes": [
      "多い：多的。",
      "读音：おおい。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0166",
    "targetWord": "大きい（おおきい）",
    "jpSentence": "チョッパーは大きい姿になる。",
    "kanaSentence": "ちょっぱーはおおきいすがたになる。",
    "cnTranslation": "乔巴变成巨大的样子。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0166.wav",
    "hint": {
      "firstKana": "ち",
      "difficultWordReading": "大きい：おおきい",
      "cnKeyword": "大的"
    },
    "wordNotes": [
      "大きい：大的。",
      "读音：おおきい。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0167",
    "targetWord": "大きな（おおきな）",
    "jpSentence": "ルフィは大きな夢を持つ。",
    "kanaSentence": "るふぃはおおきなゆめをもつ。",
    "cnTranslation": "路飞怀有远大的梦想。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0167.wav",
    "hint": {
      "firstKana": "る",
      "difficultWordReading": "大きな：おおきな",
      "cnKeyword": "大的"
    },
    "wordNotes": [
      "大きな：大的。",
      "读音：おおきな。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0168",
    "targetWord": "多く（おおく）",
    "jpSentence": "多くの忍が集まる。",
    "kanaSentence": "おおくのしのびがあつまる。",
    "cnTranslation": "许多忍者聚集起来。",
    "work": "红宝书 N5·N4",
    "audioSrc": "/assets/audio/sentences/0168.wav",
    "hint": {
      "firstKana": "お",
      "difficultWordReading": "多く：おおく",
      "cnKeyword": "许多"
    },
    "wordNotes": [
      "多く：许多。",
      "读音：おおく。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0169",
    "targetWord": "大勢（おおぜい）",
    "jpSentence": "大勢の海賊が港に来る。",
    "kanaSentence": "おおぜいのかいぞくがみなとにくる。",
    "cnTranslation": "许多海贼来到港口。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0169.wav",
    "hint": {
      "firstKana": "お",
      "difficultWordReading": "大勢：おおぜい",
      "cnKeyword": "许多人"
    },
    "wordNotes": [
      "大勢：许多人。",
      "读音：おおぜい。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0170",
    "targetWord": "大晦日（おおみそか）",
    "jpSentence": "大晦日にナルトは年越しそばを食べる。",
    "kanaSentence": "おおみそかになるとはとしこしそばをたべる。",
    "cnTranslation": "除夕那天，鸣人吃跨年荞麦面。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0170.wav",
    "hint": {
      "firstKana": "お",
      "difficultWordReading": "大晦日：おおみそか",
      "cnKeyword": "除夕、大年夜"
    },
    "wordNotes": [
      "大晦日：除夕、大年夜。",
      "读音：おおみそか。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0171",
    "targetWord": "お母さん（おかあさん）",
    "jpSentence": "ナルトはお母さんの写真を見る。",
    "kanaSentence": "なるとはおかあさんのしゃしんをみる。",
    "cnTranslation": "鸣人看妈妈的照片。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0171.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "お母さん：おかあさん",
      "cnKeyword": "妈妈"
    },
    "wordNotes": [
      "お母さん：妈妈。",
      "读音：おかあさん。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0172",
    "targetWord": "お菓子（おかし）",
    "jpSentence": "チョッパーはお菓子が好きだ。",
    "kanaSentence": "ちょっぱーはおかしがすきだ。",
    "cnTranslation": "乔巴喜欢点心。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0172.wav",
    "hint": {
      "firstKana": "ち",
      "difficultWordReading": "お菓子：おかし",
      "cnKeyword": "点心、零食"
    },
    "wordNotes": [
      "お菓子：点心、零食。",
      "读音：おかし。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0173",
    "targetWord": "お金（おかね）",
    "jpSentence": "ナミはお金を大切にする。",
    "kanaSentence": "なみはおかねをたいせつにする。",
    "cnTranslation": "娜美很重视钱。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0173.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "お金：おかね",
      "cnKeyword": "钱"
    },
    "wordNotes": [
      "お金：钱。",
      "读音：おかね。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0174",
    "targetWord": "お客さん（おきゃくさん）",
    "jpSentence": "サンジはお客さんに料理を出す。",
    "kanaSentence": "さんじはおきゃくさんにりょうりをだす。",
    "cnTranslation": "山治给客人端料理。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0174.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "お客さん：おきゃくさん",
      "cnKeyword": "客人"
    },
    "wordNotes": [
      "お客さん：客人。",
      "读音：おきゃくさん。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0175",
    "targetWord": "起きる（おきる）",
    "jpSentence": "ナルトは朝早く起きる。",
    "kanaSentence": "なるとはあさはやくおきる。",
    "cnTranslation": "鸣人早上很早起床。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0175.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "起きる：おきる",
      "cnKeyword": "起床、起来"
    },
    "wordNotes": [
      "起きる：起床、起来。",
      "读音：おきる。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0176",
    "targetWord": "置く（おく）",
    "jpSentence": "サクラは机に本を置く。",
    "kanaSentence": "さくらはつくえにほんをおく。",
    "cnTranslation": "小樱把书放在桌上。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0176.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "置く：おく",
      "cnKeyword": "放置"
    },
    "wordNotes": [
      "置く：放置。",
      "读音：おく。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0177",
    "targetWord": "奥さま（おくさま）",
    "jpSentence": "サンジは奥さまに席を案内する。",
    "kanaSentence": "さんじはおくさまにせきをあんないする。",
    "cnTranslation": "山治为夫人引导座位。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0177.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "奥さま：おくさま",
      "cnKeyword": "夫人、太太"
    },
    "wordNotes": [
      "奥さま：夫人、太太。",
      "读音：おくさま。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0178",
    "targetWord": "奥さん（おくさん）",
    "jpSentence": "サンジは奥さんに料理を出す。",
    "kanaSentence": "さんじはおくさんにりょうりをだす。",
    "cnTranslation": "山治给太太端料理。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0178.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "奥さん：おくさん",
      "cnKeyword": "妻子、太太"
    },
    "wordNotes": [
      "奥さん：妻子、太太。",
      "读音：おくさん。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0179",
    "targetWord": "お子さん（おこさん）",
    "jpSentence": "チョッパーはお子さんを診る。",
    "kanaSentence": "ちょっぱーはおこさんをみる。",
    "cnTranslation": "乔巴给孩子看病。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0179.wav",
    "hint": {
      "firstKana": "ち",
      "difficultWordReading": "お子さん：おこさん",
      "cnKeyword": "孩子、令郎令爱"
    },
    "wordNotes": [
      "お子さん：孩子、令郎令爱。",
      "读音：おこさん。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0180",
    "targetWord": "怒り（いかり）",
    "jpSentence": "サスケは怒りを抑える。",
    "kanaSentence": "さすけはいかりをおさえる。",
    "cnTranslation": "佐助压抑怒气。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0180.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "怒り：いかり",
      "cnKeyword": "怒气、愤怒"
    },
    "wordNotes": [
      "怒り：怒气、愤怒。",
      "读音：いかり。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0181",
    "targetWord": "お先に（おさきに）",
    "jpSentence": "カカシは「お先に」と言って帰る。",
    "kanaSentence": "かかしは「おさきに」といってかえる。",
    "cnTranslation": "卡卡西说“我先走了”然后回去了。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0181.wav",
    "hint": {
      "firstKana": "か",
      "difficultWordReading": "お先に：おさきに",
      "cnKeyword": "我先走了"
    },
    "wordNotes": [
      "お先に：我先走了。",
      "读音：おさきに。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0182",
    "targetWord": "お酒（おさけ）",
    "jpSentence": "ゾロはお酒が好きだ。",
    "kanaSentence": "ぞろはおさけがすきだ。",
    "cnTranslation": "索隆喜欢酒。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0182.wav",
    "hint": {
      "firstKana": "ぞ",
      "difficultWordReading": "お酒：おさけ",
      "cnKeyword": "酒"
    },
    "wordNotes": [
      "お酒：酒。",
      "读音：おさけ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0183",
    "targetWord": "お皿（おさら）",
    "jpSentence": "サンジはお皿に料理を置く。",
    "kanaSentence": "さんじはおさらにりょうりをおく。",
    "cnTranslation": "山治把料理放在盘子上。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0183.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "お皿：おさら",
      "cnKeyword": "盘子"
    },
    "wordNotes": [
      "お皿：盘子。",
      "读音：おさら。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0184",
    "targetWord": "おじ",
    "jpSentence": "ナルトは町でおじに会う。",
    "kanaSentence": "なるとはまちでおじにあう。",
    "cnTranslation": "鸣人在镇上见到叔叔。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0184.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "おじ：おじ",
      "cnKeyword": "叔叔、伯父、舅舅"
    },
    "wordNotes": [
      "おじ：叔叔、伯父、舅舅。",
      "读音：おじ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0185",
    "targetWord": "おじいさん",
    "jpSentence": "悟空はおじいさんに育てられた。",
    "kanaSentence": "ごくうはおじいさんにそだてられた。",
    "cnTranslation": "悟空是由爷爷养大的。",
    "work": "龙珠",
    "audioSrc": "/assets/audio/sentences/0185.wav",
    "hint": {
      "firstKana": "ご",
      "difficultWordReading": "おじいさん：おじいさん",
      "cnKeyword": "爷爷、老人"
    },
    "wordNotes": [
      "おじいさん：爷爷、老人。",
      "读音：おじいさん。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0186",
    "targetWord": "教える（おしえる）",
    "jpSentence": "イルカ先生はナルトに文字を教える。",
    "kanaSentence": "いるかせんせいはなるとにもじをおしえる。",
    "cnTranslation": "伊鲁卡老师教鸣人文字。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0186.wav",
    "hint": {
      "firstKana": "い",
      "difficultWordReading": "教える：おしえる",
      "cnKeyword": "教、告诉"
    },
    "wordNotes": [
      "教える：教、告诉。",
      "读音：おしえる。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0187",
    "targetWord": "おじさん",
    "jpSentence": "ルフィは港のおじさんに道を聞く。",
    "kanaSentence": "るふぃはみなとのおじさんにみちをきく。",
    "cnTranslation": "路飞向港口的大叔问路。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0187.wav",
    "hint": {
      "firstKana": "る",
      "difficultWordReading": "おじさん：おじさん",
      "cnKeyword": "叔叔、大叔"
    },
    "wordNotes": [
      "おじさん：叔叔、大叔。",
      "读音：おじさん。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0188",
    "targetWord": "押す（おす）",
    "jpSentence": "悟空は扉を押す。",
    "kanaSentence": "ごくうはとびらをおす。",
    "cnTranslation": "悟空推门。",
    "work": "龙珠",
    "audioSrc": "/assets/audio/sentences/0188.wav",
    "hint": {
      "firstKana": "ご",
      "difficultWordReading": "押す：おす",
      "cnKeyword": "推、按"
    },
    "wordNotes": [
      "押す：推、按。",
      "读音：おす。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0189",
    "targetWord": "遅い（おそい）",
    "jpSentence": "シカマルは来るのが遅い。",
    "kanaSentence": "しかまるはくるのがおそい。",
    "cnTranslation": "鹿丸来得很晚。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0189.wav",
    "hint": {
      "firstKana": "し",
      "difficultWordReading": "遅い：おそい",
      "cnKeyword": "慢的、晚的"
    },
    "wordNotes": [
      "遅い：慢的、晚的。",
      "读音：おそい。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0190",
    "targetWord": "入れる（いれる）",
    "jpSentence": "レムはお茶を入れる。",
    "kanaSentence": "れむはおちゃをいれる。",
    "cnTranslation": "蕾姆泡茶。",
    "work": "Re:从零开始的异世界生活",
    "audioSrc": "/assets/audio/sentences/0190.wav",
    "hint": {
      "firstKana": "れ",
      "difficultWordReading": "入れる：いれる",
      "cnKeyword": "泡、倒入、放入"
    },
    "wordNotes": [
      "入れる：泡、倒入、放入。",
      "读音：いれる。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0191",
    "targetWord": "お手洗い（おてあらい）",
    "jpSentence": "斉木はお手洗いの場所を聞く。",
    "kanaSentence": "さいきはおてあらいのばしょをきく。",
    "cnTranslation": "齐木询问洗手间的位置。",
    "work": "齐木楠雄的灾难",
    "audioSrc": "/assets/audio/sentences/0191.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "お手洗い：おてあらい",
      "cnKeyword": "洗手间"
    },
    "wordNotes": [
      "お手洗い：洗手间。",
      "读音：おてあらい。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0192",
    "targetWord": "お父さん（おとうさん）",
    "jpSentence": "悟飯のお父さんは悟空だ。",
    "kanaSentence": "ごはんのおとうさんはごくうだ。",
    "cnTranslation": "悟饭的爸爸是悟空。",
    "work": "龙珠",
    "audioSrc": "/assets/audio/sentences/0192.wav",
    "hint": {
      "firstKana": "ご",
      "difficultWordReading": "お父さん：おとうさん",
      "cnKeyword": "爸爸"
    },
    "wordNotes": [
      "お父さん：爸爸。",
      "读音：おとうさん。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0193",
    "targetWord": "弟（おとうと）",
    "jpSentence": "イタチの弟はサスケだ。",
    "kanaSentence": "いたちのおとうとはさすけだ。",
    "cnTranslation": "鼬的弟弟是佐助。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0193.wav",
    "hint": {
      "firstKana": "い",
      "difficultWordReading": "弟：おとうと",
      "cnKeyword": "弟弟"
    },
    "wordNotes": [
      "弟：弟弟。",
      "读音：おとうと。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0194",
    "targetWord": "弟さん（おとうとさん）",
    "jpSentence": "ルフィは友達の弟さんに会う。",
    "kanaSentence": "るふぃはともだちのおとうとさんにあう。",
    "cnTranslation": "路飞见到朋友的弟弟。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0194.wav",
    "hint": {
      "firstKana": "る",
      "difficultWordReading": "弟さん：おとうとさん",
      "cnKeyword": "弟弟（礼貌说法）"
    },
    "wordNotes": [
      "弟さん：弟弟（礼貌说法）。",
      "读音：おとうとさん。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0195",
    "targetWord": "男（おとこ）",
    "jpSentence": "ゾロは強い男だ。",
    "kanaSentence": "ぞろはつよいおとこだ。",
    "cnTranslation": "索隆是强大的男人。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0195.wav",
    "hint": {
      "firstKana": "ぞ",
      "difficultWordReading": "男：おとこ",
      "cnKeyword": "男人"
    },
    "wordNotes": [
      "男：男人。",
      "读音：おとこ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0196",
    "targetWord": "男の子（おとこのこ）",
    "jpSentence": "小さな男の子がナルトを見る。",
    "kanaSentence": "ちいさなおとこのこがなるとをみる。",
    "cnTranslation": "小男孩看着鸣人。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0196.wav",
    "hint": {
      "firstKana": "ち",
      "difficultWordReading": "男の子：おとこのこ",
      "cnKeyword": "男孩子"
    },
    "wordNotes": [
      "男の子：男孩子。",
      "读音：おとこのこ。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0197",
    "targetWord": "男の人（おとこのひと）",
    "jpSentence": "サクラは男の人に道を聞く。",
    "kanaSentence": "さくらはおとこのひとにみちをきく。",
    "cnTranslation": "小樱向那位男士问路。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0197.wav",
    "hint": {
      "firstKana": "さ",
      "difficultWordReading": "男の人：おとこのひと",
      "cnKeyword": "男人、男性"
    },
    "wordNotes": [
      "男の人：男人、男性。",
      "读音：おとこのひと。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0198",
    "targetWord": "おととい",
    "jpSentence": "おととい、ナルトは修業した。",
    "kanaSentence": "おととい、なるとはしゅぎょうした。",
    "cnTranslation": "前天，鸣人修行了。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0198.wav",
    "hint": {
      "firstKana": "お",
      "difficultWordReading": "おととい：おととい",
      "cnKeyword": "前天"
    },
    "wordNotes": [
      "おととい：前天。",
      "读音：おととい。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0199",
    "targetWord": "おととし",
    "jpSentence": "おととし、ルフィは新しい島へ行った。",
    "kanaSentence": "おととし、るふぃはあたらしいしまへいった。",
    "cnTranslation": "前年，路飞去了新的岛。",
    "work": "海贼王",
    "audioSrc": "/assets/audio/sentences/0199.wav",
    "hint": {
      "firstKana": "お",
      "difficultWordReading": "おととし：おととし",
      "cnKeyword": "前年"
    },
    "wordNotes": [
      "おととし：前年。",
      "读音：おととし。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  },
  {
    "id": "0200",
    "targetWord": "大人（おとな）",
    "jpSentence": "ナルトは立派な大人になる。",
    "kanaSentence": "なるとはりっぱなおとなになる。",
    "cnTranslation": "鸣人成为出色的大人。",
    "work": "火影忍者",
    "audioSrc": "/assets/audio/sentences/0200.wav",
    "hint": {
      "firstKana": "な",
      "difficultWordReading": "大人：おとな",
      "cnKeyword": "大人、成年人"
    },
    "wordNotes": [
      "大人：大人、成年人。",
      "读音：おとな。"
    ],
    "grammarNotes": [
      "先听音频，再主动回忆整句日语。",
      "完成评分后，这句话会进入艾宾浩斯复习队列。"
    ]
  }
] satisfies SentenceStudyItem[];

export const redbook0101To0200: SentenceStudyItem[] = redbook0101To0200Items.map((item) => {
  const word = redbook0101To0200WordById.get(item.id);
  return word
    ? {
        ...item,
        targetWord: word.targetWord === word.reading ? word.targetWord : `${word.targetWord}（${word.reading}）`,
        hint: {
          ...item.hint,
          difficultWordReading: `${word.targetWord}：${word.reading}`,
          cnKeyword: word.meaningCn,
        },
      }
    : item;
});
