# E2E P&P 🔌
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