
# 🚀 Consignes pour faire ta Pull Request

---

### 1. Fork le repo

Va sur :

👉 https://github.com/floz/gobelins-2025-backtobasics-exos

Clique sur **Fork** (en haut à droite).

Cela crée **ta propre copie** du dépôt dans ton compte GitHub.

---

### 2. Clone ton fork

Clone ton fork sur ta machine :

```bash
git clone https://github.com/<ton-pseudo>/gobelins-2025-backtobasics-exos.git

```

---

### 3. Crée ton dossier personnel

Dans le dossier du repo, crée un dossier à ton nom dans le dossier `students/`

(ex. si ton nom est “Marie Dupont”) :

```bash
mkdir -p students/marie-dupont

```

Puis ajoute tes fichiers dedans :

```
students/
 └── marie-dupont/
      ├── index.html
      ├── main.js
      └── README.md

```

---

### 4. Commit et push

```bash
git add .
git commit -m "Ajout des exos - Marie Dupont"
git push origin master

```

---

### 5. Crée ta Pull Request

Retourne sur **GitHub → ton fork**.

Tu verras un bouton “**Compare & pull request**”.

- Clique dessus
- Vérifie que la PR cible bien :
    
    **base repository** : `floz/gobelins-2025-backtobasics-exos`
    
    **base branch** : `main`
    
- Mets un titre du type :
    
    `Ajout des exos - Marie Dupont`
    
- **Ajoute un message:**
- Qui parle de ton ressentis vis a vis de la semaine (complique ? facile ? ce qui est toujours flou a comprendre…)
- Ce que tu penses avoir reussis sur cet exercice
- Les blocages que tu as par rapport a cet exercice
- Puis clique sur **Create pull request**