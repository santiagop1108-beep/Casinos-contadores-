import{useState,useEffect,useRef}from"react";

const C={bg:"#000",bg2:"#1C1C1E",bg3:"#2C2C2E",label:"#FFF",label2:"rgba(235,235,245,.6)",label3:"rgba(235,235,245,.3)",blue:"#0A84FF",green:"#30D158",red:"#FF453A",orange:"#FF9F0A",yellow:"#FFD60A",purple:"#BF5AF2",indigo:"#5E5CE6",pink:"#FF375F",teal:"#5AC8FA",fill3:"rgba(118,118,128,.24)",fill4:"rgba(116,116,128,.18)",sep:"rgba(84,84,88,.65)"};
const SF=`-apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif`;
const T={lg:{fontFamily:SF,fontSize:34,fontWeight:700},h:{fontFamily:SF,fontSize:17,fontWeight:600},b:{fontFamily:SF,fontSize:17},c:{fontFamily:SF,fontSize:16},s:{fontFamily:SF,fontSize:15},fn:{fontFamily:SF,fontSize:13},cap:{fontFamily:SF,fontSize:12}};

const D={"obrero":{"m":[{"id":"M1","nombre":"Maq 1","factor":1},{"id":"M2","nombre":"Multi 2","factor":10},{"id":"P3","nombre":"Poker 3","factor":50},{"id":"JW4","nombre":"Jungle Wild 4","factor":1},{"id":"M5","nombre":"Multi 5","factor":10},{"id":"M6","nombre":"Multi 6","factor":10},{"id":"M7","nombre":"Multi 7","factor":10},{"id":"M8","nombre":"Multi 8","factor":10},{"id":"M9","nombre":"Multi 9","factor":10},{"id":"M10","nombre":"Multi 10","factor":10},{"id":"M11","nombre":"Multi 11","factor":10},{"id":"M12","nombre":"Multi 12","factor":10},{"id":"M13","nombre":"Multi 13","factor":10},{"id":"M14","nombre":"Multi 14","factor":10},{"id":"M15","nombre":"Multi 15","factor":10},{"id":"M16","nombre":"Multi 16","factor":10},{"id":"M17","nombre":"Multi 17","factor":10},{"id":"D18","nombre":"Duende 18","factor":1},{"id":"M19","nombre":"Multi 19","factor":10},{"id":"M20","nombre":"Multi 20","factor":10}],"ul":{"M1":{"d":9702000,"p":9549140},"M2":{"d":59100,"p":34510},"P3":{"d":586600,"p":291171},"JW4":{"d":64346000,"p":41506220},"M5":{"d":2182200,"p":1615301},"M6":{"d":6008700,"p":4594519},"M7":{"d":5271300,"p":4053289},"M8":{"d":4597200,"p":3544785},"M9":{"d":5460500,"p":3989081},"M10":{"d":5962100,"p":4391053},"M11":{"d":2911300,"p":2251024},"M12":{"d":6469300,"p":4536904},"M13":{"d":8580900,"p":6891188},"M14":{"d":8061200,"p":5562482},"M15":{"d":10652500,"p":8318218},"M16":{"d":7921700,"p":5374023},"M17":{"d":3689300,"p":2804535},"D18":{"d":48760000,"p":28658960},"M19":{"d":6232400,"p":4724197},"M20":{"d":3063100,"p":2133902}},"b":[{"fecha":"2025-12-16","phys_total":2724130,"util_total":1243870},{"fecha":"2025-12-19","phys_total":4412050,"util_total":573950},{"fecha":"2025-12-21","phys_total":2354780,"util_total":835220},{"fecha":"2025-12-24","phys_total":2938020,"util_total":746980},{"fecha":"2025-12-28","phys_total":1930740,"util_total":2179260},{"fecha":"2025-12-30","phys_total":2964460,"util_total":1552540},{"fecha":"2026-01-03","phys_total":1709270,"util_total":1346730},{"fecha":"2026-01-06","phys_total":2682440,"util_total":845560},{"fecha":"2026-01-09","phys_total":2836090,"util_total":969910},{"fecha":"2026-01-12","phys_total":2402090,"util_total":1029910},{"fecha":"2026-01-16","phys_total":3036360,"util_total":1016640},{"fecha":"2026-01-19","phys_total":2420700,"util_total":1058300},{"fecha":"2026-01-23","phys_total":3422190,"util_total":1209810},{"fecha":"2026-01-27","phys_total":3087930,"util_total":1156070},{"fecha":"2026-01-29","phys_total":2893000,"util_total":1063000},{"fecha":"2026-02-01","phys_total":2881040,"util_total":1896960},{"fecha":"2026-02-04","phys_total":3492170,"util_total":91830},{"fecha":"2026-02-08","phys_total":3892550,"util_total":1813450},{"fecha":"2026-02-12","phys_total":2809810,"util_total":1014190},{"fecha":"2026-02-15","phys_total":2561020,"util_total":1181980},{"fecha":"2026-02-18","phys_total":2571810,"util_total":1872190},{"fecha":"2026-02-22","phys_total":3293800,"util_total":1132280},{"fecha":"2026-02-26","phys_total":2937880,"util_total":1334040},{"fecha":"2026-03-01","phys_total":2503750,"util_total":836250},{"fecha":"2026-03-03","phys_total":3341360,"util_total":147640},{"fecha":"2026-03-06","phys_total":2790890,"util_total":1334110},{"fecha":"2026-03-10","phys_total":4750350,"util_total":1280650}],"a":{"M1":2405,"M2":-90484,"P3":47200,"JW4":125238,"M5":59485,"M6":35627,"M7":34276,"M8":47779,"M9":42950,"M10":32624,"M11":36913,"M12":78378,"M13":56081,"M14":83499,"M15":66052,"M16":85615,"M17":31778,"D18":102660,"M19":51876,"M20":80885}},"vikingos":{"m":[{"id":"P2","nombre":"Poker 2","factor":50},{"id":"P1","nombre":"Poker 1","factor":50},{"id":"P18","nombre":"Poker 18","factor":50},{"id":"M3","nombre":"Multi 3","factor":10},{"id":"M4","nombre":"Multi 4","factor":10},{"id":"M5","nombre":"Multi 5","factor":10},{"id":"M6","nombre":"Multi 6","factor":10},{"id":"M7","nombre":"Multi 7","factor":10},{"id":"M8","nombre":"Multi 8","factor":10},{"id":"M9","nombre":"Multi 9","factor":10},{"id":"M10","nombre":"Multi 10","factor":10},{"id":"B11","nombre":"Bailarin 11","factor":10},{"id":"M12","nombre":"Multi 12","factor":10},{"id":"M13","nombre":"Multi 13","factor":10},{"id":"M14","nombre":"Maq 14","factor":1},{"id":"M15","nombre":"Multi 15","factor":10},{"id":"M16","nombre":"Multi 16","factor":10},{"id":"G17","nombre":"Gaminator 17","factor":10},{"id":"W19","nombre":"WMS 19","factor":1},{"id":"J20","nombre":"Jungle 20","factor":10}],"ul":{"P2":{"d":4188680,"p":2882199},"P1":{"d":6220220,"p":4190673},"P18":{"d":522580,"p":323104},"M3":{"d":25909700,"p":20955946},"M4":{"d":23942700,"p":17914462},"M5":{"d":23902600,"p":19351970},"M6":{"d":27106200,"p":21783934},"M7":{"d":24823100,"p":19950249},"M8":{"d":17130900,"p":12265803},"M9":{"d":26373600,"p":21315030},"M10":{"d":23786000,"p":16928795},"B11":{"d":7542400,"p":6106138},"M12":{"d":4985300,"p":3721801},"M13":{"d":25093900,"p":20749614},"M14":{"d":257428000,"p":192507037},"M15":{"d":21727000,"p":15883406},"M16":{"d":22950700,"p":16449174},"G17":{"d":441620000,"p":370596390},"W19":{"d":226192000,"p":177925200},"J20":{"d":5453000,"p":3922647}},"b":[{"fecha":"2025-12-28","phys_total":4278304,"util_total":3082696},{"fecha":"2025-12-29","phys_total":10869878,"util_total":643122},{"fecha":"2025-12-30","phys_total":5341551,"util_total":1993449},{"fecha":"2025-12-31","phys_total":3601162,"util_total":1923838},{"fecha":"2026-01-02","phys_total":10089204,"util_total":3218796},{"fecha":"2026-01-03","phys_total":4391467,"util_total":134533},{"fecha":"2026-01-04","phys_total":8276965,"util_total":2382035},{"fecha":"2026-01-05","phys_total":5798189,"util_total":2394811},{"fecha":"2026-01-06","phys_total":3467015,"util_total":722985},{"fecha":"2026-01-07","phys_total":4728902,"util_total":1710098},{"fecha":"2026-01-08","phys_total":4717118,"util_total":2091882},{"fecha":"2026-01-09","phys_total":3513510,"util_total":607490},{"fecha":"2026-01-10","phys_total":4698267,"util_total":1185733},{"fecha":"2026-01-11","phys_total":6210283,"util_total":2883717},{"fecha":"2026-01-12","phys_total":5166753,"util_total":1840247},{"fecha":"2026-01-13","phys_total":6747133,"util_total":1255867},{"fecha":"2026-01-14","phys_total":5093077,"util_total":1441923},{"fecha":"2026-01-16","phys_total":5677755,"util_total":2042245},{"fecha":"2026-01-17","phys_total":5573042,"util_total":1564958},{"fecha":"2026-01-18","phys_total":6648453,"util_total":385547},{"fecha":"2026-01-19","phys_total":4213633,"util_total":1939367},{"fecha":"2026-01-20","phys_total":5439752,"util_total":1483248},{"fecha":"2026-01-21","phys_total":3737830,"util_total":1483170},{"fecha":"2026-01-22","phys_total":6625890,"util_total":944110},{"fecha":"2026-01-23","phys_total":4815999,"util_total":248001},{"fecha":"2026-01-24","phys_total":5553128,"util_total":2591872},{"fecha":"2026-01-25","phys_total":6093628,"util_total":2255372},{"fecha":"2026-01-26","phys_total":4163420,"util_total":1733580},{"fecha":"2026-01-27","phys_total":4409650,"util_total":1622350},{"fecha":"2026-01-28","phys_total":5981547,"util_total":2432453},{"fecha":"2026-01-29","phys_total":4373989,"util_total":921011},{"fecha":"2026-01-30","phys_total":4698538,"util_total":976462},{"fecha":"2026-01-31","phys_total":6496209,"util_total":723791},{"fecha":"2026-02-01","phys_total":7461610,"util_total":3630390},{"fecha":"2026-02-02","phys_total":5958945,"util_total":2017055},{"fecha":"2026-02-03","phys_total":4438230,"util_total":1146770},{"fecha":"2026-02-04","phys_total":4496437,"util_total":1228563},{"fecha":"2026-02-05","phys_total":4029420,"util_total":981580},{"fecha":"2026-02-06","phys_total":7043785,"util_total":1462215},{"fecha":"2026-02-07","phys_total":5888110,"util_total":2068890},{"fecha":"2026-02-08","phys_total":5333338,"util_total":2168662},{"fecha":"2026-02-09","phys_total":5258445,"util_total":1618555},{"fecha":"2026-02-10","phys_total":6334470,"util_total":3476530},{"fecha":"2026-02-11","phys_total":3814102,"util_total":1045898},{"fecha":"2026-02-12","phys_total":3454055,"util_total":1677945},{"fecha":"2026-02-13","phys_total":6771751,"util_total":2691249},{"fecha":"2026-02-14","phys_total":6422522,"util_total":3402478},{"fecha":"2026-02-15","phys_total":5880346,"util_total":2242654},{"fecha":"2026-02-16","phys_total":5361237,"util_total":2679763},{"fecha":"2026-02-17","phys_total":5213667,"util_total":1464333},{"fecha":"2026-02-18","phys_total":5957686,"util_total":787314},{"fecha":"2026-02-19","phys_total":5415995,"util_total":1042005},{"fecha":"2026-02-20","phys_total":7049918,"util_total":1989082},{"fecha":"2026-02-21","phys_total":5525333,"util_total":1788667},{"fecha":"2026-02-22","phys_total":5803618,"util_total":2421382},{"fecha":"2026-02-23","phys_total":3909753,"util_total":1549247},{"fecha":"2026-02-24","phys_total":4890350,"util_total":2545650},{"fecha":"2026-02-25","phys_total":5443361,"util_total":286639},{"fecha":"2026-02-26","phys_total":6630554,"util_total":1277446},{"fecha":"2026-02-27","phys_total":4631287,"util_total":1146713},{"fecha":"2026-02-28","phys_total":7282217,"util_total":1427783},{"fecha":"2026-03-01","phys_total":4890391,"util_total":2225609},{"fecha":"2026-03-02","phys_total":4774079,"util_total":1482921},{"fecha":"2026-03-03","phys_total":7522457,"util_total":1373543},{"fecha":"2026-03-04","phys_total":3997116,"util_total":2126884},{"fecha":"2026-03-05","phys_total":3777638,"util_total":2844362},{"fecha":"2026-03-06","phys_total":6086699,"util_total":734301},{"fecha":"2026-03-07","phys_total":5646624,"util_total":2349376},{"fecha":"2026-03-08","phys_total":5076316,"util_total":2317684},{"fecha":"2026-03-09","phys_total":6561217,"util_total":2838783},{"fecha":"2026-03-10","phys_total":6624266,"util_total":2292734}],"a":{"P2":66414,"P1":74064,"P18":64839,"M3":55292,"M4":65383,"M5":51010,"M6":55044,"M7":54706,"M8":74427,"M9":57213,"M10":79005,"B11":93404,"M12":71467,"M13":42329,"M14":150231,"M15":88573,"M16":73055,"G17":1322347,"W19":130331,"J20":-757980}},"faraon":{"m":[{"id":"M1","nombre":"Multi 1","factor":10},{"id":"M2","nombre":"Multi 2","factor":10},{"id":"P3","nombre":"Poker 3","factor":50},{"id":"P4","nombre":"Poker 4","factor":50},{"id":"P5","nombre":"Poker 5","factor":50},{"id":"M6","nombre":"Multi 6","factor":10},{"id":"M7","nombre":"Multi 7","factor":10},{"id":"M8","nombre":"Multi 8","factor":10},{"id":"M9","nombre":"Multi 9","factor":10},{"id":"M10","nombre":"Multi 10","factor":10},{"id":"M11","nombre":"Multi 11","factor":10},{"id":"SA12","nombre":"Stand Alone 12","factor":1},{"id":"A13","nombre":"Aristocrat 13","factor":1},{"id":"M14","nombre":"Multi 14","factor":10},{"id":"M15","nombre":"Multi 15","factor":10},{"id":"W16","nombre":"WMS 16","factor":1},{"id":"C17","nombre":"Clon 17","factor":10},{"id":"M18","nombre":"Multi 18","factor":10},{"id":"M19","nombre":"Multi 19","factor":10},{"id":"W20","nombre":"WMS 20","factor":1}],"ul":{"M1":{"d":17837220,"p":12418794},"M2":{"d":18902500,"p":12897756},"P3":{"d":4704440,"p":3372421},"P4":{"d":6155220,"p":4488611},"P5":{"d":414360,"p":291222},"M6":{"d":17869200,"p":13924443},"M7":{"d":15131300,"p":10932135},"M8":{"d":18899800,"p":14737183},"M9":{"d":16212100,"p":11522033},"M10":{"d":1615900,"p":1170135},"M11":{"d":20664900,"p":16000608},"SA12":{"d":157432000,"p":116702570},"A13":{"d":44983000,"p":31901100},"M14":{"d":18692600,"p":14415998},"M15":{"d":19841800,"p":15579142},"W16":{"d":282156000,"p":184803090},"C17":{"d":23715200,"p":17125308},"M18":{"d":16266000,"p":12004309},"M19":{"d":16221100,"p":11360873},"W20":{"d":109171000,"p":76098810}},"b":[{"fecha":"2025-12-29","phys_total":5558520,"util_total":3403280},{"fecha":"2025-12-30","phys_total":3262020,"util_total":2424180},{"fecha":"2025-12-31","phys_total":3394850,"util_total":1565150},{"fecha":"2026-01-02","phys_total":7148310,"util_total":2279690},{"fecha":"2026-01-03","phys_total":3022050,"util_total":1351950},{"fecha":"2026-01-04","phys_total":3147360,"util_total":884640},{"fecha":"2026-01-05","phys_total":3342300,"util_total":675700},{"fecha":"2026-01-06","phys_total":2778670,"util_total":1174330},{"fecha":"2026-01-07","phys_total":4399640,"util_total":1221360},{"fecha":"2026-01-08","phys_total":4090020,"util_total":781980},{"fecha":"2026-01-09","phys_total":2457390,"util_total":1273610},{"fecha":"2026-01-10","phys_total":3646300,"util_total":1043700},{"fecha":"2026-01-11","phys_total":4844030,"util_total":647970},{"fecha":"2026-01-12","phys_total":2601010,"util_total":327990},{"fecha":"2026-01-13","phys_total":3373120,"util_total":555880},{"fecha":"2026-01-14","phys_total":3033950,"util_total":1056050},{"fecha":"2026-01-16","phys_total":5569410,"util_total":3441590},{"fecha":"2026-01-17","phys_total":3533380,"util_total":3224620},{"fecha":"2026-01-18","phys_total":2362380,"util_total":1484620},{"fecha":"2026-01-19","phys_total":2927560,"util_total":773440},{"fecha":"2026-01-20","phys_total":3802630,"util_total":550370},{"fecha":"2026-01-21","phys_total":2345280,"util_total":599720},{"fecha":"2026-01-23","phys_total":5528500,"util_total":3085500},{"fecha":"2026-01-25","phys_total":4710370,"util_total":4002630},{"fecha":"2026-01-26","phys_total":2045960,"util_total":2332040},{"fecha":"2026-01-28","phys_total":4663840,"util_total":3594160},{"fecha":"2026-01-29","phys_total":3437350,"util_total":-10350},{"fecha":"2026-01-30","phys_total":1912140,"util_total":1800860},{"fecha":"2026-01-31","phys_total":3377390,"util_total":1447610},{"fecha":"2026-02-01","phys_total":3742390,"util_total":2058610},{"fecha":"2026-02-02","phys_total":4557690,"util_total":1073310},{"fecha":"2026-02-04","phys_total":2595730,"util_total":2286270},{"fecha":"2026-02-05","phys_total":2568790,"util_total":1776210},{"fecha":"2026-02-06","phys_total":3862060,"util_total":485940},{"fecha":"2026-02-07","phys_total":3701010,"util_total":1008990},{"fecha":"2026-02-08","phys_total":3427780,"util_total":1502220},{"fecha":"2026-02-09","phys_total":3623910,"util_total":1208090},{"fecha":"2026-02-10","phys_total":4156300,"util_total":413700},{"fecha":"2026-02-12","phys_total":4330880,"util_total":1097120},{"fecha":"2026-02-13","phys_total":1890410,"util_total":1407590},{"fecha":"2026-02-14","phys_total":6018080,"util_total":1799920},{"fecha":"2026-02-15","phys_total":2729690,"util_total":1546310},{"fecha":"2026-02-16","phys_total":1971260,"util_total":1641740},{"fecha":"2026-02-17","phys_total":2693140,"util_total":182860},{"fecha":"2026-02-18","phys_total":2177870,"util_total":1908130},{"fecha":"2026-02-19","phys_total":2688930,"util_total":1339070},{"fecha":"2026-02-20","phys_total":2770600,"util_total":1869400},{"fecha":"2026-02-22","phys_total":6527250,"util_total":2104830},{"fecha":"2026-02-23","phys_total":1624510,"util_total":590410},{"fecha":"2026-02-24","phys_total":2307010,"util_total":758990},{"fecha":"2026-02-26","phys_total":5224820,"util_total":2347180},{"fecha":"2026-02-27","phys_total":2801460,"util_total":871540},{"fecha":"2026-02-28","phys_total":3941050,"util_total":2090950},{"fecha":"2026-03-01","phys_total":2917840,"util_total":1299160},{"fecha":"2026-03-02","phys_total":4654300,"util_total":1263700},{"fecha":"2026-03-03","phys_total":3330370,"util_total":853630},{"fecha":"2026-03-05","phys_total":5293230,"util_total":4119770},{"fecha":"2026-03-06","phys_total":3122050,"util_total":693950},{"fecha":"2026-03-07","phys_total":3397760,"util_total":2376240},{"fecha":"2026-03-08","phys_total":4598850,"util_total":1130150},{"fecha":"2026-03-09","phys_total":4477320,"util_total":1248680},{"fecha":"2026-03-10","phys_total":2801280,"util_total":616720},{"fecha":"2026-03-11","phys_total":4913340,"util_total":256660}],"a":{"M1":253600,"M2":63132,"P3":66697,"P4":74446,"P5":72150,"M6":44186,"M7":48767,"M8":45454,"M9":39413,"M10":27470,"M11":56593,"SA12":87226,"A13":91483,"M14":55027,"M15":38114,"W16":90882,"C17":55310,"M18":46458,"M19":72348,"W20":166828}},"hugo":{"m":[{"id":"G1","nombre":"Gaminator 1","factor":10},{"id":"G2","nombre":"Gaminator 2","factor":10},{"id":"M3","nombre":"Multi 3","factor":10},{"id":"M4","nombre":"Multi 4","factor":10},{"id":"M5","nombre":"multi 5","factor":10},{"id":"P6","nombre":"Poker 6","factor":50},{"id":"P7","nombre":"Poker 7","factor":50},{"id":"M8","nombre":"Multi 8","factor":10},{"id":"M9","nombre":"Multi 9","factor":10},{"id":"M10","nombre":"Multi 10","factor":10},{"id":"M11","nombre":"Multi 11","factor":10}],"ul":{"G1":{"d":71280900,"p":49481563},"G2":{"d":5637200,"p":3618930},"M3":{"d":26026700,"p":19122024},"M4":{"d":27812000,"p":21275373},"M5":{"d":276800,"p":170195},"P6":{"d":2548900,"p":1535052},"P7":{"d":208220,"p":101900},"M8":{"d":165500,"p":91980},"M9":{"d":542300,"p":354904},"M10":{"d":400300,"p":225775},"M11":{"d":871900,"p":515427}},"b":[{"fecha":"2026-01-06","phys_total":1718950,"util_total":1318050},{"fecha":"2026-01-09","phys_total":1899850,"util_total":418150},{"fecha":"2026-01-14","phys_total":1024840,"util_total":2177160},{"fecha":"2026-01-17","phys_total":1498490,"util_total":896510},{"fecha":"2026-01-20","phys_total":1227790,"util_total":530210},{"fecha":"2026-01-24","phys_total":1446950,"util_total":154050},{"fecha":"2026-01-26","phys_total":2170740,"util_total":-378740},{"fecha":"2026-01-30","phys_total":995040,"util_total":1397960},{"fecha":"2026-02-01","phys_total":1174600,"util_total":377400},{"fecha":"2026-02-06","phys_total":1318840,"util_total":1513160},{"fecha":"2026-02-10","phys_total":1457520,"util_total":1243480},{"fecha":"2026-02-14","phys_total":1452180,"util_total":636820},{"fecha":"2026-02-16","phys_total":1839220,"util_total":-177220},{"fecha":"2026-02-20","phys_total":1812300,"util_total":13700},{"fecha":"2026-02-24","phys_total":1359750,"util_total":918250},{"fecha":"2026-02-27","phys_total":1041620,"util_total":440380},{"fecha":"2026-03-03","phys_total":2711340,"util_total":105660},{"fecha":"2026-03-10","phys_total":1436960,"util_total":932040}],"a":{"G1":116736,"G2":105418,"M3":172823,"M4":30415,"M5":33077,"P6":72700,"P7":-20,"M8":14228,"M9":36934,"M10":24927,"M11":51522}},"playarica":{"m":[{"id":"P1","nombre":"Poker 1","factor":50},{"id":"P2","nombre":"Poker 2","factor":50},{"id":"P3","nombre":"Poker 3","factor":50},{"id":"P4","nombre":"Poker 4","factor":50},{"id":"P5","nombre":"Poker 5","factor":50},{"id":"M6","nombre":"Multi 6","factor":10},{"id":"M7","nombre":"Multi 7","factor":10},{"id":"M8","nombre":"multy 8","factor":10},{"id":"G9","nombre":"gaminator 9","factor":10},{"id":"P10","nombre":"Poker 10","factor":50},{"id":"P11","nombre":"Poker 11","factor":50},{"id":"D12","nombre":"Dolphin 12","factor":10},{"id":"G13","nombre":"Gaminator 13","factor":10},{"id":"N14","nombre":"novomaty 14","factor":1},{"id":"P15","nombre":"Poker 15","factor":50},{"id":"P16","nombre":"Poker 16","factor":50}],"ul":{"P1":{"d":409040,"p":273911},"P2":{"d":168520,"p":110565},"P3":{"d":300200,"p":196095},"P4":{"d":660180,"p":433584},"P5":{"d":460060,"p":316863},"M6":{"d":846100,"p":552057},"M7":{"d":350000,"p":245839},"M8":{"d":1403300,"p":1016505},"G9":{"d":3497300,"p":2514709},"P10":{"d":71140,"p":46004},"P11":{"d":120980,"p":72367},"D12":{"d":3867000,"p":2835940},"G13":{"d":2486700,"p":1751761},"N14":{"d":14550000,"p":11096300},"P15":{"d":68880,"p":43765},"P16":{"d":192360,"p":127535}},"b":[{"fecha":"2026-01-03","phys_total":3146940,"util_total":990060},{"fecha":"2026-01-09","phys_total":2800830,"util_total":676170},{"fecha":"2026-01-16","phys_total":2789090,"util_total":1571910},{"fecha":"2026-01-21","phys_total":3004290,"util_total":1413710},{"fecha":"2026-01-25","phys_total":2477180,"util_total":1876820},{"fecha":"2026-01-31","phys_total":2766560,"util_total":1189440},{"fecha":"2026-02-05","phys_total":2550040,"util_total":1572960},{"fecha":"2026-02-08","phys_total":3634750,"util_total":824250},{"fecha":"2026-02-12","phys_total":3068700,"util_total":947300},{"fecha":"2026-02-17","phys_total":2886070,"util_total":990930},{"fecha":"2026-02-23","phys_total":3329340,"util_total":1418660},{"fecha":"2026-02-27","phys_total":2642510,"util_total":1133490},{"fecha":"2026-03-04","phys_total":2696490,"util_total":1161510},{"fecha":"2026-03-08","phys_total":3377940,"util_total":464060}],"a":{"P1":54111,"P2":35692,"P3":102450,"P4":277888,"P5":79134,"M6":63002,"M7":24303,"M8":117742,"G9":80760,"P10":58926,"P11":29826,"D12":297615,"G13":72670,"N14":69286,"P15":68153,"P16":70226}}};

const META={
  obrero:{n:"Casino Obrero",e:"🏛️",c:C.indigo,liq:"3-4 días"},
  vikingos:{n:"Vikingos",e:"⚔️",c:C.orange,liq:"Diario"},
  faraon:{n:"Faraón",e:"🐪",c:C.yellow,liq:"Diario"},
  playarica:{n:"Playa Rica",e:"🌴",c:C.green,liq:"3-4 días"},
  hugo:{n:"Hugo",e:"🃏",c:C.purple,liq:"3-4 días"},
};
const USERS=["Santiago","Eliza","Jessica"];
const fmt=n=>{if(n==null||isNaN(n))return"—";const a=Math.abs(n),s=n<0?"-":"";if(a>=1e6)return s+"$"+(a/1e6).toFixed(1)+"M";if(a>=1000)return s+"$"+(a/1000).toFixed(0)+"K";return s+"$"+a.toLocaleString();};
const fmtE=n=>{if(n==null||isNaN(n))return"—";const s=n<0?"-":"";return s+"$"+Math.abs(Math.round(n)).toLocaleString("es-CO");};
const today=()=>new Date().toISOString().slice(0,10);
const maqC=f=>f===50?C.indigo:f===10?C.blue:C.orange;
const maqE=(f,n)=>{if(f===50)return"🃏";const l=n.toLowerCase();if(l.includes("jungle"))return"🌿";if(l.includes("dolphin"))return"🐬";if(l.includes("gamin"))return"🎮";if(l.includes("wms"))return"⚡";if(l.includes("duende"))return"🧝";if(l.includes("bailar"))return"💃";return"🎰";};
const lt=(hex,a)=>{try{const n=parseInt(hex.slice(1),16);return`rgb(${Math.min(255,((n>>16)&255)+Math.round(a*80))},${Math.min(255,((n>>8)&255)+Math.round(a*80))},${Math.min(255,(n&255)+Math.round(a*80))})`;} catch{return hex;}};

// Simple PIN storage (XOR obfuscation)
const enc=(s,k)=>{let o="";for(let i=0;i<s.length;i++)o+=String.fromCharCode(s.charCodeAt(i)^k.charCodeAt(i%k.length));return btoa(o);};
const dec=(b,k)=>{try{const s=atob(b);let o="";for(let i=0;i<s.length;i++)o+=String.fromCharCode(s.charCodeAt(i)^k.charCodeAt(i%k.length));return JSON.parse(o);}catch{return null;}};
const savePin=(u,pin)=>localStorage.setItem("cp_"+u,enc(JSON.stringify({ok:1,u}),u+":"+pin));
const checkPin=(u,pin)=>{const s=localStorage.getItem("cp_"+u);if(!s)return false;const d=dec(s,u+":"+pin);return d?.ok===1;};
const saveCont=(data)=>{try{localStorage.setItem("cc_v2",JSON.stringify(data));}catch{}};
const loadCont=()=>{try{const s=localStorage.getItem("cc_v2");return s?JSON.parse(s):{};}catch{return{};}};
const saveApiKey=k=>localStorage.setItem("cc_ak",k);
const loadApiKey=()=>localStorage.getItem("cc_ak")||"";


// Primitives
function Ic({color,emoji,sz=30}){return<div style={{width:sz,height:sz,borderRadius:sz*.22,flexShrink:0,background:`linear-gradient(145deg,${lt(color,.3)},${color})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:sz*.56}}>{emoji}</div>;}
function Sec({hdr,children}){return<div style={{marginBottom:16}}>{hdr&&<div style={{...T.fn,color:C.label2,paddingLeft:16,paddingBottom:6,textTransform:"uppercase",letterSpacing:.5}}>{hdr}</div>}<div style={{background:C.bg2,borderRadius:12,overflow:"hidden"}}>{children}</div></div>;}
function Row({ic,icC=C.blue,lbl,sub,right,arr=true,fn,del,last,ind}){
  const[pr,setPr]=useState(false);
  return<div onPointerDown={()=>setPr(true)}onPointerUp={()=>setPr(false)}onPointerLeave={()=>setPr(false)}onClick={fn}
    style={{display:"flex",alignItems:"center",padding:"10px 14px",background:pr&&fn?C.fill4:"transparent",cursor:fn?"pointer":"default",borderBottom:last?"none":`0.5px solid ${C.sep}`,minHeight:44}}>
    {!ind&&ic&&<Ic color={icC}emoji={ic}sz={30}/>}
    <div style={{flex:1,marginLeft:ic&&!ind?10:0,minWidth:0}}>
      <div style={{...T.b,color:del?C.red:C.label,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{lbl}</div>
      {sub&&<div style={{...T.s,color:C.label2,marginTop:1}}>{sub}</div>}
    </div>
    {right&&<div style={{marginLeft:8,marginRight:arr&&fn?4:0,flexShrink:0}}>{typeof right==="string"?<span style={{...T.b,color:C.label2}}>{right}</span>:right}</div>}
    {arr&&fn&&<svg width="8"height="13"viewBox="0 0 8 13"style={{marginLeft:2,opacity:.3}}><path d="M1.5 1.5L6.5 6.5L1.5 11.5"stroke="white"strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"/></svg>}
  </div>;
}
function Nav({title,sub,right=[],sy=0,large=true,back,onBack}){
  const col=large&&sy>48;
  return<div style={{position:"sticky",top:0,zIndex:50,background:"rgba(0,0,0,.9)",backdropFilter:"blur(20px)",borderBottom:`0.5px solid ${col?C.sep:"transparent"}`}}>
    <div style={{display:"flex",alignItems:"center",height:44,padding:"0 8px",position:"relative"}}>
      {onBack&&<button onClick={onBack}style={{background:"transparent",border:"none",color:C.blue,cursor:"pointer",display:"flex",alignItems:"center",gap:3,padding:"4px 8px"}}>
        <svg width="10"height="17"viewBox="0 0 10 17"><path d="M9 1.5L1.5 8.5L9 15.5"stroke={C.blue}strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"/></svg>
        <span style={{...T.b,color:C.blue}}>{back||"Atrás"}</span>
      </button>}
      {(!large||col)&&<span style={{...T.h,color:C.label,position:"absolute",left:"50%",transform:"translateX(-50%)"}}>{title}</span>}
      <div style={{flex:1}}/>
      {right.map((r,i)=><button key={i}onClick={r.fn}style={{background:C.fill3,border:"none",borderRadius:99,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",marginLeft:4}}><span style={{fontSize:18}}>{r.icon}</span></button>)}
    </div>
    {large&&<div style={{padding:"0 18px 12px",opacity:col?0:1,transition:"opacity .2s",pointerEvents:col?"none":"auto"}}>
      <div style={{...T.lg,color:C.label}}>{title}</div>
      {sub&&<div style={{...T.s,color:C.label2,marginTop:2}}>{sub}</div>}
    </div>}
  </div>;
}
function Tabs({tab,setTab,color}){
  const ts=[
    {id:"lectura",lbl:"Contadores",ic:a=><svg width="24"height="24"viewBox="0 0 24 24"><circle cx="12"cy="12"r={a?6:5}fill={a?color:C.label2}/>{[0,45,90,135,180,225,270,315].map(d=><line key={d}x1="12"y1="3"x2="12"y2="5.5"stroke={a?color:C.label2}strokeWidth="2"strokeLinecap="round"transform={`rotate(${d} 12 12)`}/>)}</svg>},
    {id:"camara",lbl:"Cámara",ic:a=><svg width="24"height="21"viewBox="0 0 24 21"><rect x="1"y="5"width="22"height="15"rx="3"stroke={a?color:C.label2}strokeWidth="1.8"fill="none"/><circle cx="12"cy="12.5"r={a?4:3.5}fill={a?color:C.label2}/><path d="M8 5V3.5C8 2.7 8.7 2 9.5 2h5C15.3 2 16 2.7 16 3.5V5"stroke={a?color:C.label2}strokeWidth="1.8"strokeLinecap="round"fill="none"/></svg>},
    {id:"reporte",lbl:"Reporte",ic:a=><svg width="22"height="22"viewBox="0 0 22 22"><rect x="2"y="1"width="18"height="20"rx="3"stroke={a?color:C.label2}strokeWidth="1.8"fill="none"/><line x1="6"y1="7"x2="16"y2="7"stroke={a?color:C.label2}strokeWidth="1.5"strokeLinecap="round"/><line x1="6"y1="11"x2="16"y2="11"stroke={a?color:C.label2}strokeWidth="1.5"strokeLinecap="round"/><line x1="6"y1="15"x2="13"y2="15"stroke={a?color:C.label2}strokeWidth="1.5"strokeLinecap="round"/></svg>},
    {id:"maquinas",lbl:"Máquinas",ic:a=><svg width="22"height="22"viewBox="0 0 22 22"><rect x="1"y="1"width="9"height="9"rx="2"fill={a?color:C.label2}/><rect x="12"y="1"width="9"height="9"rx="2"fill={a?color:C.label2}opacity={a?1:.6}/><rect x="1"y="12"width="9"height="9"rx="2"fill={a?color:C.label2}opacity={a?1:.6}/><rect x="12"y="12"width="9"height="9"rx="2"fill={a?color:C.label2}opacity={a?1:.4}/></svg>},
  ];
  return<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"rgba(0,0,0,.92)",backdropFilter:"blur(20px)",borderTop:`0.5px solid ${C.sep}`,zIndex:100,paddingBottom:"max(env(safe-area-inset-bottom,0px),8px)"}}>
    <div style={{display:"flex",justifyContent:"space-around",paddingTop:8}}>
      {ts.map(t=><button key={t.id}onClick={()=>setTab(t.id)}style={{background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"0 8px",minWidth:60}}>
        {t.ic(tab===t.id)}
        <span style={{...T.cap,color:tab===t.id?color:C.label2,fontWeight:tab===t.id?500:400}}>{t.lbl}</span>
      </button>)}
    </div>
  </div>;
}


// Login
function Login({onAuth}){
  const[user,setUser]=useState(null);const[pin,setPin]=useState("");const[pin2,setPin2]=useState("");
  const[paso,setPaso]=useState("sel");const[err,setErr]=useState("");
  function selUser(u){setUser(u);setPin("");setPin2("");setErr("");setPaso(localStorage.getItem("cp_"+u)?"in":"new");}
  function go(){
    setErr("");
    if(paso==="new"){if(pin.length<4)return setErr("Mínimo 4 dígitos");return setPaso("conf");}
    if(paso==="conf"){if(pin!==pin2)return setErr("PINs no coinciden");savePin(user,pin);onAuth(user);return;}
    if(paso==="in"){if(checkPin(user,pin))onAuth(user);else setErr("PIN incorrecto");}
  }
  const uColor=u=>u==="Santiago"?C.indigo:u==="Eliza"?C.pink:C.teal;
  if(paso==="sel")return(
    <div style={{minHeight:"100dvh",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:320}}>
        <div style={{textAlign:"center",marginBottom:32}}><div style={{fontSize:56,marginBottom:6}}>🎰</div><div style={{...T.lg,color:C.label}}>Casinos</div><div style={{...T.s,color:C.label2,marginTop:4}}>¿Quién eres?</div></div>
        {USERS.map(u=><button key={u}onClick={()=>selUser(u)}style={{width:"100%",background:C.bg2,border:`1px solid ${C.sep}`,borderRadius:14,padding:"14px",marginBottom:10,cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:42,height:42,borderRadius:21,background:uColor(u),display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>👤</div>
          <div style={{textAlign:"left"}}>
            <div style={{...T.h,color:C.label}}>{u}</div>
            <div style={{...T.fn,color:C.label2}}>{localStorage.getItem("cp_"+u)?"PIN configurado":"Primera vez"}</div>
          </div>
          <svg width="8"height="13"viewBox="0 0 8 13"style={{marginLeft:"auto",opacity:.3}}><path d="M1.5 1.5L6.5 6.5L1.5 11.5"stroke="white"strokeWidth="1.8"strokeLinecap="round"strokeLinejoin="round"/></svg>
        </button>)}
      </div>
    </div>
  );
  return(
    <div style={{minHeight:"100dvh",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:320}}>
        <button onClick={()=>setPaso("sel")}style={{background:"transparent",border:"none",color:C.blue,cursor:"pointer",display:"flex",alignItems:"center",gap:4,marginBottom:24,...T.b}}>
          <svg width="10"height="17"viewBox="0 0 10 17"><path d="M9 1.5L1.5 8.5L9 15.5"stroke={C.blue}strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"/></svg>Cambiar
        </button>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:56,height:56,borderRadius:28,background:uColor(user),display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 10px"}}>👤</div>
          <div style={{...T.lg,color:C.label,fontSize:26}}>{user}</div>
          <div style={{...T.s,color:C.label2,marginTop:4}}>{paso==="new"?"Crear PIN":paso==="conf"?"Confirmar PIN":"Ingresa tu PIN"}</div>
        </div>
        <input type="password"inputMode="numeric"value={paso==="conf"?pin2:pin}
          onChange={e=>paso==="conf"?setPin2(e.target.value):setPin(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&go()}placeholder="••••"autoFocus
          style={{width:"100%",background:C.bg2,border:`1px solid ${C.sep}`,borderRadius:12,padding:"13px",color:C.label,...T.lg,fontSize:28,textAlign:"center",boxSizing:"border-box",outline:"none",marginBottom:16,letterSpacing:8}}/>
        {err&&<div style={{...T.s,color:C.red,textAlign:"center",marginBottom:12}}>{err}</div>}
        <button onClick={go}style={{width:"100%",background:C.blue,border:"none",borderRadius:14,padding:"14px",...T.h,color:"#FFF",cursor:"pointer"}}>
          {paso==="in"?"Entrar":paso==="new"?"Siguiente":"Confirmar PIN"}
        </button>
        {paso==="in"&&<button onClick={()=>{if(confirm("¿Resetear PIN de "+user+"?"))localStorage.removeItem("cp_"+user),setPaso("new"),setPin("");}}
          style={{width:"100%",background:"transparent",border:"none",color:C.label2,cursor:"pointer",marginTop:10,...T.s,padding:"8px"}}>Olvidé mi PIN</button>}
      </div>
    </div>
  );
}


// Counters
function Counters({cid,cont,setCont}){
  const m=META[cid];const d=D[cid];const mqs=d?.m||[];
  const[fecha,setFecha]=useState(today());const[inp,setInp]=useState({});
  const[sy,setSy]=useState(0);const[st,setSt]=useState(null);const[wrns,setWrns]=useState([]);
  const gi=(id,f)=>inp[id]?.[f]||"";
  const si=(id,f,v)=>setInp(p=>({...p,[id]:{...(p[id]||{}),[f]:v}}));
  const getUlt=id=>{const loc=(cont[cid]||[]).filter(c=>c.i===id).sort((a,b)=>b.f.localeCompare(a.f))[0];if(loc)return{drop:loc.d,phys:loc.p,fecha:loc.f};const lr=d?.ul?.[id];return lr?{drop:lr.d,phys:lr.p,fecha:"Excel"}:null;};
  const prevU=mq=>{const dr=parseFloat(gi(mq.id,"d")),ph=parseFloat(gi(mq.id,"p"));if(isNaN(dr)||isNaN(ph))return null;const u=getUlt(mq.id);if(!u)return null;return((dr-u.drop)-(ph-u.phys))*mq.factor;};
  const nOk=mqs.filter(mq=>!isNaN(parseFloat(gi(mq.id,"d")))&&!isNaN(parseFloat(gi(mq.id,"p")))).length;
  function submit(){
    const w=[],items=[];
    for(const mq of mqs){
      const dr=parseFloat(gi(mq.id,"d")),ph=parseFloat(gi(mq.id,"p"));
      if(isNaN(dr)||isNaN(ph))continue;
      const u=getUlt(mq.id);
      if(u){if(dr<u.drop)w.push(`${mq.nombre}: DROP bajó`);if(ph<u.phys)w.push(`${mq.nombre}: Phys bajó`);}
      items.push({i:mq.id,n:mq.nombre,fc:mq.factor,f:fecha,d:dr,p:ph,u:u?((dr-u.drop)-(ph-u.phys))*mq.factor:null,pp:u?(ph-u.phys)*mq.factor:null});
    }
    if(w.length){setWrns(w);setSt("warn");return;}
    setCont(p=>{const n={...p,[cid]:[...(p[cid]||[]).filter(c=>c.f!==fecha),...items]};saveCont(n);return n;});
    setSt("ok");setInp({});setTimeout(()=>setSt(null),2500);
  }
  return<div onScroll={e=>setSy(e.target.scrollTop)}style={{height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
    <Nav title="Contadores"sub={`${m.e} ${m.n}`}sy={sy}/>
    <div style={{padding:"10px 14px",paddingBottom:120}}>
      {st==="warn"&&<div style={{background:"rgba(255,159,10,.15)",border:`1px solid ${C.orange}`,borderRadius:12,padding:14,marginBottom:12}}>
        <div style={{...T.h,color:C.orange,marginBottom:8}}>⚠️ Inconsistencias</div>
        {wrns.map((w,i)=><div key={i}style={{...T.s,color:C.label2,marginBottom:4}}>• {w}</div>)}
        <div style={{display:"flex",gap:10,marginTop:10}}>
          <button onClick={()=>{const items=[];for(const mq of mqs){const dr=parseFloat(gi(mq.id,"d")),ph=parseFloat(gi(mq.id,"p"));if(isNaN(dr)||isNaN(ph))continue;const u=getUlt(mq.id);items.push({i:mq.id,n:mq.nombre,fc:mq.factor,f:fecha,d:dr,p:ph,u:u?((dr-u.drop)-(ph-u.phys))*mq.factor:null,pp:u?(ph-u.phys)*mq.factor:null});}setCont(p=>{const n={...p,[cid]:[...(p[cid]||[]).filter(c=>c.f!==fecha),...items]};saveCont(n);return n;});setSt("ok");setInp({});setTimeout(()=>setSt(null),2500);}}style={{flex:1,background:C.orange,border:"none",borderRadius:10,padding:"10px",...T.h,color:"#000",cursor:"pointer"}}>Guardar igual</button>
          <button onClick={()=>setSt(null)}style={{flex:1,background:C.fill3,border:"none",borderRadius:10,padding:"10px",...T.h,color:C.label,cursor:"pointer"}}>Corregir</button>
        </div>
      </div>}
      <div style={{background:C.bg2,borderRadius:10,padding:"8px 12px",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
        <span style={{...T.s,color:C.label2}}>Fecha:</span>
        <input type="date"value={fecha}onChange={e=>setFecha(e.target.value)}style={{background:"transparent",border:"none",color:C.blue,...T.c,cursor:"pointer"}}/>
      </div>
      {mqs.map(mq=>{
        const u=prevU(mq);const prev=getUlt(mq.id);const col=maqC(mq.factor);
        return<div key={mq.id}style={{background:C.bg2,borderRadius:12,marginBottom:8,overflow:"hidden"}}>
          <div style={{display:"flex",alignItems:"center",padding:"10px 12px",borderBottom:`0.5px solid ${C.sep}`}}>
            <Ic color={col}emoji={maqE(mq.factor,mq.nombre)}sz={30}/>
            <div style={{flex:1,marginLeft:10}}>
              <div style={{...T.h,color:C.label}}>{mq.nombre}</div>
              <div style={{...T.cap,color:C.label2}}>×{mq.factor}{prev?` · ${prev.fecha}`:""}</div>
            </div>
            {u!=null&&<div style={{...T.c,color:u>=0?C.green:C.red,fontWeight:600}}>{fmt(u)}</div>}
          </div>
          <div style={{padding:"10px 12px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            {[["d","DROP",prev?.drop],["p","Phys OUT",prev?.phys],["y","YIELD ✓",null]].map(([f,lbl,ph])=>
              <div key={f}>
                <div style={{...T.cap,color:C.label2,marginBottom:3}}>{lbl}</div>
                <input type="number"inputMode="numeric"value={gi(mq.id,f)}onChange={e=>si(mq.id,f,e.target.value)}
                  placeholder={ph!=null?ph.toLocaleString():f==="y"?"opcional":""}
                  style={{width:"100%",background:C.fill3,border:"none",borderRadius:7,padding:"7px 8px",color:f==="y"?C.label2:C.label,...T.s,boxSizing:"border-box",outline:"none",WebkitAppearance:"none"}}/>
              </div>
            )}
          </div>
        </div>;
      })}
      <button onClick={submit}disabled={nOk===0||st==="ok"}
        style={{width:"100%",background:st==="ok"?C.green:nOk===0?"#333":m.c,border:"none",borderRadius:14,padding:"15px",color:"#000",...T.h,cursor:nOk===0?"default":"pointer",marginTop:4}}>
        {st==="ok"?"✓ Guardado":`Guardar ${nOk} máquina${nOk!==1?"s":""}`}
      </button>
    </div>
  </div>;
}


// Camera OCR
function Camera({cid,cont,setCont,apiKey}){
  const m=META[cid];const d=D[cid];const mqs=d?.m||[];
  const[img,setImg]=useState(null);const[proc,setProc]=useState(false);
  const[res,setRes]=useState(null);const[err,setErr]=useState(null);
  const[maqId,setMaqId]=useState(mqs[0]?.id||"");const[fecha,setFecha]=useState(today());
  const[eDrop,setEDrop]=useState("");const[ePhys,setEPhys]=useState("");
  const fRef=useRef(null);
  const prev=d?.ul?.[maqId];

  async function process(file){
    if(!apiKey)return setErr("Configura API key en Ajustes ⚙️");
    setProc(true);setErr(null);setRes(null);setEDrop("");setEPhys("");
    try{
      const b64=await new Promise((ok,rej)=>{const r=new FileReader();r.onload=()=>ok(r.result.split(",")[1]);r.onerror=rej;r.readAsDataURL(file);});
      const mq=mqs.find(q=>q.id===maqId);
      const prevTxt=prev?`Lectura anterior: DROP=${prev.d.toLocaleString()} Phys=${prev.p.toLocaleString()}. Los nuevos valores deben ser mayores.`:"";
      const prompt=`Lee los contadores de esta máquina de casino (${mq?.nombre}, ×${mq?.factor}).\n${prevTxt}\nBusca DROP (=COIN IN/TOTAL IN/ENTRADA) y Physical Coins Out (=COIN OUT/TOTAL OUT/SALIDA/PAID).\nSon contadores ACUMULADOS (números grandes). NUNCA inventes — usa null si no estás seguro.\nResponde SOLO JSON: {"drop":N,"phys":N,"yield":N_O_NULL,"confianza":"alta|media|baja","nota":"breve"}`;
      const rsp=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:200,messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:file.type,data:b64}},{type:"text",text:prompt}]}]})});
      const data=await rsp.json();
      if(data.error)throw new Error(data.error.message);
      const parsed=JSON.parse((data.content?.[0]?.text||"").replace(/```json|```/g,"").trim());
      setRes({...parsed,maqId,fecha});setEDrop(parsed.drop?.toString()||"");setEPhys(parsed.phys?.toString()||"");
    }catch(e){setErr("Error: "+e.message);}
    setProc(false);
  }

  function confirm(){
    const drop=parseInt(eDrop),phys=parseInt(ePhys);
    if(isNaN(drop)||isNaN(phys))return setErr("Corrige los valores");
    const mq=mqs.find(q=>q.id===maqId);
    const prevC=(cont[cid]||[]).filter(c=>c.i===maqId).sort((a,b)=>b.f.localeCompare(a.f))[0]||(prev?{d:prev.d,p:prev.p}:null);
    const u=mq&&prevC?((drop-prevC.d)-(phys-prevC.p))*mq.factor:null;
    const pp=mq&&prevC?(phys-prevC.p)*mq.factor:null;
    setCont(p=>{const n={...p,[cid]:[...(p[cid]||[]).filter(c=>!(c.i===maqId&&c.f===fecha)),{i:maqId,n:mq?.nombre||"",fc:mq?.factor||1,f:fecha,d:drop,p:phys,u,pp,src:"ocr"}]};saveCont(n);return n;});
    setRes(null);setImg(null);setEDrop("");setEPhys("");
  }

  const cCol=res?.confianza==="alta"?C.green:res?.confianza==="media"?C.orange:C.red;
  const mq=mqs.find(q=>q.id===maqId);

  return<div style={{height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
    <Nav title="Cámara OCR"sub={`${m.e} ${m.n}`}large={false}/>
    <div style={{padding:"10px 14px",paddingBottom:100}}>
      <Sec hdr="Máquina">
        <div style={{padding:"10px 12px"}}>
          <select value={maqId}onChange={e=>{setMaqId(e.target.value);setRes(null);setImg(null);setErr(null);}}style={{width:"100%",background:C.fill3,border:"none",borderRadius:8,padding:"9px 12px",color:C.label,...T.c}}>
            {mqs.map(q=><option key={q.id}value={q.id}style={{background:C.bg2}}>{q.nombre} ×{q.factor}</option>)}
          </select>
        </div>
        <div style={{padding:"0 12px 10px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{...T.s,color:C.label2}}>Fecha:</span><input type="date"value={fecha}onChange={e=>setFecha(e.target.value)}style={{background:"transparent",border:"none",color:C.blue,...T.c,cursor:"pointer"}}/></div>
          {prev&&<div style={{...T.cap,color:C.label3,textAlign:"right"}}>Ant: DROP {prev.d.toLocaleString()}<br/>Phys {prev.p.toLocaleString()}</div>}
        </div>
      </Sec>
      <input ref={fRef}type="file"accept="image/*"capture="environment"onChange={e=>{const f=e.target.files?.[0];if(!f)return;setImg(URL.createObjectURL(f));process(f);}}style={{display:"none"}}/>
      {!img
        ?<div onClick={()=>fRef.current?.click()}style={{background:C.bg2,borderRadius:16,padding:"36px 20px",textAlign:"center",cursor:"pointer",border:`2px dashed ${C.sep}`,marginBottom:12}}>
          <div style={{fontSize:44,marginBottom:8}}>📷</div>
          <div style={{...T.h,color:C.label,marginBottom:4}}>Fotografiar contador</div>
          <div style={{...T.s,color:C.label2}}>Claude leerá DROP y Physical Coins Out</div>
        </div>
        :<div style={{position:"relative",marginBottom:10}}>
          <img src={img}alt="contador"style={{width:"100%",borderRadius:12}}/>
          <button onClick={()=>{setImg(null);setRes(null);setErr(null);fRef.current?.click();}}style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,.7)",border:"none",borderRadius:20,padding:"6px 12px",color:C.label,...T.fn,cursor:"pointer"}}>📷 Repetir</button>
        </div>}
      {proc&&<div style={{background:C.bg2,borderRadius:12,padding:"16px",textAlign:"center",marginBottom:10}}><div style={{...T.h,color:m.c}}>🤖 Analizando...</div></div>}
      {err&&<div style={{background:"rgba(255,69,58,.15)",border:`1px solid ${C.red}`,borderRadius:12,padding:12,marginBottom:10}}><div style={{...T.s,color:C.red}}>{err}</div></div>}
      {res&&<div style={{background:C.bg2,borderRadius:12,marginBottom:10,overflow:"hidden"}}>
        <div style={{padding:"10px 14px",borderBottom:`0.5px solid ${C.sep}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{...T.h,color:C.green}}>✓ Lectura detectada</div>
          <div style={{...T.fn,color:cCol,background:`${cCol}20`,padding:"3px 10px",borderRadius:20}}>{res.confianza==="alta"?"✓ Alta":"⚠️ "+(res.confianza==="media"?"Media":"Baja")} confianza</div>
        </div>
        <div style={{padding:"12px 14px"}}>
          <div style={{...T.fn,color:C.label2,marginBottom:8}}>Verifica y corrige si es necesario:</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
            {[["DROP (Entrada acum.)",eDrop,setEDrop,"drop"],["Phys OUT (Salida acum.)",ePhys,setEPhys,"phys"]].map(([lbl,val,setVal,key])=>{
              const pv=prev?.[key==="drop"?"d":"p"];const nv=parseInt(val);const bad=pv&&!isNaN(nv)&&nv<pv;
              return<div key={key}>
                <div style={{...T.cap,color:C.label2,marginBottom:4}}>{lbl}</div>
                <input type="number"inputMode="numeric"value={val}onChange={e=>setVal(e.target.value)}
                  style={{width:"100%",background:bad?"rgba(255,69,58,.15)":C.fill3,border:`1px solid ${bad?C.red:"transparent"}`,borderRadius:8,padding:"9px 10px",color:bad?C.red:C.label,...T.c,boxSizing:"border-box",outline:"none",WebkitAppearance:"none"}}/>
                {bad&&<div style={{...T.cap,color:C.red,marginTop:2}}>⚠️ Menor al anterior ({pv?.toLocaleString()})</div>}
                {pv&&!isNaN(nv)&&nv>=pv&&<div style={{...T.cap,color:C.label3,marginTop:2}}>Δ +{(nv-pv).toLocaleString()}</div>}
              </div>;
            })}
          </div>
          {eDrop&&ePhys&&prev&&(()=>{const dr=parseInt(eDrop),ph=parseInt(ePhys);if(isNaN(dr)||isNaN(ph))return null;const util=((dr-prev.d)-(ph-prev.p))*mq.factor,premios=(ph-prev.p)*mq.factor;return<div style={{background:C.fill4,borderRadius:10,padding:"10px 12px",marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{...T.cap,color:C.label2}}>Premios pagados</div><div style={{...T.c,fontWeight:600,color:C.orange}}>{fmt(premios)}</div></div><div style={{textAlign:"right"}}><div style={{...T.cap,color:C.label2}}>Utilidad neta</div><div style={{...T.c,fontWeight:600,color:util>=0?C.green:C.red}}>{fmt(util)}</div></div></div></div>;})()}
          {res.nota&&<div style={{...T.fn,color:C.label3,marginBottom:10}}>📝 {res.nota}</div>}
          <div style={{display:"flex",gap:10}}>
            <button onClick={confirm}style={{flex:1,background:C.green,border:"none",borderRadius:10,padding:"12px",color:"#000",...T.h,cursor:"pointer"}}>Confirmar</button>
            <button onClick={()=>{setRes(null);setImg(null);setEDrop("");setEPhys("");}}style={{flex:1,background:C.fill3,border:"none",borderRadius:10,padding:"12px",color:C.label,...T.h,cursor:"pointer"}}>Cancelar</button>
          </div>
        </div>
      </div>}
      {!apiKey&&<div style={{background:"rgba(255,159,10,.1)",border:`1px solid ${C.orange}`,borderRadius:12,padding:12}}><div style={{...T.h,color:C.orange,marginBottom:4}}>Sin API Key</div><div style={{...T.s,color:C.label2}}>Ve a Ajustes ⚙️ para configurarla.</div></div>}
    </div>
  </div>;
}


// Report
function Report({cid,cont}){
  const m=META[cid];const d=D[cid];
  const[sy,setSy]=useState(0);const[vista,setVista]=useState("bal");
  const[filtro,setFiltro]=useState("todo");const[mes,setMes]=useState(today().slice(0,7));
  const[desde,setDesde]=useState("");const[hasta,setHasta]=useState("");
  function getBals(){
    const b={};
    (d?.b||[]).forEach(bl=>{b[bl.fecha]={fecha:bl.fecha,util:bl.util_total,phys:bl.phys_total};});
    (cont[cid]||[]).forEach(c=>{if(c.u==null)return;if(!b[c.f])b[c.f]={fecha:c.f,util:0,phys:0};b[c.f].util+=(c.u||0);b[c.f].phys+=(c.pp||0);});
    return Object.values(b).sort((a,b)=>b.fecha.localeCompare(a.fecha));
  }
  const allBals=getBals();
  function applyFilter(bals){
    const h=today();
    if(filtro==="semana"){const d7=new Date(h);d7.setDate(d7.getDate()-6);return bals.filter(b=>b.fecha>=d7.toISOString().slice(0,10)&&b.fecha<=h);}
    if(filtro==="mes")return bals.filter(b=>b.fecha.slice(0,7)===mes);
    if(filtro==="custom"&&desde&&hasta)return bals.filter(b=>b.fecha>=desde&&b.fecha<=hasta);
    return bals;
  }
  const bals=applyFilter(allBals);
  const totUtil=bals.reduce((s,b)=>s+(b.util||0),0);
  const totPhys=bals.reduce((s,b)=>s+(b.phys||0),0);
  const totCaja=totUtil+totPhys;
  const avg=bals.length?totUtil/bals.length:0;
  const mqs=d?.m||[];
  const mStat=mqs.map(mq=>{const avg2=d?.a?.[mq.id]||0;return{...mq,avg:avg2};}).sort((a,b)=>b.avg-a.avg);
  function exportCSV(){const rows=["Fecha,Premios,Utilidad,Caja Fisica",...bals.map(b=>`${b.fecha},${b.phys||0},${b.util},${(b.phys||0)+b.util}`)];const bl=new Blob([rows.join("\n")],{type:"text/csv"});const a=document.createElement("a");a.href=URL.createObjectURL(bl);a.download=`${cid}.csv`;a.click();}
  return<div onScroll={e=>setSy(e.target.scrollTop)}style={{height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
    <Nav title="Reporte"sub={`${m.e} ${m.n}`}sy={sy}right={[{icon:"📤",fn:exportCSV}]}/>
    <div style={{padding:"0 14px",paddingBottom:100}}>
      <div style={{display:"flex",background:C.bg2,borderRadius:10,padding:3,marginBottom:12}}>
        {[["bal","Balance"],["mqs","Máquinas"]].map(([v,l])=><button key={v}onClick={()=>setVista(v)}style={{flex:1,background:vista===v?C.bg3:"transparent",border:"none",borderRadius:8,padding:"7px",color:vista===v?C.label:C.label2,cursor:"pointer",...T.s,fontWeight:vista===v?600:400}}>{l}</button>)}
      </div>
      {vista==="bal"&&<>
        <div style={{display:"flex",gap:6,marginBottom:10,overflowX:"auto",paddingBottom:2}}>
          {[["todo","Todo"],["semana","7 días"],["mes","Mes"],["custom","Rango"]].map(([v,l])=><button key={v}onClick={()=>setFiltro(v)}style={{flexShrink:0,background:filtro===v?m.c:"transparent",border:`1px solid ${filtro===v?m.c:C.sep}`,borderRadius:20,padding:"5px 14px",color:filtro===v?"#000":C.label2,cursor:"pointer",...T.fn,fontWeight:filtro===v?600:400}}>{l}</button>)}
        </div>
        {filtro==="mes"&&<div style={{background:C.bg2,borderRadius:10,padding:"8px 12px",marginBottom:10,display:"flex",alignItems:"center",gap:8}}><span style={{...T.s,color:C.label2}}>Mes:</span><input type="month"value={mes}onChange={e=>setMes(e.target.value)}style={{background:"transparent",border:"none",color:C.blue,...T.c,cursor:"pointer"}}/></div>}
        {filtro==="custom"&&<div style={{background:C.bg2,borderRadius:10,padding:"8px 12px",marginBottom:10,display:"flex",gap:12,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{...T.fn,color:C.label2}}>Desde</span><input type="date"value={desde}onChange={e=>setDesde(e.target.value)}style={{background:"transparent",border:"none",color:C.blue,...T.fn,cursor:"pointer"}}/></div>
          <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{...T.fn,color:C.label2}}>Hasta</span><input type="date"value={hasta}onChange={e=>setHasta(e.target.value)}style={{background:"transparent",border:"none",color:C.blue,...T.fn,cursor:"pointer"}}/></div>
        </div>}
        <div style={{background:"linear-gradient(135deg,#1C1C2E,#0A1628)",borderRadius:16,padding:18,marginBottom:12}}>
          <div style={{...T.fn,color:C.label2,marginBottom:2}}>{filtro==="todo"?"TOTAL ACUMULADO":filtro==="semana"?"ÚLTIMOS 7 DÍAS":filtro==="mes"?`MES ${mes}`:"RANGO"}</div>
          <div style={{...T.lg,color:C.label,marginBottom:12}}>{fmt(totUtil)}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            {[["Premios",totPhys,C.orange],["💼 Caja",totCaja,m.c],[filtro==="todo"?"Prom":bals.length+" per.",filtro==="todo"?avg:null,C.label]].map(([lbl,val,col],i)=>
              <div key={i}style={{background:"rgba(255,255,255,.06)",borderRadius:10,padding:"8px 10px"}}>
                <div style={{...T.cap,color:C.label2,marginBottom:2}}>{lbl}</div>
                <div style={{...T.c,color:col,fontWeight:600}}>{val!=null?fmt(val):bals.length+" per."}</div>
              </div>)}
          </div>
          <div style={{...T.cap,color:C.label3,marginTop:8}}>💼 Caja = Util {fmt(totUtil)} + Premios {fmt(totPhys)}</div>
        </div>
        <Sec hdr={`Historial (${bals.length})`}>
          {bals.length===0&&<div style={{padding:"16px 14px",...T.s,color:C.label2,textAlign:"center"}}>Sin períodos</div>}
          {bals.map((b,i)=><div key={b.fecha}style={{padding:"10px 14px",borderBottom:i<bals.length-1?`0.5px solid ${C.sep}`:"none"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
              <span style={{...T.c,color:C.label,fontWeight:500}}>{b.fecha.slice(8)}-{['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][parseInt(b.fecha.slice(5,7))-1]}-{b.fecha.slice(0,4)}</span>
              <span style={{...T.c,color:b.util>=0?C.green:C.red,fontWeight:700}}>{fmtE(b.util)}</span>
            </div>
            <div style={{display:"flex",gap:12}}>
              <span style={{...T.fn,color:C.orange}}>Premios {fmtE(b.phys||0)}</span>
              <span style={{...T.fn,color:m.c,fontWeight:600}}>💼 {fmtE((b.phys||0)+b.util)}</span>
            </div>
          </div>)}
        </Sec>
      </>}
      {vista==="mqs"&&<Sec hdr="Ranking promedio utilidad">
        {mStat.map((mq,i)=><Row key={mq.id}ic={maqE(mq.factor,mq.nombre)}icC={maqC(mq.factor)}lbl={mq.nombre}sub={`×${mq.factor}`}
          right={<div style={{textAlign:"right"}}><div style={{...T.c,color:mq.avg>=0?C.green:C.red,fontWeight:600}}>{fmt(Math.round(mq.avg))}</div><div style={{...T.cap,color:C.label2}}>prom</div></div>}
          arr={false}last={i===mStat.length-1}/>)}
      </Sec>}
    </div>
  </div>;
}

// Machines
function Machines({cid,cont}){
  const m=META[cid];const d=D[cid];const mqs=d?.m||[];const[sy,setSy]=useState(0);
  const getUlt=id=>{const loc=(cont[cid]||[]).filter(c=>c.i===id).sort((a,b)=>b.f.localeCompare(a.f))[0];if(loc)return{drop:loc.d,phys:loc.p,fecha:loc.f};const lr=d?.ul?.[id];return lr?{drop:lr.d,phys:lr.p,fecha:"Excel"}:null;};
  return<div onScroll={e=>setSy(e.target.scrollTop)}style={{height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
    <Nav title="Máquinas"sub={`${m.e} ${m.n} · ${mqs.length} máqs`}sy={sy}/>
    <div style={{padding:"0 14px",paddingBottom:100}}>
      <Sec hdr={`${mqs.length} máquinas`}>
        {mqs.map((mq,i)=>{const lr=getUlt(mq.id);return<Row key={mq.id}ic={maqE(mq.factor,mq.nombre)}icC={maqC(mq.factor)}
          lbl={mq.nombre}sub={lr?`DROP: ${lr.drop.toLocaleString()} · Phys: ${lr.phys.toLocaleString()} · ${lr.fecha}`:"Sin lecturas"}
          right={`×${mq.factor}`}arr={false}last={i===mqs.length-1}/>;
        })}
      </Sec>
    </div>
  </div>;
}


// Casino Shell + Home + Settings + Root
function Casino({cid,cont,setCont,apiKey,onBack}){
  const[tab,setTab]=useState("lectura");const m=META[cid];
  return<div style={{height:"100dvh",display:"flex",flexDirection:"column",background:C.bg}}>
    <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,zIndex:200,pointerEvents:"none"}}>
      <button onClick={onBack}style={{pointerEvents:"auto",background:"transparent",border:"none",color:C.blue,cursor:"pointer",padding:"10px 14px",display:"flex",alignItems:"center",gap:3}}>
        <svg width="10"height="17"viewBox="0 0 10 17"><path d="M9 1.5L1.5 8.5L9 15.5"stroke={C.blue}strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"/></svg>
        <span style={{...T.b,color:C.blue}}>Casinos</span>
      </button>
    </div>
    <div style={{flex:1,overflow:"hidden",paddingTop:44}}>
      {tab==="lectura"&&<Counters cid={cid}cont={cont}setCont={setCont}/>}
      {tab==="camara"&&<Camera cid={cid}cont={cont}setCont={setCont}apiKey={apiKey}/>}
      {tab==="reporte"&&<Report cid={cid}cont={cont}/>}
      {tab==="maquinas"&&<Machines cid={cid}cont={cont}/>}
    </div>
    <Tabs tab={tab}setTab={setTab}color={m.c}/>
  </div>;
}

function Home({onSelect,onCfg,user}){
  const[sy,setSy]=useState(0);
  const lastBal=cid=>{const d=D[cid];if(!d?.b?.length)return null;return[...d.b].sort((a,b)=>b.fecha.localeCompare(a.fecha))[0];};
  const total=Object.keys(META).reduce((s,cid)=>s+(lastBal(cid)?.util_total||0),0);
  return<div onScroll={e=>setSy(e.target.scrollTop)}style={{height:"100%",overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
    <Nav title="Mis Casinos"sub={`${user||""} · Último período: ${fmt(total)}`}sy={sy}right={[{icon:"⚙️",fn:onCfg}]}/>
    <div style={{padding:"0 14px",paddingBottom:60}}>
      <div style={{background:"linear-gradient(135deg,#1C1C2E,#0A1628)",borderRadius:16,padding:18,marginBottom:20}}>
        <div style={{...T.fn,color:C.label2,marginBottom:4}}>UTILIDAD TOTAL — ÚLTIMO PERÍODO</div>
        <div style={{...T.lg,color:C.label,fontSize:38}}>{fmt(total)}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:14,marginTop:12}}>
          {Object.entries(META).map(([cid,m])=>{const b=lastBal(cid);return<div key={cid}style={{textAlign:"center"}}><div style={{fontSize:18}}>{m.e}</div><div style={{...T.cap,color:b?.util_total>=0?C.green:C.red,fontWeight:600}}>{fmt(b?.util_total)}</div></div>;})}
        </div>
      </div>
      <Sec hdr="Locales">
        {Object.entries(META).map(([cid,m],i,a)=>{const b=lastBal(cid);const d=D[cid];return<Row key={cid}ic={m.e}icC={m.c}lbl={m.n}sub={`${d?.m?.length||0} máqs · ${m.liq}${b?` · ${b.fecha.slice(5)}`:""}`}right={b?<span style={{...T.c,color:b.util_total>=0?C.green:C.red,fontWeight:600}}>{fmt(b.util_total)}</span>:null}fn={()=>onSelect(cid)}last={i===a.length-1}/>;
        })}
      </Sec>
      <Sec hdr="Liquidación diaria">
        {["vikingos","faraon"].map((cid,i)=>{const m=META[cid];const b=lastBal(cid);return<Row key={cid}ic={m.e}icC={m.c}lbl={`Ingresar hoy — ${m.n}`}sub={`Última: ${b?.fecha||"—"}`}fn={()=>onSelect(cid)}last={i===1}/>;
        })}
      </Sec>
    </div>
  </div>;
}

function Settings({onBack,onOut,user,apiKey,onAk}){
  const[nk,setNk]=useState("");const[sv,setSv]=useState(false);
  const[chPin,setChPin]=useState(false);const[p1,setP1]=useState("");const[p2,setP2]=useState("");const[pErr,setPErr]=useState("");
  function cambiarPin(){if(p1.length<4)return setPErr("Mínimo 4 dígitos");if(p1!==p2)return setPErr("No coinciden");savePin(user,p1);setChPin(false);setP1("");setP2("");setPErr("");alert("PIN actualizado ✓");}
  return<div style={{height:"100dvh",overflowY:"auto",background:C.bg}}>
    <Nav title="Ajustes"large={false}back="Casinos"onBack={onBack}/>
    <div style={{padding:14,paddingBottom:60}}>
      <Sec hdr={`Usuario: ${user}`}>
        <Row ind lbl="Cambiar mi PIN"arr={true}fn={()=>setChPin(!chPin)}last/>
        {chPin&&<div style={{padding:"10px 14px",borderTop:`0.5px solid ${C.sep}`}}>
          <input type="password"inputMode="numeric"value={p1}onChange={e=>setP1(e.target.value)}placeholder="Nuevo PIN"style={{width:"100%",background:C.fill3,border:"none",borderRadius:8,padding:"9px 11px",color:C.label,...T.c,boxSizing:"border-box",outline:"none",marginBottom:8,textAlign:"center",letterSpacing:6}}/>
          <input type="password"inputMode="numeric"value={p2}onChange={e=>setP2(e.target.value)}placeholder="Confirmar PIN"style={{width:"100%",background:C.fill3,border:"none",borderRadius:8,padding:"9px 11px",color:C.label,...T.c,boxSizing:"border-box",outline:"none",marginBottom:8,textAlign:"center",letterSpacing:6}}/>
          {pErr&&<div style={{...T.fn,color:C.red,marginBottom:8}}>{pErr}</div>}
          <button onClick={cambiarPin}style={{width:"100%",background:C.blue,border:"none",borderRadius:10,padding:"10px",...T.h,color:"#FFF",cursor:"pointer"}}>Guardar</button>
        </div>}
      </Sec>
      <Sec hdr="API Key Anthropic (OCR)">
        <Row ind lbl={apiKey?"✓ API Key configurada":"Sin API Key"}sub={apiKey?apiKey.slice(0,16)+"...":"Necesaria para OCR con cámara"}arr={false}last/>
        <div style={{padding:"8px 12px"}}>
          <input value={nk}onChange={e=>setNk(e.target.value)}placeholder="sk-ant-..."style={{width:"100%",background:C.fill3,border:"none",borderRadius:8,padding:"9px 11px",color:C.label,...T.c,boxSizing:"border-box",outline:"none",marginBottom:8}}/>
          <button onClick={()=>{onAk(nk);setSv(true);setTimeout(()=>setSv(false),2000);}}disabled={!nk}style={{width:"100%",background:sv?C.green:C.blue,border:"none",borderRadius:10,padding:"11px",...T.h,color:"#FFF",cursor:"pointer"}}>{sv?"✓ Guardado":"Guardar API Key"}</button>
          <div style={{...T.fn,color:C.label2,marginTop:6}}>console.anthropic.com → API Keys</div>
        </div>
      </Sec>
      <Sec hdr="Datos">
        <Row ind lbl="Exportar backup"arr={false}fn={()=>{const d={};Object.keys(localStorage).forEach(k=>{d[k]=localStorage.getItem(k);});const bl=new Blob([JSON.stringify(d,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(bl);a.download=`backup.json`;a.click();}}last/>
      </Sec>
      <Sec hdr="Sesión">
        <Row ind lbl={`Cerrar sesión (${user})`}del fn={onOut}arr={false}last/>
      </Sec>
    </div>
  </div>;
}

export default function App(){
  const[sc,setSc]=useState("boot");const[cid,setCid]=useState(null);
  const[user,setUser]=useState(null);const[apiKey,setAk]=useState("");
  const[cont,setCont]=useState({});
  useEffect(()=>{setAk(loadApiKey());setCont(loadCont());setSc("login");},[]);
  function auth(u){setUser(u);setSc("home");}
  function out(){setUser(null);setSc("login");}
  const W={width:"100%",maxWidth:430,margin:"0 auto",height:"100dvh",overflow:"hidden",background:C.bg,boxShadow:"0 0 60px rgba(0,0,0,.9)"};
  if(sc==="boot")return<div style={{...W,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:48}}>🎰</span></div>;
  if(sc==="login")return<div style={W}><Login onAuth={auth}/></div>;
  if(sc==="cfg")return<div style={W}><Settings onBack={()=>setSc(cid?"casino":"home")}onOut={out}user={user}apiKey={apiKey}onAk={k=>{setAk(k);saveApiKey(k);}}/></div>;
  if(sc==="casino"&&cid)return<div style={W}><Casino cid={cid}cont={cont}setCont={setCont}apiKey={apiKey}onBack={()=>setSc("home")}/></div>;
  return<div style={W}><Home onSelect={id=>{setCid(id);setSc("casino");}}onCfg={()=>setSc("cfg")}user={user}/></div>;
}
