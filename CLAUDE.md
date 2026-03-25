# Casino Contadores — CLAUDE.md

## Descripcion
App web PWA para gestion de contadores de maquinas de casino. Permite registrar lecturas, analizar fotos con OCR (Claude API), generar reportes y exportar Excel/PDF.

- **Repo:** `github.com/santiagop1108-beep/Casinos-contadores-`
- **URL live:** `casinos-contadores.vercel.app`
- **App PATH:** `/Users/santiagopenaranda/Documents/Casinos-contadores-/src/App.jsx`
- **Credenciales:** ver `CONTEXT.md` (GitHub PAT, GAPI_KEY, Sheet IDs, PINs)

---

## Stack
- **React 18** con Create React App (`react-scripts 5`)
- **Single file:** toda la app vive en `src/App.jsx` (~2150 lineas, ~187KB)
- **Sin TypeScript, sin router, sin CSS externo** — JS puro + JSX + inline styles
- **Deploy:** Vercel auto-deploy en push a `main` (~1 min)

---

## Reglas de Deploy — SIEMPRE seguir este orden

### Despues de cada cambio aprobado por el usuario:
```bash
git add src/App.jsx && git commit -m "descripcion breve" && git push
```
- Hacer esto AUTOMATICAMENTE sin esperar que el usuario lo pida
- El mensaje del commit debe describir el cambio en una linea concisa
- Nunca usar `--no-verify`

### Para deploy con script:
```bash
python3 deploy.py "descripcion del cambio"
```
- Usar `deploy.py` cuando el usuario pida "deployar" o "hacer deploy"
- `deploy.py` hace git add + commit + push automaticamente

---

## Arquitectura

### Archivo unico
Todo el codigo esta en `src/App.jsx`. No crear archivos nuevos salvo que sea estrictamente necesario.

### Navegacion (sin router)
```
App → Login → Home → Casino → [Counters | Camera | Report | Machines]
App → Home → Comparar
App → Settings / AdminPanel
```
Estado de navegacion: variable `sc` (screen) y `casino` (casino activo).

### Temas
- `dark` / `light`, objeto `THEMES`, funcion `getC()` retorna `_theme`
- Tipografia: sistema `T` (lg, h, b, c, s, fn, cap) con SF Pro/system-ui
- Iconos: componente `Ico` con SVG paths inline (sin libreria externa)

### Colores de maquinas
`maqC(factor, C)` — determinado por el campo `factor` de cada maquina.

---

## Casinos
| ID | Nombre | Color | Liquidacion |
|---|---|---|---|
| obrero | Casino Obrero | indigo | 3-4 dias |
| vikingos | Vikingos | orange | Diario |
| faraon | Faraon | yellow | Diario |
| playarica | Playa Rica | green | 3-4 dias (fechas dd/mm) |
| hugo | Hugo | purple | 3-4 dias |
| simulacion | Simulacion OCR | teal | Pruebas (sim:true) |

## Usuarios
| Usuario | Color | Rol |
|---|---|---|
| Santiago | indigo | admin |
| Eliza | pink | — |
| Jessica | teal | — |

---

## Componentes principales (orden en App.jsx)
```
processSheetRows, loadResets, saveReset, parseSheetDate, parseNum,
invalidateSheetsCaches, saveLog, loadLogs, saveTimeouts, loadTimeouts,
getFaceDevices, setFaceDevices, revokeFaceDevice,
MaqIcon, Sec, Row, Nav, Tabs, Badge, AnimNumber, Sparkline, CasinoAvatar,
Login, Counters, Camera, HistorialTable,
ChartBarras*, ChartLinea*, ChartMaquinas, Report,
loadMaqOverrides, saveMaqOverrides, getMaqs,
Machines, EditMaqField, FactorSelector,
AdminPanel, Settings, Home, CompararLineChart, Comparar, Casino,
export default App
```
*`ChartBarras` y `ChartLinea` son top-level (fuera de `Report`).

---

## Datos de Google Sheets
- **`fetchBalanceFromSheets(cid)`** — lee hoja Balance, siempre fresco, fallback a `D[cid].b`
- **`fetchSheetHist(cid)`** — batchGet todas las maquinas en 1 request, cache 2min
- **`processSheetRows(mq,rows,cidColMap,resets)`** — parsing por maquina
- **`parseSheetDate(raw)`** — soporta `"18 -marzo"`, `"3-ene"`, `"03/01"`, ISO
- **`parseNum(v)`** — soporta `"$4.100.920"`, `"4100920"`, etc.

### Columnas por tipo (COL_MAP)
```
Multi/Gaminator: premios=F(idx5), util=G(idx6)
Poker:           premios=G(idx6), util=H(idx7), factor×50
Especiales:      premios=E(idx4), util=F(idx5), factor×1
Playa Rica Multi: premios=F, util=G — fechas dd/mm
```

### Mapeo OCR → Sheets
| Tipo | Campo | Columna |
|---|---|---|
| Multi (SHORT STATISTICS) | TOTAL IN | B |
| Multi | TOTAL OUT | C |
| Poker (IGT) | DROP | B |
| Poker | PHYSICAL COINS OUT | C |
| Poker | JACKPOTS | D |
| Poker | YIELD | E |

---

## localStorage keys
| Key | Contenido |
|---|---|
| `cc_v2` | Lecturas manuales (objeto por casino ID) |
| `cc_maq_overrides` | Cambios de maquinas |
| `cc_resets` | Fechas de reset por maquina |
| `cc_ak` | API key Claude OCR |
| `cc_pending` | Cola Supabase (offline sync) |
| `cc_access_log` | Log de accesos (max 200 entradas) |
| `cc_timeout` | Timeouts por usuario |
| `cp_<user>` | PIN hasheado |
| `faceid_devs_<user>` | Dispositivos Face ID registrados |
| `app_theme` | dark / light |
| `sb_url` / `sb_key` | Credenciales Supabase |
| `gd_client_id` / `gd_folder_id` | Credenciales Google Drive |

---

## Integraciones externas
- **Claude API (vision/OCR):** analisis de fotos de contadores (`analyzePhoto`)
- **Google Sheets API:** lectura de balances e historial (`fetchBalanceFromSheets`, `fetchSheetHist`)
- **Supabase REST:** sync de lecturas (`sbSave`, `sbSync`)
- **Google Drive API v3:** subida de fotos por casino/fecha (`uploadPhoto`)

---

## Reglas de React — CRITICAS
1. `ChartBarras` y `ChartLinea` son **top-level components** — nunca definirlos dentro de `Report`
2. Nunca poner `useState` despues de un `return` temprano
3. No definir componentes con hooks dentro de otros componentes
4. Variables duplicadas causan `ts(2451)` — usar nombres unicos (`cbHov`, `clHov`, `cbExp`, `clExp`)
5. `today()` usa fecha local Colombia (UTC-5), NO `new Date()` directo

---

## Fecha local Colombia
```js
const today = () => {
  const d = new Date(Date.now() - 5*3600000);
  return d.toISOString().slice(0,10);
};
```

---

## Bugs Conocidos / Pendientes
- [ ] **Multi 14 Vikingos** — display especial, necesita modo 2 fotos en OCR
- [ ] **Publicar Sheets en la web** — para badge Live en todos los casinos
- [ ] **Pipeline OCR→Sheets** — `writeOCRToSheets()` preparada, requiere OAuth2
- [ ] **WhatsApp notifications** — al reiniciarse sesion, notificar a Santiago

---

## Features Implementadas
- Login PIN + Face ID (WebAuthn, max 2 devices/usuario)
- Tema dark/light (paleta iOS exacta)
- OCR inteligente — detecta maquina automaticamente por numero y tipo de display
- Home con datos live (`fetchBalanceFromSheets` al montar)
- Reporte — Balance/Tabla/Grafica, badge Live Sheets, pull-to-refresh
- Historial por maquina — batchGet (1 request ~300ms)
- Graficas — Barras (zoom/scroll), Lineas, Top Maqs, Por Maquina
- Alertas — badge Alto/Bajo en dias que superan/bajan 50% del promedio
- Comparar casinos — Barras/Tendencia/Ranking
- Swipe entre tabs en Casino
- Maquinas — CRUD completo + reorder + pause + reset contadores
- AdminPanel — biometria, PINs, logs, session timeout
- PDF + Excel export
- Supabase sync (offline queue)
- Google Drive photo upload
- Liquid Glass UI (.lg, .lg-dark, .lg-card)
- Iconos tematicos por casino (chip, espada, piramide, palma, dado, slot)
- Log de liquidaciones automatico
- Mes en espanol (selector Marzo 2026 en Reporte y Comparar)
