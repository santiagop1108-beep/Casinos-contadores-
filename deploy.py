#!/usr/bin/env python3
"""
deploy.py — Casino Contadores
Uso desde la terminal de VS Code (raíz del repo):

    python3 deploy.py                     # commit con mensaje automático
    python3 deploy.py "mensaje custom"    # commit con tu mensaje
    python3 deploy.py --preview           # solo muestra qué cambió, no hace push
"""

import subprocess, sys, os, datetime, urllib.request, json

# ── Notificaciones ntfy.sh ────────────────────────────────────────────────────
def notify_ntfy(title, message, priority="default", tags=None):
    data = json.dumps({
        "topic": "casino-santiago",
        "title": title,
        "message": message,
        "priority": priority,
        "tags": tags or []
    }).encode()
    req = urllib.request.Request(
        "https://ntfy.sh",
        data=data,
        headers={"Content-Type": "application/json"}
    )
    try:
        urllib.request.urlopen(req, timeout=5)
        print("🔔 Notificación ntfy enviada.")
    except Exception as e:
        print(f"⚠️  ntfy error (no crítico): {e}")

# ── Detectar raíz del repo automáticamente ───────────────────────────────────
def repo_root():
    try:
        r = subprocess.run(
            ["git", "rev-parse", "--show-toplevel"],
            capture_output=True, text=True, check=True
        )
        return r.stdout.strip()
    except subprocess.CalledProcessError:
        print("❌ No estás dentro de un repo git.")
        sys.exit(1)

ROOT = repo_root()
os.chdir(ROOT)

# ── Argumentos ────────────────────────────────────────────────────────────────
args = sys.argv[1:]
PREVIEW = "--preview" in args
args = [a for a in args if a != "--preview"]
custom_msg = args[0] if args else None

# ── Ver qué archivos cambiaron ────────────────────────────────────────────────
status = subprocess.run(["git", "status", "--short"], capture_output=True, text=True)
changes = status.stdout.strip()

if not changes:
    print("✅ Sin cambios. El repo está limpio.")
    sys.exit(0)

print("📋 Cambios detectados:")
for line in changes.splitlines():
    print(f"   {line}")

if PREVIEW:
    print("\n👀 Modo preview — no se hizo push.")
    sys.exit(0)

# ── Construir mensaje de commit automático ────────────────────────────────────
now = datetime.datetime.now().strftime("%d/%m %H:%M")

if custom_msg:
    msg = custom_msg
else:
    # Detectar qué archivos tocamos para el mensaje
    archivos = [l.split()[-1] for l in changes.splitlines()]
    principales = [a for a in archivos if "App.jsx" in a]
    if principales:
        msg = f"update App.jsx · {now}"
    else:
        nombres = ", ".join(archivos[:3])
        msg = f"update {nombres} · {now}"

# ── Ejecutar git add → commit → push ─────────────────────────────────────────
print(f"\n🚀 Commiteando: \"{msg}\"")

try:
    subprocess.run(["git", "add", "-A"], check=True)
    subprocess.run(["git", "commit", "-m", msg], check=True)
    print("⬆️  Haciendo push...")
    subprocess.run(["git", "push"], check=True)
    print(f"\n✅ Listo. Vercel está deployando.")
    print(f"   Commit: {msg}")
    deploy_time = datetime.datetime.now().strftime("%d/%m/%Y %H:%M")
    notify_ntfy(
        title="✅ Casinos Contadores — Deploy exitoso",
        message=f"Deploy completado a las {deploy_time}.\nCommit: {msg}\nVercel: https://casinos-contadores.vercel.app",
        priority="default",
        tags=["casino", "deploy"]
    )
except subprocess.CalledProcessError as e:
    print(f"\n❌ Error en git: {e}")
    notify_ntfy(
        title="❌ Casinos Contadores — Error en deploy",
        message=f"El deploy falló con el siguiente error:\n{e}",
        priority="high",
        tags=["casino", "error"]
    )
    sys.exit(1)
