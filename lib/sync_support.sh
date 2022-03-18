#!/bin/bash
PLATAFORM=$1
CYPRESS_PATH="cypress/support/"

if [ ! -d ${CYPRESS_PATH} ]; then
    echo "Criando pasta no Cypress"    
    mkdir ${CYPRESS_PATH}
fi

echo "Copiando arquivo da plataforma (${PLATAFORM}) para a pasta do Cypress"
cp -R ${PLATAFORM}/support/ ${CYPRESS_PATH}

echo "Rodando o Cypress"
npm run test:chrome