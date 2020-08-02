npm run build
docker build -t djlad/pairs -f Dockerfile .
docker push djlad/pairs
docker build -t djlad/pairsui -f nginx/Dockerfile .
docker push djlad/pairsui