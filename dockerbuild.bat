docker build -t djlad/pairs .
docker push djlad/pairs
docker build -t djlad/pairsui -f nginx/Dockerfile
docker push djlad/pairsui