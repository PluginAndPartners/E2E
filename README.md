# E2E P&P 🔌

## Criação do Comando plugins-e2e
Precisamos pegar o caminho da pasta do projeto.
- No seu terminal, dentro da pasta do projeto, execute o comando:
```
pwd
```

- Copie o resultado do comando.
- Dentro da pasta ``lib/``, abra o arquivo ``plugins-e2e.sh``
- Cole o caminho da pasta na variavel ``E2E_PATH``
- No seu terminal, na raiz do projeto, execute os seguintes comandos:
```
cp lib/plugins-e2e.sh /usr/local/bin/.
```
```
mv /usr/local/bin/plugins-e2e.sh /usr/local/bin/plugins-e2e
```
```
chmod +x /usr/local/bin/plugins-e2e
```

``PRONTO``

O comando já estara funcionando de qualquer lugar
Execute:
```
plugins-e2e woocommerce
```

## TODO:
- Cenários em comum entre plataformas (Meio de pagamento)
- Reaproveitamento de códigos/cenários entre plataformas
- Arquitetura para várias plataformas
- Modularizar testes independente para cada plataforma
---
## Monorepo
### Prós
1. Cypress é compartilhado como dependencia com todos os testes E2E das plataformas e cenários em comum
2. É mais fácil quebrar um projeto bem estruturado do que unir novamente
3. Esse repositório não é produtivo, é apenas para testes, acredito que não seja tão impactante ser grande por ser apenas para desenvolvimento
### Contra
1. Projeto muito grande
2. Grande possibilidade de conflitos