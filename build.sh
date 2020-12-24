unset HOST
rm -rf build/
mkdir -p build/html
mkdir -p build/secure
mkdir -p build/backup

cd client
# yarn run build

# cd ../admin
# yarn run build

cd ../server
yarn run tsc
cp -a  build/* ../build
cp -a  src/secure/* ../build/secure
cp -a  src/backup/* ../build/backup
cp -a  src/html/* ../build/html 
cp -a  package.json ../build
rm -rf build/

cd ../build
yarn install --prod
touch .env
cat>>.env<<"EOF"
NODE_ENV=production
MONGO_URL=mongodb+srv://anc:courses@primary.hsesw.mongodb.net/primarydb?retryWrites=true&w=majority
TOKEN_PATH=secure/token.json
CREDENTIALS_PATH=secure/credentials.json
BUILD_DIRECTORY=.
REDIS_HOST=redis-10145.c238.us-central1-2.gce.cloud.redislabs.com
REDIS_PORT=10145
REDIS_AUTH=fSuAXQzytEqhTIDTBnnWjyTppMWOYQDA
MAIL_ID=anc.courses@gmail.com
MAIL_PASSWORD=AnC@2020
EOF
git init
heroku git:remote -a anc-courses
git add *
git add .env
git commit -m "Update"
git push -f heroku master