#!/bin/bash

E2E_PATH="/Users/mgouveia/Projects/E2E/"
PLATAFORM=$1
CYPRESS_PATH="${E2E_PATH}cypress/support/"

if [ ! -z "$1" ]; then

    echo "\n[MONTANDO AMBIENTE PARA PLATAFORMA ${PLATAFORM}]\n"

    if [ ! -d ${CYPRESS_PATH} ]; then
        echo "\n-- Criando pasta no Cypress --"    
        mkdir ${CYPRESS_PATH}
    else
        echo "\n-- Remontando pasta no Cypress --" 
        rm -r ${CYPRESS_PATH}
        mkdir ${CYPRESS_PATH}
    fi

    echo "\n-- Copiando arquivo da plataforma (${PLATAFORM}) para a pasta do Cypress --"
    cp -R "${E2E_PATH}/${PLATAFORM}/support/" ${CYPRESS_PATH}

    echo "\n-- Rodando o Cypress"
    npm run test:chrome

else
    echo "\n-- Execute o comando passando uma plataforma. (ex: woocommerce, magento, prestashop --"
fi