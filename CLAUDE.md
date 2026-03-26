# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Reglas Permanentes (SIEMPRE aplicar)

1. **Git automatico:** Despues de CADA cambio en el codigo, ejecutar sin pedir aprobacion:
   ```bash
   git add -A && git commit -m "descripcion breve del cambio" && git push
   ```
2. **Idioma:** Comunicarse SIEMPRE en español.
3. **Single file:** Este proyecto es una React PWA en un solo archivo — `src/App.jsx` (~2150 lineas). No crear archivos adicionales salvo que sea estrictamente necesario.

---

## Proyecto

App web PWA para gestion de contadores de maquinas de casino. Registro de lecturas, OCR con Claude API, reportes, exportacion Excel/PDF, sync Supabase, subida de fotos a Google Drive.

- **Repo:** `github.com/santiagop1108-beep/Casinos-contadores-`
- **URL live:** `casinos-contadores.vercel.app`
- **App PATH:** `/Users/santiagopenaranda/Documents/Casinos-contadores-/src/App.jsx`
- **VS Code Tunnel:** `vscode.dev/tunnel/santiagos-macbook-ai/Users/santiagopenaranda/Documents/Casinos-contadores-`
- **Credenciales:** ver `CONTEXT.md` (GitHub PAT, GAPI_KEY, Sheet IDs, PINs)

---

## Comandos de Desarrollo

```bash
npm start          # Dev server local (puerto 3000)
npm run build      # Build de produccion (carpeta build/)
python3 deploy.py "descripcion"   # Build + commit + push automatico
```

Deploy via tunnel (metodo base64 para scripts con comillas):
```bash
echo <BASE64_DEL_SCRIPT> | base64 -d | python3
git add src/App.jsx && git commit -m "desc" && git push
```

Vercel auto-despliega en push a `main` (~1 min).

---

## Stack

- React 18, Create React App (`react-scripts 5`)
- Sin TypeScript, sin router externo, sin CSS externo — JS puro + JSX + inline styles
- `@emailjs/browser` para envio de reportes por email

---

## Navegacion (sin router)

```
App → Login → Home → Casino → [Counters | Camera | Report | Machines]
App → Home → Comparar
App → Settings / AdminPanel
```

Estado: variable `sc` (screen) y `casino` (casino activo).

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

`*ChartBarras` y `ChartLinea` son top-level — nunca definirlos dentro de `Report`.

---

## Datos de Google Sheets

- `fetchBalanceFromSheets(cid)` — lee hoja Balance, siempre fresco, fallback a `D[cid].b`
- `fetchSheetHist(cid)` — batchGet todas las maquinas en 1 request, cache 2min
- `processSheetRows(mq,rows,cidColMap,resets)` — parsing por maquina
- `parseSheetDate(raw)` — soporta `"18 -marzo"`, `"3-ene"`, `"03/01"`, ISO
- `parseNum(v)` — soporta `"$4.100.920"`, `"4100920"`, etc.

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
| `cc_v2` | Lecturas manuales |
| `cc_maq_overrides` | Cambios de maquinas |
| `cc_resets` | Fechas de reset por maquina |
| `cc_ak` | API key Claude OCR |
| `cc_pending` | Cola Supabase (offline sync) |
| `cc_access_log` | Log de accesos (max 200) |
| `cc_timeout` | Timeouts por usuario |
| `cp_<user>` | PIN cifrado (XOR+btoa) |
| `faceid_devs_<user>` | Dispositivos Face ID |
| `app_theme` | dark / light |
| `sb_url` / `sb_key` | Credenciales Supabase |
| `gd_client_id` / `gd_folder_id` | Credenciales Google Drive |
| `ej_service_id` / `ej_template_id` / `ej_public_key` / `ej_report_email` | Configuracion EmailJS |

---

## Reglas de React — CRITICAS

1. `ChartBarras` y `ChartLinea` son top-level — NUNCA dentro de `Report`
2. Nunca poner `useState` despues de un `return` temprano
3. No definir componentes con hooks dentro de otros componentes
4. Variables duplicadas causan `ts(2451)` — usar nombres unicos (cbHov, clHov, cbExp, clExp)
5. `today()` usa fecha local Colombia (UTC-5), NO `new Date()` directo:
   ```js
   const today = () => new Date(Date.now() - 5*3600000).toISOString().slice(0,10);
   ```

---

## Temas e iconos

- Temas: `dark` / `light`, objeto `THEMES`, `getC()` retorna colores del tema activo
- Tipografia: sistema `T` (lg, h, b, c, s, fn, cap) con SF Pro/system-ui
- Iconos: componente `Ico` con SVG paths inline (sin libreria externa)
- Colores de maquinas: `maqC(factor, C)`
- UI: Liquid Glass (.lg, .lg-dark, .lg-card)
- Iconos por casino: chip (Obrero), espada (Vikingos), piramide (Faraon), palma (Playa Rica), dado (Hugo), slot (Sim)

---

## Email (EmailJS)

- Configurado via Settings → Email Reports (Service ID, Template ID, Public Key)
- En el template de EmailJS, el campo "To Email" debe ser `{{to_email}}` para enviar a destinatarios dinamicos
- Plan gratuito de EmailJS solo permite enviar a correos verificados — considerar migrar a Resend + Supabase Edge Function

---

## Bugs Conocidos / Pendientes

- [ ] Multi 14 Vikingos — display especial, necesita modo 2 fotos en OCR
- [ ] Publicar Sheets en la web — para badge Live en todos los casinos
- [ ] Pipeline OCR→Sheets — `writeOCRToSheets()` preparada, requiere OAuth2
- [ ] WhatsApp notifications — notificar a Santiago al reiniciarse sesion
- [ ] Migrar envio de email de EmailJS a Resend + Supabase Edge Function
- [ ] Reemplazar cifrado de PIN (XOR) por `crypto.subtle` (PBKDF2)
