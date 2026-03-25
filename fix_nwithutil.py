PATH = "src/App.jsx"

with open(PATH) as f:
    code = f.read()

if "const nWithUtil" in code:
    print("Ya está declarado, no se necesita el fix.")
    exit()

OLD = "  return<div ref={pullRef}"
NEW = """  const nWithUtil = mqs.filter(mq => prevU(mq) !== null).length;
  const totalUtil = mqs.reduce((sum, mq) => {
    const u = prevU(mq);
    return sum + (u !== null ? u : 0);
  }, 0);

  return<div ref={pullRef}"""

if OLD not in code:
    print("No se encontró el punto de inserción.")
    exit()

with open(PATH, "w") as f:
    f.write(code.replace(OLD, NEW, 1))

print("Fix aplicado exitosamente.")
