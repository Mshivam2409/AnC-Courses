rm -rf build/
mkdir -p build/html
mkdir -p build/secure
mkdir -p build/backup

echo $GIT_SECRET_KEY | tr ',' '\n' > private_key.gpg
gpg --batch --import private_key.gpg
git secret reveal -p $GIT_SECRET_PASSPHRASE

cd server/
yarn install
yarn run tsc
cp -a  build/* ../build
cp -a  src/secure/* ../build/secure
cp -a  src/backup/* ../build/backup
cp -a  src/html/* ../build/html 
cp -a  package.json ../build
rm -rf build/

