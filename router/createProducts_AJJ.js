const { sequelize, User, Cart, Like, Comment, AJYproduct, JBHproduct, JJWproduct, DailyCheck } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const { log } = console;

router.get("/", (req, res) => {
  //
  JJWproduct.findAll({}).then((data) => {
    //
    log(!data[0]);
    if (data[0]) return;
    //
    AJYproduct.bulkCreate([
      {
        name: "고오스빵",
        price: 3000,
        img: "url('/img_Ahn_Ju/f80.png')",
        stock: 100,
        category: "bread",
      },
      {
        name: "꼬부기",
        price: 3000,
        img: "url('/img_Ahn_Ju/f81.png')",
        stock: 100,
        category: "bread",
      },
      {
        name: "디그다",
        price: 3000,
        img: "url('/img_Ahn_Ju/f82.png')",
        stock: 100,
        category: "bread",
      },
      {
        name: "로켓단",
        price: 3000,
        img: "url('/img_Ahn_Ju/f83.png')",
        stock: 100,
        category: "bread",
      },
      {
        name: "발챙이",
        price: 3000,
        img: "url('/img_Ahn_Ju/f84.png')",
        stock: 100,
        category: "bread",
      },
      {
        name: "피카츄",
        price: 3000,
        img: "url('/img_Ahn_Ju/f85.png')",
        stock: 100,
        category: "bread",
      },
      {
        name: "푸린",
        price: 3000,
        img: "url('/img_Ahn_Ju/f86.png')",
        stock: 100,
        category: "bread",
      },
      {
        name: "파이리",
        price: 3000,
        img: "url('/img_Ahn_Ju/f87.png')",
        stock: 100,
        category: "bread",
      },
      {
        name: "메타몽",
        price: 3000,
        img: "url('/img_Ahn_Ju/f88.png')",
        stock: 100,
        category: "bread",
      },
      {
        name: "이상해씨",
        price: 3000,
        img: "url('/img_Ahn_Ju/f89.png')",
        stock: 100,
        category: "bread",
      },
      {
        name: "이슬이",
        price: 3000,
        img: "url('/img_Ahn_Ju/f90.png')",
        stock: 100,
        category: "bread",
      },
      {
        name: "푸린피치피치슈",
        price: 3500,
        img: "url('/img_Ahn_Ju/f91.png')",
        stock: 100,
        category: "bread",
      },
      {
        name: "피카망고컵케이크",
        price: 4500,
        img: "url('/img_Ahn_Ju/f92.png')",
        stock: 100,
        category: "bread",
      },
      {
        name: "피카앙버터",
        price: 4000,
        img: "url('/img_Ahn_Ju/f93.png')",
        stock: 100,
        category: "bread",
      },
      {
        name: "고라파덕미니",
        price: 10000,
        img: "url('/img_Ahn_Ju/f94.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "이상해씨미니",
        price: 10000,
        img: "url('/img_Ahn_Ju/f95.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "파이리미니",
        price: 10000,
        img: "url('/img_Ahn_Ju/f96.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "팬텀미니",
        price: 10000,
        img: "url('/img_Ahn_Ju/f97.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "피카츄미니",
        price: 10000,
        img: "url('/img_Ahn_Ju/f98.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "고라파덕헬창",
        price: 20000,
        img: "url('/img_Ahn_Ju/f99.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "꼬북이헬창",
        price: 20000,
        img: "url('/img_Ahn_Ju/f100.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "이상해씨헬창",
        price: 20000,
        img: "url('/img_Ahn_Ju/f101.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "파이리헬창",
        price: 20000,
        img: "url('/img_Ahn_Ju/f102.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "잠만보헬창",
        price: 20000,
        img: "url('/img_Ahn_Ju/f103.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "잉어킹헬창",
        price: 20000,
        img: "url('/img_Ahn_Ju/f104.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "팬텀헬창",
        price: 20000,
        img: "url('/img_Ahn_Ju/f105.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "피카츄헬창",
        price: 20000,
        img: "url('/img_Ahn_Ju/f106.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "꼬북이머슬",
        price: 25000,
        img: "url('/img_Ahn_Ju/f107.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "이상해씨머슬",
        price: 25000,
        img: "url('/img_Ahn_Ju/f108.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "파이리머슬",
        price: 25000,
        img: "url('/img_Ahn_Ju/f109.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "피카츄머슬",
        price: 25000,
        img: "url('/img_Ahn_Ju/f110.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "헬창세트",
        price: 40000,
        img: "url('/img_Ahn_Ju/f111.png')",
        stock: 100,
        category: "figure",
      },
      {
        name: "황금피카츄",
        price: 100000,
        img: "url('/img_Ahn_Ju/f112.png')",
        stock: 100,
        category: "figure",
      },
    ]);
    JBHproduct.bulkCreate([
      {
        name: "린넨 상하의 세트",
        price: 30000,
        img: "url('/img_Ahn_Ju/f0.jpg')",
        stock: 100,
        category: "set",
      },
      {
        name: "무신사 20주년 기념 베이직 바지",
        price: 20000,
        img: "url('/img_Ahn_Ju/f1.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "아디다스 X 코오롱스포츠 콜라보 바지",
        price: 12900,
        img: "url('/img_Ahn_Ju/f2.jpg')",
        stock: 100,
        category: "set",
      },
      {
        name: "롱슬립 니퍼 구두",
        price: 10000,
        img: "url('/img_Ahn_Ju/f3.jpg')",
        stock: 100,
        category: "set",
      },
      {
        name: "유니클로 런웨이 초록색 바지",
        price: 1000,
        img: "url('/img_Ahn_Ju/f4.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "회색 밴딩 무신사 바지",
        price: 2000,
        img: "url('/img_Ahn_Ju/f5.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "무신사 브라운색 바지",
        price: 3000,
        img: "url('/img_Ahn_Ju/f6.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "주머니를 뒤져보니 지갑이 없다....",
        price: 20000,
        img: "url('/img_Ahn_Ju/f7.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "오리 캐릭터 잠옷 바지",
        price: 10000,
        img: "url('/img_Ahn_Ju/f8.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "폴햄 청바지",
        price: 10000,
        img: "url('/img_Ahn_Ju/f9.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "이클립스 가성비 패션 바지",
        price: 10000,
        img: "url('/img_Ahn_Ju/f10.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "늘어나는 기모 바지",
        price: 34000,
        img: "url('/img_Ahn_Ju/f11.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "브라운색 바지",
        price: 50000,
        img: "url('/img_Ahn_Ju/f12.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "무신사 X 시그니처 클래스 바지",
        price: 56000,
        img: "url('/img_Ahn_Ju/f13.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "울 와이드 레그 펜츠",
        price: 23000,
        img: "url('/img_Ahn_Ju/f14.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "기모 바지 2개 세트",
        price: 15000,
        img: "url('/img_Ahn_Ju/f15.jpg')",
        stock: 100,
        category: "set",
      },
      {
        name: "브라운색 버버리 와이드 업",
        price: 12500,
        img: "url('/img_Ahn_Ju/f16.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "버버리 바지와 벨트 세트",
        price: 30000,
        img: "url('/img_Ahn_Ju/f17.jpg')",
        stock: 100,
        category: "set",
      },
      {
        name: "유니클로 기모바지 세트",
        price: 11000,
        img: "url('/img_Ahn_Ju/f18.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "레깅스",
        price: 12500,
        img: "url('/img_Ahn_Ju/f19.jpg')",
        stock: 100,
        category: "leggin,",
      },
      {
        name: "수박바지 잠옷",
        price: 15000,
        img: "url('/img_Ahn_Ju/f20.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "흰색 통이 큰 반바지",
        price: 11000,
        img: "url('/img_Ahn_Ju/f21.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "(폴햄)와이드 통 청바지",
        price: 30000,
        img: "url('/img_Ahn_Ju/f22.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "패션 잇 아이템 바지",
        price: 15000,
        img: "url('/img_Ahn_Ju/f23.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "신발 바지 가방 세트",
        price: 12500,
        img: "url('/img_Ahn_Ju/f24.jpg')",
        stock: 100,
        category: "shoes",
      },
      {
        name: "신발 바지 가방 세트2",
        price: 30000,
        img: "url('/img_Ahn_Ju/f25.jpg')",
        stock: 100,
        category: "shoes",
      },
      {
        name: "흰색 티와 초록색 바지",
        price: 30000,
        img: "url('/img_Ahn_Ju/f26.jpg')",
        stock: 100,
        category: "set",
      },
      {
        name: "기모 브라운 무신사 바지",
        price: 11000,
        img: "url('/img_Ahn_Ju/f27.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "다시 뒤져보아도 지갑이 없다....",
        price: 15000,
        img: "url('/img_Ahn_Ju/f28.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "스트릿 바지 정장 선택(red & black)",
        price: 11000,
        img: "url('/img_Ahn_Ju/f29.jpg')",
        stock: 100,
        category: "set",
      },
      {
        name: "초록색 구겨긴 바지",
        price: 12500,
        img: "url('/img_Ahn_Ju/f30.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "흰색 정장 세트",
        price: 12500,
        img: "url('/img_Ahn_Ju/f31.jpg')",
        stock: 100,
        category: "set",
      },
      {
        name: "한손 뒷주머니에 가있는 바지",
        price: 11000,
        img: "url('/img_Ahn_Ju/f32.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "주머니에 손 넣은 바지",
        price: 15000,
        img: "url('/img_Ahn_Ju/f33.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "잠옷 바지2",
        price: 30000,
        img: "url('/img_Ahn_Ju/f34.jpg')",
        stock: 100,
        category: "pants",
      },
      {
        name: "키즈 유아이 X 무신사 콜라보 후드 바지 세트",
        price: 30000,
        img: "url('/img_Ahn_Ju/f35.jpg')",
        stock: 100,
        category: "shoes",
      },
      {
        name: "키즈 유아이 X 유니클로 롱 슬립 세트",
        price: 12500,
        img: "url('/img_Ahn_Ju/f36.jpg')",
        stock: 100,
        category: "set",
      },
      {
        name: "키즈 유아이 X 버버리 상하의 세트",
        price: 11000,
        img: "url('/img_Ahn_Ju/f37.jpg')",
        stock: 100,
        category: "set",
      },
      {
        name: "잭시미키 슬립 롱 니퍼 신발",
        price: 15000,
        img: "url('/img_Ahn_Ju/f38.jpg')",
        stock: 100,
        category: "shoes",
      },
      {
        name: "와이드 롤업 팬츠(카고형)",
        price: 30000,
        img: "url('/img_Ahn_Ju/f39.jpg')",
        stock: 100,
        category: "pants",
      },
    ]);
    JJWproduct.bulkCreate([
      {
        name: "술잔 옆에 안주로 따뜻한 음악 하나, 꼭 챙겨드세요.",
        price: 100,
        img: "undefined",
        stock: 100,
        category: "firstContent",
      },
      {
        name: "사는게 뭔지",
        price: 100,
        img: "url('/img_Jang/01_ 사는게 뭔지.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "나 어떡해",
        price: 100,
        img: "url('/img_Jang/02_ 나 어떡해.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "산다는 거",
        price: 100,
        img: "url('/img_Jang/03_ 산다는 거.jpg')",
        stock: 100,
        category: "musical",
      },
      {
        name: "Breathe",
        price: 100,
        img: "url('/img_Jang/04_ Breathe.jpg')",
        stock: 100,
        category: "musical",
      },
      {
        name: "세월이 흘러",
        price: 100,
        img: "url('/img_Jang/05_ 세월이 흘러.jpg')",
        stock: 100,
        category: "musical",
      },
      {
        name: "꽃이여",
        price: 100,
        img: "url('/img_Jang/06_ 꽃이여.jpg')",
        stock: 100,
        category: "musical",
      },
      {
        name: "난 예술가의 아내라",
        price: 100,
        img: "url('/img_Jang/07_ 난 예술가의 아내라.jpg')",
        stock: 100,
        category: "musical",
      },
      {
        name: "Part of Your World (Remastered 2014)",
        price: 100,
        img: "url('/img_Jang/08_ Part of Your World (Remastered 2014).jpg')",
        stock: 100,
        category: "musical",
      },
      {
        name: "바람과 함께",
        price: 100,
        img: "url('/img_Jang/09_ 바람과 함께.jpg')",
        stock: 100,
        category: "musical",
      },
      {
        name: "당신에게로",
        price: 100,
        img: "url('/img_Jang/10_ 당신에게로.jpg')",
        stock: 100,
        category: "musical",
      },
      {
        name: "살다보면",
        price: 100,
        img: "url('/img_Jang/11_ 살다보면.jpg')",
        stock: 100,
        category: "musical",
      },
      {
        name: "공무도하가(公無渡河歌)",
        price: 100,
        img: "url('/img_Jang/12_ 공무도하가(公無渡河歌).jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "River Waltz",
        price: 100,
        img: "url('/img_Jang/13_ River Waltz.jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "Granados:Spanish Dance No.2 ('Oriental')",
        price: 100,
        img: "url('/img_Jang/14_ GranadosSpanish Dance No.2 (Oriental).jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "Aria (After Serenata Veneziana from Andromeda liberata, RV Anh. 117)",
        price: 100,
        img: "url('/img_Jang/15_ Aria (After Serenata Veneziana from Andromeda liberata, RV Anh. 117).jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "Because This Must Be",
        price: 100,
        img: "url('/img_Jang/16_ Because This Must Be.jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "Big My Secret",
        price: 100,
        img: "url('/img_Jang/17_ Big My Secret.jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "Chopin: Nocturne No.1 In B Flat Minor, Op.9 No.1",
        price: 100,
        img: "url('/img_Jang/18_ Chopin Nocturne No.1 In B Flat Minor, Op.9 No.1.jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "Coleridge-Taylor: Sometimes I Feel Like a Motherless Child",
        price: 100,
        img: "url('/img_Jang/19_ Coleridge-Taylor Sometimes I Feel Like a Motherless Child.jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "Contredanse in B flat major/B-dur/en si bemol majeur",
        price: 100,
        img: "url('/img_Jang/20_ Contredanse in B flat majorB-duren si bemol majeur.jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "Epilogue",
        price: 100,
        img: "url('/img_Jang/21_ Epilogue.jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "Kleier Lambaol",
        price: 100,
        img: "url('/img_Jang/22_ Kleier Lambaol.jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "Liszt: Liebestraum No. 3 in A flat, S.541 No. 3",
        price: 100,
        img: "url('/img_Jang/23_ Liszt Liebestraum No. 3 in A flat, S.541 No. 3.jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "Metamorphosis 5",
        price: 100,
        img: "url('/img_Jang/24_ Metamorphosis 5.jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "Piano Sonata No. 30 in B Minor, Hob.XVI:32: II: Menuet",
        price: 100,
        img: "url('/img_Jang/25_ Piano Sonata No. 30 in B Minor, Hob.XVI32 II Menuet.jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "Prelude in B minor, BWV 855a (Arr. by Alexander Siloti)",
        price: 100,
        img: "url('/img_Jang/26_ Prelude in B minor, BWV 855a (Arr. by Alexander Siloti).jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "Schubert: Fantasy in F minor, D. 940 (Op.103) for piano duet - Allegro molto moderato - Largo - Allegro vivace - Tempo I",
        price: 100,
        img: "url('/img_Jang/27_ Schubert Fantasy in F minor, D. 940 (Op.103) for piano duet - Allegro molto moderato - Largo - Allegro vivace - Tempo I.jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "Schumann: 슈만: 어린이의 정경, 작품번호 15 - 1. 미지의 나라들",
        price: 100,
        img: "url('/img_Jang/28_ Schumann 슈만 어린이의 정경, 작품번호 15 - 1. 미지의 나라들.jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "Suite No. 1 for 2 Pianos in C Major, Op. 5 'Fantaisie-tableaux': I. Barcarole",
        price: 100,
        img: "url('/img_Jang/29_ Suite No. 1 for 2 Pianos in C Major, Op. 5 'Fantaisie-tableaux' I. Barcarole.jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "Tiersen: Six Pieces for Piano, Volume 2 - 4. La Valse d'Amélie (영화 아멜리에 삽입곡)",
        price: 100,
        img: "url('/img_Jang/30_ Tiersen Six Pieces for Piano, Volume 2 - 4. La Valse d'Amélie (영화 아멜리에 삽입곡).jpg')",
        stock: 100,
        category: "classical music",
      },
      {
        name: "You Raise Me Up",
        price: 100,
        img: "url('/img_Jang/31_ You Raise Me Up.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "가장 보통의 존재",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 5집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "너는 악마가 되어가고 있는가?",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 5집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "아름다운 것",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 5집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "작은 마음",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 5집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "의외의 사실",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 5집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "알리바이",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 5집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "100년 동안의 진심",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 5집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "인생은 금물",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 5집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "나는",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 5집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "산들산들",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 5집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "너의 몸을 흔들어 너의 마음을 움직여",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 6집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "창밖엔 태양이 빛나고",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 6집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "누구나 아는 비밀 (With 아이유)",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 6집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "마음이란",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 6집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "애도",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 6집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "나쁜 꿈",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 6집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "영원히 그립지 않을 시간",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 6집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "홀로 있는 사람들",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 6집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "혼자 추는 춤",
        price: 100,
        img: "url('/img_Jang/언니네 이발관 6집.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "시인의 마을",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "회상",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "떠나가는 배",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "윙윙윙",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "촛불",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "사망부가",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "서울의 달",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "애고, 도솔천아",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "봉숭아",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "북한강에서",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "바람",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "탁발승의 새벽노래",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "우리는",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "장서방네 노을",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "하늘 위에 눈으로",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "들 가운데서",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "서해에서",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "사랑하는 이에게 3",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "실향가",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "양단 몇 마름",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "고향집 가세",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "사랑하는 이에게2",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "인사동",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "한 여름 밤",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "나 살던 고향",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "저 들에 불을 놓아",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "L.A.스케치",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "이 어두운 터널을 박차고",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "92년 장마, 종로에서",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "정동진1",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "건너간다",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "5.18",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
      {
        name: "수진리의 강",
        price: 100,
        img: "url('/img_Jang/정태춘 박은옥 20년 골든.jpg')",
        stock: 100,
        category: "music",
      },
    ]);
  });
});

module.exports = router;
