unset HOST
rm -rf build/
mkdir -p build/web/client
mkdir -p build/web/admin
mkdir -p build/secure
mkdir -p build/backup

cd client
yarn run build
cp -a build/* ../build/web/client
rm -rf build/

cd ../admin
yarn run build
cp -a build/* ../build/web/admin
rm -rf build/

cd ../server
yarn run tsc
cp -a  build/* ../build
cp -a  src/secure/* ../build/secure
cp -a  src/backup/* ../build/backup
cp -a  package.json ../build
rm -rf build/

cd ../build
yarn install --prod
touch .env
cat>>.env<<"EOF"
NODE_ENV=development
MONGO_URL=mongodb+srv://anc:courses@cluster0.hsesw.mongodb.net/temp?retryWrites=true&w=majority
TOKEN_PATH=secure/token.json
CREDENTIALS_PATH=secure/credentials.json
BUILD_DIRECTORY=web
REDIS_HOST=redis-12516.c238.us-central1-2.gce.cloud.redislabs.com
REDIS_PORT=12516
REDIS_AUTH=uGkPlRd3kLarzzD70wDpjUy3pZbj3C3S
EOF
git init
heroku git:remote -a anc-courses
git add *
git add .env
git commit -m "Update"
git push -f heroku master