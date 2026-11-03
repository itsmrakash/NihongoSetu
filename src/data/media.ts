// Curated Video Lessons & Media Playlists
export interface JLPTPlaylist {
  level: string;
  url: string;
  desc: string;
}

export const JLPT_PLAYLISTS=[
 {level:"N5",url:"https://www.youtube.com/playlist?list=PLkGU7DnOLgRMl-h4NxxrGbK-UdZHIXzKQ",desc:"Beginner · JLPT N5"},
 {level:"N4",url:"https://www.youtube.com/playlist?list=PLkGU7DnOLgRPxTNFRc7utpuwhWSQC35w",desc:"Elementary · JLPT N4"},
 {level:"N3",url:"https://www.youtube.com/playlist?list=PLkGU7DnOLgRMgkoHHnsS01-jqt0yYBnjq",desc:"Intermediate · JLPT N3"},
 {level:"N2",url:"https://www.youtube.com/playlist?list=PLKyY76JU-anVFKybS0wPq3ztyrKmA1l2W",desc:"Upper-intermediate · JLPT N2"},
 {level:"N1",url:"https://www.youtube.com/playlist?list=PLUc9XxXTwov1yDuTm653tJKYVTsa3KSJn",desc:"Advanced · JLPT N1"}
];
function videoLessons(){
 const cards=JLPT_PLAYLISTS.map(p=>`<div class="card" id="playlist${p.level}"><h3>JLPT ${p.level}</h3><p>${p.desc}</p><a href="${p.url}" target="_blank" rel="noopener noreferrer"><button class="p">▶ Open ${p.level} YouTube Playlist</button></a></div>`).join("");
 v.innerHTML=`<div class="card"><h2>🎬 JLPT Video Lessons</h2><p>Choose a playlist for your Japanese level. These are the playlist links you provided.</p><p class="note">Videos are hosted by YouTube and require an internet connection. You can return to NihongoSetu after watching.</p></div>${cards}`;
}
const MOCK_LABELS={en:"Mock Test",ta:"மாதிரித் தேர்வு",hi:"मॉक टेस्ट",te:"మాక్ టెస్ట్",ml:"മോക്ക് ടെസ്റ്റ്",kn:"ಮಾದರಿ ಪರೀಕ್ಷೆ",bn:"মক টেস্ট",mr:"सराव परीक्षा",tl:"Mock Test",ar:"اختبار تجريبي",fr:"Test blanc",es:"Simulacro"};
