BASE_SITE=maialen

export NODE_ENV=production
export PORT=4200
export VIRTUAL_HOST=${BASE_SITE}
docker-compose -p ${VIRTUAL_HOST} up -d --build