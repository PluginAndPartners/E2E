#!/bin/bash

E2E_PATH="/Users/mgouveia/Projects/E2E"
PLATAFORM=$1
CYPRESS_PATH="${E2E_PATH}/cypress/support/"

if [ ! -z "$1" ]; then

    echo "[MONTANDO AMBIENTE PARA PLATAFORMA ${PLATAFORM}]"

    if [ ! -d ${CYPRESS_PATH} ]; then
        echo "-- Criando pasta no Cypress --"    
        mkdir ${CYPRESS_PATH}
    else
        echo "-- Remontando pasta no Cypress --" 
        rm -r ${CYPRESS_PATH}
        mkdir ${CYPRESS_PATH}
    fi

    echo "-- Copiando arquivo da plataforma (${PLATAFORM}) para a pasta do Cypress --"
    cp -R "${E2E_PATH}/${PLATAFORM}/support/" ${CYPRESS_PATH}

    echo "-- Rodando o Cypress --"
    cd ${E2E_PATH}
    npm run test:chrome

else
    echo "-- Execute o comando passando uma plataforma. (ex: woocommerce, magento, prestashop --"
fi