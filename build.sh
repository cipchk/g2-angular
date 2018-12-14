#!/usr/bin/env bash
#!/usr/bin/env node --max-old-space-size=4096

set -u -e -o pipefail

updateVersionReferences() {
  NPM_DIR="$1"
  (
    echo ">> VERSION: Updating version references in ${NPM_DIR}"
    cd ${NPM_DIR}
    perl -p -i -e "s/PEER\-0\.0\.0\-PLACEHOLDER/^${VERSION}/g" $(grep -ril PEER\-0\.0\.0\-PLACEHOLDER .) < /dev/null 2> /dev/null
    perl -p -i -e "s/0\.0\.0\-PLACEHOLDER/${VERSION}/g" $(grep -ril 0\.0\.0\-PLACEHOLDER .) < /dev/null 2> /dev/null
  )
}

PWD=`pwd`
VERSION=$(node -p "require('./package.json').version")
SOURCE=${PWD}/lib
DIST=${PWD}/publish

echo "=====BUILDING: Version ${VERSION}"

rm -rf ${DIST}
mkdir -p ${DIST}

# build
$(npm bin)/ng build g2-angular-lib

# package version
updateVersionReferences ${DIST}

# copy readme
cp README.md ${DIST}/README.md
