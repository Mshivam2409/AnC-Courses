rm -rf build/
mkdir -p build/html
mkdir -p build/secure
mkdir -p build/backup

cd server/
yarn run tsc
cp -a  build/* ../build
cp -a  src/secure/* ../build/secure
cp -a  src/backup/* ../build/backup
cp -a  src/html/* ../build/html 
cp -a  package.json ../build
rm -rf build/

