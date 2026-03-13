import{useState,useEffect,useRef,useCallback,useMemo}from"react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const THEMES={
  dark:{bg:"#000",bg2:"#1C1C1E",bg3:"#2C2C2E",bg4:"#3A3A3C",card:"#1C1C1E",label:"#FFF",label2:"rgba(235,235,245,.6)",label3:"rgba(235,235,245,.3)",sep:"rgba(84,84,88,.65)",fill3:"rgba(118,118,128,.24)",fill4:"rgba(116,116,128,.18)",blue:"#0A84FF",green:"#30D158",red:"#FF453A",orange:"#FF9F0A",yellow:"#FFD60A",purple:"#BF5AF2",indigo:"#5E5CE6",pink:"#FF375F",teal:"#5AC8FA",navBg:"rgba(0,0,0,.92)"},
  light:{bg:"#F2F2F7",bg2:"#FFF",bg3:"#F2F2F7",bg4:"#E5E5EA",card:"#FFF",label:"#000",label2:"rgba(60,60,67,.6)",label3:"rgba(60,60,67,.3)",sep:"rgba(60,60,67,.29)",fill3:"rgba(120,120,128,.12)",fill4:"rgba(120,120,128,.08)",blue:"#007AFF",green:"#34C759",red:"#FF3B30",orange:"#FF9500",yellow:"#FFCC00",purple:"#AF52DE",indigo:"#5856D6",pink:"#FF2D55",teal:"#32ADE6",navBg:"rgba(242,242,247,.92)"},
};
let _theme=THEMES.dark;
const getC=()=>_theme;

const SF=`-apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif`;
const T={lg:{fontFamily:SF,fontSize:34,fontWeight:700},h:{fontFamily:SF,fontSize:17,fontWeight:600},b:{fontFamily:SF,fontSize:17},c:{fontFamily:SF,fontSize:16},s:{fontFamily:SF,fontSize:15},fn:{fontFamily:SF,fontSize:13},cap:{fontFamily:SF,fontSize:12}};

const D={"obrero":{"m":[{"id":"M1","nombre":"Maq 1","factor":1},{"id":"M2","nombre":"Multi 2","factor":10},{"id":"P3","nombre":"Poker 3","factor":50},{"id":"JW4","nombre":"Jungle Wild 4","factor":1},{"id":"M5","nombre":"Multi 5","factor":10},{"id":"M6","nombre":"Multi 6","factor":10},{"id":"M7","nombre":"Multi 7","factor":10},{"id":"M8","nombre":"Multi 8","factor":10},{"id":"M9","nombre":"Multi 9","factor":10},{"id":"M10","nombre":"Multi 10","factor":10},{"id":"M11","nombre":"Multi 11","factor":10},{"id":"M12","nombre":"Multi 12","factor":10},{"id":"M13","nombre":"Multi 13","factor":10},{"id":"M14","nombre":"Multi 14","factor":10},{"id":"M15","nombre":"Multi 15","factor":10},{"id":"M16","nombre":"Multi 16","factor":10},{"id":"M17","nombre":"Multi 17","factor":10},{"id":"D18","nombre":"Duende 18","factor":1},{"id":"M19","nombre":"Multi 19","factor":10},{"id":"M20","nombre":"Multi 20","factor":10}],"ul":{"M1":{"d":9702000,"p":9549140},"M2":{"d":59100,"p":34510},"P3":{"d":586600,"p":291171},"JW4":{"d":64346000,"p":41506220},"M5":{"d":2182200,"p":1615301},"M6":{"d":6008700,"p":4594519},"M7":{"d":5271300,"p":4053289},"M8":{"d":4597200,"p":3544785},"M9":{"d":5460500,"p":3989081},"M10":{"d":5962100,"p":4391053},"M11":{"d":2911300,"p":2251024},"M12":{"d":6469300,"p":4536904},"M13":{"d":8580900,"p":6891188},"M14":{"d":8061200,"p":5562482},"M15":{"d":10652500,"p":8318218},"M16":{"d":7921700,"p":5374023},"M17":{"d":3689300,"p":2804535},"D18":{"d":48760000,"p":28658960},"M19":{"d":6232400,"p":4724197},"M20":{"d":3063100,"p":2133902}},"b":[{"fecha":"2025-12-16","phys_total":2724130,"util_total":1243870},{"fecha":"2025-12-19","phys_total":4412050,"util_total":573950},{"fecha":"2025-12-21","phys_total":2354780,"util_total":835220},{"fecha":"2025-12-24","phys_total":2938020,"util_total":746980},{"fecha":"2025-12-28","phys_total":1930740,"util_total":2179260},{"fecha":"2025-12-30","phys_total":2964460,"util_total":1552540},{"fecha":"2026-01-03","phys_total":1709270,"util_total":1346730},{"fecha":"2026-01-06","phys_total":2682440,"util_total":845560},{"fecha":"2026-01-09","phys_total":2836090,"util_total":969910},{"fecha":"2026-01-12","phys_total":2402090,"util_total":1029910},{"fecha":"2026-01-16","phys_total":3036360,"util_total":1016640},{"fecha":"2026-01-19","phys_total":2420700,"util_total":1058300},{"fecha":"2026-01-23","phys_total":3422190,"util_total":1209810},{"fecha":"2026-01-27","phys_total":3087930,"util_total":1156070},{"fecha":"2026-01-29","phys_total":2893000,"util_total":1063000},{"fecha":"2026-02-01","phys_total":2881040,"util_total":1896960},{"fecha":"2026-02-04","phys_total":3492170,"util_total":91830},{"fecha":"2026-02-08","phys_total":3892550,"util_total":1813450},{"fecha":"2026-02-12","phys_total":2809810,"util_total":1014190},{"fecha":"2026-02-15","phys_total":2561020,"util_total":1181980},{"fecha":"2026-02-18","phys_total":2571810,"util_total":1872190},{"fecha":"2026-02-22","phys_total":3293800,"util_total":1132280},{"fecha":"2026-02-26","phys_total":2937880,"util_total":1334040},{"fecha":"2026-03-01","phys_total":2503750,"util_total":836250},{"fecha":"2026-03-03","phys_total":3341360,"util_total":147640},{"fecha":"2026-03-06","phys_total":2790890,"util_total":1334110},{"fecha":"2026-03-10","phys_total":4750350,"util_total":1280650}],"a":{"M1":2405,"M2":-90484,"P3":47200,"JW4":125238,"M5":59485,"M6":35627,"M7":34276,"M8":47779,"M9":42950,"M10":32624,"M11":36913,"M12":78378,"M13":56081,"M14":83499,"M15":66052,"M16":85615,"M17":31778,"D18":102660,"M19":51876,"M20":80885}},"vikingos":{"m":[{"id":"P2","nombre":"Poker 2","factor":50},{"id":"P1","nombre":"Poker 1","factor":50},{"id":"P18","nombre":"Poker 18","factor":50},{"id":"M3","nombre":"Multi 3","factor":10},{"id":"M4","nombre":"Multi 4","factor":10},{"id":"M5","nombre":"Multi 5","factor":10},{"id":"M6","nombre":"Multi 6","factor":10},{"id":"M7","nombre":"Multi 7","factor":10},{"id":"M8","nombre":"Multi 8","factor":10},{"id":"M9","nombre":"Multi 9","factor":10},{"id":"M10","nombre":"Multi 10","factor":10},{"id":"B11","nombre":"Bailarin 11","factor":10},{"id":"M12","nombre":"Multi 12","factor":10},{"id":"M13","nombre":"Multi 13","factor":10},{"id":"M14","nombre":"Maq 14","factor":1},{"id":"M15","nombre":"Multi 15","factor":10},{"id":"M16","nombre":"Multi 16","factor":10},{"id":"G17","nombre":"Gaminator 17","factor":10},{"id":"W19","nombre":"WMS 19","factor":1},{"id":"J20","nombre":"Jungle 20","factor":10}],"ul":{"P2":{"d":4188680,"p":2882199},"P1":{"d":6220220,"p":4190673},"P18":{"d":522580,"p":323104},"M3":{"d":25909700,"p":20955946},"M4":{"d":23942700,"p":17914462},"M5":{"d":23902600,"p":19351970},"M6":{"d":27106200,"p":21783934},"M7":{"d":24823100,"p":19950249},"M8":{"d":17130900,"p":12265803},"M9":{"d":26373600,"p":21315030},"M10":{"d":23786000,"p":16928795},"B11":{"d":7542400,"p":6106138},"M12":{"d":4985300,"p":3721801},"M13":{"d":25093900,"p":20749614},"M14":{"d":257428000,"p":192507037},"M15":{"d":21727000,"p":15883406},"M16":{"d":22950700,"p":16449174},"G17":{"d":441620000,"p":370596390},"W19":{"d":226192000,"p":177925200},"J20":{"d":5453000,"p":3922647}},"b":[{"fecha":"2025-12-28","phys_total":4278304,"util_total":3082696},{"fecha":"2025-12-29","phys_total":10869878,"util_total":643122},{"fecha":"2025-12-30","phys_total":5341551,"util_total":1993449},{"fecha":"2025-12-31","phys_total":3601162,"util_total":1923838},{"fecha":"2026-01-02","phys_total":10089204,"util_total":3218796},{"fecha":"2026-01-03","phys_total":4391467,"util_total":134533},{"fecha":"2026-01-04","phys_total":8276965,"util_total":2382035},{"fecha":"2026-01-05","phys_total":5798189,"util_total":2394811},{"fecha":"2026-01-06","phys_total":3467015,"util_total":722985},{"fecha":"2026-01-07","phys_total":4728902,"util_total":1710098},{"fecha":"2026-01-08","phys_total":4717118,"util_total":2091882},{"fecha":"2026-01-09","phys_total":3513510,"util_total":607490},{"fecha":"2026-01-10","phys_total":4698267,"util_total":1185733},{"fecha":"2026-01-11","phys_total":6210283,"util_total":2883717},{"fecha":"2026-01-12","phys_total":5166753,"util_total":1840247},{"fecha":"2026-01-13","phys_total":6747133,"util_total":1255867},{"fecha":"2026-01-14","phys_total":5093077,"util_total":1441923},{"fecha":"2026-01-16","phys_total":5677755,"util_total":2042245},{"fecha":"2026-01-17","phys_total":5573042,"util_total":1564958},{"fecha":"2026-01-18","phys_total":6648453,"util_total":385547},{"fecha":"2026-01-19","phys_total":4213633,"util_total":1939367},{"fecha":"2026-01-20","phys_total":5439752,"util_total":1483248},{"fecha":"2026-01-21","phys_total":3737830,"util_total":1483170},{"fecha":"2026-01-22","phys_total":6625890,"util_total":944110},{"fecha":"2026-01-23","phys_total":4815999,"util_total":248001},{"fecha":"2026-01-24","phys_total":5553128,"util_total":2591872},{"fecha":"2026-01-25","phys_total":6093628,"util_total":2255372},{"fecha":"2026-01-26","phys_total":4163420,"util_total":1733580},{"fecha":"2026-01-27","phys_total":4409650,"util_total":1622350},{"fecha":"2026-01-28","phys_total":5981547,"util_total":2432453},{"fecha":"2026-01-29","phys_total":4373989,"util_total":921011},{"fecha":"2026-01-30","phys_total":4698538,"util_total":976462},{"fecha":"2026-01-31","phys_total":6496209,"util_total":723791},{"fecha":"2026-02-01","phys_total":7461610,"util_total":3630390},{"fecha":"2026-02-02","phys_total":5958945,"util_total":2017055},{"fecha":"2026-02-03","phys_total":4438230,"util_total":1146770},{"fecha":"2026-02-04","phys_total":4496437,"util_total":1228563},{"fecha":"2026-02-05","phys_total":4029420,"util_total":981580},{"fecha":"2026-02-06","phys_total":7043785,"util_total":1462215},{"fecha":"2026-02-07","phys_total":5888110,"util_total":2068890},{"fecha":"2026-02-08","phys_total":5333338,"util_total":2168662},{"fecha":"2026-02-09","phys_total":5258445,"util_total":1618555},{"fecha":"2026-02-10","phys_total":6334470,"util_total":3476530},{"fecha":"2026-02-11","phys_total":3814102,"util_total":1045898},{"fecha":"2026-02-12","phys_total":3454055,"util_total":1677945},{"fecha":"2026-02-13","phys_total":6771751,"util_total":2691249},{"fecha":"2026-02-14","phys_total":6422522,"util_total":3402478},{"fecha":"2026-02-15","phys_total":5880346,"util_total":2242654},{"fecha":"2026-02-16","phys_total":5361237,"util_total":2679763},{"fecha":"2026-02-17","phys_total":5213667,"util_total":1464333},{"fecha":"2026-02-18","phys_total":5957686,"util_total":787314},{"fecha":"2026-02-19","phys_total":5415995,"util_total":1042005},{"fecha":"2026-02-20","phys_total":7049918,"util_total":1989082},{"fecha":"2026-02-21","phys_total":5525333,"util_total":1788667},{"fecha":"2026-02-22","phys_total":5803618,"util_total":2421382},{"fecha":"2026-02-23","phys_total":3909753,"util_total":1549247},{"fecha":"2026-02-24","phys_total":4890350,"util_total":2545650},{"fecha":"2026-02-25","phys_total":5443361,"util_total":286639},{"fecha":"2026-02-26","phys_total":6630554,"util_total":1277446},{"fecha":"2026-02-27","phys_total":4631287,"util_total":1146713},{"fecha":"2026-02-28","phys_total":7282217,"util_total":1427783},{"fecha":"2026-03-01","phys_total":4890391,"util_total":2225609},{"fecha":"2026-03-02","phys_total":4774079,"util_total":1482921},{"fecha":"2026-03-03","phys_total":7522457,"util_total":1373543},{"fecha":"2026-03-04","phys_total":3997116,"util_total":2126884},{"fecha":"2026-03-05","phys_total":3777638,"util_total":2844362},{"fecha":"2026-03-06","phys_total":6086699,"util_total":734301},{"fecha":"2026-03-07","phys_total":5646624,"util_total":2349376},{"fecha":"2026-03-08","phys_total":5076316,"util_total":2317684},{"fecha":"2026-03-09","phys_total":6561217,"util_total":2838783},{"fecha":"2026-03-10","phys_total":6624266,"util_total":2292734}],"a":{"P2":66414,"P1":74064,"P18":64839,"M3":55292,"M4":65383,"M5":51010,"M6":55044,"M7":54706,"M8":74427,"M9":57213,"M10":79005,"B11":93404,"M12":71467,"M13":42329,"M14":150231,"M15":88573,"M16":73055,"G17":1322347,"W19":130331,"J20":-757980}},"faraon":{"m":[{"id":"M1","nombre":"Multi 1","factor":10},{"id":"M2","nombre":"Multi 2","factor":10},{"id":"P3","nombre":"Poker 3","factor":50},{"id":"P4","nombre":"Poker 4","factor":50},{"id":"P5","nombre":"Poker 5","factor":50},{"id":"M6","nombre":"Multi 6","factor":10},{"id":"M7","nombre":"Multi 7","factor":10},{"id":"M8","nombre":"Multi 8","factor":10},{"id":"M9","nombre":"Multi 9","factor":10},{"id":"M10","nombre":"Multi 10","factor":10},{"id":"M11","nombre":"Multi 11","factor":10},{"id":"SA12","nombre":"Stand Alone 12","factor":1},{"id":"A13","nombre":"Aristocrat 13","factor":1},{"id":"M14","nombre":"Multi 14","factor":10},{"id":"M15","nombre":"Multi 15","factor":10},{"id":"W16","nombre":"WMS 16","factor":1},{"id":"C17","nombre":"Clon 17","factor":10},{"id":"M18","nombre":"Multi 18","factor":10},{"id":"M19","nombre":"Multi 19","factor":10},{"id":"W20","nombre":"WMS 20","factor":1}],"ul":{"M1":{"d":17837220,"p":12418794},"M2":{"d":18902500,"p":12897756},"P3":{"d":4704440,"p":3372421},"P4":{"d":6155220,"p":4488611},"P5":{"d":414360,"p":291222},"M6":{"d":17869200,"p":13924443},"M7":{"d":15131300,"p":10932135},"M8":{"d":18899800,"p":14737183},"M9":{"d":16212100,"p":11522033},"M10":{"d":1615900,"p":1170135},"M11":{"d":20664900,"p":16000608},"SA12":{"d":157432000,"p":116702570},"A13":{"d":44983000,"p":31901100},"M14":{"d":18692600,"p":14415998},"M15":{"d":19841800,"p":15579142},"W16":{"d":282156000,"p":184803090},"C17":{"d":23715200,"p":17125308},"M18":{"d":16266000,"p":12004309},"M19":{"d":16221100,"p":11360873},"W20":{"d":109171000,"p":76098810}},"b":[{"fecha":"2025-12-29","phys_total":5558520,"util_total":3403280},{"fecha":"2025-12-30","phys_total":3262020,"util_total":2424180},{"fecha":"2025-12-31","phys_total":3394850,"util_total":1565150},{"fecha":"2026-01-02","phys_total":7148310,"util_total":2279690},{"fecha":"2026-01-03","phys_total":3022050,"util_total":1351950},{"fecha":"2026-01-04","phys_total":3147360,"util_total":884640},{"fecha":"2026-01-05","phys_total":3342300,"util_total":675700},{"fecha":"2026-01-06","phys_total":2778670,"util_total":1174330},{"fecha":"2026-01-07","phys_total":4399640,"util_total":1221360},{"fecha":"2026-01-08","phys_total":4090020,"util_total":781980},{"fecha":"2026-01-09","phys_total":2457390,"util_total":1273610},{"fecha":"2026-01-10","phys_total":3646300,"util_total":1043700},{"fecha":"2026-01-11","phys_total":4844030,"util_total":647970},{"fecha":"2026-01-12","phys_total":2601010,"util_total":327990},{"fecha":"2026-01-13","phys_total":3373120,"util_total":555880},{"fecha":"2026-01-14","phys_total":3033950,"util_total":1056050},{"fecha":"2026-01-16","phys_total":5569410,"util_total":3441590},{"fecha":"2026-01-17","phys_total":3533380,"util_total":3224620},{"fecha":"2026-01-18","phys_total":2362380,"util_total":1484620},{"fecha":"2026-01-19","phys_total":2927560,"util_total":773440},{"fecha":"2026-01-20","phys_total":3802630,"util_total":550370},{"fecha":"2026-01-21","phys_total":2345280,"util_total":599720},{"fecha":"2026-01-23","phys_total":5528500,"util_total":3085500},{"fecha":"2026-01-25","phys_total":4710370,"util_total":4002630},{"fecha":"2026-01-26","phys_total":2045960,"util_total":2332040},{"fecha":"2026-01-28","phys_total":4663840,"util_total":3594160},{"fecha":"2026-01-29","phys_total":3437350,"util_total":-10350},{"fecha":"2026-01-30","phys_total":1912140,"util_total":1800860},{"fecha":"2026-01-31","phys_total":3377390,"util_total":1447610},{"fecha":"2026-02-01","phys_total":3742390,"util_total":2058610},{"fecha":"2026-02-02","phys_total":4557690,"util_total":1073310},{"fecha":"2026-02-04","phys_total":2595730,"util_total":2286270},{"fecha":"2026-02-05","phys_total":2568790,"util_total":1776210},{"fecha":"2026-02-06","phys_total":3862060,"util_total":485940},{"fecha":"2026-02-07","phys_total":3701010,"util_total":1008990},{"fecha":"2026-02-08","phys_total":3427780,"util_total":1502220},{"fecha":"2026-02-09","phys_total":3623910,"util_total":1208090},{"fecha":"2026-02-10","phys_total":4156300,"util_total":413700},{"fecha":"2026-02-12","phys_total":4330880,"util_total":1097120},{"fecha":"2026-02-13","phys_total":1890410,"util_total":1407590},{"fecha":"2026-02-14","phys_total":6018080,"util_total":1799920},{"fecha":"2026-02-15","phys_total":2729690,"util_total":1546310},{"fecha":"2026-02-16","phys_total":1971260,"util_total":1641740},{"fecha":"2026-02-17","phys_total":2693140,"util_total":182860},{"fecha":"2026-02-18","phys_total":2177870,"util_total":1908130},{"fecha":"2026-02-19","phys_total":2688930,"util_total":1339070},{"fecha":"2026-02-20","phys_total":2770600,"util_total":1869400},{"fecha":"2026-02-22","phys_total":6527250,"util_total":2104830},{"fecha":"2026-02-23","phys_total":1624510,"util_total":590410},{"fecha":"2026-02-24","phys_total":2307010,"util_total":758990},{"fecha":"2026-02-26","phys_total":5224820,"util_total":2347180},{"fecha":"2026-02-27","phys_total":2801460,"util_total":871540},{"fecha":"2026-02-28","phys_total":3941050,"util_total":2090950},{"fecha":"2026-03-01","phys_total":2917840,"util_total":1299160},{"fecha":"2026-03-02","phys_total":4654300,"util_total":1263700},{"fecha":"2026-03-03","phys_total":3330370,"util_total":853630},{"fecha":"2026-03-05","phys_total":5293230,"util_total":4119770},{"fecha":"2026-03-06","phys_total":3122050,"util_total":693950},{"fecha":"2026-03-07","phys_total":3397760,"util_total":2376240},{"fecha":"2026-03-08","phys_total":4598850,"util_total":1130150},{"fecha":"2026-03-09","phys_total":4477320,"util_total":1248680},{"fecha":"2026-03-10","phys_total":2801280,"util_total":616720},{"fecha":"2026-03-11","phys_total":4913340,"util_total":256660}],"a":{"M1":253600,"M2":63132,"P3":66697,"P4":74446,"P5":72150,"M6":44186,"M7":48767,"M8":45454,"M9":39413,"M10":27470,"M11":56593,"SA12":87226,"A13":91483,"M14":55027,"M15":38114,"W16":90882,"C17":55310,"M18":46458,"M19":72348,"W20":166828}},"hugo":{"m":[{"id":"G1","nombre":"Gaminator 1","factor":10},{"id":"G2","nombre":"Gaminator 2","factor":10},{"id":"M3","nombre":"Multi 3","factor":10},{"id":"M4","nombre":"Multi 4","factor":10},{"id":"M5","nombre":"multi 5","factor":10},{"id":"P6","nombre":"Poker 6","factor":50},{"id":"P7","nombre":"Poker 7","factor":50},{"id":"M8","nombre":"Multi 8","factor":10},{"id":"M9","nombre":"Multi 9","factor":10},{"id":"M10","nombre":"Multi 10","factor":10},{"id":"M11","nombre":"Multi 11","factor":10}],"ul":{"G1":{"d":71280900,"p":49481563},"G2":{"d":5637200,"p":3618930},"M3":{"d":26026700,"p":19122024},"M4":{"d":27812000,"p":21275373},"M5":{"d":276800,"p":170195},"P6":{"d":2548900,"p":1535052},"P7":{"d":208220,"p":101900},"M8":{"d":165500,"p":91980},"M9":{"d":542300,"p":354904},"M10":{"d":400300,"p":225775},"M11":{"d":871900,"p":515427}},"b":[{"fecha":"2026-01-06","phys_total":1718950,"util_total":1318050},{"fecha":"2026-01-09","phys_total":1899850,"util_total":418150},{"fecha":"2026-01-14","phys_total":1024840,"util_total":2177160},{"fecha":"2026-01-17","phys_total":1498490,"util_total":896510},{"fecha":"2026-01-20","phys_total":1227790,"util_total":530210},{"fecha":"2026-01-24","phys_total":1446950,"util_total":154050},{"fecha":"2026-01-26","phys_total":2170740,"util_total":-378740},{"fecha":"2026-01-30","phys_total":995040,"util_total":1397960},{"fecha":"2026-02-01","phys_total":1174600,"util_total":377400},{"fecha":"2026-02-06","phys_total":1318840,"util_total":1513160},{"fecha":"2026-02-10","phys_total":1457520,"util_total":1243480},{"fecha":"2026-02-14","phys_total":1452180,"util_total":636820},{"fecha":"2026-02-16","phys_total":1839220,"util_total":-177220},{"fecha":"2026-02-20","phys_total":1812300,"util_total":13700},{"fecha":"2026-02-24","phys_total":1359750,"util_total":918250},{"fecha":"2026-02-27","phys_total":1041620,"util_total":440380},{"fecha":"2026-03-03","phys_total":2711340,"util_total":105660},{"fecha":"2026-03-10","phys_total":1436960,"util_total":932040}],"a":{"G1":116736,"G2":105418,"M3":172823,"M4":30415,"M5":33077,"P6":72700,"P7":-20,"M8":14228,"M9":36934,"M10":24927,"M11":51522}},"playarica":{"m":[{"id":"P1","nombre":"Poker 1","factor":50},{"id":"P2","nombre":"Poker 2","factor":50},{"id":"P3","nombre":"Poker 3","factor":50},{"id":"P4","nombre":"Poker 4","factor":50},{"id":"P5","nombre":"Poker 5","factor":50},{"id":"M6","nombre":"Multi 6","factor":10},{"id":"M7","nombre":"Multi 7","factor":10},{"id":"M8","nombre":"multy 8","factor":10},{"id":"G9","nombre":"gaminator 9","factor":10},{"id":"P10","nombre":"Poker 10","factor":50},{"id":"P11","nombre":"Poker 11","factor":50},{"id":"D12","nombre":"Dolphin 12","factor":10},{"id":"G13","nombre":"Gaminator 13","factor":10},{"id":"N14","nombre":"novomaty 14","factor":1},{"id":"P15","nombre":"Poker 15","factor":50},{"id":"P16","nombre":"Poker 16","factor":50}],"ul":{"P1":{"d":409040,"p":273911},"P2":{"d":168520,"p":110565},"P3":{"d":300200,"p":196095},"P4":{"d":660180,"p":433584},"P5":{"d":460060,"p":316863},"M6":{"d":846100,"p":552057},"M7":{"d":350000,"p":245839},"M8":{"d":1403300,"p":1016505},"G9":{"d":3497300,"p":2514709},"P10":{"d":71140,"p":46004},"P11":{"d":120980,"p":72367},"D12":{"d":3867000,"p":2835940},"G13":{"d":2486700,"p":1751761},"N14":{"d":14550000,"p":11096300},"P15":{"d":68880,"p":43765},"P16":{"d":192360,"p":127535}},"b":[{"fecha":"2026-01-03","phys_total":3146940,"util_total":990060},{"fecha":"2026-01-09","phys_total":2800830,"util_total":676170},{"fecha":"2026-01-16","phys_total":2789090,"util_total":1571910},{"fecha":"2026-01-21","phys_total":3004290,"util_total":1413710},{"fecha":"2026-01-25","phys_total":2477180,"util_total":1876820},{"fecha":"2026-01-31","phys_total":2766560,"util_total":1189440},{"fecha":"2026-02-05","phys_total":2550040,"util_total":1572960},{"fecha":"2026-02-08","phys_total":3634750,"util_total":824250},{"fecha":"2026-02-12","phys_total":3068700,"util_total":947300},{"fecha":"2026-02-17","phys_total":2886070,"util_total":990930},{"fecha":"2026-02-23","phys_total":3329340,"util_total":1418660},{"fecha":"2026-02-27","phys_total":2642510,"util_total":1133490},{"fecha":"2026-03-04","phys_total":2696490,"util_total":1161510},{"fecha":"2026-03-08","phys_total":3377940,"util_total":464060}],"a":{"P1":54111,"P2":35692,"P3":102450,"P4":277888,"P5":79134,"M6":63002,"M7":24303,"M8":117742,"G9":80760,"P10":58926,"P11":29826,"D12":297615,"G13":72670,"N14":69286,"P15":68153,"P16":70226}}};

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
  chart:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><line x1="18"y1="20"x2="18"y2="10"/><line x1="12"y1="20"x2="12"y2="4"/><line x1="6"y1="20"x2="6"y2="14"/><line x1="2"y1="20"x2="22"y2="20"/></svg>,
  pdf:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h1a2 2 0 0 1 0 4H9v-4z"/><path d="M13 13h2"/><path d="M13 17h2"/></svg>,
  excel:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13l2.5 4"/><path d="M13.5 13L11 17"/><line x1="8"y1="17"x2="13.5"y2="13"/></svg>,
  sync:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  moon:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  sunicon:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><circle cx="12"cy="12"r="5"/><line x1="12"y1="1"x2="12"y2="3"/><line x1="12"y1="21"x2="12"y2="23"/><line x1="4.22"y1="4.22"x2="5.64"y2="5.64"/><line x1="18.36"y1="18.36"x2="19.78"y2="19.78"/><line x1="1"y1="12"x2="3"y2="12"/><line x1="21"y1="12"x2="23"y2="12"/><line x1="4.22"y1="19.78"x2="5.64"y2="18.36"/><line x1="18.36"y1="5.64"x2="19.78"y2="4.22"/></svg>,
  back:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  chevron:(c,s=16)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  plus:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"><line x1="12"y1="5"x2="12"y2="19"/><line x1="5"y1="12"x2="19"y2="12"/></svg>,
  check:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="2.5"strokeLinecap="round"strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  warning:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12"y1="9"x2="12"y2="13"/><line x1="12"y1="17"x2="12.01"y2="17"/></svg>,
  wifi:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><line x1="1"y1="1"x2="23"y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12"y1="20"x2="12.01"y2="20"/></svg>,
  table:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><rect x="3"y="3"width="18"height="18"rx="2"/><line x1="3"y1="9"x2="21"y2="9"/><line x1="3"y1="15"x2="21"y2="15"/><line x1="9"y1="3"x2="9"y2="21"/></svg>,
  download:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12"y1="15"x2="12"y2="3"/></svg>,
  slot:(c,s=24)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><rect x="2"y="6"width="20"height="14"rx="2"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><circle cx="12"cy="13"r="3"/><line x1="12"y1="10"x2="12"y2="8"/></svg>,
  poker:(c,s=24)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M12 2l2.5 5h5.5l-4.5 3.5 1.5 5.5L12 13l-5 3 1.5-5.5L4 7h5.5z"/></svg>,
  user:(c,s=22)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12"cy="7"r="4"/></svg>,
  lock:(c,s=22)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><rect x="3"y="11"width="18"height="11"rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  note:(c,s=18)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16"y1="13"x2="8"y2="13"/><line x1="16"y1="17"x2="8"y2="17"/></svg>,
  shield:(c,s=22)=><svg width={s}height={s}viewBox="0 0 24 24"fill="none"stroke={c}strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
};
const Ico=({n,c,s})=>(ICONS[n]?ICONS[n](c,s):<span style={{fontSize:s||18,color:c}}>•</span>);

// ─── UTILS ────────────────────────────────────────────────────────────────────
const fmt=n=>{if(n==null||isNaN(n))return"—";const a=Math.abs(n),s=n<0?"-":"";if(a>=1e6)return s+"$"+(a/1e6).toFixed(1)+"M";if(a>=1e3)return s+"$"+(a/1e3).toFixed(0)+"K";return s+"$"+a.toLocaleString();};
const fmtE=n=>{if(n==null||isNaN(n))return"—";const s=n<0?"-":"";return s+"$"+Math.abs(Math.round(n)).toLocaleString("es-CO");};
const today=()=>new Date().toISOString().slice(0,10);
const MESES=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
const fmtF=f=>f?`${f.slice(8)}-${MESES[parseInt(f.slice(5,7))-1]}-${f.slice(0,4)}`:"—";
const maqC=(f,C)=>f===50?C.indigo:f===10?C.blue:C.orange;
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

// ─── ACCESS LOG ───────────────────────────────────────────────────────────────
const LOG_KEY="cc_access_log";const MAX_LOG=200;
function saveLog(entry){try{const logs=loadLogs();logs.unshift({...entry,ts:new Date().toISOString()});localStorage.setItem(LOG_KEY,JSON.stringify(logs.slice(0,MAX_LOG)));}catch{}}
function loadLogs(){try{return JSON.parse(localStorage.getItem(LOG_KEY)||"[]");}catch{return[];}}

// ─── SESSION TIMEOUT ──────────────────────────────────────────────────────────
const TIMEOUT_KEY="cc_timeout";
function saveTimeouts(t){localStorage.setItem(TIMEOUT_KEY,JSON.stringify(t));}
function loadTimeouts(){try{return JSON.parse(localStorage.getItem(TIMEOUT_KEY)||"{}");}catch{return{};}}

// ─── FACE ID MULTI-DEVICE ─────────────────────────────────────────────────────
const WA=window.PublicKeyCredential;
function getFaceDevices(user){try{return JSON.parse(localStorage.getItem("faceid_devs_"+user)||"[]");}catch{return[];}}
function setFaceDevices(user,devs){
  localStorage.setItem("faceid_devs_"+user,JSON.stringify(devs));
  if(devs.length>0){localStorage.setItem("faceid_"+user,JSON.stringify({credId:devs[0].credId,user}));}
  else{localStorage.removeItem("faceid_"+user);}
}
async function registerFaceIdDevice(user,label){
  if(!WA)throw new Error("WebAuthn no soportado");
  const devs=getFaceDevices(user);
  if(devs.length>=2)throw new Error("Ya hay 2 dispositivos registrados. Revoca uno primero.");
  const challenge=crypto.getRandomValues(new Uint8Array(32));
  const cred=await navigator.credentials.create({publicKey:{challenge,rp:{name:"Casino Contadores",id:window.location.hostname},user:{id:new TextEncoder().encode(user+"_"+Date.now()),name:user,displayName:user},pubKeyCredParams:[{type:"public-key",alg:-7},{type:"public-key",alg:-257}],authenticatorSelection:{authenticatorAttachment:"platform",userVerification:"required"},timeout:60000}});
  const credId=btoa(String.fromCharCode(...new Uint8Array(cred.rawId)));
  const updated=[...devs,{credId,label:label||"Dispositivo "+(devs.length+1),registeredAt:new Date().toISOString()}];
  setFaceDevices(user,updated);
  return updated;
}
function revokeFaceDevice(user,credId){const updated=getFaceDevices(user).filter(d=>d.credId!==credId);setFaceDevices(user,updated);return updated;}

// Legacy helpers for Login component
async function registerFaceId(user){
  if(!WA)throw new Error("WebAuthn no soportado");
  const devs=getFaceDevices(user);
  if(devs.length>=2)throw new Error("Máx 2 dispositivos. Ve a Admin Panel para revocar.");
  return registerFaceIdDevice(user,"Dispositivo "+(devs.length+1));
}
async function authFaceId(user){
  if(!WA)throw new Error("WebAuthn no soportado");
  const devs=getFaceDevices(user);
  if(!devs.length){const old=localStorage.getItem("faceid_"+user);if(!old)throw new Error("Face ID no registrado");}
  const allDevs=devs.length?devs:[JSON.parse(localStorage.getItem("faceid_"+user)||"null")].filter(Boolean);
  if(!allDevs.length)throw new Error("Face ID no registrado");
  const challenge=crypto.getRandomValues(new Uint8Array(32));
  const allowCreds=allDevs.map(d=>({type:"public-key",id:Uint8Array.from(atob(d.credId),c=>c.charCodeAt(0))}));
  await navigator.credentials.get({publicKey:{challenge,allowCredentials:allowCreds,userVerification:"required",timeout:60000}});
  return true;
}
const hasFaceId=u=>getFaceDevices(u).length>0||!!localStorage.getItem("faceid_"+u);

// ─── SUPABASE ─────────────────────────────────────────────────────────────────
const sbLoad=()=>{window._sbUrl=localStorage.getItem("sb_url")||"";window._sbKey=localStorage.getItem("sb_key")||"";};
const sbReady=()=>!!(window._sbUrl&&window._sbKey);
const sbFetch=async(path,opts={})=>{
  if(!sbReady())return null;
  try{const r=await fetch(window._sbUrl+"/rest/v1/"+path,{...opts,headers:{"apikey":window._sbKey,"Authorization":"Bearer "+window._sbKey,"Content-Type":"application/json","Prefer":"return=minimal",...(opts.headers||{})}});
  if(!r.ok)return null;try{return await r.json();}catch{return null;}}catch{return null;}
};
async function sbSave(row){
  if(!sbReady()){const p=loadPending();savePending([...p,row]);return;}
  await sbFetch("lecturas?on_conflict=casino_id,maq_id,fecha",{method:"POST",headers:{"Prefer":"resolution=merge-duplicates,return=minimal"},body:JSON.stringify(row)});
}
async function sbSync(){
  if(!sbReady())return 0;
  const pending=loadPending();if(!pending.length)return 0;
  let synced=0;
  for(const row of pending){const r=await sbFetch("lecturas?on_conflict=casino_id,maq_id,fecha",{method:"POST",headers:{"Prefer":"resolution=merge-duplicates,return=minimal"},body:JSON.stringify(row)});if(r!==null)synced++;}
  if(synced===pending.length)savePending([]);
  return synced;
}

// ─── GOOGLE DRIVE ─────────────────────────────────────────────────────────────
async function compressImage(file,maxW=1200,quality=0.72){
  return new Promise(resolve=>{const img=new Image();img.onload=()=>{const scale=Math.min(1,maxW/img.width);const w=Math.round(img.width*scale),h=Math.round(img.height*scale);const c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);c.toBlob(b=>resolve(b),"image/jpeg",quality);};img.src=URL.createObjectURL(file);});
}
const GDClientId=()=>localStorage.getItem("gd_client_id")||"";
const GDFolderId=()=>localStorage.getItem("gd_folder_id")||"";
let gdToken=null;
async function gdAuth(){
  return new Promise((resolve,reject)=>{
    const cid=GDClientId();if(!cid)return reject(new Error("Drive no configurado"));
    const w=window.open(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(cid)}&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=token&scope=https://www.googleapis.com/auth/drive.file&prompt=consent`,"gda","width=500,height=600");
    const t=setInterval(()=>{try{if(w.closed){clearInterval(t);return;}if(w.location.href.includes(window.location.origin)){const hash=w.location.hash;w.close();clearInterval(t);const token=new URLSearchParams(hash.slice(1)).get("access_token");token?(gdToken=token,resolve(token)):reject(new Error("Sin token"));}}catch{}},500);
  });
}
async function gdMkFolder(name,parent){
  if(!gdToken)await gdAuth();
  const q=encodeURIComponent(`name='${name}' and mimeType='application/vnd.google-apps.folder' and '${parent}' in parents and trashed=false`);
  const r=await fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id)`,{headers:{Authorization:"Bearer "+gdToken}});
  const d=await r.json();if(d.files?.length)return d.files[0].id;
  const cr=await fetch("https://www.googleapis.com/drive/v3/files",{method:"POST",headers:{Authorization:"Bearer "+gdToken,"Content-Type":"application/json"},body:JSON.stringify({name,mimeType:"application/vnd.google-apps.folder",parents:[parent]})});
  return(await cr.json()).id;
}
async function gdUpload(blob,name,parent){
  if(!gdToken)await gdAuth();
  const form=new FormData();
  form.append("metadata",new Blob([JSON.stringify({name,parents:[parent]})],{type:"application/json"}));
  form.append("file",blob,name);
  const r=await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",{method:"POST",headers:{Authorization:"Bearer "+gdToken},body:form});
  return r.json();
}
async function uploadPhoto(blob,casinoName,fecha,maqNombre){
  const root=GDFolderId();if(!root)return;
  const cf=await gdMkFolder(casinoName,root);
  const ff=await gdMkFolder(fecha,cf);
  await gdUpload(blob,`${maqNombre}_${fecha}.jpg`,ff);
}

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
function CasinoIcon({cid,size=32}){
  const C=getC();const m=META[cid];const col=C[m.c];
  return<div style={{width:size,height:size,borderRadius:size*.22,background:`linear-gradient(145deg,${col}88,${col})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ico n={m.e}c="#FFF"s={size*.6}/></div>;
}
function MaqIcon({factor,nombre,size=30}){
  const C=getC();const col=maqC(factor,C);
  return<div style={{width:size,height:size,borderRadius:size*.22,background:`linear-gradient(145deg,${col}88,${col})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ico n={maqIcon(nombre)}c="#FFF"s={size*.6}/></div>;
}
function Sec({hdr,children,style={}}){
  const C=getC();
  return<div style={{marginBottom:16,...style}}>{hdr&&<div style={{...T.fn,color:C.label2,paddingLeft:16,paddingBottom:6,textTransform:"uppercase",letterSpacing:.5}}>{hdr}</div>}<div style={{background:C.bg2,borderRadius:12,overflow:"hidden"}}>{children}</div></div>;
}
function Row({ic,icC,lbl,sub,right,arr=true,fn,del,last,noBorder}){
  const C=getC();const[pr,setPr]=useState(false);
  return<div onPointerDown={()=>fn&&setPr(true)}onPointerUp={()=>setPr(false)}onPointerLeave={()=>setPr(false)}onClick={fn}
    style={{display:"flex",alignItems:"center",padding:"10px 14px",background:pr&&fn?C.fill4:"transparent",cursor:fn?"pointer":"default",borderBottom:last||noBorder?"none":`0.5px solid ${C.sep}`,minHeight:44}}>
    {ic&&<div style={{width:30,height:30,borderRadius:8,background:`${icC||C.blue}22`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginRight:10}}><Ico n={ic}c={icC||C.blue}s={18}/></div>}
    <div style={{flex:1,minWidth:0}}>
      <div style={{...T.b,color:del?C.red:C.label,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{lbl}</div>
      {sub&&<div style={{...T.s,color:C.label2,marginTop:1}}>{sub}</div>}
    </div>
    {right&&<div style={{marginLeft:8,flexShrink:0}}>{typeof right==="string"?<span style={{...T.b,color:C.label2}}>{right}</span>:right}</div>}
    {arr&&fn&&<div style={{marginLeft:4,opacity:.4}}><Ico n="chevron"c={C.label}s={16}/></div>}
  </div>;
}
function Nav({title,sub,right=[],sy=0,large=true,back,onBack}){
  const C=getC();const col=large&&sy>48;
  return<div style={{position:"sticky",top:0,zIndex:50,background:col?C.navBg:"transparent",backdropFilter:col?"blur(20px)":"none",borderBottom:col?`0.5px solid ${C.sep}`:"none",transition:"background .2s"}}>
    <div style={{display:"flex",alignItems:"center",height:44,padding:"0 8px",position:"relative"}}>
      {onBack&&<button onClick={onBack}style={{background:"transparent",border:"none",color:C.blue,cursor:"pointer",display:"flex",alignItems:"center",gap:4,padding:"4px 8px"}}>
        <Ico n="back"c={C.blue}s={20}/><span style={{...T.b,color:C.blue}}>{back||"Atrás"}</span>
      </button>}
      {(!large||col)&&<span style={{...T.h,color:C.label,position:"absolute",left:"50%",transform:"translateX(-50%)",whiteSpace:"nowrap"}}>{title}</span>}
      <div style={{flex:1}}/>
      {right.map((r,i)=><button key={i}onClick={r.fn}style={{background:C.fill3,border:"none",borderRadius:99,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",marginLeft:4}}>{typeof r.icon==="string"?<Ico n={r.icon}c={C.label}s={17}/>:r.icon}</button>)}
    </div>
    {large&&<div style={{padding:"0 18px 12px",opacity:col?0:1,transition:"opacity .2s",pointerEvents:col?"none":"auto"}}>
      <div style={{...T.lg,color:C.label}}>{title}</div>
      {sub&&<div style={{...T.s,color:C.label2,marginTop:2}}>{sub}</div>}
    </div>}
  </div>;
}
function Tabs({tab,setTab,color}){
  const C=getC();
  const ts=[{id:"lectura",lbl:"Contadores",icon:"counters"},{id:"camara",lbl:"Cámara",icon:"camera"},{id:"reporte",lbl:"Reporte",icon:"report"},{id:"maquinas",lbl:"Máquinas",icon:"machines"}];
  return<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:C.navBg,backdropFilter:"blur(20px)",borderTop:`0.5px solid ${C.sep}`,zIndex:100,paddingBottom:"max(env(safe-area-inset-bottom,0px),8px)"}}>
    <div style={{display:"flex",justifyContent:"space-around",paddingTop:8}}>
      {ts.map(t=><button key={t.id}onClick={()=>setTab(t.id)}style={{background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"0 8px",minWidth:60}}>
        <Ico n={t.icon}c={tab===t.id?color:C.label2}s={22}/>
        <span style={{...T.cap,color:tab===t.id?color:C.label2,fontWeight:tab===t.id?600:400}}>{t.lbl}</span>
      </button>)}
    </div>
  </div>;
}
function Badge({n,c}){const C=getC();return<div style={{background:c||C.red,borderRadius:99,minWidth:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 5px"}}><span style={{...T.cap,color:"#FFF",fontWeight:700,fontSize:11}}>{n}</span></div>;}


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
    if(paso==="in"){
      if(checkPin(user,pin)){onAuth(user);}
      else{saveLog({action:"login_fail",target:user,device:navigator.userAgent.slice(0,60)});setErr("PIN incorrecto");}
    }
  }
  async function doFaceId(){
    setFL(true);setErr("");
    try{
      if(!hasFaceId(user)){await registerFaceId(user);onAuth(user);}
      else{await authFaceId(user);onAuth(user);}
    }catch(e){setErr(e.message||"Face ID falló");}
    setFL(false);
  }
  if(paso==="sel")return(
    <div style={{minHeight:"100dvh",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:320}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{width:72,height:72,borderRadius:20,background:`linear-gradient(135deg,${C.indigo},${C.blue})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}><Ico n="slot"c="#FFF"s={38}/></div>
          <div style={{...T.lg,color:C.label}}>Casinos</div>
          <div style={{...T.s,color:C.label2,marginTop:4}}>¿Quién eres?</div>
        </div>
        {USERS.map(u=><button key={u}onClick={()=>selUser(u)}style={{width:"100%",background:C.bg2,border:`1px solid ${C.sep}`,borderRadius:14,padding:"14px",marginBottom:10,cursor:"pointer",display:"flex",alignItems:"center",gap:12,textAlign:"left"}}>
          <div style={{width:44,height:44,borderRadius:22,background:uColor(u),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ico n="user"c="#FFF"s={22}/></div>
          <div style={{flex:1}}><div style={{...T.h,color:C.label}}>{u}</div><div style={{...T.fn,color:C.label2,display:"flex",alignItems:"center",gap:4,marginTop:2}}>{hasFaceId(u)&&<Ico n="faceid"c={C.blue}s={13}/>}{localStorage.getItem("cp_"+u)?"PIN configurado":"Primera vez"}</div></div>
          <Ico n="chevron"c={C.label3}s={16}/>
        </button>)}
      </div>
    </div>
  );
  return(
    <div style={{minHeight:"100dvh",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:320}}>
        <button onClick={()=>setPaso("sel")}style={{background:"transparent",border:"none",color:C.blue,cursor:"pointer",display:"flex",alignItems:"center",gap:4,marginBottom:24,...T.b}}>
          <Ico n="back"c={C.blue}s={18}/>Cambiar
        </button>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:56,height:56,borderRadius:28,background:user==="Santiago"?C.indigo:user==="Eliza"?C.pink:C.teal,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px"}}><Ico n="user"c="#FFF"s={28}/></div>
          <div style={{...T.lg,color:C.label,fontSize:26}}>{user}</div>
          <div style={{...T.s,color:C.label2,marginTop:4}}>{paso==="new"?"Crear PIN":paso==="conf"?"Confirmar PIN":"Ingresa tu PIN"}</div>
        </div>
        {paso==="in"&&hasFaceId(user)&&<button onClick={doFaceId}disabled={faceLoading}style={{width:"100%",background:C.fill3,border:`1px solid ${C.sep}`,borderRadius:14,padding:"14px",marginBottom:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <Ico n="faceid"c={C.blue}s={24}/><span style={{...T.h,color:C.blue}}>{faceLoading?"Verificando...":"Entrar con Face ID"}</span>
        </button>}
        <input type="password"inputMode="numeric"value={paso==="conf"?pin2:pin}
          onChange={e=>paso==="conf"?setPin2(e.target.value):setPin(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&go()}placeholder="••••"autoFocus
          style={{width:"100%",background:C.bg2,border:`1px solid ${C.sep}`,borderRadius:12,padding:"13px",color:C.label,...T.lg,fontSize:28,textAlign:"center",boxSizing:"border-box",outline:"none",marginBottom:12,letterSpacing:8}}/>
        {err&&<div style={{...T.s,color:C.red,textAlign:"center",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}><Ico n="warning"c={C.red}s={14}/>{err}</div>}
        <button onClick={go}style={{width:"100%",background:C.blue,border:"none",borderRadius:14,padding:"14px",...T.h,color:"#FFF",cursor:"pointer"}}>{paso==="in"?"Entrar":paso==="new"?"Siguiente":"Confirmar PIN"}</button>
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
  function deleteReading(fecha_del,maqId){if(!confirm("¿Eliminar esta lectura?"))return;setCont(p=>{const n={...p,[cid]:(p[cid]||[]).filter(c=>!(c.f===fecha_del&&c.i===maqId))};saveCont(n);return n;});}
  async function submit(force=false){
    const w=[],items=[];
    for(const mq of mqs){
      const dr=parseFloat(gi(mq.id,"d")),ph=parseFloat(gi(mq.id,"p"));
      if(isNaN(dr)||isNaN(ph))continue;
      const u=getUlt(mq.id);
      if(!force&&u){if(dr<u.drop)w.push(`${mq.nombre}: DROP bajó`);if(ph<u.phys)w.push(`${mq.nombre}: TOTAL OUT bajó`);}
      const util=u?((dr-u.drop)-(ph-u.phys))*mq.factor:null;
      const pp=u?(ph-u.phys)*mq.factor:null;
      const item={i:mq.id,n:mq.nombre,fc:mq.factor,f:fecha,d:dr,p:ph,u:util,pp,src:"manual",pa:pa||null,nota:nota||null};
      items.push(item);
      sbSave({casino_id:cid,maq_id:mq.id,maq_nombre:mq.nombre,factor:mq.factor,fecha,drop_acum:dr,phys_acum:ph,util,phys_periodo:pp,source:"manual",premio_amor:pa||null,nota:nota||null});
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
        <Sec hdr="Historial de lecturas">
          {hist.length===0&&<div style={{padding:"16px",...T.s,color:C.label2,textAlign:"center"}}>Sin lecturas locales</div>}
          {hist.map((c,i)=><div key={i}style={{padding:"12px 14px",borderBottom:i<hist.length-1?`0.5px solid ${C.sep}`:"none"}}>
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
            {c.pa&&<div style={{...T.fn,color:C.yellow,marginTop:3}}>Premio Amor: {fmtE(c.pa)}</div>}
            {c.nota&&<div style={{...T.fn,color:C.label3,marginTop:3,fontStyle:"italic"}}>"{c.nota}"</div>}
          </div>)}
        </Sec>
      </div>
    </div>;
  }
  return<div onScroll={e=>setSy(e.target.scrollTop)}style={{height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
    <Nav title="Contadores"sub={`${m.n}`}sy={sy}right={[{icon:editMode?"check":"edit",fn:()=>setEditMode(!editMode)}]}/>
    <div style={{padding:"10px 14px",paddingBottom:120}}>
      {st==="warn"&&<div style={{background:`${C.orange}18`,border:`1px solid ${C.orange}`,borderRadius:12,padding:14,marginBottom:12}}>
        <div style={{...T.h,color:C.orange,marginBottom:8,display:"flex",alignItems:"center",gap:6}}><Ico n="warning"c={C.orange}s={16}/>Inconsistencias detectadas</div>
        {wrns.map((w,i)=><div key={i}style={{...T.s,color:C.label2,marginBottom:4}}>• {w}</div>)}
        <div style={{display:"flex",gap:10,marginTop:10}}>
          <button onClick={()=>submit(true)}style={{flex:1,background:C.orange,border:"none",borderRadius:10,padding:"10px",...T.h,color:"#000",cursor:"pointer"}}>Guardar igual</button>
          <button onClick={()=>setSt(null)}style={{flex:1,background:C.fill3,border:"none",borderRadius:10,padding:"10px",...T.h,color:C.label,cursor:"pointer"}}>Corregir</button>
        </div>
      </div>}
      <div style={{background:C.bg2,borderRadius:10,padding:"8px 12px",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
        <Ico n="report"c={C.label3}s={16}/><span style={{...T.s,color:C.label2}}>Fecha:</span>
        <input type="date"value={fecha}onChange={e=>setFecha(e.target.value)}style={{background:"transparent",border:"none",color:C.blue,...T.c,cursor:"pointer",flex:1}}/>
      </div>
      {mqs.map(mq=>{
        const u=prevU(mq);const prev=getUlt(mq.id);const col=maqC(mq.factor,C);
        const histCount=(cont[cid]||[]).filter(c=>c.i===mq.id).length;
        return<div key={mq.id}style={{background:C.bg2,borderRadius:12,marginBottom:8,overflow:"hidden"}}>
          <div style={{display:"flex",alignItems:"center",padding:"10px 12px",borderBottom:`0.5px solid ${C.sep}`,cursor:"pointer"}}onClick={()=>editMode&&setViewHist(mq.id)}>
            <MaqIcon factor={mq.factor}nombre={mq.nombre}size={32}/>
            <div style={{flex:1,marginLeft:10}}>
              <div style={{...T.h,color:C.label}}>{mq.nombre}</div>
              <div style={{...T.cap,color:C.label2}}>×{mq.factor}{prev?` · ant: ${fmtF(prev.fecha)}`:""}{histCount>0?` · ${histCount} lecturas`:""}</div>
            </div>
            {u!=null&&<div style={{...T.c,color:u>=0?C.green:C.red,fontWeight:600}}>{fmt(u)}</div>}
            {editMode&&<div style={{marginLeft:8}}><Ico n="chevron"c={C.label3}s={16}/></div>}
          </div>
          <div style={{padding:"10px 12px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            {[["d","TOTAL IN",prev?.drop],["p","TOTAL OUT",prev?.phys],["y","IN-OUT",null]].map(([f,lbl,ph])=>
              <div key={f}>
                <div style={{...T.cap,color:C.label2,marginBottom:3}}>{lbl}</div>
                <input type="number"inputMode="numeric"value={gi(mq.id,f)}onChange={e=>si(mq.id,f,e.target.value)}
                  placeholder={ph!=null?String(ph):f==="y"?"auto":""}
                  style={{width:"100%",background:C.fill3,border:"none",borderRadius:7,padding:"7px 8px",color:f==="y"?C.label2:C.label,...T.s,boxSizing:"border-box",outline:"none",WebkitAppearance:"none"}}/>
              </div>
            )}
          </div>
        </div>;
      })}
      <div style={{background:C.bg2,borderRadius:12,marginBottom:8,padding:"12px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <Ico n="trophy"c={C.yellow}s={18}/><span style={{...T.h,color:C.label}}>Premio del Amor</span>
          <span style={{...T.fn,color:C.label2,marginLeft:"auto"}}>Opcional</span>
        </div>
        <input type="number"inputMode="numeric"value={premioAmor}onChange={e=>setPremioAmor(e.target.value)}placeholder="Monto del premio pagado en efectivo"
          style={{width:"100%",background:C.fill3,border:"none",borderRadius:8,padding:"9px 11px",color:C.yellow,...T.c,boxSizing:"border-box",outline:"none",WebkitAppearance:"none",marginBottom:8}}/>
        <div style={{...T.fn,color:C.label2,marginBottom:8}}>Se descuenta de la caja física del período.</div>
        <div style={{...T.cap,color:C.label2,marginBottom:4}}>Nota del período</div>
        <input value={nota}onChange={e=>setNota(e.target.value)}placeholder="Ej: se llenó hopper en maq 5, festival..."
          style={{width:"100%",background:C.fill3,border:"none",borderRadius:8,padding:"9px 11px",color:C.label,...T.s,boxSizing:"border-box",outline:"none"}}/>
      </div>
      <button onClick={()=>submit(false)}disabled={nOk===0||st==="ok"}
        style={{width:"100%",background:st==="ok"?C.green:nOk===0?C.fill3:color,border:"none",borderRadius:14,padding:"15px",color:nOk===0?C.label2:"#000",...T.h,cursor:nOk===0?"default":"pointer",marginTop:4,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        {st==="ok"?<><Ico n="check"c="#000"s={18}/>Guardado</>:`Guardar ${nOk} máquina${nOk!==1?"s":""}`}
      </button>
    </div>
  </div>;
}

// ─── CAMERA ───────────────────────────────────────────────────────────────────
function Camera({cid,cont,setCont,apiKey,user}){
  const C=getC();const m=META[cid];const d=D[cid];const mqs=d?.m||[];
  const[fecha,setFecha]=useState(today());const[queue,setQueue]=useState([]);
  const[driveStatus,setDriveStatus]=useState("");const[saved,setSaved]=useState(false);
  const fRef=useRef(null);
  const getUlt=useCallback(id=>{const loc=(cont[cid]||[]).filter(c=>c.i===id).sort((a,b)=>b.f.localeCompare(a.f))[0];if(loc)return{d:loc.d,p:loc.p};return d?.ul?.[id]||null;},[cont,cid,d]);
  async function analyzePhoto(blob,idx){
    setQueue(q=>q.map((x,i)=>i===idx?{...x,status:"analyzing"}:x));
    try{
      const mq_list=mqs.map(q=>`${q.id}:${q.nombre}(x${q.factor})`).join(", ");
      const prompt=`Eres experto en contadores de maquinas tragamonedas.\nMaquinas disponibles: ${mq_list}\n\nTareas:\n1. Lee el NUMERO DE MAQUINA de la etiqueta fisica\n2. Lee los contadores: DROP = TOTAL IN, PHYS = TOTAL OUT / COIN OUT, YIELD = TOTAL IN-OUT\n3. Identifica que maquina de la lista corresponde\n\nResponde SOLO JSON sin markdown:\n{"num_maquina":N,"maq_id":"ID","drop":N,"phys":N,"yield":N,"confianza":"alta|media|baja","nota":"breve"}`;
      const b64=await new Promise((ok,rej)=>{const r=new FileReader();r.onload=()=>ok(r.result.split(",")[1]);r.onerror=rej;r.readAsDataURL(blob);});
      const rsp=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:300,messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:"image/jpeg",data:b64}},{type:"text",text:prompt}]}]})});
      const data=await rsp.json();
      if(data.error)throw new Error(data.error.message);
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
    if(GDClientId()&&GDFolderId()){
      setDriveStatus("Subiendo fotos...");
      for(const x of valid){const mq=mqs.find(q=>q.id===x.maqId);try{await uploadPhoto(x.blob,m.n,fecha,mq?.nombre||x.maqId);}catch(e){console.warn(e);}}
      setDriveStatus("✓ Fotos en Drive");setTimeout(()=>setDriveStatus(""),3000);
    }
    setSaved(true);setTimeout(()=>{setQueue([]);setSaved(false);},2500);
  }
  const doneOk=queue.filter(x=>x.status==="done"&&x.maqId).length;
  const cCol=c=>c==="alta"?C.green:c==="media"?C.orange:C.red;
  return<div style={{height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
    <Nav title="Cámara OCR"sub={`${m.n}`}large={false}/>
    <div style={{padding:"10px 14px",paddingBottom:120}}>
      <div style={{background:C.bg2,borderRadius:10,padding:"8px 12px",marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
        <span style={{...T.s,color:C.label2}}>Fecha:</span>
        <input type="date"value={fecha}onChange={e=>setFecha(e.target.value)}style={{background:"transparent",border:"none",color:C.blue,...T.c,cursor:"pointer"}}/>
        <span style={{...T.fn,color:C.label3,marginLeft:"auto"}}>{queue.length} foto{queue.length!==1?"s":""}</span>
      </div>
      <input ref={fRef}type="file"accept="image/*"multiple onChange={e=>{if(e.target.files?.length)addPhotos(e.target.files);e.target.value="";}}style={{display:"none"}}/>
      <div onClick={()=>fRef.current?.click()}style={{background:C.bg2,borderRadius:16,padding:"24px 20px",textAlign:"center",cursor:"pointer",border:`2px dashed ${C.sep}`,marginBottom:12}}>
        <div style={{fontSize:36,marginBottom:6}}>📷</div>
        <div style={{...T.h,color:C.label,marginBottom:3}}>Agregar fotos</div>
        <div style={{...T.fn,color:C.label2}}>Claude detecta el número de máquina automáticamente</div>
      </div>
      {queue.map((x,idx)=>{
        const mq=mqs.find(q=>q.id===x.maqId);const prev=x.maqId?getUlt(x.maqId):null;
        const drop=parseInt(x.eDrop),phys=parseInt(x.ePhys);
        const util=mq&&prev&&!isNaN(drop)&&!isNaN(phys)?((drop-prev.d)-(phys-prev.p))*mq.factor:null;
        const pp=mq&&prev&&!isNaN(phys)?(phys-prev.p)*mq.factor:null;
        return<div key={idx}style={{background:C.bg2,borderRadius:14,marginBottom:10,overflow:"hidden"}}>
          <div style={{position:"relative"}}>
            <img src={x.imgUrl}alt=""style={{width:"100%",maxHeight:180,objectFit:"cover"}}/>
            <div style={{position:"absolute",top:8,left:8,background:"rgba(0,0,0,.75)",borderRadius:20,padding:"4px 10px",...T.fn,color:C.label}}>
              {x.status==="pending"?"⏳ Pendiente":x.status==="analyzing"?"🤖 Analizando...":x.status==="error"?"❌ Error":"✓ Listo"}
            </div>
            {x.result?.confianza&&<div style={{position:"absolute",top:8,right:8,background:`${cCol(x.result.confianza)}22`,border:`1px solid ${cCol(x.result.confianza)}`,borderRadius:20,padding:"4px 10px",...T.cap,color:cCol(x.result.confianza)}}>{x.result.confianza}</div>}
            <button onClick={()=>remove(idx)}style={{position:"absolute",bottom:8,right:8,background:"rgba(0,0,0,.7)",border:"none",borderRadius:16,padding:"4px 10px",...T.cap,color:C.red,cursor:"pointer"}}>✕</button>
          </div>
          {x.status==="error"&&<div style={{padding:"10px 14px",...T.s,color:C.red}}>❌ {x.err}<br/><button onClick={()=>analyzePhoto(x.blob,idx)}style={{background:"transparent",border:`1px solid ${C.blue}`,borderRadius:8,padding:"4px 10px",color:C.blue,cursor:"pointer",marginTop:6,...T.fn}}>Reintentar</button></div>}
          {(x.status==="done"||x.status==="analyzing")&&<div style={{padding:"10px 14px"}}>
            <div style={{marginBottom:10}}>
              <div style={{...T.cap,color:C.label2,marginBottom:4}}>Máquina{x.result?.num_maquina?` — etiqueta #${x.result.num_maquina}`:""}</div>
              <select value={x.maqId}onChange={e=>upd(idx,"maqId",e.target.value)}style={{width:"100%",background:C.fill3,border:`1px solid ${x.maqId?C.sep:C.orange}`,borderRadius:8,padding:"8px 10px",color:x.maqId?C.label:C.orange,...T.c}}>
                <option value="">— Seleccionar máquina —</option>
                {mqs.map(q=><option key={q.id}value={q.id}style={{background:C.bg2}}>{q.nombre} ×{q.factor}</option>)}
              </select>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:8}}>
              {[["eDrop","TOTAL IN",prev?.d],["ePhys","TOTAL OUT",prev?.p],["eYield","IN-OUT",null]].map(([f,lbl,pv])=>{
                const nv=parseInt(x[f]);const bad=pv!=null&&!isNaN(nv)&&nv<pv;
                return<div key={f}>
                  <div style={{...T.cap,color:C.label2,marginBottom:3}}>{lbl}</div>
                  <input type="number"inputMode="numeric"value={x[f]}onChange={e=>upd(idx,f,e.target.value)}
                    style={{width:"100%",background:bad?"rgba(255,69,58,.15)":C.fill3,border:`1px solid ${bad?C.red:"transparent"}`,borderRadius:7,padding:"7px 8px",color:bad?C.red:C.label,...T.s,boxSizing:"border-box",outline:"none",WebkitAppearance:"none"}}/>
                  {bad&&<div style={{...T.cap,color:C.red,marginTop:1}}>⚠️ menor</div>}
                </div>;
              })}
            </div>
            {util!=null&&<div style={{background:C.fill4,borderRadius:8,padding:"8px 10px",display:"flex",justifyContent:"space-between"}}>
              <span style={{...T.fn,color:C.orange}}>Premios {fmtE(pp||0)}</span>
              <span style={{...T.fn,color:util>=0?C.green:C.red,fontWeight:600}}>Utilidad {fmtE(util)}</span>
            </div>}
            {x.result?.nota&&<div style={{...T.cap,color:C.label3,marginTop:6}}>📝 {x.result.nota}</div>}
          </div>}
        </div>;
      })}
      {driveStatus&&<div style={{background:C.bg2,borderRadius:10,padding:"10px 14px",marginBottom:10,...T.s,color:C.label2,textAlign:"center"}}>{driveStatus}</div>}
      {queue.length>0&&<button onClick={confirmAll}disabled={doneOk===0||saved}
        style={{width:"100%",background:saved?C.green:doneOk===0?"#333":C[m.c],border:"none",borderRadius:14,padding:"15px",color:"#000",...T.h,cursor:doneOk===0?"default":"pointer"}}>
        {saved?"✓ Guardado":`Confirmar ${doneOk} máquina${doneOk!==1?"s":""}`}
      </button>}
      {!apiKey&&<div style={{background:"rgba(255,159,10,.1)",border:`1px solid ${C.orange}`,borderRadius:12,padding:12,marginTop:10}}>
        <div style={{...T.h,color:C.orange,marginBottom:4}}>Sin API Key</div>
        <div style={{...T.s,color:C.label2}}>Ve a Ajustes para configurarla.</div>
      </div>}
    </div>
  </div>;
}

// ─── REPORT ───────────────────────────────────────────────────────────────────
function Report({cid,cont,sheetsCont={}}){
  const allCont={...cont,[cid]:[...(cont[cid]||[]),...((sheetsCont[cid]||[]).filter(s=>!(cont[cid]||[]).find(c=>c.f===s.f&&c.i===s.i)))]};
  const C=getC();const m=META[cid];const d=D[cid];const color=C[m.c];
  const[sy,setSy]=useState(0);const[vista,setVista]=useState("balance");
  const[filtro,setFiltro]=useState("todo");const[mes,setMes]=useState(today().slice(0,7));
  const[desde,setDesde]=useState("");const[hasta,setHasta]=useState("");
  const[chartTab,setChartTab]=useState("total");const[tableMode,setTableMode]=useState("byfecha");
  function getBals(){
    const b={};
    (d?.b||[]).forEach(bl=>{b[bl.fecha]={fecha:bl.fecha,util:bl.util_total,phys:bl.phys_total,nota:null};});
    (cont[cid]||[]).forEach(c=>{if(c.u==null)return;if(!b[c.f])b[c.f]={fecha:c.f,util:0,phys:0,nota:c.nota||null,pa:c.pa||0};
      b[c.f].util+=(c.u||0);b[c.f].phys+=(c.pp||0);if(c.pa)b[c.f].pa=(b[c.f].pa||0)+c.pa;if(c.nota)b[c.f].nota=c.nota;});
    return Object.values(b).sort((a,b)=>b.fecha.localeCompare(a.fecha));
  }
  const allBals=getBals();
  function applyFilter(bals){
    if(filtro==="semana"){const d7=new Date(today());d7.setDate(d7.getDate()-6);const s=d7.toISOString().slice(0,10);return bals.filter(b=>b.fecha>=s&&b.fecha<=today());}
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
    const byMaq={};mqs.forEach(mq=>{byMaq[mq.id]={...mq,byDate:{},total:0,periods:0};});
    (cont[cid]||[]).filter(c=>bals.find(b=>b.fecha===c.f)).forEach(c=>{if(byMaq[c.i]){byMaq[c.i].byDate[c.f]={u:c.u,pp:c.pp};byMaq[c.i].total+=(c.u||0);byMaq[c.i].periods++;}});
    return{byMaq:Object.values(byMaq)};
  },[bals,cont,cid,mqs]);
  const chartData=useMemo(()=>[...bals].reverse().slice(-20).map(b=>({fecha:b.fecha.slice(5),util:b.util,phys:b.phys})),[bals]);
  const top5=useMemo(()=>[...maqData.byMaq].sort((a,b)=>b.total-a.total).slice(0,5),[maqData]);

  function exportExcel(){
    const XLSX=window.XLSX;if(!XLSX){const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";s.onload=exportExcel;document.head.appendChild(s);return;}
    const wb=XLSX.utils.book_new();
    const balRows=[["Fecha","Utilidad","Premios","Premio Amor","Caja Física","Nota"],...bals.map(b=>[b.fecha,b.util||0,b.phys||0,b.pa||0,(b.util||0)+(b.phys||0)-(b.pa||0),b.nota||""])];
    balRows.push(["TOTAL",totUtil,totPhys,totPA,totCaja,""]);
    const wsB=XLSX.utils.aoa_to_sheet(balRows);XLSX.utils.book_append_sheet(wb,wsB,"Balance");
    mqs.forEach(mq=>{
      const rows=[["Fecha","TOTAL IN","TOTAL OUT","IN-OUT","Premios","Utilidad"]];
      (cont[cid]||[]).filter(c=>c.i===mq.id).sort((a,b)=>a.f.localeCompare(b.f)).forEach(c=>{rows.push([c.f,c.d,c.p,c.y||"",c.pp||0,c.u||0]);});
      if(rows.length>1){const ws=XLSX.utils.aoa_to_sheet(rows);XLSX.utils.book_append_sheet(wb,ws,mq.nombre.slice(0,31));}
    });
    XLSX.writeFile(wb,`${m.n}_${today()}.xlsx`);
  }
  async function exportPDF(){
    if(!window.jspdf){const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";await new Promise(r=>{s.onload=r;document.head.appendChild(s);});}
    const{jsPDF}=window.jspdf;const doc=new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
    const W=210,M=15;let y=20;
    doc.setFillColor(30,30,46);doc.rect(0,0,W,40,"F");doc.setTextColor(255,255,255);doc.setFontSize(20);doc.setFont("helvetica","bold");
    doc.text(m.n,M,18);doc.setFontSize(11);doc.setFont("helvetica","normal");doc.text(`Período: ${filtro}`,M,28);doc.text(`Generado: ${today()}`,M,35);y=52;
    doc.setTextColor(0,0,0);
    const cards=[[`Utilidad Total`,fmtE(totUtil)],[`Premios`,fmtE(totPhys)],[`Caja Física`,fmtE(totCaja)],[`Promedio`,fmtE(avg)]];
    const cw=(W-M*2-9)/4;
    cards.forEach(([lbl,val],i)=>{const x=M+i*(cw+3);doc.setFillColor(245,245,250);doc.roundedRect(x,y,cw,18,2,2,"F");doc.setFontSize(7);doc.setFont("helvetica","normal");doc.setTextColor(100,100,100);doc.text(lbl,x+3,y+6);doc.setFontSize(9);doc.setFont("helvetica","bold");doc.setTextColor(0,0,0);doc.text(val,x+3,y+14);});
    y+=26;doc.setFontSize(11);doc.setFont("helvetica","bold");doc.text("Historial",M,y);y+=6;
    bals.slice(0,20).forEach((b,row)=>{if(y>270){doc.addPage();y=20;}doc.setFillColor(row%2===0?250:242,row%2===0?250:242,row%2===0?250:255);doc.rect(M,y,W-M*2,6,"F");doc.setFontSize(8);doc.setFont("helvetica","normal");doc.setTextColor(0,0,0);doc.text(fmtF(b.fecha),M+2,y+4.5);doc.text(fmtE(b.util),M+42,y+4.5);doc.text(`Caja: ${fmtE((b.util||0)+(b.phys||0)-(b.pa||0))}`,M+90,y+4.5);y+=6;});
    doc.save(`${m.n}_reporte_${today()}.pdf`);
  }

  function ChartTotal(){
    const pts=chartData;if(!pts.length)return<div style={{...T.s,color:C.label2,textAlign:"center",padding:20}}>Sin datos</div>;
    const maxV=Math.max(...pts.map(p=>Math.abs(p.util)),1);const W2=360,H=120,pad=10;const bw=Math.max(4,Math.floor((W2-pad*2)/pts.length)-2);
    return<svg width="100%"viewBox={`0 0 ${W2} ${H+20}`}style={{overflow:"visible"}}>
      {pts.map((p,i)=>{const x=pad+i*((W2-pad*2)/pts.length);const h=Math.max(2,Math.abs(p.util)/maxV*(H-10));const barY=p.util>=0?H-h:H;const col=p.util>=0?C.green:C.red;
        return<g key={i}><rect x={x}y={barY}width={bw}height={h}fill={col}opacity=".85"rx="2"/>{i%(Math.ceil(pts.length/6))===0&&<text x={x+bw/2}y={H+14}fontSize="8"fill={C.label2}textAnchor="middle">{p.fecha}</text>}</g>;})}
      <line x1={pad}y1={H}x2={W2-pad}y2={H}stroke={C.sep}strokeWidth="1"/>
    </svg>;
  }
  function ChartTop5(){
    if(!top5.length)return<div style={{...T.s,color:C.label2,textAlign:"center",padding:20}}>Sin datos</div>;
    const max=Math.max(...top5.map(m=>Math.abs(m.total)),1);
    return<div style={{padding:"4px 0"}}>
      {top5.map(mq=>{const pct=Math.abs(mq.total)/max*100;const col=maqC(mq.factor,C);
        return<div key={mq.id}style={{marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{...T.fn,color:C.label}}>{mq.nombre}</span><span style={{...T.fn,color:col,fontWeight:600}}>{fmtE(mq.total)}</span></div>
          <div style={{background:C.fill3,borderRadius:4,height:8,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:col,borderRadius:4}}/></div>
        </div>;})}
    </div>;
  }

  return<div onScroll={e=>setSy(e.target.scrollTop)}style={{height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
    <Nav title="Reporte"sub={m.n}sy={sy}right={[{icon:"excel",fn:exportExcel},{icon:"pdf",fn:exportPDF}]}/>
    <div style={{padding:"0 14px",paddingBottom:100}}>
      <div style={{display:"flex",background:C.bg2,borderRadius:10,padding:3,marginBottom:12}}>
        {[["balance","Balance"],["tabla","Tabla"],["grafica","Gráfica"]].map(([v,l])=>
          <button key={v}onClick={()=>setVista(v)}style={{flex:1,background:vista===v?C.bg3:"transparent",border:"none",borderRadius:8,padding:"7px",color:vista===v?C.label:C.label2,cursor:"pointer",...T.s,fontWeight:vista===v?600:400}}>{l}</button>)}
      </div>
      <div style={{display:"flex",gap:6,marginBottom:10,overflowX:"auto",paddingBottom:2}}>
        {[["todo","Todo"],["semana","7 días"],["mes","Mes"],["custom","Rango"]].map(([v,l])=>
          <button key={v}onClick={()=>setFiltro(v)}style={{flexShrink:0,background:filtro===v?color:"transparent",border:`1px solid ${filtro===v?color:C.sep}`,borderRadius:20,padding:"5px 14px",color:filtro===v?"#000":C.label2,cursor:"pointer",...T.fn,fontWeight:filtro===v?600:400}}>{l}</button>)}
      </div>
      {filtro==="mes"&&<div style={{background:C.bg2,borderRadius:10,padding:"8px 12px",marginBottom:10,display:"flex",gap:8,alignItems:"center"}}><span style={{...T.s,color:C.label2}}>Mes:</span><input type="month"value={mes}onChange={e=>setMes(e.target.value)}style={{background:"transparent",border:"none",color:C.blue,...T.c,cursor:"pointer"}}/></div>}
      {filtro==="custom"&&<div style={{background:C.bg2,borderRadius:10,padding:"8px 12px",marginBottom:10,display:"flex",gap:12,flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{...T.fn,color:C.label2}}>Desde</span><input type="date"value={desde}onChange={e=>setDesde(e.target.value)}style={{background:"transparent",border:"none",color:C.blue,...T.fn}}/></div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{...T.fn,color:C.label2}}>Hasta</span><input type="date"value={hasta}onChange={e=>setHasta(e.target.value)}style={{background:"transparent",border:"none",color:C.blue,...T.fn}}/></div>
      </div>}
      <div style={{background:`linear-gradient(135deg,${C.bg2},${C.bg3})`,borderRadius:16,padding:18,marginBottom:12,border:`1px solid ${C.sep}`}}>
        <div style={{...T.fn,color:C.label2,marginBottom:4}}>UTILIDAD TOTAL</div>
        <div style={{...T.lg,color:C.label,marginBottom:12}}>{fmtE(totUtil)}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[["Premios",totPhys,C.orange],["Caja",totCaja,color],[bals.length+" per.",avg,C.label]].map(([lbl,val,col],i)=>
            <div key={i}style={{background:C.fill4,borderRadius:10,padding:"8px 10px"}}><div style={{...T.cap,color:C.label2,marginBottom:2}}>{lbl}</div><div style={{...T.c,color:col,fontWeight:600}}>{fmtE(val)}</div></div>)}
        </div>
        {totPA>0&&<div style={{...T.fn,color:C.yellow,marginTop:8,display:"flex",alignItems:"center",gap:4}}><Ico n="trophy"c={C.yellow}s={13}/>Premio Amor: {fmtE(totPA)}</div>}
      </div>
      {vista==="balance"&&<Sec hdr={`Historial (${bals.length} períodos)`}>
        {bals.length===0&&<div style={{padding:"16px",...T.s,color:C.label2,textAlign:"center"}}>Sin períodos en este rango</div>}
        {bals.map((b,i)=><div key={b.fecha}style={{padding:"10px 14px",borderBottom:i<bals.length-1?`0.5px solid ${C.sep}`:"none"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
            <span style={{...T.c,color:C.label,fontWeight:500}}>{fmtF(b.fecha)}</span>
            <span style={{...T.c,color:(b.util||0)>=0?C.green:C.red,fontWeight:700}}>{fmtE(b.util)}</span>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <span style={{...T.fn,color:C.orange}}>Premios {fmtE(b.phys||0)}</span>
            <span style={{...T.fn,color,fontWeight:600}}>Caja {fmtE((b.util||0)+(b.phys||0)-(b.pa||0))}</span>
            {b.pa>0&&<span style={{...T.fn,color:C.yellow}}>🏆 {fmtE(b.pa)}</span>}
          </div>
          {b.nota&&<div style={{...T.fn,color:C.label3,marginTop:3,fontStyle:"italic"}}>"{b.nota}"</div>}
        </div>)}
      </Sec>}
      {vista==="tabla"&&<>
        <div style={{display:"flex",gap:6,marginBottom:10}}>
          {[["byfecha","Por fecha"],["bymaq","Por máquina"]].map(([v,l])=>
            <button key={v}onClick={()=>setTableMode(v)}style={{background:tableMode===v?color:"transparent",border:`1px solid ${tableMode===v?color:C.sep}`,borderRadius:20,padding:"5px 14px",color:tableMode===v?"#000":C.label2,cursor:"pointer",...T.fn}}>{l}</button>)}
        </div>
        {tableMode==="byfecha"&&<div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",...T.fn,color:C.label,minWidth:500}}>
            <thead><tr style={{background:C.bg2}}>{["Fecha","Máquina","TOTAL IN","TOTAL OUT","IN-OUT","Premios","Utilidad"].map(h=><th key={h}style={{padding:"8px 10px",textAlign:"right",color:C.label2,fontWeight:500,borderBottom:`1px solid ${C.sep}`,whiteSpace:"nowrap",...(h==="Fecha"||h==="Máquina"?{textAlign:"left"}:{})}}>{h}</th>)}</tr></thead>
            <tbody>{(allCont[cid]||[]).filter(c=>c.f&&c.i).sort((a,b)=>b.f.localeCompare(a.f)||((a.n||"").localeCompare(b.n||""))).map((c,i)=><tr key={i}style={{borderBottom:`0.5px solid ${C.sep}`,background:i%2===0?"transparent":C.fill4}}>
              <td style={{padding:"7px 10px"}}>{fmtF(c.f)}</td><td style={{padding:"7px 10px",whiteSpace:"nowrap"}}>{c.n}</td>
              <td style={{padding:"7px 10px",textAlign:"right"}}>{c.d?.toLocaleString()}</td><td style={{padding:"7px 10px",textAlign:"right"}}>{c.p?.toLocaleString()}</td>
              <td style={{padding:"7px 10px",textAlign:"right",color:C.label2}}>{c.y?.toLocaleString()||"—"}</td>
              <td style={{padding:"7px 10px",textAlign:"right",color:C.orange}}>{fmtE(c.pp)}</td>
              <td style={{padding:"7px 10px",textAlign:"right",color:(c.u||0)>=0?C.green:C.red,fontWeight:600}}>{fmtE(c.u)}</td>
            </tr>)}</tbody>
          </table>
        </div>}
        {tableMode==="bymaq"&&<div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",...T.fn,color:C.label,minWidth:400}}>
            <thead><tr style={{background:C.bg2}}>{["Máquina","Factor","Períodos","Prom Util","Total"].map(h=><th key={h}style={{padding:"8px 10px",textAlign:"right",color:C.label2,fontWeight:500,borderBottom:`1px solid ${C.sep}`,whiteSpace:"nowrap",...(h==="Máquina"?{textAlign:"left"}:{})}}>{h}</th>)}</tr></thead>
            <tbody>{[...maqData.byMaq].sort((a,b)=>b.total-a.total).map((mq,i)=><tr key={mq.id}style={{borderBottom:`0.5px solid ${C.sep}`,background:i%2===0?"transparent":C.fill4}}>
              <td style={{padding:"7px 10px"}}>{mq.nombre}</td><td style={{padding:"7px 10px",textAlign:"right",color:maqC(mq.factor,C)}}>×{mq.factor}</td>
              <td style={{padding:"7px 10px",textAlign:"right",color:C.label2}}>{mq.periods}</td>
              <td style={{padding:"7px 10px",textAlign:"right",color:C.blue}}>{mq.periods?fmtE(Math.round(mq.total/mq.periods)):"—"}</td>
              <td style={{padding:"7px 10px",textAlign:"right",color:mq.total>=0?C.green:C.red,fontWeight:600}}>{fmtE(mq.total)}</td>
            </tr>)}</tbody>
          </table>
        </div>}
      </>}
      {vista==="grafica"&&<>
        <div style={{display:"flex",background:C.bg2,borderRadius:10,padding:3,marginBottom:12}}>
          {[["total","Utilidad total"],["top5","Top 5 máquinas"]].map(([v,l])=>
            <button key={v}onClick={()=>setChartTab(v)}style={{flex:1,background:chartTab===v?C.bg3:"transparent",border:"none",borderRadius:8,padding:"7px",color:chartTab===v?C.label:C.label2,cursor:"pointer",...T.s,fontWeight:chartTab===v?600:400}}>{l}</button>)}
        </div>
        <div style={{background:C.bg2,borderRadius:14,padding:"14px 10px 8px"}}>
          <div style={{...T.fn,color:C.label2,marginBottom:8,paddingLeft:4}}>{chartTab==="total"?"Utilidad por período":"Top 5 máquinas"}</div>
          {chartTab==="total"?<ChartTotal/>:<ChartTop5/>}
        </div>
      </>}
    </div>
  </div>;
}

// ─── MACHINES ─────────────────────────────────────────────────────────────────
function Machines({cid,cont}){
  const C=getC();const m=META[cid];const d=D[cid];const mqs=d?.m||[];const[sy,setSy]=useState(0);
  const getUlt=id=>{const loc=(cont[cid]||[]).filter(c=>c.i===id).sort((a,b)=>b.f.localeCompare(a.f))[0];if(loc)return{drop:loc.d,phys:loc.p,fecha:loc.f};const lr=d?.ul?.[id];return lr?{drop:lr.d,phys:lr.p,fecha:"Excel"}:null;};
  return<div onScroll={e=>setSy(e.target.scrollTop)}style={{height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch",background:C.bg}}>
    <Nav title="Máquinas"sub={`${m.n} · ${mqs.length} máqs`}sy={sy}/>
    <div style={{padding:"0 14px",paddingBottom:100}}>
      <Sec hdr={`${mqs.length} máquinas`}>
        {mqs.map((mq,i)=>{
          const lr=getUlt(mq.id);const col=maqC(mq.factor,C);const histCount=(cont[cid]||[]).filter(c=>c.i===mq.id).length;
          return<div key={mq.id}style={{display:"flex",alignItems:"center",padding:"10px 14px",background:C.bg2,borderBottom:i<mqs.length-1?`0.5px solid ${C.sep}`:"none"}}>
            <MaqIcon factor={mq.factor}nombre={mq.nombre}size={32}/>
            <div style={{flex:1,marginLeft:10,minWidth:0}}>
              <div style={{...T.b,color:C.label}}>{mq.nombre}</div>
              <div style={{...T.fn,color:C.label2,marginTop:2}}>{lr?`DROP: ${lr.drop?.toLocaleString()} · OUT: ${lr.phys?.toLocaleString()} · ${fmtF(lr.fecha)}`:"Sin lecturas"}</div>
              {histCount>0&&<div style={{...T.cap,color:C.label3,marginTop:1}}>{histCount} lecturas</div>}
            </div>
            <div style={{background:`${col}22`,borderRadius:8,padding:"3px 8px",flexShrink:0}}><span style={{...T.fn,color:col,fontWeight:600}}>x{mq.factor}</span></div>
          </div>;
        })}
      </Sec>
    </div>
  </div>;
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel({onBack,user}){
  const C=getC();
  const[tab,setTab]=useState("bio");
  const[logs,setLogs]=useState(()=>loadLogs());
  const[timeouts,setTimeoutsState]=useState(()=>loadTimeouts());
  const[msg,setMsg]=useState(null);
  const[expandUser,setExpandUser]=useState(null);
  const[devicesMap,setDevicesMap]=useState(()=>{const m={};USERS.forEach(u=>{m[u]=getFaceDevices(u);});return m;});
  const flash=(txt,isErr=false)=>{setMsg({txt,err:isErr});setTimeout(()=>setMsg(null),3000);};

  // ── BIOMETRÍA ────────────────────────────────────────────────────────────
  function BiometricTab(){
    const[registering,setRegistering]=useState(null);
    async function doRegister(targetUser){
      setRegistering(targetUser);
      try{
        const label=`${targetUser} — ${new Date().toLocaleDateString("es-CO")}`;
        const devs=await registerFaceIdDevice(targetUser,label);
        setDevicesMap(m=>({...m,[targetUser]:devs}));
        saveLog({action:"face_register",target:targetUser,by:user,label});
        flash(`Face ID registrado para ${targetUser}`);
      }catch(e){flash(e.message,true);}
      setRegistering(null);
    }
    function doRevoke(targetUser,credId,devLabel){
      if(!confirm(`¿Revocar "${devLabel}" de ${targetUser}?`))return;
      const devs=revokeFaceDevice(targetUser,credId);
      setDevicesMap(m=>({...m,[targetUser]:devs}));
      saveLog({action:"face_revoke",target:targetUser,by:user,label:devLabel});
      flash("Dispositivo revocado");
    }
    return<div>
      {USERS.map(u=>{
        const devs=devicesMap[u]||[];const canAdd=devs.length<2;
        return<div key={u}style={{background:C.bg2,borderRadius:14,marginBottom:10,overflow:"hidden"}}>
          <div onClick={()=>setExpandUser(expandUser===u?null:u)}
            style={{display:"flex",alignItems:"center",padding:"12px 14px",cursor:"pointer"}}>
            <div style={{width:36,height:36,borderRadius:18,background:u==="Santiago"?C.indigo:u==="Eliza"?C.pink:C.teal,display:"flex",alignItems:"center",justifyContent:"center",marginRight:10,flexShrink:0}}><Ico n="user"c="#FFF"s={18}/></div>
            <div style={{flex:1}}>
              <div style={{...T.h,color:C.label}}>{u}</div>
              <div style={{...T.fn,color:C.label2,marginTop:1}}>{devs.length===0?"Sin Face ID":`${devs.length}/2 dispositivo${devs.length>1?"s":""}`}</div>
            </div>
            <div style={{background:devs.length===0?`${C.red}22`:devs.length<2?`${C.orange}22`:`${C.green}22`,borderRadius:20,padding:"3px 10px",marginRight:6}}>
              <span style={{...T.cap,color:devs.length===0?C.red:devs.length<2?C.orange:C.green,fontWeight:600}}>{devs.length}/2</span>
            </div>
            <Ico n="chevron"c={C.label3}s={16}/>
          </div>
          {expandUser===u&&<div style={{borderTop:`0.5px solid ${C.sep}`}}>
            {devs.length===0&&<div style={{padding:"10px 14px",...T.s,color:C.label2}}>Sin dispositivos registrados</div>}
            {devs.map(dev=><div key={dev.credId}style={{display:"flex",alignItems:"center",padding:"10px 14px",borderBottom:`0.5px solid ${C.sep}`}}>
              <div style={{width:28,height:28,borderRadius:8,background:`${C.indigo}22`,display:"flex",alignItems:"center",justifyContent:"center",marginRight:10}}><Ico n="faceid"c={C.indigo}s={15}/></div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{...T.s,color:C.label,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{dev.label}</div>
                <div style={{...T.cap,color:C.label2,marginTop:1}}>{dev.registeredAt?new Date(dev.registeredAt).toLocaleDateString("es-CO"):"—"}</div>
              </div>
              <button onClick={()=>doRevoke(u,dev.credId,dev.label)}style={{background:`${C.red}18`,border:"none",borderRadius:8,padding:"5px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
                <Ico n="trash"c={C.red}s={14}/><span style={{...T.cap,color:C.red}}>Revocar</span>
              </button>
            </div>)}
            <div style={{padding:"10px 14px"}}>
              <button onClick={()=>doRegister(u)}disabled={!canAdd||registering===u}
                style={{width:"100%",background:canAdd?`${C.indigo}22`:C.fill3,border:`1px solid ${canAdd?C.indigo:C.sep}`,borderRadius:10,padding:"10px",cursor:canAdd?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <Ico n="faceid"c={canAdd?C.indigo:C.label3}s={18}/>
                <span style={{...T.h,color:canAdd?C.indigo:C.label3}}>{registering===u?"Registrando...":canAdd?`Agregar dispositivo (${devs.length}/2)`:"Máximo alcanzado"}</span>
              </button>
              {!canAdd&&<div style={{...T.cap,color:C.label2,marginTop:6,textAlign:"center"}}>Revoca un dispositivo para agregar otro</div>}
            </div>
          </div>}
        </div>;
      })}
    </div>;
  }

  // ── PINS ─────────────────────────────────────────────────────────────────
  function PinsTab(){
    const[newPins,setNewPins]=useState({});const[confirm2,setConfirm2]=useState({});
    const[expanded,setExpanded]=useState(null);const[errs,setErrs]=useState({});
    function resetPin(targetUser){
      const np=newPins[targetUser]||"",cp=confirm2[targetUser]||"";
      if(np.length<4){setErrs(e=>({...e,[targetUser]:"Mínimo 4 dígitos"}));return;}
      if(np!==cp){setErrs(e=>({...e,[targetUser]:"PINs no coinciden"}));return;}
      savePin(targetUser,np);saveLog({action:"pin_reset",target:targetUser,by:user});
      setErrs(e=>({...e,[targetUser]:""}));setNewPins(p=>({...p,[targetUser]:""}));setConfirm2(p=>({...p,[targetUser]:""}));
      setExpanded(null);flash(`PIN de ${targetUser} actualizado`);
    }
    const inpS={width:"100%",background:C.fill3,border:"none",borderRadius:8,padding:"10px",color:C.label,...T.lg,fontSize:24,textAlign:"center",boxSizing:"border-box",outline:"none",marginBottom:8,letterSpacing:8};
    return<div>
      {USERS.filter(u=>u!=="Santiago").map(u=>(
        <div key={u}style={{background:C.bg2,borderRadius:14,marginBottom:10,overflow:"hidden"}}>
          <div onClick={()=>setExpanded(expanded===u?null:u)}style={{display:"flex",alignItems:"center",padding:"12px 14px",cursor:"pointer"}}>
            <div style={{width:36,height:36,borderRadius:18,background:u==="Eliza"?C.pink:C.teal,display:"flex",alignItems:"center",justifyContent:"center",marginRight:10,flexShrink:0}}><Ico n="user"c="#FFF"s={18}/></div>
            <div style={{flex:1}}>
              <div style={{...T.h,color:C.label}}>{u}</div>
              <div style={{...T.fn,color:C.label2,marginTop:1}}>{localStorage.getItem("cp_"+u)?"PIN configurado":"Sin PIN"}</div>
            </div>
            <div style={{background:`${C.orange}22`,borderRadius:20,padding:"3px 10px",marginRight:6}}><span style={{...T.cap,color:C.orange,fontWeight:600}}>Reset</span></div>
            <Ico n="chevron"c={C.label3}s={16}/>
          </div>
          {expanded===u&&<div style={{borderTop:`0.5px solid ${C.sep}`,padding:"12px 14px"}}>
            <div style={{...T.cap,color:C.label2,marginBottom:6}}>Nuevo PIN para {u}</div>
            <input type="password"inputMode="numeric"value={newPins[u]||""}onChange={e=>setNewPins(p=>({...p,[u]:e.target.value}))}placeholder="••••"autoFocus style={inpS}/>
            <div style={{...T.cap,color:C.label2,marginBottom:6}}>Confirmar</div>
            <input type="password"inputMode="numeric"value={confirm2[u]||""}onChange={e=>setConfirm2(p=>({...p,[u]:e.target.value}))}placeholder="••••"style={inpS}/>
            {errs[u]&&<div style={{...T.fn,color:C.red,marginBottom:8,display:"flex",gap:4,alignItems:"center"}}><Ico n="warning"c={C.red}s={13}/>{errs[u]}</div>}
            <button onClick={()=>resetPin(u)}style={{width:"100%",background:C.orange,border:"none",borderRadius:10,padding:"11px",...T.h,color:"#000",cursor:"pointer"}}>Actualizar PIN de {u}</button>
          </div>}
        </div>
      ))}
      <Sec hdr="Tu PIN (Santiago)">
        <Row ic="lock"icC={C.indigo}lbl="Cambiar mi PIN"sub="Ve a Ajustes → Cambiar PIN"arr={false}last/>
      </Sec>
    </div>;
  }

  // ── LOG ──────────────────────────────────────────────────────────────────
  function LogTab(){
    const[filter,setFilter]=useState("all");
    const filtered=filter==="all"?logs:logs.filter(l=>l.target===filter||l.by===filter);
    const aLabel=a=>({login_ok:"Inicio ✓",login_fail:"Fallo PIN ✗",face_register:"Face ID registro",face_revoke:"Face ID revocado",pin_reset:"PIN reseteado",session_timeout:"Sesión expirada",logout:"Cierre sesión",timeout_cfg:"Timeout config"}[a]||a);
    const aColor=a=>({login_ok:C.green,login_fail:C.red,face_register:C.indigo,face_revoke:C.orange,pin_reset:C.yellow,session_timeout:C.orange,logout:C.label2,timeout_cfg:C.blue}[a]||C.label);
    return<div>
      <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
        {[["all","Todo"],...USERS.map(u=>[u,u])].map(([v,l])=>
          <button key={v}onClick={()=>setFilter(v)}style={{flexShrink:0,background:filter===v?C.indigo:"transparent",border:`1px solid ${filter===v?C.indigo:C.sep}`,borderRadius:20,padding:"5px 14px",color:filter===v?"#FFF":C.label2,cursor:"pointer",...T.fn}}>{l}</button>)}
      </div>
      <div style={{background:C.bg2,borderRadius:14,overflow:"hidden"}}>
        {filtered.length===0&&<div style={{padding:20,...T.s,color:C.label2,textAlign:"center"}}>Sin registros</div>}
        {filtered.slice(0,80).map((log,i)=><div key={i}style={{padding:"10px 14px",borderBottom:i<Math.min(filtered.length,80)-1?`0.5px solid ${C.sep}`:"none",display:"flex",alignItems:"flex-start",gap:10}}>
          <div style={{width:8,height:8,borderRadius:4,background:aColor(log.action),marginTop:5,flexShrink:0}}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:1}}>
              <span style={{...T.s,color:aColor(log.action),fontWeight:600}}>{aLabel(log.action)}</span>
              <span style={{...T.cap,color:C.label3}}>{log.ts?new Date(log.ts).toLocaleString("es-CO",{dateStyle:"short",timeStyle:"short"}):""}</span>
            </div>
            <div style={{...T.fn,color:C.label2}}>
              {log.target&&<span>👤 {log.target}</span>}
              {log.by&&log.by!==log.target&&<span style={{marginLeft:8}}>por {log.by}</span>}
              {log.label&&<span style={{marginLeft:8,color:C.label3}}>{log.label}</span>}
            </div>
          </div>
        </div>)}
      </div>
      {filtered.length>80&&<div style={{...T.cap,color:C.label2,textAlign:"center",marginTop:8}}>Mostrando 80 de {filtered.length}</div>}
    </div>;
  }

  // ── TIMEOUT ──────────────────────────────────────────────────────────────
  function TimeoutTab(){
    const options=[0,5,10,15,30,60,120];
    const[local,setLocal]=useState(timeouts);const[saved,setSaved]=useState(false);
    function save(){saveTimeouts(local);setTimeoutsState(local);saveLog({action:"timeout_cfg",by:user,config:JSON.stringify(local)});setSaved(true);setTimeout(()=>setSaved(false),2000);flash("Configuración guardada");}
    return<div>
      <div style={{background:`${C.orange}18`,border:`1px solid ${C.orange}`,borderRadius:12,padding:12,marginBottom:14}}>
        <div style={{...T.s,color:C.orange}}>El timeout aplica a Eliza y Jessica. Al vencer, se solicita PIN o Face ID nuevamente. Santiago no tiene límite.</div>
      </div>
      {USERS.filter(u=>u!=="Santiago").map(u=>(
        <div key={u}style={{background:C.bg2,borderRadius:14,marginBottom:10,padding:"14px"}}>
          <div style={{display:"flex",alignItems:"center",marginBottom:12,gap:10}}>
            <div style={{width:36,height:36,borderRadius:18,background:u==="Eliza"?C.pink:C.teal,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ico n="user"c="#FFF"s={18}/></div>
            <div>
              <div style={{...T.h,color:C.label}}>{u}</div>
              <div style={{...T.fn,color:C.label2}}>{local[u]?`Expira a los ${local[u]} min de inactividad`:"Sin timeout"}</div>
            </div>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {options.map(opt=><button key={opt}onClick={()=>setLocal(l=>({...l,[u]:opt}))}
              style={{background:local[u]===opt||(opt===0&&!local[u])?C.indigo:C.fill3,border:"none",borderRadius:20,padding:"6px 14px",color:local[u]===opt||(opt===0&&!local[u])?"#FFF":C.label2,cursor:"pointer",...T.fn,fontWeight:600}}>
              {opt===0?"Sin límite":opt<60?`${opt} min`:`${opt/60}h`}
            </button>)}
          </div>
        </div>
      ))}
      <button onClick={save}style={{width:"100%",background:saved?C.green:C.indigo,border:"none",borderRadius:14,padding:"15px",...T.h,color:"#FFF",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        {saved?<><Ico n="check"c="#FFF"s={18}/>Guardado</>:"Guardar configuración"}
      </button>
    </div>;
  }

  const tabs=[{id:"bio",lbl:"Biometría",icon:"faceid"},{id:"pins",lbl:"PINs",icon:"lock"},{id:"log",lbl:"Accesos",icon:"table"},{id:"timeout",lbl:"Timeout",icon:"settings"}];

  return<div style={{height:"100dvh",display:"flex",flexDirection:"column",background:C.bg,overflowY:"auto"}}>
    <Nav title="Admin Panel"large={false}back="Inicio"onBack={onBack}/>
    <div style={{margin:"0 14px 12px",background:`linear-gradient(135deg,${C.indigo}22,${C.purple}22)`,border:`1px solid ${C.indigo}44`,borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>
      <Ico n="shield"c={C.indigo}s={20}/>
      <div><div style={{...T.s,color:C.indigo,fontWeight:700}}>Modo Administrador</div><div style={{...T.cap,color:C.label2}}>Solo visible para Santiago</div></div>
    </div>
    {msg&&<div style={{margin:"0 14px 10px",background:msg.err?`${C.red}22`:`${C.green}22`,border:`1px solid ${msg.err?C.red:C.green}`,borderRadius:10,padding:"10px 14px",...T.s,color:msg.err?C.red:C.green,display:"flex",alignItems:"center",gap:6}}>
      <Ico n={msg.err?"warning":"check"}c={msg.err?C.red:C.green}s={14}/>{msg.txt}
    </div>}
    <div style={{display:"flex",background:C.bg2,margin:"0 14px 14px",borderRadius:12,padding:3}}>
      {tabs.map(t=><button key={t.id}onClick={()=>setTab(t.id)}style={{flex:1,background:tab===t.id?C.bg3:"transparent",border:"none",borderRadius:10,padding:"7px 4px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
        <Ico n={t.icon}c={tab===t.id?C.indigo:C.label2}s={18}/>
        <span style={{...T.cap,color:tab===t.id?C.indigo:C.label2,fontWeight:tab===t.id?700:400,fontSize:10}}>{t.lbl}</span>
      </button>)}
    </div>
    <div style={{flex:1,padding:"0 14px",paddingBottom:40,overflowY:"auto"}}>
      {tab==="bio"&&<BiometricTab/>}
      {tab==="pins"&&<PinsTab/>}
      {tab==="log"&&<LogTab/>}
      {tab==="timeout"&&<TimeoutTab/>}
    </div>
  </div>;
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function Settings({onBack,onOut,user,apiKey,onAk,theme,setTheme,pending,onAdmin}){
  const C=getC();
  const[nk,setNk]=useState("");const[sv,setSv]=useState(false);
  const[chPin,setChPin]=useState(false);const[p1,setP1]=useState("");const[p2,setP2]=useState("");const[pErr,setPErr]=useState("");
  const[sbUrl,setSbUrl]=useState(()=>localStorage.getItem("sb_url")||"");
  const[sbKey,setSbKey]=useState(()=>localStorage.getItem("sb_key")||"");
  const[sbSv,setSbSv]=useState(false);
  const[gdId,setGdId]=useState(()=>localStorage.getItem("gd_client_id")||"");
  const[gdFolder,setGdFolder]=useState(()=>localStorage.getItem("gd_folder_id")||"");
  const[gdSv,setGdSv]=useState(false);
  const[syncing,setSyncing]=useState(false);const[syncMsg,setSyncMsg]=useState("");
  function cambiarPin(){if(p1.length<4)return setPErr("Mínimo 4 dígitos");if(p1!==p2)return setPErr("No coinciden");savePin(user,p1);setChPin(false);setP1("");setP2("");setPErr("");alert("PIN actualizado ✓");}
  async function registerFace(){try{await registerFaceId(user);alert("Face ID registrado ✓");}catch(e){alert("Error: "+e.message);}}
  async function doSync(){setSyncing(true);setSyncMsg("");const n=await sbSync();setSyncMsg(n>0?`✓ ${n} lecturas sincronizadas`:"Sin pendientes");setSyncing(false);}
  const inp={width:"100%",background:C.fill3,border:"none",borderRadius:8,padding:"9px 11px",color:C.label,...T.s,boxSizing:"border-box",outline:"none",marginBottom:8};
  return<div style={{height:"100dvh",overflowY:"auto",background:C.bg}}>
    <Nav title="Ajustes"large={false}back="Inicio"onBack={onBack}/>
    <div style={{padding:14,paddingBottom:80}}>
      <Sec hdr={`Usuario — ${user}`}>
        <Row ic="user"icC={C.blue}lbl="Cambiar PIN"arr fn={()=>setChPin(!chPin)}/>
        {chPin&&<div style={{padding:"10px 14px",borderTop:`0.5px solid ${C.sep}`}}>
          <input type="password"inputMode="numeric"value={p1}onChange={e=>setP1(e.target.value)}placeholder="Nuevo PIN"style={{...inp,textAlign:"center",letterSpacing:6}}/>
          <input type="password"inputMode="numeric"value={p2}onChange={e=>setP2(e.target.value)}placeholder="Confirmar"style={{...inp,textAlign:"center",letterSpacing:6}}/>
          {pErr&&<div style={{...T.fn,color:C.red,marginBottom:8,display:"flex",gap:4,alignItems:"center"}}><Ico n="warning"c={C.red}s={13}/>{pErr}</div>}
          <button onClick={cambiarPin}style={{width:"100%",background:C.blue,border:"none",borderRadius:10,padding:"10px",...T.h,color:"#FFF",cursor:"pointer"}}>Guardar PIN</button>
        </div>}
        <Row ic="faceid"icC={C.indigo}lbl={hasFaceId(user)?"Face ID registrado":"Registrar Face ID"}sub={hasFaceId(user)?`${getFaceDevices(user).length}/2 dispositivos`:"iPhone con Face ID"}arr={false}fn={registerFace}last/>
      </Sec>
      <Sec hdr="Apariencia">
        <div style={{padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:30,height:30,borderRadius:8,background:`${C.indigo}22`,display:"flex",alignItems:"center",justifyContent:"center"}}><Ico n={theme==="dark"?"moon":"sunicon"}c={C.indigo}s={18}/></div>
            <div><div style={{...T.b,color:C.label}}>Tema</div><div style={{...T.fn,color:C.label2}}>{theme==="dark"?"Modo oscuro":"Modo claro"}</div></div>
          </div>
          <button onClick={()=>{const t=theme==="dark"?"light":"dark";setTheme(t);_theme=THEMES[t];localStorage.setItem("app_theme",t);}}
            style={{background:theme==="dark"?C.indigo:C.yellow,border:"none",borderRadius:99,width:50,height:28,cursor:"pointer",display:"flex",alignItems:"center",padding:"0 4px",transition:"background .2s"}}>
            <div style={{width:20,height:20,borderRadius:10,background:"#FFF",marginLeft:theme==="dark"?26:0,transition:"margin .2s"}}/>
          </button>
        </div>
      </Sec>
      <Sec hdr="API Key Anthropic (OCR)">
        <div style={{padding:"10px 12px"}}>
          {apiKey&&<div style={{...T.fn,color:C.green,marginBottom:8,display:"flex",gap:4,alignItems:"center"}}><Ico n="check"c={C.green}s={13}/>Configurada: {apiKey.slice(0,20)}...</div>}
          <input value={nk}onChange={e=>setNk(e.target.value)}placeholder="sk-ant-api03-..."style={inp}/>
          <button onClick={()=>{onAk(nk);setSv(true);setTimeout(()=>setSv(false),2000);}}disabled={!nk}
            style={{width:"100%",background:sv?C.green:C.blue,border:"none",borderRadius:10,padding:"11px",...T.h,color:"#FFF",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
            {sv?<><Ico n="check"c="#FFF"s={16}/>Guardado</>:"Guardar API Key"}
          </button>
        </div>
      </Sec>
      <Sec hdr="Supabase">
        <div style={{padding:"10px 12px"}}>
          {sbReady()&&<div style={{...T.fn,color:C.green,marginBottom:8,display:"flex",gap:4,alignItems:"center"}}><Ico n="check"c={C.green}s={13}/>Conectado</div>}
          {pending>0&&<div style={{...T.fn,color:C.orange,marginBottom:8,display:"flex",gap:4,alignItems:"center"}}><Ico n="wifi"c={C.orange}s={13}/>{pending} pendientes</div>}
          <input value={sbUrl}onChange={e=>setSbUrl(e.target.value)}placeholder="https://xxx.supabase.co"style={{...inp,fontFamily:"monospace",fontSize:12}}/>
          <input value={sbKey}onChange={e=>setSbKey(e.target.value)}placeholder="eyJ..."style={{...inp,fontFamily:"monospace",fontSize:12}}/>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{localStorage.setItem("sb_url",sbUrl);localStorage.setItem("sb_key",sbKey);sbLoad();setSbSv(true);setTimeout(()=>setSbSv(false),2000);}}
              style={{flex:1,background:sbSv?C.green:C.indigo,border:"none",borderRadius:10,padding:"11px",...T.h,color:"#FFF",cursor:"pointer"}}>{sbSv?"✓ Guardado":"Guardar"}</button>
            <button onClick={doSync}disabled={syncing}style={{flex:1,background:C.fill3,border:`1px solid ${C.sep}`,borderRadius:10,padding:"11px",...T.h,color:C.label,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              <Ico n="sync"c={C.label}s={16}/>{syncing?"Sincronizando...":"Sincronizar"}
            </button>
          </div>
          {syncMsg&&<div style={{...T.fn,color:C.green,marginTop:6}}>{syncMsg}</div>}
        </div>
      </Sec>
      <Sec hdr="Google Drive (fotos)">
        <div style={{padding:"10px 12px"}}>
          {gdId&&<div style={{...T.fn,color:C.green,marginBottom:8,display:"flex",gap:4,alignItems:"center"}}><Ico n="check"c={C.green}s={13}/>Configurado</div>}
          <input value={gdId}onChange={e=>setGdId(e.target.value)}placeholder="xxx.apps.googleusercontent.com"style={inp}/>
          <input value={gdFolder}onChange={e=>setGdFolder(e.target.value)}placeholder="ID de carpeta raíz en Drive"style={inp}/>
          <button onClick={()=>{localStorage.setItem("gd_client_id",gdId);localStorage.setItem("gd_folder_id",gdFolder);setGdSv(true);setTimeout(()=>setGdSv(false),2000);}}
            style={{width:"100%",background:gdSv?C.green:C.teal,border:"none",borderRadius:10,padding:"11px",...T.h,color:"#000",cursor:"pointer"}}>{gdSv?"✓ Guardado":"Guardar Drive"}</button>
        </div>
      </Sec>
      <Sec hdr="Datos">
        <Row ic="download"icC={C.blue}lbl="Exportar backup"sub="JSON con todos los datos locales"arr={false}fn={()=>{const d={};Object.keys(localStorage).forEach(k=>{d[k]=localStorage.getItem(k);});const bl=new Blob([JSON.stringify(d,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(bl);a.download="casino_backup.json";a.click();}}last/>
      </Sec>
      {user==="Santiago"&&<Sec hdr="Administrador">
        <Row ic="shield"icC={C.indigo}lbl="Admin Panel"sub="Biometría · PINs · Logs de acceso · Timeout"fn={onAdmin}last/>
      </Sec>}
      <Sec hdr="Sesión">
        <Row ic="lock"icC={C.red}lbl={`Cerrar sesión (${user})`}del fn={()=>{saveLog({action:"logout",target:user});onOut();}}arr={false}last/>
      </Sec>
    </div>
  </div>;
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function Home({onSelect,onCfg,user,pending}){
  const C=getC();const[sy,setSy]=useState(0);
  const lastBal=cid=>{const d=D[cid];if(!d?.b?.length)return null;return[...d.b].sort((a,b)=>b.fecha.localeCompare(a.fecha))[0];};
  const total=Object.keys(META).reduce((s,cid)=>s+(lastBal(cid)?.util_total||0),0);
  return<div onScroll={e=>setSy(e.target.scrollTop)}style={{height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
    <Nav title="Mis Casinos"sub={user||""}sy={sy}right={[
      ...(pending>0?[{icon:<div style={{position:"relative"}}><Ico n="sync"c={getC().orange}s={17}/><div style={{position:"absolute",top:-4,right:-4}}><Badge n={pending}c={getC().orange}/></div></div>,fn:()=>{}}]:[]),
      {icon:"settings",fn:onCfg}
    ]}/>
    <div style={{padding:"0 14px",paddingBottom:60}}>
      <div style={{background:`linear-gradient(135deg,${C.bg2},${C.bg3})`,borderRadius:16,padding:18,marginBottom:20,border:`1px solid ${C.sep}`}}>
        <div style={{...T.fn,color:C.label2,marginBottom:4}}>ÚLTIMO PERÍODO — TODOS LOS LOCALES</div>
        <div style={{...T.lg,color:C.label,fontSize:36}}>{fmt(total)}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:14,marginTop:12}}>
          {Object.entries(META).map(([cid,m])=>{const b=lastBal(cid);const col=C[m.c];return<div key={cid}style={{textAlign:"center"}}>
            <div style={{marginBottom:2}}><Ico n={m.e}c={col}s={20}/></div>
            <div style={{...T.cap,color:b?.util_total>=0?C.green:C.red,fontWeight:600}}>{fmt(b?.util_total)}</div>
          </div>;})}
        </div>
      </div>
      <Sec hdr="Locales">
        {Object.entries(META).map(([cid,m],i,a)=>{const b=lastBal(cid);const dd=D[cid];const col=C[m.c];
          return<Row key={cid}ic={m.e}icC={col}lbl={m.n}sub={`${dd?.m?.length||0} máqs · ${m.liq}${b?` · ${b.fecha.slice(5)}`:""}`}
            right={b?<span style={{...T.c,color:b.util_total>=0?C.green:C.red,fontWeight:600}}>{fmt(b.util_total)}</span>:null}
            fn={()=>onSelect(cid)}last={i===a.length-1}/>;
        })}
      </Sec>
      <Sec hdr="Liquidación diaria">
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
  const[sheetsData,setSheetsData]=useState([]);
  useEffect(()=>{loadSheetCont(cid).then(data=>setSheetsData(data));},[cid]);
  const sheetsCont={[cid]:sheetsData};
  return<div style={{height:"100dvh",display:"flex",flexDirection:"column",background:C.bg}}>
    <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,zIndex:200,pointerEvents:"none"}}>
      <button onClick={onBack}style={{pointerEvents:"auto",background:"transparent",border:"none",color:C.blue,cursor:"pointer",padding:"10px 14px",display:"flex",alignItems:"center",gap:4}}>
        <Ico n="back"c={C.blue}s={18}/><span style={{...T.b,color:C.blue}}>Inicio</span>
      </button>
    </div>
    <div style={{flex:1,overflow:"hidden",paddingTop:44}}>
      {tab==="lectura"&&<Counters cid={cid}cont={cont}setCont={setCont}user={user}/>}
      {tab==="camara"&&<Camera cid={cid}cont={cont}setCont={setCont}apiKey={apiKey}user={user}/>}
      {tab==="reporte"&&<Report cid={cid}cont={cont}sheetsCont={sheetsCont}/>}
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
  _theme=THEMES[theme];
  const C=getC();

  useEffect(()=>{
    sbLoad();setAk(loadApiKey());setCont(loadCont());
    const t=localStorage.getItem("app_theme")||"dark";setTheme(t);_theme=THEMES[t];
    setPending(loadPending().length);
    setSc("login");
  },[]);

  useEffect(()=>{
    if(sbReady()&&pending>0){sbSync().then(n=>{if(n>0)setPending(p=>Math.max(0,p-n));});}
  },[]);

  // Session timeout for Eliza & Jessica
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

  function auth(u){
    setUser(u);
    saveLog({action:"login_ok",target:u,device:navigator.userAgent.slice(0,60)});
    setSc("home");
  }
  function out(){saveLog({action:"logout",target:user});setUser(null);setSc("login");}

  const W={width:"100%",maxWidth:430,margin:"0 auto",height:"100dvh",overflow:"hidden",background:C.bg,boxShadow:"0 0 80px rgba(0,0,0,.8)"};
  if(sc==="boot")return<div style={{...W,display:"flex",alignItems:"center",justifyContent:"center",background:C.bg}}><Ico n="slot"c={C.indigo}s={48}/></div>;
  if(sc==="login")return<div style={{...W,background:C.bg}}><Login onAuth={auth}/></div>;
  if(sc==="admin"&&user==="Santiago")return<div style={{...W,background:C.bg}}><AdminPanel onBack={()=>setSc("home")}user={user}/></div>;
  if(sc==="cfg")return<div style={{...W,background:C.bg}}><Settings onBack={()=>setSc(cid?"casino":"home")}onOut={out}user={user}apiKey={apiKey}onAk={k=>{setAk(k);saveApiKey(k);}}theme={theme}setTheme={t=>{setTheme(t);_theme=THEMES[t];}}pending={pending}onAdmin={()=>setSc("admin")}/></div>;
  if(sc==="casino"&&cid)return<div style={{...W,background:C.bg}}><Casino cid={cid}cont={cont}setCont={setCont}apiKey={apiKey}onBack={()=>setSc("home")}user={user}/></div>;
  return<div style={{...W,background:C.bg}}><Home onSelect={id=>{setCid(id);setSc("casino");}}onCfg={()=>setSc("cfg")}user={user}pending={pending}/></div>;
}
