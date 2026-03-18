import{useState,useEffect,useRef,useCallback,useMemo}from"react";

// ─── CSS ANIMATIONS ───────────────────────────────────────────────────────────
const ANIM_CSS=`
@keyframes fadeSlideUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeSlideIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes countUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes barGrow{from{transform:scaleY(0);transform-origin:bottom}to{transform:scaleY(1);transform-origin:bottom}}
@keyframes lineDrawIn{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}
@keyframes slideRight{from{transform:translateX(-100%)}to{transform:translateX(0)}}
.anim-fadeSlideUp{animation:fadeSlideUp .35s cubic-bezier(.4,0,.2,1) both}
.anim-fadeIn{animation:fadeIn .25s ease both}
.anim-scaleIn{animation:scaleIn .3s cubic-bezier(.4,0,.2,1) both}
.anim-pulse{animation:pulse 1.5s ease infinite}
`;

// ─── THEME ────────────────────────────────────────────────────────────────────
const THEMES={
  dark:{bg:"#0A0A0F",bg2:"#13131A",bg3:"#1C1C26",bg4:"#242430",card:"#13131A",label:"#F0F0FF",label2:"rgba(220,220,255,.55)",label3:"rgba(200,200,255,.25)",sep:"rgba(100,100,140,.3)",fill3:"rgba(120,120,160,.18)",fill4:"rgba(100,100,140,.12)",blue:"#3D8EFF",green:"#2ED573",red:"#FF4757",orange:"#FFA502",yellow:"#FFD32A",purple:"#A55EEA",indigo:"#6C5CE7",pink:"#FD79A8",teal:"#00CEC9",navBg:"rgba(10,10,15,.94)"},
  light:{bg:"#F0F0F8",bg2:"#FFFFFF",bg3:"#F0F0F8",bg4:"#E4E4F0",card:"#FFFFFF",label:"#0A0A1A",label2:"rgba(30,30,80,.55)",label3:"rgba(30,30,80,.28)",sep:"rgba(80,80,120,.18)",fill3:"rgba(100,100,150,.1)",fill4:"rgba(80,80,120,.07)",blue:"#2979FF",green:"#00C853",red:"#FF1744",orange:"#FF6D00",yellow:"#FFD600",purple:"#AA00FF",indigo:"#3D5AFE",pink:"#F50057",teal:"#00BFA5",navBg:"rgba(240,240,248,.94)"},
};
let _theme=THEMES.dark;
const getC=()=>_theme;

const SF=`-apple-system,BlinkMacSystemFont,"SF Pro Display",sans-serif`;
const T={lg:{fontFamily:SF,fontSize:34,fontWeight:700,letterSpacing:-.5},h:{fontFamily:SF,fontSize:17,fontWeight:600},b:{fontFamily:SF,fontSize:17},c:{fontFamily:SF,fontSize:16},s:{fontFamily:SF,fontSize:15},fn:{fontFamily:SF,fontSize:13},cap:{fontFamily:SF,fontSize:12,letterSpacing:.2}};

const D={
"obrero":{"m":[{"id":"M1","nombre":"Maq 1","factor":1},{"id":"M2","nombre":"Multi 2","factor":10},{"id":"P3","nombre":"Poker 3","factor":50},{"id":"JW4","nombre":"Jungle Wild 4","factor":10},{"id":"M5","nombre":"Multi 5","factor":10},{"id":"M6","nombre":"Multi 6","factor":10},{"id":"M7","nombre":"Multi 7","factor":10},{"id":"M8","nombre":"Multi 8","factor":10},{"id":"M9","nombre":"Multi 9","factor":10},{"id":"M10","nombre":"Multi 10","factor":10},{"id":"M11","nombre":"Multi 11","factor":10},{"id":"M12","nombre":"Multi 12","factor":10},{"id":"M13","nombre":"Multi 13","factor":10},{"id":"M14","nombre":"Multi 14","factor":10},{"id":"M15","nombre":"Multi 15","factor":10},{"id":"M16","nombre":"Multi 16","factor":10},{"id":"M17","nombre":"Multi 17","factor":10},{"id":"D18","nombre":"Duende 18","factor":1},{"id":"M19","nombre":"Multi 19","factor":10},{"id":"M20","nombre":"Multi 20","factor":10}],"ul":{"M1":{"d":9805000,"p":9551140},"M2":{"d":68000,"p":35712},"P3":{"d":592680,"p":293071},"JW4":{"d":64755000,"p":41778170},"M5":{"d":2262800,"p":1668619},"M6":{"d":6070100,"p":4625219},"M7":{"d":5329800,"p":4092490},"M8":{"d":4621000,"p":3567786},"M9":{"d":5473000,"p":3998981},"M10":{"d":5993900,"p":4412458},"M11":{"d":2936700,"p":2275324},"M12":{"d":6508700,"p":4561291},"M13":{"d":8631500,"p":6938588},"M14":{"d":8106800,"p":5585383},"M15":{"d":10698500,"p":8364139},"M16":{"d":7946500,"p":5386625},"M17":{"d":3714100,"p":2827335},"D18":{"d":48918000,"p":28688960},"M19":{"d":6279800,"p":4752698},"M20":{"d":3110500,"p":2163502}},"b":[{"fecha":"2025-12-16","phys_total":2724130,"util_total":1243870},{"fecha":"2025-12-19","phys_total":4412050,"util_total":573950},{"fecha":"2025-12-21","phys_total":2354780,"util_total":835220},{"fecha":"2025-12-24","phys_total":2938020,"util_total":746980},{"fecha":"2025-12-28","phys_total":1930740,"util_total":2179260},{"fecha":"2025-12-30","phys_total":2964460,"util_total":1552540},{"fecha":"2026-01-03","phys_total":1709270,"util_total":1346730},{"fecha":"2026-01-06","phys_total":2682440,"util_total":845560},{"fecha":"2026-01-09","phys_total":2836090,"util_total":969910},{"fecha":"2026-01-12","phys_total":2402090,"util_total":1029910},{"fecha":"2026-01-16","phys_total":3036360,"util_total":1016640},{"fecha":"2026-01-19","phys_total":2420700,"util_total":1058300},{"fecha":"2026-01-23","phys_total":3422190,"util_total":1209810},{"fecha":"2026-01-27","phys_total":3087930,"util_total":1156070},{"fecha":"2026-01-29","phys_total":2893000,"util_total":1063000},{"fecha":"2026-02-01","phys_total":2881040,"util_total":1896960},{"fecha":"2026-02-04","phys_total":3492170,"util_total":91830},{"fecha":"2026-02-08","phys_total":3892550,"util_total":1813450},{"fecha":"2026-02-12","phys_total":2809810,"util_total":1014190},{"fecha":"2026-02-15","phys_total":2561020,"util_total":1181980},{"fecha":"2026-02-18","phys_total":2571810,"util_total":1872190},{"fecha":"2026-02-22","phys_total":3293800,"util_total":1132280},{"fecha":"2026-02-26","phys_total":2937880,"util_total":1334040},{"fecha":"2026-03-01","phys_total":2503750,"util_total":836250},{"fecha":"2026-03-03","phys_total":3341360,"util_total":147640},{"fecha":"2026-03-06","phys_total":2790890,"util_total":1334110},{"fecha":"2026-03-10","phys_total":4750350,"util_total":1280650},{"fecha":"2026-03-13","phys_total":2604320,"util_total":1327680},{"fecha":"2026-03-16","phys_total":2166020,"util_total":1164980}]},
"vikingos":{"m":[{"id":"P2","nombre":"Poker 2","factor":50},{"id":"P1","nombre":"Poker 1","factor":50},{"id":"P18","nombre":"Poker 18","factor":50},{"id":"M3","nombre":"Multi 3","factor":10},{"id":"M4","nombre":"Multi 4","factor":10},{"id":"M5","nombre":"Multi 5","factor":10},{"id":"M7","nombre":"Multi 7","factor":10},{"id":"M8","nombre":"Multi 8","factor":10},{"id":"M14","nombre":"Maq 14","factor":1},{"id":"G17","nombre":"Gaminator 17","factor":10},{"id":"J20","nombre":"Jungle 20","factor":10},{"id":"W19","nombre":"WMS 19","factor":1},{"id":"M6","nombre":"Multi 6","factor":10},{"id":"M10","nombre":"Multi 10","factor":10},{"id":"B11","nombre":"Bailarin 11","factor":10},{"id":"M16","nombre":"Multi 16","factor":10},{"id":"M15","nombre":"Multi 15","factor":10},{"id":"M13","nombre":"Multi 13","factor":10},{"id":"M12","nombre":"Multi 12","factor":10},{"id":"M9","nombre":"Multi 9","factor":10}],"ul":{"P2":{"d":4207040,"p":2893850},"P1":{"d":6252180,"p":4203713},"P18":{"d":544280,"p":338302},"M3":{"d":26109800,"p":21121695},"M4":{"d":24133100,"p":18056481},"M5":{"d":24085800,"p":19485065},"M7":{"d":24999100,"p":20098487},"M8":{"d":17282900,"p":12377136},"M14":{"d":264546000,"p":197833431},"G17":{"d":447651000,"p":377395260},"J20":{"d":6085400,"p":4596776},"W19":{"d":230899000,"p":180805400},"M6":{"d":27281300,"p":21925207},"M10":{"d":23947900,"p":17054774},"B11":{"d":7876500,"p":6446061},"M16":{"d":23143900,"p":16571105},"M15":{"d":21995900,"p":16073735},"M13":{"d":25324500,"p":20928071},"M12":{"d":5235400,"p":3901561},"M9":{"d":26590800,"p":21475868}},"b":[{"fecha":"2025-12-28","phys_total":4278304,"util_total":3082696},{"fecha":"2025-12-29","phys_total":10869878,"util_total":643122},{"fecha":"2025-12-30","phys_total":5341551,"util_total":1993449},{"fecha":"2025-12-31","phys_total":3601162,"util_total":1923838},{"fecha":"2026-01-02","phys_total":10089204,"util_total":3218796},{"fecha":"2026-01-03","phys_total":4391467,"util_total":134533},{"fecha":"2026-01-04","phys_total":8276965,"util_total":2382035},{"fecha":"2026-01-05","phys_total":5798189,"util_total":2394811},{"fecha":"2026-01-06","phys_total":3467015,"util_total":722985},{"fecha":"2026-01-07","phys_total":4728902,"util_total":1710098},{"fecha":"2026-01-08","phys_total":4717118,"util_total":2091882},{"fecha":"2026-01-09","phys_total":3513510,"util_total":607490},{"fecha":"2026-01-10","phys_total":4698267,"util_total":1185733},{"fecha":"2026-01-11","phys_total":6210283,"util_total":2883717},{"fecha":"2026-01-12","phys_total":5166753,"util_total":1840247},{"fecha":"2026-01-13","phys_total":6747133,"util_total":1255867},{"fecha":"2026-01-14","phys_total":5093077,"util_total":1441923},{"fecha":"2026-01-16","phys_total":5677755,"util_total":2042245},{"fecha":"2026-01-17","phys_total":5573042,"util_total":1564958},{"fecha":"2026-01-18","phys_total":6648453,"util_total":385547},{"fecha":"2026-01-19","phys_total":4213633,"util_total":1939367},{"fecha":"2026-01-20","phys_total":5439752,"util_total":1483248},{"fecha":"2026-01-21","phys_total":3737830,"util_total":1483170},{"fecha":"2026-01-22","phys_total":6625890,"util_total":944110},{"fecha":"2026-01-23","phys_total":4815999,"util_total":248001},{"fecha":"2026-01-24","phys_total":5553128,"util_total":2591872},{"fecha":"2026-01-25","phys_total":6093628,"util_total":2255372},{"fecha":"2026-01-26","phys_total":4163420,"util_total":1733580},{"fecha":"2026-01-27","phys_total":4409650,"util_total":1622350},{"fecha":"2026-01-28","phys_total":5981547,"util_total":2432453},{"fecha":"2026-01-29","phys_total":4373989,"util_total":921011},{"fecha":"2026-01-30","phys_total":4698538,"util_total":976462},{"fecha":"2026-01-31","phys_total":6496209,"util_total":723791},{"fecha":"2026-02-01","phys_total":7461610,"util_total":3630390},{"fecha":"2026-02-02","phys_total":5958945,"util_total":2017055},{"fecha":"2026-02-03","phys_total":4438230,"util_total":1146770},{"fecha":"2026-02-04","phys_total":4496437,"util_total":1228563},{"fecha":"2026-02-05","phys_total":4029420,"util_total":981580},{"fecha":"2026-02-06","phys_total":7043785,"util_total":1462215},{"fecha":"2026-02-07","phys_total":5888110,"util_total":2068890},{"fecha":"2026-02-08","phys_total":5333338,"util_total":2168662},{"fecha":"2026-02-09","phys_total":5258445,"util_total":1618555},{"fecha":"2026-02-10","phys_total":6334470,"util_total":3476530},{"fecha":"2026-02-11","phys_total":3814102,"util_total":1045898},{"fecha":"2026-02-12","phys_total":3454055,"util_total":1677945},{"fecha":"2026-02-13","phys_total":6771751,"util_total":2691249},{"fecha":"2026-02-14","phys_total":6422522,"util_total":3402478},{"fecha":"2026-02-15","phys_total":5880346,"util_total":2242654},{"fecha":"2026-02-16","phys_total":5361237,"util_total":2679763},{"fecha":"2026-02-17","phys_total":5213667,"util_total":1464333},{"fecha":"2026-02-18","phys_total":5957686,"util_total":787314},{"fecha":"2026-02-19","phys_total":5415995,"util_total":1042005},{"fecha":"2026-02-20","phys_total":7049918,"util_total":1989082},{"fecha":"2026-02-21","phys_total":5525333,"util_total":1788667},{"fecha":"2026-02-22","phys_total":5803618,"util_total":2421382},{"fecha":"2026-02-23","phys_total":3909753,"util_total":1549247},{"fecha":"2026-02-24","phys_total":4890350,"util_total":2545650},{"fecha":"2026-02-25","phys_total":5443361,"util_total":286639},{"fecha":"2026-02-26","phys_total":6630554,"util_total":1277446},{"fecha":"2026-02-27","phys_total":4631287,"util_total":1146713},{"fecha":"2026-02-28","phys_total":7282217,"util_total":1427783},{"fecha":"2026-03-01","phys_total":4890391,"util_total":2225609},{"fecha":"2026-03-02","phys_total":4774079,"util_total":1482921},{"fecha":"2026-03-03","phys_total":7522457,"util_total":1373543},{"fecha":"2026-03-04","phys_total":3997116,"util_total":2126884},{"fecha":"2026-03-05","phys_total":3777638,"util_total":2844362},{"fecha":"2026-03-06","phys_total":6086699,"util_total":734301},{"fecha":"2026-03-07","phys_total":5646624,"util_total":2349376},{"fecha":"2026-03-08","phys_total":5076316,"util_total":2317684},{"fecha":"2026-03-09","phys_total":6561217,"util_total":2838783},{"fecha":"2026-03-10","phys_total":6624266,"util_total":2292734},{"fecha":"2026-03-11","phys_total":7859232,"util_total":572768},{"fecha":"2026-03-12","phys_total":5311362,"util_total":1133638},{"fecha":"2026-03-13","phys_total":7333597,"util_total":2131403},{"fecha":"2026-03-14","phys_total":3953595,"util_total":1508405},{"fecha":"2026-03-15","phys_total":6542754,"util_total":2138246},{"fecha":"2026-03-16","phys_total":7531707,"util_total":1097293},{"fecha":"2026-03-17","phys_total":7398197,"util_total":596803}]},
"faraon":{"m":[{"id":"M1","nombre":"Multi 1","factor":10},{"id":"A13","nombre":"Aristocrat 13","factor":1},{"id":"P3","nombre":"Poker 3","factor":50},{"id":"P4","nombre":"Poker 4","factor":50},{"id":"P5","nombre":"Poker 5","factor":50},{"id":"M6","nombre":"Multi 6","factor":10},{"id":"M7","nombre":"Multi 7","factor":10},{"id":"M8","nombre":"Multi 8","factor":10},{"id":"M9","nombre":"Multi 9","factor":10},{"id":"M10","nombre":"Multi 10","factor":10},{"id":"M11","nombre":"Multi 11","factor":10},{"id":"SA12","nombre":"Stand Alone 12","factor":1},{"id":"M2","nombre":"Multi 2","factor":10},{"id":"M14","nombre":"Multi 14","factor":10},{"id":"W20","nombre":"WMS 20","factor":1},{"id":"W16","nombre":"WMS 16","factor":1},{"id":"C17","nombre":"Clon 17","factor":10},{"id":"M18","nombre":"Multi 18","factor":10},{"id":"M19","nombre":"Multi 19","factor":10},{"id":"M15","nombre":"Multi 15","factor":10}],"ul":{"M1":{"d":18059120,"p":12540253},"A13":{"d":47179000,"p":33956220},"P3":{"d":4728200,"p":3391348},"P4":{"d":6168420,"p":4500375},"P5":{"d":454740,"p":321082},"M6":{"d":17963400,"p":13982538},"M7":{"d":15190400,"p":10979861},"M8":{"d":19010000,"p":14818284},"M9":{"d":16303400,"p":11585047},"M10":{"d":1681000,"p":1215245},"M11":{"d":20817400,"p":16108209},"SA12":{"d":159306000,"p":118006290},"M2":{"d":18959700,"p":12938056},"M14":{"d":18789400,"p":14493698},"W20":{"d":113171000,"p":77782980},"W16":{"d":283917000,"p":186827660},"C17":{"d":24258600,"p":17508979},"M18":{"d":16359100,"p":12055821},"M19":{"d":16396500,"p":11473711},"M15":{"d":19927900,"p":15641026}},"b":[{"fecha":"2025-12-29","phys_total":5558520,"util_total":3403280},{"fecha":"2025-12-30","phys_total":3262020,"util_total":2424180},{"fecha":"2025-12-31","phys_total":3394850,"util_total":1565150},{"fecha":"2026-01-02","phys_total":7148310,"util_total":2279690},{"fecha":"2026-01-03","phys_total":3022050,"util_total":1351950},{"fecha":"2026-01-04","phys_total":3147360,"util_total":884640},{"fecha":"2026-01-05","phys_total":3342300,"util_total":675700},{"fecha":"2026-01-06","phys_total":2778670,"util_total":1174330},{"fecha":"2026-01-07","phys_total":4399640,"util_total":1221360},{"fecha":"2026-01-08","phys_total":4090020,"util_total":781980},{"fecha":"2026-01-09","phys_total":2457390,"util_total":1273610},{"fecha":"2026-01-10","phys_total":3646300,"util_total":1043700},{"fecha":"2026-01-11","phys_total":4844030,"util_total":647970},{"fecha":"2026-01-12","phys_total":2601010,"util_total":327990},{"fecha":"2026-01-13","phys_total":3373120,"util_total":555880},{"fecha":"2026-01-14","phys_total":3033950,"util_total":1056050},{"fecha":"2026-01-16","phys_total":5569410,"util_total":3441590},{"fecha":"2026-01-17","phys_total":3533380,"util_total":3224620},{"fecha":"2026-01-18","phys_total":2362380,"util_total":1484620},{"fecha":"2026-01-19","phys_total":2927560,"util_total":773440},{"fecha":"2026-01-20","phys_total":3802630,"util_total":550370},{"fecha":"2026-01-21","phys_total":2345280,"util_total":599720},{"fecha":"2026-01-23","phys_total":5528500,"util_total":3085500},{"fecha":"2026-01-25","phys_total":4710370,"util_total":4002630},{"fecha":"2026-01-26","phys_total":2045960,"util_total":2332040},{"fecha":"2026-01-28","phys_total":4663840,"util_total":3594160},{"fecha":"2026-01-29","phys_total":3437350,"util_total":-10350},{"fecha":"2026-01-30","phys_total":1912140,"util_total":1800860},{"fecha":"2026-01-31","phys_total":3377390,"util_total":1447610},{"fecha":"2026-02-01","phys_total":3742390,"util_total":2058610},{"fecha":"2026-02-02","phys_total":4557690,"util_total":1073310},{"fecha":"2026-02-04","phys_total":2595730,"util_total":2286270},{"fecha":"2026-02-05","phys_total":2568790,"util_total":1776210},{"fecha":"2026-02-06","phys_total":3862060,"util_total":485940},{"fecha":"2026-02-07","phys_total":3701010,"util_total":1008990},{"fecha":"2026-02-08","phys_total":3427780,"util_total":1502220},{"fecha":"2026-02-09","phys_total":3623910,"util_total":1208090},{"fecha":"2026-02-10","phys_total":4156300,"util_total":413700},{"fecha":"2026-02-12","phys_total":4330880,"util_total":1097120},{"fecha":"2026-02-13","phys_total":1890410,"util_total":1407590},{"fecha":"2026-02-14","phys_total":6018080,"util_total":1799920},{"fecha":"2026-02-15","phys_total":2729690,"util_total":1546310},{"fecha":"2026-02-16","phys_total":1971260,"util_total":1641740},{"fecha":"2026-02-17","phys_total":2693140,"util_total":182860},{"fecha":"2026-02-18","phys_total":2177870,"util_total":1908130},{"fecha":"2026-02-19","phys_total":2688930,"util_total":1339070},{"fecha":"2026-02-20","phys_total":2770600,"util_total":1869400},{"fecha":"2026-02-22","phys_total":6527250,"util_total":2104830},{"fecha":"2026-02-23","phys_total":1624510,"util_total":590410},{"fecha":"2026-02-24","phys_total":2307010,"util_total":758990},{"fecha":"2026-02-26","phys_total":5224820,"util_total":2347180},{"fecha":"2026-02-27","phys_total":2801460,"util_total":871540},{"fecha":"2026-02-28","phys_total":3941050,"util_total":2090950},{"fecha":"2026-03-01","phys_total":2917840,"util_total":1299160},{"fecha":"2026-03-02","phys_total":4654300,"util_total":1263700},{"fecha":"2026-03-03","phys_total":3330370,"util_total":853630},{"fecha":"2026-03-05","phys_total":5293230,"util_total":4119770},{"fecha":"2026-03-06","phys_total":3122050,"util_total":693950},{"fecha":"2026-03-07","phys_total":3397760,"util_total":2376240},{"fecha":"2026-03-08","phys_total":4598850,"util_total":1130150},{"fecha":"2026-03-09","phys_total":4477320,"util_total":1248680},{"fecha":"2026-03-10","phys_total":2801280,"util_total":616720},{"fecha":"2026-03-11","phys_total":4913340,"util_total":256660},{"fecha":"2026-03-12","phys_total":3951710,"util_total":3126290},{"fecha":"2026-03-13","phys_total":4232360,"util_total":-362360},{"fecha":"2026-03-14","phys_total":4047120,"util_total":1498880},{"fecha":"2026-03-15","phys_total":2841600,"util_total":2550400},{"fecha":"2026-03-16","phys_total":3297370,"util_total":1769630},{"fecha":"2026-03-17","phys_total":4245080,"util_total":962920}]},
"playarica":{"m":[{"id":"P1","nombre":"Poker 1","factor":50},{"id":"P2","nombre":"Poker 2","factor":50},{"id":"P3","nombre":"Poker 3","factor":50},{"id":"P4","nombre":"Poker 4","factor":50},{"id":"P5","nombre":"Poker 5","factor":50},{"id":"M6","nombre":"Multi 6","factor":10},{"id":"M7","nombre":"Multi 7","factor":10},{"id":"P16","nombre":"Poker 16","factor":50},{"id":"P11","nombre":"Poker 11","factor":50},{"id":"P10","nombre":"Poker 10","factor":50},{"id":"P15","nombre":"Poker 15","factor":50},{"id":"G9","nombre":"gaminator 9","factor":10},{"id":"D12","nombre":"Dolphin 12","factor":10},{"id":"G13","nombre":"Gaminator 13","factor":10},{"id":"N14","nombre":"novomaty 14","factor":1},{"id":"M8","nombre":"multy 8","factor":10}],"ul":{"P1":{"d":412380,"p":276631},"P2":{"d":171540,"p":111965},"P3":{"d":308540,"p":201095},"P4":{"d":669480,"p":439084},"P5":{"d":466600,"p":322843},"M6":{"d":860900,"p":562458},"M7":{"d":361500,"p":250846},"P16":{"d":196200,"p":131795},"P11":{"d":122100,"p":72607},"P10":{"d":73840,"p":49004},"P15":{"d":70560,"p":43965},"G9":{"d":3573100,"p":2542116},"D12":{"d":4120000,"p":3036980},"G13":{"d":2529800,"p":1798068},"N14":{"d":14788000,"p":11229290},"M8":{"d":1448500,"p":1049913}},"b":[{"fecha":"2026-01-03","phys_total":3146940,"util_total":990060},{"fecha":"2026-01-09","phys_total":2800830,"util_total":676170},{"fecha":"2026-01-16","phys_total":2789090,"util_total":1571910},{"fecha":"2026-01-21","phys_total":3004290,"util_total":1413710},{"fecha":"2026-01-25","phys_total":2477180,"util_total":1876820},{"fecha":"2026-01-31","phys_total":2766560,"util_total":1189440},{"fecha":"2026-02-05","phys_total":2550040,"util_total":1572960},{"fecha":"2026-02-08","phys_total":3634750,"util_total":824250},{"fecha":"2026-02-12","phys_total":3068700,"util_total":947300},{"fecha":"2026-02-17","phys_total":2886070,"util_total":990930},{"fecha":"2026-02-23","phys_total":3329340,"util_total":1418660},{"fecha":"2026-02-27","phys_total":2642510,"util_total":1133490},{"fecha":"2026-03-04","phys_total":2696490,"util_total":1161510},{"fecha":"2026-03-08","phys_total":3377940,"util_total":464060},{"fecha":"2026-03-14","phys_total":2974330,"util_total":1414670}]},
"hugo":{"m":[{"id":"G1","nombre":"Gaminator 1","factor":10},{"id":"G2","nombre":"Gaminator 2","factor":10},{"id":"M3","nombre":"Multi 3","factor":10},{"id":"M4","nombre":"Multi 4","factor":10},{"id":"M5","nombre":"multi 5","factor":10},{"id":"P6","nombre":"Poker 6","factor":50},{"id":"P7","nombre":"Poker 7","factor":50},{"id":"M8","nombre":"Multi 8","factor":10},{"id":"M9","nombre":"Multi 9","factor":10},{"id":"M10","nombre":"Multi 10","factor":10},{"id":"M11","nombre":"Multi 11","factor":10}],"ul":{"G1":{"d":71433500,"p":49562892},"G2":{"d":5697000,"p":3646064},"M3":{"d":26070700,"p":19167722},"M4":{"d":27865700,"p":21301685},"M5":{"d":304100,"p":181195},"P6":{"d":2551740,"p":1535052},"P7":{"d":209940,"p":104100},"M8":{"d":165900,"p":94205},"M9":{"d":568300,"p":377703},"M10":{"d":404200,"p":225775},"M11":{"d":913708,"p":535829}},"b":[{"fecha":"2026-01-06","phys_total":1718950,"util_total":1318050},{"fecha":"2026-01-09","phys_total":1899850,"util_total":418150},{"fecha":"2026-01-14","phys_total":1024840,"util_total":2177160},{"fecha":"2026-01-17","phys_total":1498490,"util_total":896510},{"fecha":"2026-01-20","phys_total":1227790,"util_total":530210},{"fecha":"2026-01-24","phys_total":1446950,"util_total":154050},{"fecha":"2026-01-26","phys_total":2170740,"util_total":-378740},{"fecha":"2026-01-30","phys_total":995040,"util_total":1397960},{"fecha":"2026-02-01","phys_total":1174600,"util_total":377400},{"fecha":"2026-02-06","phys_total":1318840,"util_total":1513160},{"fecha":"2026-02-10","phys_total":1457520,"util_total":1243480},{"fecha":"2026-02-14","phys_total":1452180,"util_total":636820},{"fecha":"2026-02-16","phys_total":1839220,"util_total":-177220},{"fecha":"2026-02-20","phys_total":1812300,"util_total":13700},{"fecha":"2026-02-24","phys_total":1359750,"util_total":918250},{"fecha":"2026-02-27","phys_total":1041620,"util_total":440380},{"fecha":"2026-03-03","phys_total":2711340,"util_total":105660},{"fecha":"2026-03-10","phys_total":1436960,"util_total":932040},{"fecha":"2026-03-13","phys_total":1279060,"util_total":530940},{"fecha":"2026-03-17","phys_total":1199930,"util_total":1313150}]},
};

// ─── GOOGLE SHEETS LIVE DATA ─────────────────────────────────────────────────
const GAPI_KEY="AIzaSyDKK-hguKhbuySCe39TG_lAIR04JiAd4DI";
const SHEET_IDS={
  vikingos:"1M5Gf83ajZHI1a6a6qUVVn2bNi7at-5ExB7iWCb22d-s",
  playarica:"1jWPrRZPo5W_CPOC284QUOUeE5dc21HQ4VNa1HB3734w",
  obrero:"16RPnUniy-zHcXy1s2A9gdq_vXjbrpxFXNQ91-yupT1U",
  hugo:"1YW1y-xmiGBV51Ta5fqzlX06Hjwefs31GCq40zK01Hvc",
  faraon:"1uW97FYebdr3-sjSHRebiYKCWaE1m5ZEeBzsrCGLTM6U",
};

// Columnas exactas por máquina extraídas de las fórmulas del Balance
// { cid: { maqNombre: { p: colIdx_premios, u: colIdx_utilidad } } }
const COL_MAP={
  "faraon":{"WMS 20":{"p":4,"u":5},"Multi 15":{"p":5,"u":6},"Multi 2":{"p":5,"u":6},"Stand Alone 12":{"p":4,"u":5},"Multi 8":{"p":5,"u":6},"Multi 1":{"p":5,"u":6},"Poker 5":{"p":6,"u":7},"Multi 7":{"p":5,"u":6},"Clon 17":{"p":5,"u":6},"Multi 11":{"p":5,"u":6},"Aristocrat 13":{"p":5,"u":6},"Multi 6":{"p":5,"u":6},"Multi 9":{"p":5,"u":6},"Multi 14":{"p":5,"u":6},"WMS 16":{"p":4,"u":5},"Poker 4":{"p":6,"u":7},"Multi 10":{"p":5,"u":6},"Poker 3":{"p":6,"u":7},"Multi 19":{"p":5,"u":6},"Multi 18":{"p":5,"u":6}},
  "hugo":{"Gaminator 1":{"p":5,"u":6},"Poker 6":{"p":6,"u":7},"Multi 4":{"p":5,"u":6},"Gaminator 2":{"p":5,"u":6},"Multi 3":{"p":5,"u":6},"Poker 7":{"p":6,"u":7},"Multi 10":{"p":5,"u":6},"Multi 11":{"p":5,"u":6},"multi 5":{"p":5,"u":6},"Multi 9":{"p":5,"u":6},"Multi 8":{"p":5,"u":6}},
  "obrero":{"Multi 16":{"p":5,"u":6},"Multi 13":{"p":5,"u":6},"Jungle Wild 4":{"p":4,"u":5},"Multi 15":{"p":5,"u":6},"Multi 2":{"p":5,"u":6},"Multi 8":{"p":5,"u":6},"Multi 12":{"p":5,"u":6},"Maq 1":{"p":4,"u":5},"Multi 7":{"p":5,"u":6},"Multi 11":{"p":5,"u":6},"Multi 6":{"p":5,"u":6},"Multi 9":{"p":5,"u":6},"Multi 20":{"p":5,"u":6},"Duende 18":{"p":4,"u":5},"Multi 14":{"p":5,"u":6},"Multi 10":{"p":5,"u":6},"Poker 3":{"p":6,"u":7},"Multi 19":{"p":5,"u":6},"Multi 5":{"p":5,"u":6},"Multi 17":{"p":5,"u":6}},
  "playarica":{"Poker 15":{"p":6,"u":7},"Poker 10":{"p":6,"u":7},"Dolphin 12":{"p":5,"u":6},"Poker 5":{"p":6,"u":7},"Poker 4":{"p":6,"u":7},"gaminator 9":{"p":5,"u":6},"Multi 7":{"p":5,"u":6},"novomaty 14":{"p":5,"u":6},"Poker 3":{"p":6,"u":7},"Poker 16":{"p":6,"u":7},"Poker 1":{"p":6,"u":7},"Poker 11":{"p":6,"u":7},"Multi 6":{"p":5,"u":6},"Gaminator 13":{"p":5,"u":6},"multy 8":{"p":5,"u":6},"Poker 2":{"p":6,"u":7}},
  "vikingos":{"Maq 14":{"p":4,"u":5},"Multi 16":{"p":5,"u":6},"Multi 13":{"p":5,"u":6},"Poker 1":{"p":6,"u":7},"Multi 15":{"p":5,"u":6},"Poker 18":{"p":6,"u":7},"WMS 19":{"p":4,"u":5},"Poker 2":{"p":6,"u":7},"Gaminator 17":{"p":5,"u":6},"Multi 3":{"p":5,"u":6},"Multi 8":{"p":5,"u":6},"Multi 12":{"p":5,"u":6},"Multi 4":{"p":5,"u":6},"Multi 7":{"p":5,"u":6},"Jungle 20":{"p":5,"u":6},"Multi 6":{"p":5,"u":6},"Bailarin 11":{"p":5,"u":6},"Multi 9":{"p":5,"u":6},"Multi 10":{"p":5,"u":6},"Multi 5":{"p":5,"u":6}},
};

const _sheetsCache={};

async function fetchSheetHist(cid){
  if(_sheetsCache[cid])return _sheetsCache[cid];
  const sheetId=SHEET_IDS[cid];
  if(!sheetId)return[];
  const mqs=D[cid]?.m||[];
  const cidColMap=COL_MAP[cid]||{};
  const results=[];

  for(const mq of mqs){
    const sheetName=encodeURIComponent(mq.nombre);
    const url=`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A:H?key=${GAPI_KEY}`;
    try{
      const r=await fetch(url);
      if(!r.ok)continue;
      const data=await r.json();
      const rows=data.values||[];
      // Detectar si primera fila es encabezado (no fecha)
      const startIdx=(rows.length>0&&!parseSheetDate(rows[0][0]))?1:0;
      // Obtener índices correctos para esta máquina
      const maqCols=cidColMap[mq.nombre]||{};
      const pIdx=maqCols.p!=null?maqCols.p:5; // default F
      const uIdx=maqCols.u!=null?maqCols.u:6; // default G
      let prevIn=null,prevOut=null;
      for(let i=startIdx;i<rows.length;i++){
        const row=rows[i];
        const fecha=parseSheetDate(row[0]);
        if(!fecha)continue;
        const inAcum=parseNum(row[1]);
        const outAcum=parseNum(row[2]);
        if(inAcum==null||outAcum==null||inAcum===0)continue;
        let premios=parseNum(row[pIdx]);
        let utilidad=parseNum(row[uIdx]);
        // Fallback: calcular desde diferencia si no hay datos de período
        if(utilidad==null&&prevIn!=null&&inAcum>prevIn){
          const inPer=inAcum-prevIn;
          const outPer=outAcum-prevOut;
          if(premios==null)premios=outPer*mq.factor;
          utilidad=(inPer-outPer)*mq.factor;
        }
        results.push([mq.id,fecha,inAcum,outAcum,premios,utilidad]);
        prevIn=inAcum;prevOut=outAcum;
      }
    }catch(e){console.warn(`Sheets ${cid}/${mq.nombre}:`,e.message);}
  }
  _sheetsCache[cid]=results;
  return results;
}

function parseSheetDate(raw){
  if(!raw||typeof raw!=="string")return null;
  const MMAP={ene:1,feb:2,mar:3,abr:4,may:5,jun:6,jul:7,ago:8,sep:9,oct:10,nov:11,dic:12};
  const m=raw.trim().toLowerCase().match(/^(\d{1,2})[-/]([a-z]{3})(?:[-/](\d{2,4}))?$/);
  if(!m)return null;
  const day=parseInt(m[1]),mon=MMAP[m[2]];
  if(!mon)return null;
  let year=new Date().getFullYear();
  if(m[3]){year=parseInt(m[3]);if(year<100)year+=2000;}
  else if(mon>new Date().getMonth()+2)year--;
  return`${year}-${String(mon).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
}
function parseNum(v){
  if(v==null||v==="")return null;
  let s=String(v).replace(/[$\s]/g,"").trim();
  if(/\.\d{3}(\.|$)/.test(s)||/^-?\d{1,3}(\.\d{3})+$/.test(s)){s=s.replace(/\./g,"");}
  s=s.replace(/,/g,"");
  const n=parseFloat(s);
  return isNaN(n)?null:Math.round(n);
}


const META={
  obrero:{n:"Casino Obrero",e:"building",c:"indigo",liq:"3-4 días"},
  vikingos:{n:"Vikingos",e:"sword",c:"orange",liq:"Diario"},
  faraon:{n:"Faraón",e:"sun",c:"yellow",liq:"Diario"},
  playarica:{n:"Playa Rica",e:"palmtree",c:"green",liq:"3-4 días"},
  hugo:{n:"Hugo",e:"clubs",c:"purple",liq:"3-4 días"},
};
const USERS=["Santiago","Eliza","Jessica"];

// ─── ICONS ────────────────────────────────────────────────────────────────────
const ICONS={
  building:(c,s=22)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><rect x="3"y="3"width="18"height="18"rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>,
  sword:(c,s=22)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13"y1="19"x2="19"y2="13"/><line x1="16"y1="16"x2="20"y2="20"/><line x1="19"y1="21"x2="21"y2="19"/></svg>,
  sun:(c,s=22)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><circle cx="12"cy="12"r="5"/>{[0,45,90,135,180,225,270,315].map(d=><line key={d}x1="12"y1="2"x2="12"y2="4"stroke={c}strokeWidth="1.8"strokeLinecap="round"transform={`rotate(${d} 12 12)`}/>)}</svg>,
  palmtree:(c,s=22)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h11z"/><path d="M13 8c0-2.76 2.46-5 5.5-5S24 5.24 24 8H13z"/><path d="M13 8c0 4-2 6-5 9"/><path d="M13 8c0 4 2 6 5 9"/><line x1="13"y1="8"x2="13"y2="22"/></svg>,
  clubs:(c,s=22)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M17 12c2.2 0 4-1.8 4-4s-1.8-4-4-4c-.5 0-1 .1-1.4.3C14.7 2.9 13.4 2 12 2s-2.7.9-3.6 2.3C8 4.1 7.5 4 7 4 4.8 4 3 5.8 3 8s1.8 4 4 4c.4 0 .8-.1 1.2-.2L7 22h10l-1.2-10.2c.4.1.8.2 1.2.2z"/></svg>,
  counters:(c,s=22)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><rect x="3"y="3"width="7"height="7"rx="1"/><rect x="14"y="3"width="7"height="7"rx="1"/><rect x="3"y="14"width="7"height="7"rx="1"/><rect x="14"y="14"width="7"height="7"rx="1"/></svg>,
  camera:(c,s=22)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12"cy="13"r="4"/></svg>,
  report:(c,s=22)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16"y1="13"x2="8"y2="13"/><line x1="16"y1="17"x2="8"y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  machines:(c,s=22)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><rect x="2"y="7"width="20"height="14"rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  settings:(c,s=22)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><circle cx="12"cy="12"r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  faceid:(c,s=22)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4"/><path d="M15 3h4a2 2 0 0 1 2 2v4"/><path d="M9 21H5a2 2 0 0 1-2-2v-4"/><path d="M15 21h4a2 2 0 0 0 2-2v-4"/><circle cx="9"cy="10"r="1"fill={c}/><circle cx="15"cy="10"r="1"fill={c}/><path d="M9 15c.5 1 1.5 1.5 3 1.5s2.5-.5 3-1.5"/></svg>,
  trash:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  edit:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trophy:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><polyline points="8 21 12 21 16 21"/><line x1="12"y1="17"x2="12"y2="21"/><path d="M7 4H17l-1 7a5 5 0 0 1-10 0z"/><path d="M5 9H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h2"/><path d="M19 9h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2"/></svg>,
  pdf:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h1a2 2 0 0 1 0 4H9v-4z"/><path d="M13 13h2"/><path d="M13 17h2"/></svg>,
  excel:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13l2.5 4"/><path d="M13.5 13L11 17"/><line x1="8"y1="17"x2="13.5"y2="13"/></svg>,
  sync:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  moon:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  sunicon:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><circle cx="12"cy="12"r="5"/><line x1="12"y1="1"x2="12"y2="3"/><line x1="12"y1="21"x2="12"y2="23"/><line x1="4.22"y1="4.22"x2="5.64"y2="5.64"/><line x1="18.36"y1="18.36"x2="19.78"y2="19.78"/><line x1="1"y1="12"x2="3"y2="12"/><line x1="21"y1="12"x2="23"y2="12"/><line x1="4.22"y1="19.78"x2="5.64"y2="18.36"/><line x1="18.36"y1="5.64"x2="19.78"y2="4.22"/></svg>,
  back:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  chevron:(c,s=16)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  check:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="2.5"strokeLinecap="round"strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  warning:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12"y1="9"x2="12"y2="13"/><line x1="12"y1="17"x2="12.01"y2="17"/></svg>,
  wifi:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><line x1="1"y1="1"x2="23"y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12"y1="20"x2="12.01"y2="20"/></svg>,
  table:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><rect x="3"y="3"width="18"height="18"rx="2"/><line x1="3"y1="9"x2="21"y2="9"/><line x1="3"y1="15"x2="21"y2="15"/><line x1="9"y1="3"x2="9"y2="21"/></svg>,
  download:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12"y1="15"x2="12"y2="3"/></svg>,
  slot:(c,s=24)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><rect x="2"y="6"width="20"height="14"rx="2"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><circle cx="12"cy="13"r="3"/><line x1="12"y1="10"x2="12"y2="8"/></svg>,
  poker:(c,s=24)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M12 2l2.5 5h5.5l-4.5 3.5 1.5 5.5L12 13l-5 3 1.5-5.5L4 7h5.5z"/></svg>,
  user:(c,s=22)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12"cy="7"r="4"/></svg>,
  lock:(c,s=22)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><rect x="3"y="11"width="18"height="11"rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  shield:(c,s=22)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  trending:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
};
const Ico=({n,c,s})=>(ICONS[n]?ICONS[n](c,s):<span style={{fontSize:s||18,color:c}}>•</span>);

// ─── UTILS ────────────────────────────────────────────────────────────────────
const fmt=n=>{if(n==null||isNaN(n))return"—";const a=Math.abs(n),s=n<0?"-":"";if(a>=1e6)return s+"$"+(a/1e6).toFixed(1)+"M";if(a>=1e3)return s+"$"+(a/1e3).toFixed(0)+"K";return s+"$"+a.toLocaleString();};
const fmtE=n=>{if(n==null||isNaN(n))return"—";const s=n<0?"-":"";return s+"$"+Math.abs(Math.round(n)).toLocaleString("es-CO");};
const today=()=>new Date().toISOString().slice(0,10);
const MESES=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
const fmtF=f=>f?`${f.slice(8)}-${MESES[parseInt(f.slice(5,7))-1]}`:"—";
const maqC=(f,C)=>f===50?C.purple:f===10?C.blue:C.orange;
const maqIcon=n=>{const l=(n||"").toLowerCase();if(l.includes("poker"))return"poker";return"slot";};

// ─── PERSISTENCE ─────────────────────────────────────────────────────────────
const enc=(s,k)=>{let o="";for(let i=0;i<s.length;i++)o+=String.fromCharCode(s.charCodeAt(i)^k.charCodeAt(i%k.length));return btoa(o);};
const dec=(b,k)=>{try{const s=atob(b);let o="";for(let i=0;i<s.length;i++)o+=String.fromCharCode(s.charCodeAt(i)^k.charCodeAt(i%k.length));return JSON.parse(o);}catch{return null;}};
const savePin=(u,pin)=>localStorage.setItem("cp_"+u,enc(JSON.stringify({ok:1,u}),u+":"+pin));
const checkPin=(u,pin)=>{const s=localStorage.getItem("cp_"+u);if(!s)return false;const d=dec(s,u+":"+pin);return d?.ok===1;};
const saveApiKey=k=>localStorage.setItem("cc_ak",k);
const loadApiKey=()=>localStorage.getItem("cc_ak")||"";
const saveCont=data=>{try{localStorage.setItem("cc_v2",JSON.stringify(data));}catch{}};
const loadCont=()=>{try{const s=localStorage.getItem("cc_v2");return s?JSON.parse(s):{};}catch{return{};}};
const savePending=q=>{try{localStorage.setItem("cc_pending",JSON.stringify(q));}catch{}};
const loadPending=()=>{try{const s=localStorage.getItem("cc_pending");return s?JSON.parse(s):[];}catch{return[];}};
const LOG_KEY="cc_access_log";const MAX_LOG=200;
function saveLog(entry){try{const logs=loadLogs();logs.unshift({...entry,ts:new Date().toISOString()});localStorage.setItem(LOG_KEY,JSON.stringify(logs.slice(0,MAX_LOG)));}catch{}}
function loadLogs(){try{return JSON.parse(localStorage.getItem(LOG_KEY)||"[]");}catch{return[];}}
const TIMEOUT_KEY="cc_timeout";
function saveTimeouts(t){localStorage.setItem(TIMEOUT_KEY,JSON.stringify(t));}
function loadTimeouts(){try{return JSON.parse(localStorage.getItem(TIMEOUT_KEY)||"{}");}catch{return{};}}

// ─── FACE ID ─────────────────────────────────────────────────────────────────
const WA=window.PublicKeyCredential;
function getFaceDevices(user){try{return JSON.parse(localStorage.getItem("faceid_devs_"+user)||"[]");}catch{return[];}}
function setFaceDevices(user,devs){localStorage.setItem("faceid_devs_"+user,JSON.stringify(devs));if(devs.length>0){localStorage.setItem("faceid_"+user,JSON.stringify({credId:devs[0].credId,user}));}else{localStorage.removeItem("faceid_"+user);}}
async function registerFaceIdDevice(user,label){
  if(!WA)throw new Error("WebAuthn no soportado");
  const devs=getFaceDevices(user);if(devs.length>=2)throw new Error("Ya hay 2 dispositivos registrados.");
  const challenge=crypto.getRandomValues(new Uint8Array(32));
  const cred=await navigator.credentials.create({publicKey:{challenge,rp:{name:"Casino Contadores",id:window.location.hostname},user:{id:new TextEncoder().encode(user+"_"+Date.now()),name:user,displayName:user},pubKeyCredParams:[{type:"public-key",alg:-7},{type:"public-key",alg:-257}],authenticatorSelection:{authenticatorAttachment:"platform",userVerification:"required"},timeout:60000}});
  const credId=btoa(String.fromCharCode(...new Uint8Array(cred.rawId)));
  const updated=[...devs,{credId,label:label||"Dispositivo "+(devs.length+1),registeredAt:new Date().toISOString()}];
  setFaceDevices(user,updated);return updated;
}
function revokeFaceDevice(user,credId){const updated=getFaceDevices(user).filter(d=>d.credId!==credId);setFaceDevices(user,updated);return updated;}
async function registerFaceId(user){if(!WA)throw new Error("WebAuthn no soportado");const devs=getFaceDevices(user);if(devs.length>=2)throw new Error("Máx 2 dispositivos.");return registerFaceIdDevice(user,"Dispositivo "+(devs.length+1));}
async function authFaceId(user){
  if(!WA)throw new Error("WebAuthn no soportado");
  const devs=getFaceDevices(user);if(!devs.length){const old=localStorage.getItem("faceid_"+user);if(!old)throw new Error("Face ID no registrado");}
  const allDevs=devs.length?devs:[JSON.parse(localStorage.getItem("faceid_"+user)||"null")].filter(Boolean);
  if(!allDevs.length)throw new Error("Face ID no registrado");
  const challenge=crypto.getRandomValues(new Uint8Array(32));
  await navigator.credentials.get({publicKey:{challenge,allowCredentials:allDevs.map(d=>({type:"public-key",id:Uint8Array.from(atob(d.credId),c=>c.charCodeAt(0))})),userVerification:"required",timeout:60000}});
  return true;
}
const hasFaceId=u=>getFaceDevices(u).length>0||!!localStorage.getItem("faceid_"+u);

// ─── SUPABASE ─────────────────────────────────────────────────────────────────
const sbLoad=()=>{window._sbUrl=localStorage.getItem("sb_url")||"";window._sbKey=localStorage.getItem("sb_key")||"";};
const sbReady=()=>!!(window._sbUrl&&window._sbKey);
const sbFetch=async(path,opts={})=>{if(!sbReady())return null;try{const r=await fetch(window._sbUrl+"/rest/v1/"+path,{...opts,headers:{"apikey":window._sbKey,"Authorization":"Bearer "+window._sbKey,"Content-Type":"application/json","Prefer":"return=minimal",...(opts.headers||{})}});if(!r.ok)return null;try{return await r.json();}catch{return null;}}catch{return null;}};
async function sbSave(row){if(!sbReady()){const p=loadPending();savePending([...p,row]);return;}await sbFetch("lecturas?on_conflict=casino_id,maq_id,fecha",{method:"POST",headers:{"Prefer":"resolution=merge-duplicates,return=minimal"},body:JSON.stringify(row)});}
async function sbSync(){if(!sbReady())return 0;const pending=loadPending();if(!pending.length)return 0;let synced=0;for(const row of pending){const r=await sbFetch("lecturas?on_conflict=casino_id,maq_id,fecha",{method:"POST",headers:{"Prefer":"resolution=merge-duplicates,return=minimal"},body:JSON.stringify(row)});if(r!==null)synced++;}if(synced===pending.length)savePending([]);return synced;}

// ─── GOOGLE DRIVE ─────────────────────────────────────────────────────────────
async function compressImage(file,maxW=1200,quality=0.72){return new Promise(resolve=>{const img=new Image();img.onload=()=>{const scale=Math.min(1,maxW/img.width);const w=Math.round(img.width*scale),h=Math.round(img.height*scale);const c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);c.toBlob(b=>resolve(b),"image/jpeg",quality);};img.src=URL.createObjectURL(file);});}
const GDClientId=()=>localStorage.getItem("gd_client_id")||"";const GDFolderId=()=>localStorage.getItem("gd_folder_id")||"";let gdToken=null;
async function gdAuth(){return new Promise((resolve,reject)=>{const cid=GDClientId();if(!cid)return reject(new Error("Drive no configurado"));const w=window.open(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(cid)}&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=token&scope=https://www.googleapis.com/auth/drive.file&prompt=consent`,"gda","width=500,height=600");const t=setInterval(()=>{try{if(w.closed){clearInterval(t);return;}if(w.location.href.includes(window.location.origin)){const hash=w.location.hash;w.close();clearInterval(t);const token=new URLSearchParams(hash.slice(1)).get("access_token");token?(gdToken=token,resolve(token)):reject(new Error("Sin token"));}}catch{}},500);});}
async function gdMkFolder(name,parent){if(!gdToken)await gdAuth();const q=encodeURIComponent(`name='${name}' and mimeType='application/vnd.google-apps.folder' and '${parent}' in parents and trashed=false`);const r=await fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id)`,{headers:{Authorization:"Bearer "+gdToken}});const d=await r.json();if(d.files?.length)return d.files[0].id;const cr=await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:"Bearer "+gdToken,"Content-Type":"application/json"},body:JSON.stringify({name,mimeType:"application/vnd.google-apps.folder",parents:[parent]})});return(await cr.json()).id;}
async function gdUpload(blob,name,parent){if(!gdToken)await gdAuth();const form=new FormData();form.append("metadata",new Blob([JSON.stringify({name,parents:[parent]})],{type:"application/json"}));form.append("file",blob,name);const r=await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",{method:"POST",headers:{Authorization:"Bearer "+gdToken},body:form});return r.json();}
async function uploadPhoto(blob,casinoName,fecha,maqNombre){const root=GDFolderId();if(!root)return;const cf=await gdMkFolder(casinoName,root);const ff=await gdMkFolder(fecha,cf);await gdUpload(blob,`${maqNombre}_${fecha}.jpg`,ff);}


// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
function MaqIcon({factor,nombre,size=30}){
  const C=getC();const col=maqC(factor,C);
  return<div style={{width:size,height:size,borderRadius:size*.24,background:`linear-gradient(145deg,${col}55,${col}cc)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 2px 8px ${col}44`}}><Ico n={maqIcon(nombre)}c="#FFF"s={size*.6}/></div>;
}
function Sec({hdr,children,style={},delay=0}){
  const C=getC();
  return<div style={{marginBottom:16,...style,animation:`fadeSlideUp .35s ease ${delay}s both`}}>
    {hdr&&<div style={{...T.cap,color:C.label2,paddingLeft:16,paddingBottom:6,textTransform:"uppercase",letterSpacing:1}}>{hdr}</div>}
    <div style={{background:C.bg2,borderRadius:16,overflow:"hidden",border:`1px solid ${C.sep}`}}>{children}</div>
  </div>;
}
function Row({ic,icC,lbl,sub,right,arr=true,fn,del,last,noBorder}){
  const C=getC();const[pr,setPr]=useState(false);
  return<div onPointerDown={()=>fn&&setPr(true)}onPointerUp={()=>setPr(false)}onPointerLeave={()=>setPr(false)}onClick={fn}
    style={{display:"flex",alignItems:"center",padding:"11px 14px",background:pr&&fn?C.fill4:"transparent",cursor:fn?"pointer":"default",borderBottom:last||noBorder?"none":`0.5px solid ${C.sep}`,minHeight:46,transition:"background .15s"}}>
    {ic&&<div style={{width:32,height:32,borderRadius:9,background:`${icC||C.blue}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginRight:10}}><Ico n={ic}c={icC||C.blue}s={18}/></div>}
    <div style={{flex:1,minWidth:0}}>
      <div style={{...T.b,color:del?C.red:C.label,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{lbl}</div>
      {sub&&<div style={{...T.fn,color:C.label2,marginTop:1}}>{sub}</div>}
    </div>
    {right&&<div style={{marginLeft:8,flexShrink:0}}>{typeof right==="string"?<span style={{...T.b,color:C.label2}}>{right}</span>:right}</div>}
    {arr&&fn&&<div style={{marginLeft:4,opacity:.35}}><Ico n="chevron"c={C.label}s={16}/></div>}
  </div>;
}
function Nav({title,sub,right=[],sy=0,large=true,back,onBack}){
  const C=getC();const col=large&&sy>48;
  return<div style={{position:"sticky",top:0,zIndex:50,background:col?C.navBg:"transparent",backdropFilter:col?"blur(24px) saturate(180%)":"none",borderBottom:col?`0.5px solid ${C.sep}`:"none",transition:"all .2s"}}>
    <div style={{display:"flex",alignItems:"center",height:44,padding:"0 8px",position:"relative"}}>
      {onBack&&<button onClick={onBack}style={{background:"transparent",border:"none",color:C.blue,cursor:"pointer",display:"flex",alignItems:"center",gap:4,padding:"4px 8px"}}>
        <Ico n="back"c={C.blue}s={20}/><span style={{...T.b,color:C.blue}}>{back||"Atrás"}</span>
      </button>}
      {(!large||col)&&<span style={{...T.h,color:C.label,position:"absolute",left:"50%",transform:"translateX(-50%)",whiteSpace:"nowrap"}}>{title}</span>}
      <div style={{flex:1}}/>
      {right.map((r,i)=><button key={i}onClick={r.fn}style={{background:C.fill3,border:"none",borderRadius:99,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",marginLeft:4,transition:"background .15s"}}>{typeof r.icon==="string"?<Ico n={r.icon}c={C.label}s={17}/>:r.icon}</button>)}
    </div>
    {large&&<div style={{padding:"0 18px 14px",opacity:col?0:1,transition:"opacity .2s",pointerEvents:col?"none":"auto"}}>
      <div style={{...T.lg,color:C.label}}>{title}</div>
      {sub&&<div style={{...T.s,color:C.label2,marginTop:2}}>{sub}</div>}
    </div>}
  </div>;
}
function Tabs({tab,setTab,color}){
  const C=getC();
  const ts=[{id:"lectura",lbl:"Contadores",icon:"counters"},{id:"camara",lbl:"Cámara",icon:"camera"},{id:"reporte",lbl:"Reporte",icon:"report"},{id:"maquinas",lbl:"Máquinas",icon:"machines"}];
  return<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:C.navBg,backdropFilter:"blur(24px) saturate(180%)",borderTop:`0.5px solid ${C.sep}`,zIndex:100,paddingBottom:"max(env(safe-area-inset-bottom,0px),8px)"}}>
    <div style={{display:"flex",justifyContent:"space-around",paddingTop:8}}>
      {ts.map(t=><button key={t.id}onClick={()=>setTab(t.id)}style={{background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"0 8px",minWidth:60,transition:"all .15s"}}>
        <div style={{transition:"transform .2s",transform:tab===t.id?"scale(1.12)":"scale(1)"}}><Ico n={t.icon}c={tab===t.id?color:C.label2}s={22}/></div>
        <span style={{...T.cap,color:tab===t.id?color:C.label2,fontWeight:tab===t.id?700:400}}>{t.lbl}</span>
      </button>)}
    </div>
  </div>;
}
function Badge({n,c}){const C=getC();return<div style={{background:c||C.red,borderRadius:99,minWidth:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 5px"}}><span style={{...T.cap,color:"#FFF",fontWeight:700,fontSize:11}}>{n}</span></div>;}

// ─── ANIMATED NUMBER ──────────────────────────────────────────────────────────
function AnimNumber({value,style={},format=fmtE}){
  const[disp,setDisp]=useState(0);const ref=useRef(null);
  useEffect(()=>{
    const target=value||0;const start=Date.now();const dur=600;const from=disp;
    const tick=()=>{const p=Math.min(1,(Date.now()-start)/dur);const ease=1-Math.pow(1-p,3);setDisp(Math.round(from+(target-from)*ease));if(p<1)ref.current=requestAnimationFrame(tick);};
    ref.current=requestAnimationFrame(tick);return()=>cancelAnimationFrame(ref.current);
  },[value]);
  return<span style={style}>{format(disp)}</span>;
}

// ─── SPARKLINE ────────────────────────────────────────────────────────────────
function Sparkline({data,color,height=32,width=80}){
  if(!data||data.length<2)return null;
  const min=Math.min(...data),max=Math.max(...data);const range=max-min||1;
  const pts=data.map((v,i)=>{const x=(i/(data.length-1))*width;const y=height-((v-min)/range)*(height-4)-2;return`${x},${y}`;}).join(" ");
  return<svg width={width}height={height}style={{overflow:"visible"}}>
    <polyline points={pts}fill="none"stroke={color}strokeWidth="1.5"strokeLinecap="round"strokeLinejoin="round"style={{strokeDasharray:1000,strokeDashoffset:0,animation:"lineDrawIn .8s ease both"}}/>
  </svg>;
}


// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({onAuth}){
  const C=getC();
  const[user,setUser]=useState(null);const[pin,setPin]=useState("");const[pin2,setPin2]=useState("");
  const[paso,setPaso]=useState("sel");const[err,setErr]=useState("");const[faceLoading,setFL]=useState(false);
  const uColor=u=>u==="Santiago"?C.indigo:u==="Eliza"?C.pink:C.teal;
  function selUser(u){setUser(u);setPin("");setPin2("");setErr("");setPaso(localStorage.getItem("cp_"+u)?"in":"new");}
  function go(){
    setErr("");
    if(paso==="new"){if(pin.length<4)return setErr("Mínimo 4 dígitos");return setPaso("conf");}
    if(paso==="conf"){if(pin!==pin2)return setErr("PINs no coinciden");savePin(user,pin);onAuth(user);return;}
    if(paso==="in"){if(checkPin(user,pin)){onAuth(user);}else{saveLog({action:"login_fail",target:user});setErr("PIN incorrecto");}}
  }
  async function doFaceId(){setFL(true);setErr("");try{if(!hasFaceId(user)){await registerFaceId(user);onAuth(user);}else{await authFaceId(user);onAuth(user);}}catch(e){setErr(e.message||"Face ID falló");}setFL(false);}

  if(paso==="sel")return(
    <div style={{minHeight:"100dvh",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{ANIM_CSS}</style>
      <div style={{width:"100%",maxWidth:320}}>
        <div style={{textAlign:"center",marginBottom:36,animation:"fadeSlideUp .4s ease both"}}>
          <div style={{width:76,height:76,borderRadius:22,background:`linear-gradient(135deg,${C.indigo},${C.blue})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",boxShadow:`0 8px 32px ${C.indigo}44`}}><Ico n="slot"c="#FFF"s={40}/></div>
          <div style={{...T.lg,color:C.label}}>Casinos</div>
          <div style={{...T.s,color:C.label2,marginTop:4}}>¿Quién eres?</div>
        </div>
        {USERS.map((u,i)=><button key={u}onClick={()=>selUser(u)}style={{width:"100%",background:C.bg2,border:`1px solid ${C.sep}`,borderRadius:16,padding:"14px",marginBottom:10,cursor:"pointer",display:"flex",alignItems:"center",gap:12,textAlign:"left",animation:`fadeSlideUp .4s ease ${.1+i*.08}s both`,transition:"transform .15s,box-shadow .15s"}}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow=`0 4px 20px ${uColor(u)}22`;}}
          onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
          <div style={{width:46,height:46,borderRadius:23,background:uColor(u),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 4px 12px ${uColor(u)}44`}}><Ico n="user"c="#FFF"s={22}/></div>
          <div style={{flex:1}}><div style={{...T.h,color:C.label}}>{u}</div><div style={{...T.fn,color:C.label2,display:"flex",alignItems:"center",gap:4,marginTop:2}}>{hasFaceId(u)&&<Ico n="faceid"c={C.blue}s={13}/>}{localStorage.getItem("cp_"+u)?"PIN configurado":"Primera vez"}</div></div>
          <Ico n="chevron"c={C.label3}s={16}/>
        </button>)}
      </div>
    </div>
  );
  return(
    <div style={{minHeight:"100dvh",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{ANIM_CSS}</style>
      <div style={{width:"100%",maxWidth:320,animation:"scaleIn .3s ease both"}}>
        <button onClick={()=>setPaso("sel")}style={{background:"transparent",border:"none",color:C.blue,cursor:"pointer",display:"flex",alignItems:"center",gap:4,marginBottom:24,...T.b}}>
          <Ico n="back"c={C.blue}s={18}/>Cambiar
        </button>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:58,height:58,borderRadius:29,background:uColor(user),display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",boxShadow:`0 6px 20px ${uColor(user)}55`}}><Ico n="user"c="#FFF"s={28}/></div>
          <div style={{...T.lg,color:C.label,fontSize:26}}>{user}</div>
          <div style={{...T.s,color:C.label2,marginTop:4}}>{paso==="new"?"Crear PIN":paso==="conf"?"Confirmar PIN":"Ingresa tu PIN"}</div>
        </div>
        {paso==="in"&&hasFaceId(user)&&<button onClick={doFaceId}disabled={faceLoading}style={{width:"100%",background:C.fill3,border:`1px solid ${C.sep}`,borderRadius:14,padding:"14px",marginBottom:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <Ico n="faceid"c={C.blue}s={24}/><span style={{...T.h,color:C.blue}}>{faceLoading?"Verificando...":"Entrar con Face ID"}</span>
        </button>}
        <input type="password"inputMode="numeric"value={paso==="conf"?pin2:pin}onChange={e=>paso==="conf"?setPin2(e.target.value):setPin(e.target.value)}onKeyDown={e=>e.key==="Enter"&&go()}placeholder="••••"autoFocus
          style={{width:"100%",background:C.bg2,border:`1px solid ${C.sep}`,borderRadius:14,padding:"13px",color:C.label,...T.lg,fontSize:28,textAlign:"center",boxSizing:"border-box",outline:"none",marginBottom:12,letterSpacing:10}}/>
        {err&&<div style={{...T.s,color:C.red,textAlign:"center",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"center",gap:4,animation:"fadeIn .2s ease both"}}><Ico n="warning"c={C.red}s={14}/>{err}</div>}
        <button onClick={go}style={{width:"100%",background:C.blue,border:"none",borderRadius:14,padding:"14px",...T.h,color:"#FFF",cursor:"pointer",boxShadow:`0 4px 16px ${C.blue}44`}}>{paso==="in"?"Entrar":paso==="new"?"Siguiente":"Confirmar PIN"}</button>
        {paso==="in"&&<button onClick={()=>{if(confirm("¿Resetear PIN de "+user+"?"))localStorage.removeItem("cp_"+user),setPaso("new"),setPin("");}}style={{width:"100%",background:"transparent",border:"none",color:C.label2,cursor:"pointer",marginTop:10,...T.s,padding:"8px"}}>Olvidé mi PIN</button>}
      </div>
    </div>
  );
}

// ─── COUNTERS ─────────────────────────────────────────────────────────────────
function Counters({cid,cont,setCont,user}){
  const C=getC();const m=META[cid];const d=D[cid];const mqs=d?.m||[];
  const[fecha,setFecha]=useState(today());const[inp,setInp]=useState({});
  const[sy,setSy]=useState(0);const[st,setSt]=useState(null);const[wrns,setWrns]=useState([]);
  const[editMode,setEditMode]=useState(false);const[premioAmor,setPremioAmor]=useState("");
  const[nota,setNota]=useState("");const[viewHist,setViewHist]=useState(null);
  const color=C[m.c];
  const gi=(id,f)=>inp[id]?.[f]||"";
  const si=(id,f,v)=>setInp(p=>({...p,[id]:{...(p[id]||{}),[f]:v}}));
  const getUlt=id=>{const loc=(cont[cid]||[]).filter(c=>c.i===id).sort((a,b)=>b.f.localeCompare(a.f))[0];if(loc)return{drop:loc.d,phys:loc.p,fecha:loc.f};const lr=d?.ul?.[id];return lr?{drop:lr.d,phys:lr.p,fecha:"Excel"}:null;};
  const prevU=mq=>{const dr=parseFloat(gi(mq.id,"d")),ph=parseFloat(gi(mq.id,"p"));if(isNaN(dr)||isNaN(ph))return null;const u=getUlt(mq.id);if(!u)return null;return((dr-u.drop)-(ph-u.phys))*mq.factor;};
  const nOk=mqs.filter(mq=>!isNaN(parseFloat(gi(mq.id,"d")))&&!isNaN(parseFloat(gi(mq.id,"p")))).length;
  const pa=parseFloat(premioAmor)||0;
  function deleteReading(fd,maqId){if(!confirm("¿Eliminar esta lectura?"))return;setCont(p=>{const n={...p,[cid]:(p[cid]||[]).filter(c=>!(c.f===fd&&c.i===maqId))};saveCont(n);return n;});}
  async function submit(force=false){
    const w=[],items=[];
    for(const mq of mqs){
      const dr=parseFloat(gi(mq.id,"d")),ph=parseFloat(gi(mq.id,"p"));if(isNaN(dr)||isNaN(ph))continue;
      const u=getUlt(mq.id);
      if(!force&&u){if(dr<u.drop)w.push(`${mq.nombre}: DROP bajó`);if(ph<u.phys)w.push(`${mq.nombre}: OUT bajó`);}
      const util=u?((dr-u.drop)-(ph-u.phys))*mq.factor:null;const pp=u?(ph-u.phys)*mq.factor:null;
      items.push({i:mq.id,n:mq.nombre,fc:mq.factor,f:fecha,d:dr,p:ph,u:util,pp,src:"manual",pa:pa||null,nota:nota||null});
      sbSave({casino_id:cid,maq_id:mq.id,maq_nombre:mq.nombre,factor:mq.factor,fecha,drop_acum:dr,phys_acum:ph,util,phys_periodo:pp,source:"manual",premio_amor:pa||null});
    }
    if(!force&&w.length){setWrns(w);setSt("warn");return;}
    setCont(p=>{const n={...p,[cid]:[...(p[cid]||[]).filter(c=>c.f!==fecha),...items]};saveCont(n);return n;});
    setSt("ok");setInp({});setPremioAmor("");setNota("");setTimeout(()=>setSt(null),2500);
  }
  if(viewHist){
    const mq=mqs.find(q=>q.id===viewHist);
    const hist=(cont[cid]||[]).filter(c=>c.i===viewHist).sort((a,b)=>b.f.localeCompare(a.f));
    return<div style={{height:"100%",overflowY:"auto",background:C.bg}}>
      <Nav title={mq?.nombre||""}large={false}back="Contadores"onBack={()=>setViewHist(null)}/>
      <div style={{padding:"0 14px 100px"}}>
        <Sec hdr="Historial">
          {hist.length===0&&<div style={{padding:"16px",...T.s,color:C.label2,textAlign:"center"}}>Sin lecturas locales</div>}
          {hist.map((c,i)=><div key={i}style={{padding:"12px 14px",borderBottom:i<hist.length-1?`0.5px solid ${C.sep}`:"none",animation:`fadeSlideUp .25s ease ${i*.04}s both`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <span style={{...T.c,color:C.label,fontWeight:500}}>{fmtF(c.f)}</span>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                {c.u!=null&&<span style={{...T.c,color:c.u>=0?C.green:C.red,fontWeight:700}}>{fmtE(c.u)}</span>}
                <button onClick={()=>deleteReading(c.f,c.i)}style={{background:"transparent",border:"none",cursor:"pointer",padding:4}}><Ico n="trash"c={C.red}s={16}/></button>
              </div>
            </div>
            <div style={{display:"flex",gap:12,...T.fn,color:C.label2}}>
              <span>IN: {c.d?.toLocaleString()}</span><span>OUT: {c.p?.toLocaleString()}</span>
              {c.pp!=null&&<span style={{color:C.orange}}>Premios: {fmtE(c.pp)}</span>}
            </div>
            {c.nota&&<div style={{...T.fn,color:C.label3,marginTop:3,fontStyle:"italic"}}>"{c.nota}"</div>}
          </div>)}
        </Sec>
      </div>
    </div>;
  }
  return<div onScroll={e=>setSy(e.target.scrollTop)}style={{height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
    <style>{ANIM_CSS}</style>
    <Nav title="Contadores"sub={m.n}sy={sy}right={[{icon:editMode?"check":"edit",fn:()=>setEditMode(!editMode)}]}/>
    <div style={{padding:"10px 14px",paddingBottom:120}}>
      {st==="warn"&&<div style={{background:`${C.orange}14`,border:`1px solid ${C.orange}44`,borderRadius:14,padding:14,marginBottom:12,animation:"fadeSlideUp .2s ease both"}}>
        <div style={{...T.h,color:C.orange,marginBottom:8,display:"flex",alignItems:"center",gap:6}}><Ico n="warning"c={C.orange}s={16}/>Inconsistencias</div>
        {wrns.map((w,i)=><div key={i}style={{...T.s,color:C.label2,marginBottom:4}}>• {w}</div>)}
        <div style={{display:"flex",gap:10,marginTop:10}}>
          <button onClick={()=>submit(true)}style={{flex:1,background:C.orange,border:"none",borderRadius:10,padding:"10px",...T.h,color:"#000",cursor:"pointer"}}>Guardar igual</button>
          <button onClick={()=>setSt(null)}style={{flex:1,background:C.fill3,border:"none",borderRadius:10,padding:"10px",...T.h,color:C.label,cursor:"pointer"}}>Corregir</button>
        </div>
      </div>}
      <div style={{background:C.bg2,borderRadius:12,padding:"8px 12px",marginBottom:12,display:"flex",alignItems:"center",gap:10,border:`1px solid ${C.sep}`}}>
        <Ico n="report"c={C.label3}s={16}/><span style={{...T.s,color:C.label2}}>Fecha:</span>
        <input type="date"value={fecha}onChange={e=>setFecha(e.target.value)}style={{background:"transparent",border:"none",color:C.blue,...T.c,cursor:"pointer",flex:1}}/>
      </div>
      {mqs.map((mq,idx)=>{
        const u=prevU(mq);const prev=getUlt(mq.id);const col=maqC(mq.factor,C);
        const histCount=(cont[cid]||[]).filter(c=>c.i===mq.id).length;
        return<div key={mq.id}style={{background:C.bg2,borderRadius:14,marginBottom:8,overflow:"hidden",border:`1px solid ${C.sep}`,animation:`fadeSlideUp .3s ease ${idx*.03}s both`}}>
          <div style={{display:"flex",alignItems:"center",padding:"10px 12px",borderBottom:`0.5px solid ${C.sep}`,cursor:"pointer"}}onClick={()=>editMode&&setViewHist(mq.id)}>
            <MaqIcon factor={mq.factor}nombre={mq.nombre}size={32}/>
            <div style={{flex:1,marginLeft:10}}>
              <div style={{...T.h,color:C.label}}>{mq.nombre}</div>
              <div style={{...T.cap,color:C.label2}}>×{mq.factor}{prev?` · ${fmtF(prev.fecha)}`:""}{histCount>0?` · ${histCount}✓`:""}</div>
            </div>
            {u!=null&&<div style={{...T.c,color:u>=0?C.green:C.red,fontWeight:700,animation:"countUp .3s ease both"}}>{fmt(u)}</div>}
            {editMode&&<div style={{marginLeft:8}}><Ico n="chevron"c={C.label3}s={16}/></div>}
          </div>
          <div style={{padding:"10px 12px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            {[["d","TOTAL IN",prev?.drop],["p","TOTAL OUT",prev?.phys],["y","IN-OUT",null]].map(([f,lbl,ph])=>
              <div key={f}>
                <div style={{...T.cap,color:C.label2,marginBottom:3}}>{lbl}</div>
                <input type="number"inputMode="numeric"value={gi(mq.id,f)}onChange={e=>si(mq.id,f,e.target.value)}
                  placeholder={ph!=null?String(ph):f==="y"?"auto":""}
                  style={{width:"100%",background:C.fill3,border:"none",borderRadius:8,padding:"7px 8px",color:f==="y"?C.label2:C.label,...T.s,boxSizing:"border-box",outline:"none",WebkitAppearance:"none"}}/>
              </div>
            )}
          </div>
        </div>;
      })}
      <div style={{background:C.bg2,borderRadius:14,marginBottom:8,padding:"12px 14px",border:`1px solid ${C.sep}`}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <Ico n="trophy"c={C.yellow}s={18}/><span style={{...T.h,color:C.label}}>Premio del Amor</span>
          <span style={{...T.fn,color:C.label2,marginLeft:"auto"}}>Opcional</span>
        </div>
        <input type="number"inputMode="numeric"value={premioAmor}onChange={e=>setPremioAmor(e.target.value)}placeholder="Monto del premio"
          style={{width:"100%",background:C.fill3,border:"none",borderRadius:8,padding:"9px 11px",color:C.yellow,...T.c,boxSizing:"border-box",outline:"none",WebkitAppearance:"none",marginBottom:8}}/>
        <div style={{...T.cap,color:C.label2,marginBottom:4}}>Nota del período</div>
        <input value={nota}onChange={e=>setNota(e.target.value)}placeholder="Ej: se llenó hopper, festival..."
          style={{width:"100%",background:C.fill3,border:"none",borderRadius:8,padding:"9px 11px",color:C.label,...T.s,boxSizing:"border-box",outline:"none"}}/>
      </div>
      <button onClick={()=>submit(false)}disabled={nOk===0||st==="ok"}
        style={{width:"100%",background:st==="ok"?C.green:nOk===0?C.fill3:color,border:"none",borderRadius:14,padding:"15px",color:nOk===0?C.label2:"#000",...T.h,cursor:nOk===0?"default":"pointer",marginTop:4,display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:nOk>0&&st!=="ok"?`0 4px 16px ${color}44`:"none",transition:"all .2s"}}>
        {st==="ok"?<><Ico n="check"c="#000"s={18}/>Guardado</>:`Guardar ${nOk} máquina${nOk!==1?"s":""}`}
      </button>
    </div>
  </div>;
}


// ─── CAMERA ───────────────────────────────────────────────────────────────────
function Camera({cid,cont,setCont,apiKey}){
  const C=getC();const m=META[cid];const d=D[cid];const mqs=d?.m||[];
  const[fecha,setFecha]=useState(today());const[queue,setQueue]=useState([]);
  const[driveStatus,setDriveStatus]=useState("");const[saved,setSaved]=useState(false);
  const fRef=useRef(null);
  const getUlt=useCallback(id=>{const loc=(cont[cid]||[]).filter(c=>c.i===id).sort((a,b)=>b.f.localeCompare(a.f))[0];if(loc)return{d:loc.d,p:loc.p};return d?.ul?.[id]||null;},[cont,cid,d]);
  async function analyzePhoto(blob,idx){
    setQueue(q=>q.map((x,i)=>i===idx?{...x,status:"analyzing"}:x));
    try{
      const mq_list=mqs.map(q=>`${q.id}:${q.nombre}(x${q.factor})`).join(", ");
      const prompt=`Eres experto en contadores de maquinas tragamonedas.\nMaquinas: ${mq_list}\nLee numero de maquina, DROP=TOTAL IN, PHYS=TOTAL OUT.\nResponde SOLO JSON: {"num_maquina":N,"maq_id":"ID","drop":N,"phys":N,"yield":N,"confianza":"alta|media|baja","nota":"breve"}`;
      const b64=await new Promise((ok,rej)=>{const r=new FileReader();r.onload=()=>ok(r.result.split(",")[1]);r.onerror=rej;r.readAsDataURL(blob);});
      const rsp=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:300,messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:"image/jpeg",data:b64}},{type:"text",text:prompt}]}]})});
      const data=await rsp.json();if(data.error)throw new Error(data.error.message);
      const parsed=JSON.parse((data.content?.[0]?.text||"").replace(/```json|```/g,"").trim());
      const mq=mqs.find(q=>q.id===parsed.maq_id)||mqs.find(q=>q.nombre.toLowerCase().includes(String(parsed.num_maquina)));
      setQueue(q=>q.map((x,i)=>i===idx?{...x,status:"done",result:parsed,maqId:mq?.id||"",eDrop:String(parsed.drop||""),ePhys:String(parsed.phys||""),eYield:parsed.yield?String(parsed.yield):"",err:null}:x));
    }catch(e){setQueue(q=>q.map((x,i)=>i===idx?{...x,status:"error",err:e.message}:x));}
  }
  async function addPhotos(files){
    const newItems=[];
    for(const file of Array.from(files)){const blob=await compressImage(file);newItems.push({file,blob,imgUrl:URL.createObjectURL(blob),status:"pending",result:null,maqId:"",eDrop:"",ePhys:"",eYield:"",err:null});}
    const startIdx=queue.length;setQueue(q=>[...q,...newItems]);
    for(let i=0;i<newItems.length;i++)await analyzePhoto(newItems[i].blob,startIdx+i);
  }
  function upd(idx,field,val){setQueue(q=>q.map((x,i)=>i===idx?{...x,[field]:val}:x));}
  function remove(idx){setQueue(q=>q.filter((_,i)=>i!==idx));}
  async function confirmAll(){
    const valid=queue.filter(x=>x.status==="done"&&x.maqId&&x.eDrop&&x.ePhys);if(!valid.length)return;
    const items=[];
    for(const x of valid){
      const mq=mqs.find(q=>q.id===x.maqId);if(!mq)continue;
      const prev=getUlt(x.maqId);const drop=parseInt(x.eDrop),phys=parseInt(x.ePhys),yld=x.eYield?parseInt(x.eYield):null;
      const util=prev?((drop-prev.d)-(phys-prev.p))*mq.factor:null;const pp=prev?(phys-prev.p)*mq.factor:null;
      items.push({i:mq.id,n:mq.nombre,fc:mq.factor,f:fecha,d:drop,p:phys,y:yld,u:util,pp,src:"ocr"});
    }
    setCont(p=>{const n={...p,[cid]:[...(p[cid]||[]).filter(c=>!items.find(x=>x.i===c.i&&x.f===c.f)),...items]};saveCont(n);return n;});
    if(GDClientId()&&GDFolderId()){setDriveStatus("Subiendo fotos...");for(const x of valid){const mq=mqs.find(q=>q.id===x.maqId);try{await uploadPhoto(x.blob,m.n,fecha,mq?.nombre||x.maqId);}catch(e){console.warn(e);}}setDriveStatus("✓ Fotos en Drive");setTimeout(()=>setDriveStatus(""),3000);}
    setSaved(true);setTimeout(()=>{setQueue([]);setSaved(false);},2500);
  }
  const doneOk=queue.filter(x=>x.status==="done"&&x.maqId).length;
  const cCol=c=>c==="alta"?C.green:c==="media"?C.orange:C.red;
  return<div style={{height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
    <style>{ANIM_CSS}</style>
    <Nav title="Cámara OCR"sub={m.n}large={false}/>
    <div style={{padding:"10px 14px",paddingBottom:120}}>
      <div style={{background:C.bg2,borderRadius:12,padding:"8px 12px",marginBottom:12,display:"flex",alignItems:"center",gap:8,border:`1px solid ${C.sep}`}}>
        <span style={{...T.s,color:C.label2}}>Fecha:</span>
        <input type="date"value={fecha}onChange={e=>setFecha(e.target.value)}style={{background:"transparent",border:"none",color:C.blue,...T.c,cursor:"pointer"}}/>
        <span style={{...T.fn,color:C.label3,marginLeft:"auto"}}>{queue.length} foto{queue.length!==1?"s":""}</span>
      </div>
      <input ref={fRef}type="file"accept="image/*"multiple onChange={e=>{if(e.target.files?.length)addPhotos(e.target.files);e.target.value="";}}style={{display:"none"}}/>
      <div onClick={()=>fRef.current?.click()}style={{background:C.bg2,borderRadius:16,padding:"28px 20px",textAlign:"center",cursor:"pointer",border:`2px dashed ${C.sep}`,marginBottom:12,transition:"border-color .2s"}}>
        <div style={{fontSize:38,marginBottom:6}}>📷</div>
        <div style={{...T.h,color:C.label,marginBottom:3}}>Agregar fotos</div>
        <div style={{...T.fn,color:C.label2}}>Claude detecta la máquina automáticamente</div>
      </div>
      {queue.map((x,idx)=>{
        const mq=mqs.find(q=>q.id===x.maqId);const prev=x.maqId?getUlt(x.maqId):null;
        const drop=parseInt(x.eDrop),phys=parseInt(x.ePhys);
        const util=mq&&prev&&!isNaN(drop)&&!isNaN(phys)?((drop-prev.d)-(phys-prev.p))*mq.factor:null;
        const pp=mq&&prev&&!isNaN(phys)?(phys-prev.p)*mq.factor:null;
        return<div key={idx}style={{background:C.bg2,borderRadius:14,marginBottom:10,overflow:"hidden",border:`1px solid ${C.sep}`,animation:"fadeSlideUp .3s ease both"}}>
          <div style={{position:"relative"}}>
            <img src={x.imgUrl}alt=""style={{width:"100%",maxHeight:180,objectFit:"cover"}}/>
            <div style={{position:"absolute",top:8,left:8,background:"rgba(0,0,0,.8)",borderRadius:20,padding:"4px 10px",...T.fn,color:"#FFF"}}>
              {x.status==="pending"?"⏳":x.status==="analyzing"?"🤖 Analizando...":x.status==="error"?"❌ Error":"✓ Listo"}
            </div>
            {x.result?.confianza&&<div style={{position:"absolute",top:8,right:8,background:`${cCol(x.result.confianza)}22`,border:`1px solid ${cCol(x.result.confianza)}`,borderRadius:20,padding:"4px 10px",...T.cap,color:cCol(x.result.confianza)}}>{x.result.confianza}</div>}
            <button onClick={()=>remove(idx)}style={{position:"absolute",bottom:8,right:8,background:"rgba(0,0,0,.7)",border:"none",borderRadius:16,padding:"4px 10px",...T.cap,color:C.red,cursor:"pointer"}}>✕</button>
          </div>
          {x.status==="error"&&<div style={{padding:"10px 14px",...T.s,color:C.red}}>❌ {x.err}<br/><button onClick={()=>analyzePhoto(x.blob,idx)}style={{background:"transparent",border:`1px solid ${C.blue}`,borderRadius:8,padding:"4px 10px",color:C.blue,cursor:"pointer",marginTop:6,...T.fn}}>Reintentar</button></div>}
          {(x.status==="done"||x.status==="analyzing")&&<div style={{padding:"10px 14px"}}>
            <select value={x.maqId}onChange={e=>upd(idx,"maqId",e.target.value)}style={{width:"100%",background:C.fill3,border:`1px solid ${x.maqId?C.sep:C.orange}`,borderRadius:8,padding:"8px 10px",color:x.maqId?C.label:C.orange,...T.c,marginBottom:8}}>
              <option value="">— Seleccionar máquina —</option>
              {mqs.map(q=><option key={q.id}value={q.id}style={{background:C.bg2}}>{q.nombre} ×{q.factor}</option>)}
            </select>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:8}}>
              {[["eDrop","TOTAL IN",prev?.d],["ePhys","TOTAL OUT",prev?.p],["eYield","IN-OUT",null]].map(([f,lbl,pv])=>{
                const nv=parseInt(x[f]);const bad=pv!=null&&!isNaN(nv)&&nv<pv;
                return<div key={f}><div style={{...T.cap,color:C.label2,marginBottom:3}}>{lbl}</div>
                  <input type="number"inputMode="numeric"value={x[f]}onChange={e=>upd(idx,f,e.target.value)}
                    style={{width:"100%",background:bad?`${C.red}18`:C.fill3,border:`1px solid ${bad?C.red:"transparent"}`,borderRadius:7,padding:"7px 8px",color:bad?C.red:C.label,...T.s,boxSizing:"border-box",outline:"none",WebkitAppearance:"none"}}/>
                </div>;
              })}
            </div>
            {util!=null&&<div style={{background:C.fill4,borderRadius:8,padding:"8px 10px",display:"flex",justifyContent:"space-between"}}>
              <span style={{...T.fn,color:C.orange}}>Premios {fmtE(pp||0)}</span>
              <span style={{...T.fn,color:util>=0?C.green:C.red,fontWeight:600}}>Util {fmtE(util)}</span>
            </div>}
          </div>}
        </div>;
      })}
      {driveStatus&&<div style={{background:C.bg2,borderRadius:10,padding:"10px 14px",marginBottom:10,...T.s,color:C.label2,textAlign:"center"}}>{driveStatus}</div>}
      {queue.length>0&&<button onClick={confirmAll}disabled={doneOk===0||saved}
        style={{width:"100%",background:saved?C.green:doneOk===0?C.fill3:C[m.c],border:"none",borderRadius:14,padding:"15px",color:"#000",...T.h,cursor:doneOk===0?"default":"pointer"}}>
        {saved?"✓ Guardado":`Confirmar ${doneOk} máquina${doneOk!==1?"s":""}`}
      </button>}
      {!apiKey&&<div style={{background:`${C.orange}12`,border:`1px solid ${C.orange}44`,borderRadius:12,padding:12,marginTop:10}}>
        <div style={{...T.h,color:C.orange,marginBottom:4}}>Sin API Key</div>
        <div style={{...T.s,color:C.label2}}>Ve a Ajustes para configurarla.</div>
      </div>}
    </div>
  </div>;
}



// ─── HISTORIAL TABLE ─────────────────────────────────────────────────────────
function HistorialTable({cid, filtro, mes, desde, hasta, color}){
  const C=getC();
  const[maqFiltro,setMaqFiltro]=useState("all");
  const[pagina,setPagina]=useState(0);
  const[rows,setRows]=useState([]);
  const[loading,setLoading]=useState(true);
  const[error,setError]=useState(null);
  const PAGE=50;
  const mqs=D[cid]?.m||[];

  useEffect(()=>{
    setLoading(true);setError(null);setPagina(0);
    fetchSheetHist(cid)
      .then(data=>{setRows(data);setLoading(false);})
      .catch(e=>{setError(e.message);setLoading(false);});
  },[cid]);

  const filtered=useMemo(()=>{
    return rows.filter(r=>{
      const fecha=r[1];
      if(filtro==="semana"){const d7=new Date();d7.setDate(d7.getDate()-6);return fecha>=d7.toISOString().slice(0,10)&&fecha<=new Date().toISOString().slice(0,10);}
      if(filtro==="mes")return fecha.slice(0,7)===mes;
      if(filtro==="custom"&&desde&&hasta)return fecha>=desde&&fecha<=hasta;
      return true;
    }).filter(r=>maqFiltro==="all"||r[0]===maqFiltro)
    .sort((a,b)=>b[1].localeCompare(a[1])||a[0].localeCompare(b[0]));
  },[rows,filtro,mes,desde,hasta,maqFiltro]);

  const paginated=filtered.slice(pagina*PAGE,(pagina+1)*PAGE);
  const totalPages=Math.ceil(filtered.length/PAGE);

  if(loading)return<div style={{background:C.bg2,borderRadius:14,padding:24,textAlign:"center",border:`1px solid ${C.sep}`}}>
    <div style={{...T.h,color:C.label2,marginBottom:8}}>Cargando datos de Sheets...</div>
    <div style={{...T.fn,color:C.label3}}>Esto puede tomar unos segundos</div>
    <div style={{marginTop:12,display:"flex",gap:4,justifyContent:"center"}}>
      {[0,1,2].map(i=><div key={i}style={{width:8,height:8,borderRadius:4,background:color,animation:`pulse 1.2s ease ${i*.2}s infinite`}}/>)}
    </div>
  </div>;

  if(error)return<div style={{background:`${C.red}12`,border:`1px solid ${C.red}44`,borderRadius:14,padding:16}}>
    <div style={{...T.h,color:C.red,marginBottom:4}}>Error al cargar Sheets</div>
    <div style={{...T.fn,color:C.label2,marginBottom:10}}>{error}</div>
    <div style={{...T.fn,color:C.label3}}>Verifica que el Sheet sea público (compartido como "Cualquier persona con el enlace").</div>
  </div>;

  if(rows.length===0)return<div style={{background:C.bg2,borderRadius:14,padding:24,textAlign:"center",border:`1px solid ${C.sep}`}}>
    <div style={{...T.h,color:C.label2,marginBottom:4}}>Sin datos en Sheets</div>
    <div style={{...T.fn,color:C.label3}}>Verifica que los nombres de las hojas coincidan con los nombres de las máquinas.</div>
  </div>;

  return<div>
    <div style={{display:"flex",gap:6,marginBottom:10,overflowX:"auto",paddingBottom:4}}>
      <button onClick={()=>{setMaqFiltro("all");setPagina(0);}}style={{flexShrink:0,background:maqFiltro==="all"?color:"transparent",border:`1px solid ${maqFiltro==="all"?color:C.sep}`,borderRadius:20,padding:"4px 12px",color:maqFiltro==="all"?"#000":C.label2,cursor:"pointer",...T.cap,fontWeight:700}}>Todas</button>
      {mqs.map(mq=><button key={mq.id}onClick={()=>{setMaqFiltro(mq.id);setPagina(0);}}style={{flexShrink:0,background:maqFiltro===mq.id?maqC(mq.factor,C):"transparent",border:`1px solid ${maqFiltro===mq.id?maqC(mq.factor,C):C.sep}`,borderRadius:20,padding:"4px 10px",color:maqFiltro===mq.id?"#FFF":C.label2,cursor:"pointer",...T.cap,whiteSpace:"nowrap"}}>{mq.nombre}</button>)}
    </div>
    <div style={{...T.cap,color:C.label2,marginBottom:6,paddingLeft:2,display:"flex",gap:8,alignItems:"center"}}>
      <span>{filtered.length.toLocaleString()} registros{totalPages>1?` · Pág ${pagina+1}/${totalPages}`:""}</span>
      <span style={{background:`${C.green}22`,border:`1px solid ${C.green}44`,borderRadius:20,padding:"1px 8px",color:C.green}}>● Live Sheets</span>
    </div>
    <div style={{overflowX:"auto",borderRadius:14,border:`1px solid ${C.sep}`,background:C.bg2}}>
      <table style={{width:"100%",borderCollapse:"collapse",...T.fn,color:C.label,minWidth:480}}>
        <thead><tr style={{background:C.bg3}}>
          {["Fecha","Máquina","IN Acum","OUT Acum","Premios","Utilidad"].map(h=>
            <th key={h}style={{padding:"9px 10px",textAlign:"right",color:C.label2,fontWeight:600,borderBottom:`1px solid ${C.sep}`,whiteSpace:"nowrap",...(h==="Fecha"||h==="Máquina"?{textAlign:"left"}:{})}}>{h}</th>)}
        </tr></thead>
        <tbody>
          {paginated.map((r,i)=>{
            const[maqId,fecha,inAcum,outAcum,premios,utilidad]=r;
            const mq=mqs.find(m=>m.id===maqId);
            const col=mq?maqC(mq.factor,C):C.label2;
            return<tr key={i}style={{borderBottom:`0.5px solid ${C.sep}`,background:i%2===0?"transparent":C.fill4}}>
              <td style={{padding:"7px 10px",whiteSpace:"nowrap",color:C.label2}}>{fmtF(fecha)}</td>
              <td style={{padding:"7px 10px",whiteSpace:"nowrap"}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:6,height:6,borderRadius:3,background:col,flexShrink:0}}/>
                  {mq?.nombre||maqId}
                </div>
              </td>
              <td style={{padding:"7px 10px",textAlign:"right",color:C.label2}}>{inAcum?.toLocaleString()||"—"}</td>
              <td style={{padding:"7px 10px",textAlign:"right",color:C.label2}}>{outAcum?.toLocaleString()||"—"}</td>
              <td style={{padding:"7px 10px",textAlign:"right",color:C.orange}}>{premios!=null?fmtE(premios):"—"}</td>
              <td style={{padding:"7px 10px",textAlign:"right",color:utilidad!=null?(utilidad>=0?C.green:C.red):C.label3,fontWeight:utilidad!=null?600:400}}>{utilidad!=null?fmtE(utilidad):"—"}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
    {totalPages>1&&<div style={{display:"flex",justifyContent:"center",gap:8,marginTop:10}}>
      <button onClick={()=>setPagina(p=>Math.max(0,p-1))}disabled={pagina===0}style={{background:pagina===0?C.fill3:color,border:"none",borderRadius:20,padding:"6px 16px",color:pagina===0?C.label2:"#000",cursor:pagina===0?"default":"pointer",...T.fn,fontWeight:600}}>Anterior</button>
      <span style={{...T.fn,color:C.label2,alignSelf:"center"}}>{pagina+1}/{totalPages}</span>
      <button onClick={()=>setPagina(p=>Math.min(totalPages-1,p+1))}disabled={pagina===totalPages-1}style={{background:pagina===totalPages-1?C.fill3:color,border:"none",borderRadius:20,padding:"6px 16px",color:pagina===totalPages-1?C.label2:"#000",cursor:pagina===totalPages-1?"default":"pointer",...T.fn,fontWeight:600}}>Siguiente</button>
    </div>}
  </div>;
}


// ─── REPORT ───────────────────────────────────────────────────────────────────
function Report({cid,cont}){
  const C=getC();const m=META[cid];const d=D[cid];const color=C[m.c];
  const[sy,setSy]=useState(0);const[vista,setVista]=useState("balance");
  const[filtro,setFiltro]=useState("todo");const[mes,setMes]=useState(today().slice(0,7));
  const[desde,setDesde]=useState("");const[hasta,setHasta]=useState("");
  const[chartTab,setChartTab]=useState("barras");

  function getBals(){
    const b={};
    (d?.b||[]).forEach(bl=>{b[bl.fecha]={fecha:bl.fecha,util:bl.util_total,phys:bl.phys_total,pa:0,nota:null};});
    (cont[cid]||[]).forEach(c=>{if(c.u==null)return;if(!b[c.f])b[c.f]={fecha:c.f,util:0,phys:0,pa:0,nota:c.nota||null};
      b[c.f].util+=(c.u||0);b[c.f].phys+=(c.pp||0);if(c.pa)b[c.f].pa=(b[c.f].pa||0)+c.pa;if(c.nota)b[c.f].nota=c.nota;});
    return Object.values(b).sort((a,b)=>b.fecha.localeCompare(a.fecha));
  }
  const allBals=getBals();
  function applyFilter(bals){
    if(filtro==="semana"){const d7=new Date(today());d7.setDate(d7.getDate()-6);return bals.filter(b=>b.fecha>=d7.toISOString().slice(0,10)&&b.fecha<=today());}
    if(filtro==="mes")return bals.filter(b=>b.fecha.slice(0,7)===mes);
    if(filtro==="custom"&&desde&&hasta)return bals.filter(b=>b.fecha>=desde&&b.fecha<=hasta);
    return bals;
  }
  const bals=applyFilter(allBals);
  const totUtil=bals.reduce((s,b)=>s+(b.util||0),0);
  const totPhys=bals.reduce((s,b)=>s+(b.phys||0),0);
  const totPA=bals.reduce((s,b)=>s+(b.pa||0),0);
  const totCaja=totUtil+totPhys-totPA;
  const avg=bals.length?Math.round(totUtil/bals.length):0;
  const mqs=d?.m||[];

  const maqData=useMemo(()=>{
    const byMaq={};mqs.forEach(mq=>{byMaq[mq.id]={...mq,total:0,periods:0,history:[]};});
    (cont[cid]||[]).filter(c=>bals.find(b=>b.fecha===c.f)).forEach(c=>{if(byMaq[c.i]){byMaq[c.i].total+=(c.u||0);byMaq[c.i].periods++;byMaq[c.i].history.push(c.u||0);}});
    return Object.values(byMaq);
  },[bals,cont,cid,mqs]);

  const chartPts=useMemo(()=>[...bals].reverse().slice(-30).map(b=>({f:b.fecha.slice(5),util:b.util,phys:b.phys,caja:(b.util||0)+(b.phys||0)-(b.pa||0)})),[bals]);
  const top5=useMemo(()=>[...maqData].sort((a,b)=>b.total-a.total).slice(0,5),[maqData]);

  // ── Gráfico de barras mejorado ─────────────────────────────────────────
  function ChartBarras(){
    const pts=chartPts;if(!pts.length)return<div style={{...T.s,color:C.label2,textAlign:"center",padding:20}}>Sin datos</div>;
    const maxV=Math.max(...pts.map(p=>Math.max(Math.abs(p.util),p.caja||0)),1);
    const W=360,H=140,pad=10;const bw=Math.max(3,Math.floor((W-pad*2)/pts.length)-3);
    const[hovered,setHovered]=useState(null);
    return<div>
      <svg width="100%"viewBox={`0 0 ${W} ${H+36}`}style={{overflow:"visible"}}>
        {pts.map((p,i)=>{
          const x=pad+i*((W-pad*2)/pts.length);
          const hUtil=Math.max(2,Math.abs(p.util)/maxV*(H-10));
          const hCaja=Math.max(2,(p.caja||0)/maxV*(H-10));
          const isPos=p.util>=0;
          const barYUtil=isPos?H-hUtil:H;
          return<g key={i}onMouseEnter={()=>setHovered(i)}onMouseLeave={()=>setHovered(null)}>
            {/* Caja bar (lighter, behind) */}
            <rect x={x+bw/4}y={H-hCaja}width={bw/2}height={hCaja}fill={color}opacity=".25"rx="1"/>
            {/* Util bar */}
            <rect x={x}y={barYUtil}width={bw}height={hUtil}fill={isPos?C.green:C.red}opacity={hovered===i?.95:.75}rx="2"
              style={{transformOrigin:`${x+bw/2}px ${H}px`,animation:`barGrow .5s ease ${i*.02}s both`}}/>
            {i%(Math.ceil(pts.length/8))===0&&<text x={x+bw/2}y={H+12}fontSize="7.5"fill={C.label2}textAnchor="middle">{p.f}</text>}
            {hovered===i&&<>
              <rect x={Math.min(x-2,W-80)}y={barYUtil-26}width={78}height={22}fill={C.bg3}rx="4"/>
              <text x={Math.min(x+bw/2,W-40)}y={barYUtil-11}fontSize="8"fill={isPos?C.green:C.red}textAnchor="middle"fontWeight="600">{fmt(p.util)}</text>
            </>}
          </g>;
        })}
        <line x1={pad}y1={H}x2={W-pad}y2={H}stroke={C.sep}strokeWidth="1"/>
        <text x={pad}y={H-maxV/maxV*(H-10)+8}fontSize="8"fill={C.label3}>{fmt(maxV)}</text>
      </svg>
      <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:4}}>
        {[[C.green,"Utilidad"],[C.red,"Pérdida"],[color+"66","Caja física"]].map(([col,lbl])=>
          <div key={lbl}style={{display:"flex",alignItems:"center",gap:4,...T.cap,color:C.label2}}>
            <div style={{width:10,height:10,borderRadius:3,background:col}}/>
            {lbl}
          </div>
        )}
      </div>
    </div>;
  }

  // ── Gráfico de línea (tendencia) ──────────────────────────────────────
  function ChartLinea(){
    const pts=chartPts;if(pts.length<2)return<div style={{...T.s,color:C.label2,textAlign:"center",padding:20}}>Sin datos</div>;
    const vals=pts.map(p=>p.util);
    const min=Math.min(...vals),max=Math.max(...vals);const range=max-min||1;
    const W=360,H=120,pad=20;
    const toX=i=>pad+i*(W-pad*2)/(pts.length-1);
    const toY=v=>H-((v-min)/range)*(H-10)-5;
    // Build path
    const linePts=pts.map((p,i)=>`${toX(i)},${toY(p.util)}`).join(" ");
    // Area fill
    const areaPath=`M${toX(0)},${H} `+pts.map((p,i)=>`L${toX(i)},${toY(p.util)}`).join(" ")+` L${toX(pts.length-1)},${H} Z`;
    const trend=vals.length>1?(vals[vals.length-1]-vals[0])>=0:true;
    const trendColor=trend?C.green:C.red;
    const[hov,setHov]=useState(null);
    return<div>
      <svg width="100%"viewBox={`0 0 ${W} ${H+28}`}style={{overflow:"visible"}}>
        <defs>
          <linearGradient id="areaGrad"x1="0"y1="0"x2="0"y2="1">
            <stop offset="0%"stopColor={trendColor}stopOpacity=".3"/>
            <stop offset="100%"stopColor={trendColor}stopOpacity="0"/>
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0,.25,.5,.75,1].map(f=>{const y=H-f*(H-10)-5;return<line key={f}x1={pad}y1={y}x2={W-pad}y2={y}stroke={C.sep}strokeWidth=".5"strokeDasharray="4,4"/>;})  }
        {/* Area */}
        <path d={areaPath}fill="url(#areaGrad)"/>
        {/* Line */}
        <polyline points={linePts}fill="none"stroke={trendColor}strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"
          style={{strokeDasharray:2000,strokeDashoffset:2000,animation:"lineDrawIn 1s ease .1s forwards"}}/>
        {/* Points */}
        {pts.map((p,i)=><circle key={i}cx={toX(i)}cy={toY(p.util)}r={hov===i?5:3}fill={p.util>=0?C.green:C.red}stroke={C.bg2}strokeWidth="2"
          onMouseEnter={()=>setHov(i)}onMouseLeave={()=>setHov(null)}style={{cursor:"default",transition:"r .1s"}}/>)}
        {/* X labels */}
        {pts.filter((_,i)=>i%(Math.ceil(pts.length/6))===0).map((p,i)=><text key={i}x={toX(pts.findIndex(pt=>pt.f===p.f))}y={H+14}fontSize="8"fill={C.label2}textAnchor="middle">{p.f}</text>)}
        {/* Hover tooltip */}
        {hov!=null&&<>
          <rect x={Math.min(toX(hov)-36,W-80)}y={toY(pts[hov].util)-26}width={72}height={20}fill={C.bg3}rx="4"/>
          <text x={Math.min(toX(hov),W-40)}y={toY(pts[hov].util)-12}fontSize="8.5"fill={pts[hov].util>=0?C.green:C.red}textAnchor="middle"fontWeight="700">{fmt(pts[hov].util)}</text>
        </>}
      </svg>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
        <span style={{...T.cap,color:C.label2}}>Tendencia {trend?"↗ alcista":"↘ bajista"}</span>
        <span style={{...T.fn,color:trendColor,fontWeight:600}}>{fmtE(vals[vals.length-1]-vals[0])}</span>
      </div>
    </div>;
  }

  // ── Top 5 máquinas con sparklines ────────────────────────────────────
  function ChartTop5(){
    if(!top5.filter(m=>m.periods>0).length)return<div style={{...T.s,color:C.label2,textAlign:"center",padding:20}}>Sin datos locales</div>;
    const maxTot=Math.max(...top5.map(m=>Math.abs(m.total)),1);
    return<div style={{padding:"4px 0"}}>
      {top5.filter(m=>m.periods>0).map((mq,i)=>{
        const pct=Math.abs(mq.total)/maxTot*100;const col=maqC(mq.factor,C);
        return<div key={mq.id}style={{marginBottom:14,animation:`fadeSlideUp .3s ease ${i*.06}s both`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <MaqIcon factor={mq.factor}nombre={mq.nombre}size={26}/>
              <div>
                <div style={{...T.s,color:C.label,fontWeight:600}}>{mq.nombre}</div>
                <div style={{...T.cap,color:C.label2}}>{mq.periods} períodos · prom {fmtE(mq.periods?Math.round(mq.total/mq.periods):0)}</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              {mq.history.length>1&&<Sparkline data={mq.history}color={col}height={28}width={60}/>}
              <span style={{...T.c,color:mq.total>=0?C.green:C.red,fontWeight:700,minWidth:64,textAlign:"right"}}>{fmtE(mq.total)}</span>
            </div>
          </div>
          <div style={{background:C.fill3,borderRadius:6,height:6,overflow:"hidden"}}>
            <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${col}88,${col})`,borderRadius:6,animation:`slideRight .6s ease ${i*.06}s both`}}/>
          </div>
        </div>;
      })}
    </div>;
  }

  function exportExcel(){
    const XLSX=window.XLSX;if(!XLSX){const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";s.onload=exportExcel;document.head.appendChild(s);return;}
    const wb=XLSX.utils.book_new();
    const balRows=[["Fecha","Utilidad","Premios","Premio Amor","Caja Física","Nota"],...bals.map(b=>[b.fecha,b.util||0,b.phys||0,b.pa||0,(b.util||0)+(b.phys||0)-(b.pa||0),b.nota||""])];
    balRows.push(["TOTAL",totUtil,totPhys,totPA,totCaja,""]);
    XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(balRows),"Balance");
    XLSX.writeFile(wb,`${m.n}_${today()}.xlsx`);
  }
  async function exportPDF(){
    if(!window.jspdf){const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";await new Promise(r=>{s.onload=r;document.head.appendChild(s);});}
    const{jsPDF}=window.jspdf;const doc=new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
    const W=210,M=15;let y=20;
    doc.setFillColor(10,10,20);doc.rect(0,0,W,40,"F");doc.setTextColor(255,255,255);doc.setFontSize(20);doc.setFont("helvetica","bold");
    doc.text(m.n,M,18);doc.setFontSize(10);doc.setFont("helvetica","normal");doc.text(`Reporte: ${filtro} · ${today()}`,M,32);y=52;
    doc.setTextColor(0,0,0);
    const cards=[[`Utilidad`,fmtE(totUtil)],[`Premios`,fmtE(totPhys)],[`Caja`,fmtE(totCaja)],[`Promedio`,fmtE(avg)]];
    const cw=(W-M*2-9)/4;
    cards.forEach(([lbl,val],i)=>{const x=M+i*(cw+3);doc.setFillColor(245,245,250);doc.roundedRect(x,y,cw,18,2,2,"F");doc.setFontSize(7);doc.setTextColor(100,100,100);doc.text(lbl,x+3,y+6);doc.setFontSize(9);doc.setFont("helvetica","bold");doc.setTextColor(0,0,0);doc.text(val,x+3,y+14);});
    y+=26;doc.setFontSize(11);doc.setFont("helvetica","bold");doc.text("Historial",M,y);y+=6;
    bals.slice(0,25).forEach((b,row)=>{if(y>270){doc.addPage();y=20;}doc.setFillColor(row%2===0?250:244,row%2===0?250:244,row%2===0?250:252);doc.rect(M,y,W-M*2,6,"F");doc.setFontSize(8);doc.setFont("helvetica","normal");doc.setTextColor(0,0,0);doc.text(fmtF(b.fecha),M+2,y+4.5);doc.text(fmtE(b.util),M+40,y+4.5);doc.text(`Caja: ${fmtE((b.util||0)+(b.phys||0)-(b.pa||0))}`,M+88,y+4.5);y+=6;});
    doc.save(`${m.n}_${today()}.pdf`);
  }

  return<div onScroll={e=>setSy(e.target.scrollTop)}style={{height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
    <style>{ANIM_CSS}</style>
    <Nav title="Reporte"sub={m.n}sy={sy}right={[{icon:"excel",fn:exportExcel},{icon:"pdf",fn:exportPDF}]}/>
    <div style={{padding:"0 14px",paddingBottom:100}}>
      {/* Vista tabs */}
      <div style={{display:"flex",background:C.bg2,borderRadius:12,padding:3,marginBottom:12,border:`1px solid ${C.sep}`}}>
        {[["balance","Balance"],["tabla","Tabla"],["grafica","Gráfica"]].map(([v,l])=>
          <button key={v}onClick={()=>setVista(v)}style={{flex:1,background:vista===v?C.bg3:"transparent",border:"none",borderRadius:10,padding:"8px",color:vista===v?C.label:C.label2,cursor:"pointer",...T.s,fontWeight:vista===v?700:400,transition:"all .15s"}}>{l}</button>)}
      </div>
      {/* Filtros */}
      <div style={{display:"flex",gap:6,marginBottom:10,overflowX:"auto",paddingBottom:2}}>
        {[["todo","Todo"],["semana","7 días"],["mes","Mes"],["custom","Rango"]].map(([v,l])=>
          <button key={v}onClick={()=>setFiltro(v)}style={{flexShrink:0,background:filtro===v?color:"transparent",border:`1px solid ${filtro===v?color:C.sep}`,borderRadius:20,padding:"5px 14px",color:filtro===v?"#000":C.label2,cursor:"pointer",...T.fn,fontWeight:filtro===v?700:400,transition:"all .15s"}}>{l}</button>)}
      </div>
      {filtro==="mes"&&<div style={{background:C.bg2,borderRadius:10,padding:"8px 12px",marginBottom:10,display:"flex",gap:8,alignItems:"center",border:`1px solid ${C.sep}`}}><span style={{...T.s,color:C.label2}}>Mes:</span><input type="month"value={mes}onChange={e=>setMes(e.target.value)}style={{background:"transparent",border:"none",color:C.blue,...T.c,cursor:"pointer"}}/></div>}
      {filtro==="custom"&&<div style={{background:C.bg2,borderRadius:10,padding:"8px 12px",marginBottom:10,display:"flex",gap:12,flexWrap:"wrap",border:`1px solid ${C.sep}`}}>
        <div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{...T.fn,color:C.label2}}>Desde</span><input type="date"value={desde}onChange={e=>setDesde(e.target.value)}style={{background:"transparent",border:"none",color:C.blue,...T.fn}}/></div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{...T.fn,color:C.label2}}>Hasta</span><input type="date"value={hasta}onChange={e=>setHasta(e.target.value)}style={{background:"transparent",border:"none",color:C.blue,...T.fn}}/></div>
      </div>}

      {/* KPI Cards */}
      <div style={{background:`linear-gradient(135deg,${C.bg2},${C.bg3})`,borderRadius:18,padding:18,marginBottom:14,border:`1px solid ${C.sep}`,animation:"fadeSlideUp .35s ease both"}}>
        <div style={{...T.cap,color:C.label2,marginBottom:4,letterSpacing:1}}>UTILIDAD TOTAL · {bals.length} PERÍODOS</div>
        <AnimNumber value={totUtil}style={{...T.lg,color:C.label,fontSize:36,display:"block",marginBottom:14}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[["Premios",totPhys,C.orange],["Caja",totCaja,color],["Promedio",avg,C.blue]].map(([lbl,val,col],i)=>
            <div key={i}style={{background:C.fill4,borderRadius:12,padding:"10px 10px",animation:`fadeSlideUp .35s ease ${.1+i*.05}s both`}}>
              <div style={{...T.cap,color:C.label2,marginBottom:3}}>{lbl}</div>
              <AnimNumber value={val}style={{...T.c,color:col,fontWeight:700,display:"block"}}/>
            </div>)}
        </div>
        {totPA>0&&<div style={{...T.fn,color:C.yellow,marginTop:10,display:"flex",alignItems:"center",gap:4}}><Ico n="trophy"c={C.yellow}s={13}/>Premio Amor: {fmtE(totPA)}</div>}
      </div>

      {/* BALANCE */}
      {vista==="balance"&&<Sec hdr={`${bals.length} períodos`}delay={.1}>
        {bals.length===0&&<div style={{padding:16,...T.s,color:C.label2,textAlign:"center"}}>Sin períodos</div>}
        {bals.map((b,i)=><div key={b.fecha}style={{padding:"11px 14px",borderBottom:i<bals.length-1?`0.5px solid ${C.sep}`:"none",animation:`fadeSlideUp .25s ease ${i*.02}s both`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
            <span style={{...T.c,color:C.label,fontWeight:600}}>{fmtF(b.fecha)}</span>
            <span style={{...T.c,color:(b.util||0)>=0?C.green:C.red,fontWeight:700}}>{fmtE(b.util)}</span>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
            <span style={{...T.fn,color:C.orange}}>Premios {fmtE(b.phys||0)}</span>
            <span style={{...T.fn,color,fontWeight:600}}>Caja {fmtE((b.util||0)+(b.phys||0)-(b.pa||0))}</span>
            {b.pa>0&&<span style={{...T.fn,color:C.yellow}}>🏆 {fmtE(b.pa)}</span>}
          </div>
          {b.nota&&<div style={{...T.fn,color:C.label3,marginTop:3,fontStyle:"italic"}}>"{b.nota}"</div>}
        </div>)}
      </Sec>}

      {/* TABLA */}
      {vista==="tabla"&&<>
        <HistorialTable cid={cid} filtro={filtro} mes={mes} desde={desde} hasta={hasta} color={color}/>
      </>}

      {/* GRÁFICA */}
      {vista==="grafica"&&<>
        <div style={{display:"flex",background:C.bg2,borderRadius:12,padding:3,marginBottom:12,border:`1px solid ${C.sep}`}}>
          {[["barras","Barras"],["linea","Tendencia"],["top5","Top Máquinas"]].map(([v,l])=>
            <button key={v}onClick={()=>setChartTab(v)}style={{flex:1,background:chartTab===v?C.bg3:"transparent",border:"none",borderRadius:10,padding:"8px",color:chartTab===v?C.label:C.label2,cursor:"pointer",...T.fn,fontWeight:chartTab===v?700:400,transition:"all .15s"}}>{l}</button>)}
        </div>
        <div style={{background:C.bg2,borderRadius:16,padding:"16px 12px 10px",border:`1px solid ${C.sep}`,animation:"fadeSlideUp .3s ease both"}}>
          <div style={{...T.fn,color:C.label2,marginBottom:10,paddingLeft:4,fontWeight:600}}>
            {chartTab==="barras"?"Utilidad por período (últimos 30)":chartTab==="linea"?"Línea de tendencia":"Top 5 máquinas"}
          </div>
          {chartTab==="barras"&&<ChartBarras/>}
          {chartTab==="linea"&&<ChartLinea/>}
          {chartTab==="top5"&&<ChartTop5/>}
        </div>
      </>}
    </div>
  </div>;
}


// ─── MACHINES ─────────────────────────────────────────────────────────────────
function Machines({cid,cont}){
  const C=getC();const m=META[cid];const d=D[cid];const mqs=d?.m||[];const[sy,setSy]=useState(0);
  const getUlt=id=>{const loc=(cont[cid]||[]).filter(c=>c.i===id).sort((a,b)=>b.f.localeCompare(a.f))[0];if(loc)return{drop:loc.d,phys:loc.p,fecha:loc.f};const lr=d?.ul?.[id];return lr?{drop:lr.d,phys:lr.p,fecha:"Base"}:null;};
  return<div onScroll={e=>setSy(e.target.scrollTop)}style={{height:"100%",overflowY:"auto",background:C.bg}}>
    <style>{ANIM_CSS}</style>
    <Nav title="Máquinas"sub={`${m.n} · ${mqs.length} máqs`}sy={sy}/>
    <div style={{padding:"0 14px",paddingBottom:100}}>
      <Sec hdr={`${mqs.length} máquinas`}>
        {mqs.map((mq,i)=>{
          const lr=getUlt(mq.id);const col=maqC(mq.factor,C);const histCount=(cont[cid]||[]).filter(c=>c.i===mq.id).length;
          return<div key={mq.id}style={{display:"flex",alignItems:"center",padding:"11px 14px",borderBottom:i<mqs.length-1?`0.5px solid ${C.sep}`:"none",animation:`fadeSlideUp .25s ease ${i*.025}s both`}}>
            <MaqIcon factor={mq.factor}nombre={mq.nombre}size={34}/>
            <div style={{flex:1,marginLeft:10,minWidth:0}}>
              <div style={{...T.b,color:C.label}}>{mq.nombre}</div>
              <div style={{...T.fn,color:C.label2,marginTop:2}}>{lr?`IN: ${lr.drop?.toLocaleString()} · OUT: ${lr.phys?.toLocaleString()} · ${fmtF(lr.fecha)}`:"Sin lecturas"}</div>
              {histCount>0&&<div style={{...T.cap,color:C.label3,marginTop:1}}>{histCount} lecturas locales</div>}
            </div>
            <div style={{background:`${col}18`,borderRadius:10,padding:"4px 10px",flexShrink:0,border:`1px solid ${col}33`}}>
              <span style={{...T.fn,color:col,fontWeight:700}}>×{mq.factor}</span>
            </div>
          </div>;
        })}
      </Sec>
    </div>
  </div>;
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel({onBack,user}){
  const C=getC();
  const[tab,setTab]=useState("bio");const[logs,setLogs]=useState(()=>loadLogs());
  const[timeouts,setTimeoutsState]=useState(()=>loadTimeouts());const[msg,setMsg]=useState(null);
  const[expandUser,setExpandUser]=useState(null);
  const[devicesMap,setDevicesMap]=useState(()=>{const m={};USERS.forEach(u=>{m[u]=getFaceDevices(u);});return m;});
  const flash=(txt,isErr=false)=>{setMsg({txt,err:isErr});setTimeout(()=>setMsg(null),3000);};

  function BiometricTab(){
    const[registering,setRegistering]=useState(null);
    async function doRegister(targetUser){setRegistering(targetUser);try{const label=`${targetUser} — ${new Date().toLocaleDateString("es-CO")}`;const devs=await registerFaceIdDevice(targetUser,label);setDevicesMap(m=>({...m,[targetUser]:devs}));saveLog({action:"face_register",target:targetUser,by:user,label});flash(`Face ID registrado para ${targetUser}`);}catch(e){flash(e.message,true);}setRegistering(null);}
    function doRevoke(targetUser,credId,devLabel){if(!confirm(`¿Revocar "${devLabel}" de ${targetUser}?`))return;const devs=revokeFaceDevice(targetUser,credId);setDevicesMap(m=>({...m,[targetUser]:devs}));flash("Dispositivo revocado");}
    return<div>{USERS.map(u=>{const devs=devicesMap[u]||[];const canAdd=devs.length<2;
      return<div key={u}style={{background:C.bg2,borderRadius:14,marginBottom:10,overflow:"hidden",border:`1px solid ${C.sep}`}}>
        <div onClick={()=>setExpandUser(expandUser===u?null:u)}style={{display:"flex",alignItems:"center",padding:"12px 14px",cursor:"pointer"}}>
          <div style={{width:36,height:36,borderRadius:18,background:u==="Santiago"?C.indigo:u==="Eliza"?C.pink:C.teal,display:"flex",alignItems:"center",justifyContent:"center",marginRight:10,flexShrink:0}}><Ico n="user"c="#FFF"s={18}/></div>
          <div style={{flex:1}}><div style={{...T.h,color:C.label}}>{u}</div><div style={{...T.fn,color:C.label2,marginTop:1}}>{devs.length===0?"Sin Face ID":`${devs.length}/2 dispositivos`}</div></div>
          <div style={{background:devs.length===0?`${C.red}22`:devs.length<2?`${C.orange}22`:`${C.green}22`,borderRadius:20,padding:"3px 10px",marginRight:6}}><span style={{...T.cap,color:devs.length===0?C.red:devs.length<2?C.orange:C.green,fontWeight:600}}>{devs.length}/2</span></div>
          <Ico n="chevron"c={C.label3}s={16}/>
        </div>
        {expandUser===u&&<div style={{borderTop:`0.5px solid ${C.sep}`}}>
          {devs.map(dev=><div key={dev.credId}style={{display:"flex",alignItems:"center",padding:"10px 14px",borderBottom:`0.5px solid ${C.sep}`}}>
            <div style={{width:28,height:28,borderRadius:8,background:`${C.indigo}22`,display:"flex",alignItems:"center",justifyContent:"center",marginRight:10}}><Ico n="faceid"c={C.indigo}s={15}/></div>
            <div style={{flex:1,minWidth:0}}><div style={{...T.s,color:C.label}}>{dev.label}</div><div style={{...T.cap,color:C.label2,marginTop:1}}>{dev.registeredAt?new Date(dev.registeredAt).toLocaleDateString("es-CO"):"—"}</div></div>
            <button onClick={()=>doRevoke(u,dev.credId,dev.label)}style={{background:`${C.red}18`,border:"none",borderRadius:8,padding:"5px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><Ico n="trash"c={C.red}s={14}/><span style={{...T.cap,color:C.red}}>Revocar</span></button>
          </div>)}
          <div style={{padding:"10px 14px"}}>
            <button onClick={()=>doRegister(u)}disabled={!canAdd||registering===u}style={{width:"100%",background:canAdd?`${C.indigo}18`:C.fill3,border:`1px solid ${canAdd?C.indigo:C.sep}`,borderRadius:10,padding:"10px",cursor:canAdd?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <Ico n="faceid"c={canAdd?C.indigo:C.label3}s={18}/><span style={{...T.h,color:canAdd?C.indigo:C.label3}}>{registering===u?"Registrando...":canAdd?`Agregar (${devs.length}/2)`:"Máximo"}</span>
            </button>
          </div>
        </div>}
      </div>;})}
    </div>;
  }

  function PinsTab(){
    const[newPins,setNewPins]=useState({});const[confirm2,setConfirm2]=useState({});const[expanded,setExpanded]=useState(null);const[errs,setErrs]=useState({});
    function resetPin(targetUser){const np=newPins[targetUser]||"",cp=confirm2[targetUser]||"";if(np.length<4){setErrs(e=>({...e,[targetUser]:"Mínimo 4 dígitos"}));return;}if(np!==cp){setErrs(e=>({...e,[targetUser]:"No coinciden"}));return;}savePin(targetUser,np);saveLog({action:"pin_reset",target:targetUser,by:user});setExpanded(null);flash(`PIN de ${targetUser} actualizado`);}
    const inpS={width:"100%",background:C.fill3,border:"none",borderRadius:8,padding:"10px",color:C.label,...T.lg,fontSize:24,textAlign:"center",boxSizing:"border-box",outline:"none",marginBottom:8,letterSpacing:8};
    return<div>{USERS.filter(u=>u!=="Santiago").map(u=>(
      <div key={u}style={{background:C.bg2,borderRadius:14,marginBottom:10,overflow:"hidden",border:`1px solid ${C.sep}`}}>
        <div onClick={()=>setExpanded(expanded===u?null:u)}style={{display:"flex",alignItems:"center",padding:"12px 14px",cursor:"pointer"}}>
          <div style={{width:36,height:36,borderRadius:18,background:u==="Eliza"?C.pink:C.teal,display:"flex",alignItems:"center",justifyContent:"center",marginRight:10,flexShrink:0}}><Ico n="user"c="#FFF"s={18}/></div>
          <div style={{flex:1}}><div style={{...T.h,color:C.label}}>{u}</div><div style={{...T.fn,color:C.label2,marginTop:1}}>{localStorage.getItem("cp_"+u)?"PIN configurado":"Sin PIN"}</div></div>
          <div style={{background:`${C.orange}22`,borderRadius:20,padding:"3px 10px",marginRight:6}}><span style={{...T.cap,color:C.orange,fontWeight:600}}>Reset</span></div>
          <Ico n="chevron"c={C.label3}s={16}/>
        </div>
        {expanded===u&&<div style={{borderTop:`0.5px solid ${C.sep}`,padding:"12px 14px"}}>
          <input type="password"inputMode="numeric"value={newPins[u]||""}onChange={e=>setNewPins(p=>({...p,[u]:e.target.value}))}placeholder="••••"autoFocus style={inpS}/>
          <input type="password"inputMode="numeric"value={confirm2[u]||""}onChange={e=>setConfirm2(p=>({...p,[u]:e.target.value}))}placeholder="Confirmar"style={inpS}/>
          {errs[u]&&<div style={{...T.fn,color:C.red,marginBottom:8}}>{errs[u]}</div>}
          <button onClick={()=>resetPin(u)}style={{width:"100%",background:C.orange,border:"none",borderRadius:10,padding:"11px",...T.h,color:"#000",cursor:"pointer"}}>Actualizar PIN</button>
        </div>}
      </div>))}
    </div>;
  }

  function LogTab(){
    const[filter,setFilter]=useState("all");const filtered=filter==="all"?logs:logs.filter(l=>l.target===filter||l.by===filter);
    const aLabel=a=>({login_ok:"Inicio ✓",login_fail:"Fallo PIN",face_register:"Face ID registrado",face_revoke:"Face ID revocado",pin_reset:"PIN reseteado",session_timeout:"Sesión expirada",logout:"Cierre sesión"}[a]||a);
    const aColor=a=>({login_ok:C.green,login_fail:C.red,face_register:C.indigo,face_revoke:C.orange,pin_reset:C.yellow,logout:C.label2}[a]||C.label);
    return<div>
      <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
        {[["all","Todo"],...USERS.map(u=>[u,u])].map(([v,l])=><button key={v}onClick={()=>setFilter(v)}style={{background:filter===v?C.indigo:"transparent",border:`1px solid ${filter===v?C.indigo:C.sep}`,borderRadius:20,padding:"5px 14px",color:filter===v?"#FFF":C.label2,cursor:"pointer",...T.fn}}>{l}</button>)}
      </div>
      <div style={{background:C.bg2,borderRadius:14,overflow:"hidden",border:`1px solid ${C.sep}`}}>
        {filtered.length===0&&<div style={{padding:20,...T.s,color:C.label2,textAlign:"center"}}>Sin registros</div>}
        {filtered.slice(0,80).map((log,i)=><div key={i}style={{padding:"10px 14px",borderBottom:i<Math.min(filtered.length,80)-1?`0.5px solid ${C.sep}`:"none",display:"flex",alignItems:"flex-start",gap:10}}>
          <div style={{width:8,height:8,borderRadius:4,background:aColor(log.action),marginTop:5,flexShrink:0}}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:1}}>
              <span style={{...T.s,color:aColor(log.action),fontWeight:600}}>{aLabel(log.action)}</span>
              <span style={{...T.cap,color:C.label3}}>{log.ts?new Date(log.ts).toLocaleString("es-CO",{dateStyle:"short",timeStyle:"short"}):""}</span>
            </div>
            <div style={{...T.fn,color:C.label2}}>{log.target&&<span>👤 {log.target}</span>}{log.by&&log.by!==log.target&&<span style={{marginLeft:8}}>por {log.by}</span>}</div>
          </div>
        </div>)}
      </div>
    </div>;
  }

  function TimeoutTab(){
    const options=[0,5,10,15,30,60,120];const[local,setLocal]=useState(timeouts);const[saved,setSaved]=useState(false);
    function save(){saveTimeouts(local);setTimeoutsState(local);setSaved(true);setTimeout(()=>setSaved(false),2000);flash("Guardado");}
    return<div>
      {USERS.filter(u=>u!=="Santiago").map(u=>(
        <div key={u}style={{background:C.bg2,borderRadius:14,marginBottom:10,padding:"14px",border:`1px solid ${C.sep}`}}>
          <div style={{display:"flex",alignItems:"center",marginBottom:12,gap:10}}>
            <div style={{width:36,height:36,borderRadius:18,background:u==="Eliza"?C.pink:C.teal,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ico n="user"c="#FFF"s={18}/></div>
            <div><div style={{...T.h,color:C.label}}>{u}</div><div style={{...T.fn,color:C.label2}}>{local[u]?`${local[u]} min de inactividad`:"Sin límite"}</div></div>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {options.map(opt=><button key={opt}onClick={()=>setLocal(l=>({...l,[u]:opt}))}style={{background:local[u]===opt||(opt===0&&!local[u])?C.indigo:C.fill3,border:"none",borderRadius:20,padding:"6px 14px",color:local[u]===opt||(opt===0&&!local[u])?"#FFF":C.label2,cursor:"pointer",...T.fn,fontWeight:600}}>
              {opt===0?"Sin límite":opt<60?`${opt}m`:`${opt/60}h`}
            </button>)}
          </div>
        </div>
      ))}
      <button onClick={save}style={{width:"100%",background:saved?C.green:C.indigo,border:"none",borderRadius:14,padding:"15px",...T.h,color:"#FFF",cursor:"pointer"}}>{saved?"✓ Guardado":"Guardar"}</button>
    </div>;
  }

  const tabs=[{id:"bio",lbl:"Bio",icon:"faceid"},{id:"pins",lbl:"PINs",icon:"lock"},{id:"log",lbl:"Logs",icon:"table"},{id:"timeout",lbl:"Timeout",icon:"settings"}];
  return<div style={{height:"100dvh",display:"flex",flexDirection:"column",background:C.bg,overflowY:"auto"}}>
    <style>{ANIM_CSS}</style>
    <Nav title="Admin Panel"large={false}back="Inicio"onBack={onBack}/>
    <div style={{margin:"0 14px 12px",background:`linear-gradient(135deg,${C.indigo}18,${C.purple}18)`,border:`1px solid ${C.indigo}33`,borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>
      <Ico n="shield"c={C.indigo}s={20}/><div><div style={{...T.s,color:C.indigo,fontWeight:700}}>Modo Admin</div><div style={{...T.cap,color:C.label2}}>Solo Santiago</div></div>
    </div>
    {msg&&<div style={{margin:"0 14px 10px",background:msg.err?`${C.red}18`:`${C.green}18`,border:`1px solid ${msg.err?C.red:C.green}`,borderRadius:10,padding:"10px 14px",...T.s,color:msg.err?C.red:C.green,animation:"fadeIn .2s ease both"}}>
      {msg.txt}
    </div>}
    <div style={{display:"flex",background:C.bg2,margin:"0 14px 14px",borderRadius:14,padding:3,border:`1px solid ${C.sep}`}}>
      {tabs.map(t=><button key={t.id}onClick={()=>setTab(t.id)}style={{flex:1,background:tab===t.id?C.bg3:"transparent",border:"none",borderRadius:12,padding:"7px 4px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,transition:"all .15s"}}>
        <Ico n={t.icon}c={tab===t.id?C.indigo:C.label2}s={18}/>
        <span style={{...T.cap,color:tab===t.id?C.indigo:C.label2,fontWeight:tab===t.id?700:400,fontSize:10}}>{t.lbl}</span>
      </button>)}
    </div>
    <div style={{flex:1,padding:"0 14px",paddingBottom:40,overflowY:"auto"}}>
      {tab==="bio"&&<BiometricTab/>}{tab==="pins"&&<PinsTab/>}{tab==="log"&&<LogTab/>}{tab==="timeout"&&<TimeoutTab/>}
    </div>
  </div>;
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function Settings({onBack,onOut,user,apiKey,onAk,theme,setTheme,pending,onAdmin}){
  const C=getC();
  const[nk,setNk]=useState("");const[sv,setSv]=useState(false);
  const[chPin,setChPin]=useState(false);const[p1,setP1]=useState("");const[p2,setP2]=useState("");const[pErr,setPErr]=useState("");
  const[sbUrl,setSbUrl]=useState(()=>localStorage.getItem("sb_url")||"");const[sbKey,setSbKey]=useState(()=>localStorage.getItem("sb_key")||"");const[sbSv,setSbSv]=useState(false);
  const[gdId,setGdId]=useState(()=>localStorage.getItem("gd_client_id")||"");const[gdFolder,setGdFolder]=useState(()=>localStorage.getItem("gd_folder_id")||"");const[gdSv,setGdSv]=useState(false);
  const[syncing,setSyncing]=useState(false);const[syncMsg,setSyncMsg]=useState("");
  function cambiarPin(){if(p1.length<4)return setPErr("Mínimo 4 dígitos");if(p1!==p2)return setPErr("No coinciden");savePin(user,p1);setChPin(false);setP1("");setP2("");setPErr("");alert("PIN actualizado ✓");}
  async function doSync(){setSyncing(true);const n=await sbSync();setSyncMsg(n>0?`✓ ${n} sincronizadas`:"Sin pendientes");setSyncing(false);}
  const inp={width:"100%",background:C.fill3,border:"none",borderRadius:8,padding:"9px 11px",color:C.label,...T.s,boxSizing:"border-box",outline:"none",marginBottom:8};
  return<div style={{height:"100dvh",overflowY:"auto",background:C.bg}}>
    <style>{ANIM_CSS}</style>
    <Nav title="Ajustes"large={false}back="Inicio"onBack={onBack}/>
    <div style={{padding:14,paddingBottom:80}}>
      <Sec hdr={`Usuario — ${user}`}delay={0}>
        <Row ic="user"icC={C.blue}lbl="Cambiar PIN"arr fn={()=>setChPin(!chPin)}/>
        {chPin&&<div style={{padding:"10px 14px",borderTop:`0.5px solid ${C.sep}`}}>
          <input type="password"inputMode="numeric"value={p1}onChange={e=>setP1(e.target.value)}placeholder="Nuevo PIN"style={{...inp,textAlign:"center",letterSpacing:6}}/>
          <input type="password"inputMode="numeric"value={p2}onChange={e=>setP2(e.target.value)}placeholder="Confirmar"style={{...inp,textAlign:"center",letterSpacing:6}}/>
          {pErr&&<div style={{...T.fn,color:C.red,marginBottom:8}}>{pErr}</div>}
          <button onClick={cambiarPin}style={{width:"100%",background:C.blue,border:"none",borderRadius:10,padding:"10px",...T.h,color:"#FFF",cursor:"pointer"}}>Guardar</button>
        </div>}
        <Row ic="faceid"icC={C.indigo}lbl={hasFaceId(user)?"Face ID registrado":"Registrar Face ID"}sub={hasFaceId(user)?`${getFaceDevices(user).length}/2 dispositivos`:""}arr={false}fn={async()=>{try{await registerFaceId(user);alert("Face ID ✓");}catch(e){alert(e.message);}}}last/>
      </Sec>
      <Sec hdr="Apariencia"delay={.05}>
        <div style={{padding:"11px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,borderRadius:9,background:`${C.indigo}18`,display:"flex",alignItems:"center",justifyContent:"center"}}><Ico n={theme==="dark"?"moon":"sunicon"}c={C.indigo}s={18}/></div>
            <div><div style={{...T.b,color:C.label}}>Tema</div><div style={{...T.fn,color:C.label2}}>{theme==="dark"?"Oscuro":"Claro"}</div></div>
          </div>
          <button onClick={()=>{const t=theme==="dark"?"light":"dark";setTheme(t);_theme=THEMES[t];localStorage.setItem("app_theme",t);}}
            style={{background:theme==="dark"?C.indigo:C.yellow,border:"none",borderRadius:99,width:50,height:28,cursor:"pointer",display:"flex",alignItems:"center",padding:"0 4px",transition:"background .25s"}}>
            <div style={{width:20,height:20,borderRadius:10,background:"#FFF",marginLeft:theme==="dark"?26:0,transition:"margin .25s"}}/>
          </button>
        </div>
      </Sec>
      <Sec hdr="API Key Anthropic"delay={.1}>
        <div style={{padding:"10px 12px"}}>
          {apiKey&&<div style={{...T.fn,color:C.green,marginBottom:8}}>✓ {apiKey.slice(0,20)}...</div>}
          <input value={nk}onChange={e=>setNk(e.target.value)}placeholder="sk-ant-api03-..."style={inp}/>
          <button onClick={()=>{onAk(nk);setSv(true);setTimeout(()=>setSv(false),2000);}}disabled={!nk}style={{width:"100%",background:sv?C.green:C.blue,border:"none",borderRadius:10,padding:"11px",...T.h,color:"#FFF",cursor:"pointer"}}>{sv?"✓ Guardado":"Guardar API Key"}</button>
        </div>
      </Sec>
      <Sec hdr="Supabase"delay={.15}>
        <div style={{padding:"10px 12px"}}>
          {sbReady()&&<div style={{...T.fn,color:C.green,marginBottom:8}}>✓ Conectado</div>}
          {pending>0&&<div style={{...T.fn,color:C.orange,marginBottom:8}}>{pending} pendientes</div>}
          <input value={sbUrl}onChange={e=>setSbUrl(e.target.value)}placeholder="https://xxx.supabase.co"style={{...inp,fontFamily:"monospace",fontSize:12}}/>
          <input value={sbKey}onChange={e=>setSbKey(e.target.value)}placeholder="eyJ..."style={{...inp,fontFamily:"monospace",fontSize:12}}/>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{localStorage.setItem("sb_url",sbUrl);localStorage.setItem("sb_key",sbKey);sbLoad();setSbSv(true);setTimeout(()=>setSbSv(false),2000);}}style={{flex:1,background:sbSv?C.green:C.indigo,border:"none",borderRadius:10,padding:"11px",...T.h,color:"#FFF",cursor:"pointer"}}>{sbSv?"✓":"Guardar"}</button>
            <button onClick={doSync}disabled={syncing}style={{flex:1,background:C.fill3,border:`1px solid ${C.sep}`,borderRadius:10,padding:"11px",...T.h,color:C.label,cursor:"pointer"}}>{syncing?"Sync...":"Sincronizar"}</button>
          </div>
          {syncMsg&&<div style={{...T.fn,color:C.green,marginTop:6}}>{syncMsg}</div>}
        </div>
      </Sec>
      <Sec hdr="Google Drive"delay={.2}>
        <div style={{padding:"10px 12px"}}>
          {gdId&&<div style={{...T.fn,color:C.green,marginBottom:8}}>✓ Configurado</div>}
          <input value={gdId}onChange={e=>setGdId(e.target.value)}placeholder="xxx.apps.googleusercontent.com"style={inp}/>
          <input value={gdFolder}onChange={e=>setGdFolder(e.target.value)}placeholder="ID de carpeta raíz"style={inp}/>
          <button onClick={()=>{localStorage.setItem("gd_client_id",gdId);localStorage.setItem("gd_folder_id",gdFolder);setGdSv(true);setTimeout(()=>setGdSv(false),2000);}}style={{width:"100%",background:gdSv?C.green:C.teal,border:"none",borderRadius:10,padding:"11px",...T.h,color:"#000",cursor:"pointer"}}>{gdSv?"✓ Guardado":"Guardar"}</button>
        </div>
      </Sec>
      <Sec hdr="Datos"delay={.25}>
        <Row ic="download"icC={C.blue}lbl="Exportar backup"sub="JSON local"arr={false}fn={()=>{const d={};Object.keys(localStorage).forEach(k=>{d[k]=localStorage.getItem(k);});const bl=new Blob([JSON.stringify(d,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(bl);a.download="casino_backup.json";a.click();}}last/>
      </Sec>
      {user==="Santiago"&&<Sec hdr="Administrador"delay={.3}><Row ic="shield"icC={C.indigo}lbl="Admin Panel"sub="Biometría · PINs · Logs · Timeout"fn={onAdmin}last/></Sec>}
      <Sec hdr="Sesión"delay={.35}><Row ic="lock"icC={C.red}lbl={`Cerrar sesión (${user})`}del fn={()=>{saveLog({action:"logout",target:user});onOut();}}arr={false}last/></Sec>
    </div>
  </div>;
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function Home({onSelect,onCfg,user,pending}){
  const C=getC();const[sy,setSy]=useState(0);
  const lastBal=cid=>{const d=D[cid];if(!d?.b?.length)return null;return[...d.b].sort((a,b)=>b.fecha.localeCompare(a.fecha))[0];};
  const total=Object.keys(META).reduce((s,cid)=>s+(lastBal(cid)?.util_total||0),0);
  const allRecent=Object.keys(META).map(cid=>{const b=lastBal(cid);return{cid,util:b?.util_total||0};}).sort((a,b)=>b.util-a.util);
  return<div onScroll={e=>setSy(e.target.scrollTop)}style={{height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
    <style>{ANIM_CSS}</style>
    <Nav title="Mis Casinos"sub={user}sy={sy}right={[
      ...(pending>0?[{icon:<div style={{position:"relative"}}><Ico n="sync"c={C.orange}s={17}/><div style={{position:"absolute",top:-4,right:-4}}><Badge n={pending}c={C.orange}/></div></div>,fn:()=>{}}]:[]),
      {icon:"settings",fn:onCfg}
    ]}/>
    <div style={{padding:"0 14px",paddingBottom:60}}>
      {/* Hero KPI */}
      <div style={{background:`linear-gradient(135deg,${C.bg2},${C.bg3})`,borderRadius:20,padding:20,marginBottom:20,border:`1px solid ${C.sep}`,animation:"fadeSlideUp .4s ease both",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-20,right:-20,width:120,height:120,borderRadius:60,background:`${C[allRecent[0]?.cid?META[allRecent[0].cid]?.c:"indigo"]||C.indigo}18`,pointerEvents:"none"}}/>
        <div style={{...T.cap,color:C.label2,marginBottom:4,letterSpacing:1}}>ÚLTIMO PERÍODO — TODOS</div>
        <AnimNumber value={total}style={{...T.lg,color:C.label,fontSize:38,display:"block",marginBottom:16}}/>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {Object.entries(META).map(([cid,m],i)=>{const b=lastBal(cid);const col=C[m.c];
            return<div key={cid}onClick={()=>onSelect(cid)}style={{flex:"1 0 auto",background:C.fill3,borderRadius:12,padding:"8px 10px",cursor:"pointer",border:`1px solid ${C.sep}`,transition:"transform .15s",animation:`fadeSlideUp .4s ease ${.1+i*.05}s both`}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}onMouseLeave={e=>e.currentTarget.style.transform=""}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                <Ico n={m.e}c={col}s={14}/>
                <span style={{...T.cap,color:C.label2}}>{m.n.split(" ").pop()}</span>
              </div>
              <div style={{...T.s,color:b?.util_total>=0?C.green:C.red,fontWeight:700}}>{fmt(b?.util_total)}</div>
            </div>;
          })}
        </div>
      </div>
      {/* Casino list */}
      <Sec hdr="Locales"delay={.15}>
        {Object.entries(META).map(([cid,m],i,a)=>{const b=lastBal(cid);const dd=D[cid];const col=C[m.c];
          return<Row key={cid}ic={m.e}icC={col}lbl={m.n}sub={`${dd?.m?.length||0} máqs · ${m.liq}${b?` · ${b.fecha.slice(5)}`:""}`}
            right={b?<span style={{...T.c,color:b.util_total>=0?C.green:C.red,fontWeight:700}}>{fmt(b.util_total)}</span>:null}
            fn={()=>onSelect(cid)}last={i===a.length-1}/>;
        })}
      </Sec>
      <Sec hdr="Liquidación diaria"delay={.2}>
        {["vikingos","faraon"].map((cid,i)=>{const m=META[cid];const b=lastBal(cid);const col=C[m.c];
          return<Row key={cid}ic={m.e}icC={col}lbl={`Ingresar hoy — ${m.n}`}sub={`Última: ${b?.fecha||"—"}`}fn={()=>onSelect(cid)}last={i===1}/>;
        })}
      </Sec>
    </div>
  </div>;
}

// ─── CASINO SHELL ─────────────────────────────────────────────────────────────
function Casino({cid,cont,setCont,apiKey,onBack,user}){
  const C=getC();const[tab,setTab]=useState("lectura");const m=META[cid];const color=C[m.c];
  return<div style={{height:"100dvh",display:"flex",flexDirection:"column",background:C.bg}}>
    <style>{ANIM_CSS}</style>
    <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,zIndex:200,pointerEvents:"none"}}>
      <button onClick={onBack}style={{pointerEvents:"auto",background:"transparent",border:"none",color:C.blue,cursor:"pointer",padding:"10px 14px",display:"flex",alignItems:"center",gap:4}}>
        <Ico n="back"c={C.blue}s={18}/><span style={{...T.b,color:C.blue}}>Inicio</span>
      </button>
    </div>
    <div style={{flex:1,overflow:"hidden",paddingTop:44,animation:"fadeIn .25s ease both"}}>
      {tab==="lectura"&&<Counters cid={cid}cont={cont}setCont={setCont}user={user}/>}
      {tab==="camara"&&<Camera cid={cid}cont={cont}setCont={setCont}apiKey={apiKey}user={user}/>}
      {tab==="reporte"&&<Report cid={cid}cont={cont}/>}
      {tab==="maquinas"&&<Machines cid={cid}cont={cont}/>}
    </div>
    <Tabs tab={tab}setTab={setTab}color={color}/>
  </div>;
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App(){
  const[sc,setSc]=useState("boot");const[cid,setCid]=useState(null);
  const[user,setUser]=useState(null);const[apiKey,setAk]=useState("");
  const[cont,setCont]=useState({});const[theme,setTheme]=useState("dark");
  const[pending,setPending]=useState(0);
  _theme=THEMES[theme];const C=getC();

  useEffect(()=>{
    sbLoad();setAk(loadApiKey());setCont(loadCont());
    const t=localStorage.getItem("app_theme")||"dark";setTheme(t);_theme=THEMES[t];
    setPending(loadPending().length);setSc("login");
  },[]);

  useEffect(()=>{if(sbReady()&&pending>0){sbSync().then(n=>{if(n>0)setPending(p=>Math.max(0,p-n));});}},[]);

  useEffect(()=>{
    if(!user||user==="Santiago")return;
    const tos=loadTimeouts();const mins=tos[user];if(!mins)return;
    const ms=mins*60*1000;
    const expire=()=>{saveLog({action:"session_timeout",target:user});setUser(null);setSc("login");};
    let timer=setTimeout(expire,ms);
    const reset=()=>{clearTimeout(timer);timer=setTimeout(expire,ms);};
    window.addEventListener("pointerdown",reset);window.addEventListener("keydown",reset);
    return()=>{clearTimeout(timer);window.removeEventListener("pointerdown",reset);window.removeEventListener("keydown",reset);};
  },[user,sc]);

  function auth(u){setUser(u);saveLog({action:"login_ok",target:u,device:navigator.userAgent.slice(0,60)});setSc("home");}
  function out(){saveLog({action:"logout",target:user});setUser(null);setSc("login");}

  const W={width:"100%",maxWidth:430,margin:"0 auto",height:"100dvh",overflow:"hidden",background:C.bg,boxShadow:"0 0 80px rgba(0,0,0,.6)"};
  if(sc==="boot")return<div style={{...W,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{animation:"pulse 1s ease infinite"}}><Ico n="slot"c={C.indigo}s={52}/></div></div>;
  if(sc==="login")return<div style={{...W}}><Login onAuth={auth}/></div>;
  if(sc==="admin"&&user==="Santiago")return<div style={{...W}}><AdminPanel onBack={()=>setSc("home")}user={user}/></div>;
  if(sc==="cfg")return<div style={{...W}}><Settings onBack={()=>setSc(cid?"casino":"home")}onOut={out}user={user}apiKey={apiKey}onAk={k=>{setAk(k);saveApiKey(k);}}theme={theme}setTheme={t=>{setTheme(t);_theme=THEMES[t];}}pending={pending}onAdmin={()=>setSc("admin")}/></div>;
  if(sc==="casino"&&cid)return<div style={{...W}}><Casino cid={cid}cont={cont}setCont={setCont}apiKey={apiKey}onBack={()=>setSc("home")}user={user}/></div>;
  return<div style={{...W}}><Home onSelect={id=>{setCid(id);setSc("casino");}}onCfg={()=>setSc("cfg")}user={user}pending={pending}/></div>;
}