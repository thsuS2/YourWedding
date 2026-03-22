#!/usr/bin/env bash
# MyWedding을 형제 디렉터리에 복제하고, 새 Git 저장소로 초기화합니다.
# 사용법: ./scripts/create-sibling-wedding-repo.sh [폴더명]
# 예: ./scripts/create-sibling-wedding-repo.sh YourWedding

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TARGET_NAME="${1:-YourWedding}"
PARENT="$(cd "$ROOT/.." && pwd)"
TARGET_DIR="${PARENT}/${TARGET_NAME}"

echo "==> 소스: $ROOT"
echo "==> 대상: $TARGET_DIR"

if [[ -d "$TARGET_DIR" ]]; then
  echo "오류: '$TARGET_DIR' 가 이미 있습니다. 삭제하거나 다른 이름을 쓰세요."
  exit 1
fi

rsync -a \
  --exclude node_modules \
  --exclude dist \
  --exclude .git \
  --exclude .vercel \
  --exclude .env \
  --exclude '.Work' \
  --exclude '.Letter' \
  --exclude 'images copy' \
  "$ROOT/" "$TARGET_DIR/"

cd "$TARGET_DIR"

# 새 레포에서는 .env 커밋 방지 (MyWedding은 기존에 .env 추적 중일 수 있음)
if ! grep -qE '^\.env$' .gitignore 2>/dev/null; then
  printf '\n# 로컬 비밀 (값은 .env.example 참고)\n.env\n' >> .gitignore
fi

# 패키지 이름 구분 (선택)
PKG_NAME=$(echo "$TARGET_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]/-/g')
if [[ -f package.json ]] && command -v node >/dev/null 2>&1; then
  node -e "
    const fs = require('fs');
    const p = 'package.json';
    const j = JSON.parse(fs.readFileSync(p, 'utf8'));
    j.name = '${PKG_NAME}' || j.name;
    fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n');
  " 2>/dev/null || true
fi

git init -b main
git add -A
git commit -m "chore: 초기 커밋 (MyWedding에서 분리)"

echo ""
echo "완료: $TARGET_DIR"
echo "다음:"
echo "  1) cd \"$TARGET_DIR\""
echo "  2) cp \"$ROOT/.env\" .env   # 또는 cp .env.example .env 후 값 입력"
echo "  3) npm install && npm run dev"
echo "  4) GitHub 빈 레포 만든 뒤: git remote add origin <URL> && git push -u origin main"
echo "  5) Vercel에서 해당 레포 Import → 환경 변수 설정 후 Deploy"
echo "자세한 내용: docs/DEPLOY_SIBLING_REPO.md"
