Feature: Disponibilizar ao buyer o pagamento de sua compra através do Checkout Ticket

  Scenario: Precondições
    Given a loja esteja configurada com o site mlb para testes de ticket
    And esteja em modo produção
    Then o idioma deve ser configurado para 'Português do Brasil'
    And a moeda de operação da loja deve ser 'Real brasileiro (R$)'

  Scenario: Exibindo o formulário do checkout ticket
    Given que eu tenha um produto no carrinho
    And que eu esteja na página de checkout
    And que eu preencha corretamente os detalhes de faturamento
    When eu clicar na opção de pagamento com o checkout ticket
    Then exibido um campo de documento com o título 'Documento do titular*'
    And exibido uma tabela com o título 'Selecione onde você quer pagar'
    And exibido a mensagem 'Ao continuar, você concorda com nossosTermos e condições'

  Scenario: Realizando um pedido com sucesso usando o documento CPF e o meio boleto
    Given que eu tenha um produto no carrinho
    And que eu esteja na página de checkout
    And que eu preencha corretamente os detalhes de faturamento
    And que eu clique na opção de pagamento com o checkout ticket
    When eu preencher corretamente o cpf como número do documento
    And selecionar a opção bolbradesco
    And clicar em finalizar a compra
    Then devo ser direcionado para a tela de pedido recebido
    And devo visualizar uma seção com a guia de pagamento em formato PDF

  Scenario: Realizando um pedido com sucesso usando o documento CNPJ e o meio boleto
    Given que eu tenha um produto no carrinho
    And que eu esteja na página de checkout
    And que eu preencha corretamente os detalhes de faturamento
    And que eu clique na opção de pagamento com o checkout ticket
    When eu preencher corretamente o cnpj como número do documento
    And selecionar a opção bolbradesco
    And clicar em finalizar a compra
    Then devo ser direcionado para a tela de pedido recebido
    And devo visualizar uma seção com a guia de pagamento em formato PDF

  Scenario: Realizando um pedido com sucesso usando o documento CPF e o meio lotérica
    Given que eu tenha um produto no carrinho
    And que eu esteja na página de checkout
    And que eu preencha corretamente os detalhes de faturamento
    And que eu clique na opção de pagamento com o checkout ticket
    When eu preencher corretamente o cpf como número do documento
    And selecionar a opção pec
    And clicar em finalizar a compra
    Then devo ser direcionado para a tela de pedido recebido
    And devo visualizar uma seção com a guia de pagamento em formato PDF

  Scenario: Realizando um pedido com sucesso usando o documento CNPJ e o meio lotérica
    Given que eu tenha um produto no carrinho
    And que eu esteja na página de checkout
    And que eu preencha corretamente os detalhes de faturamento
    And que eu clique na opção de pagamento com o checkout ticket
    When eu preencher corretamente o cnpj como número do documento
    And selecionar a opção pec
    And clicar em finalizar a compra
    Then devo ser direcionado para a tela de pedido recebido
    And devo visualizar uma seção com a guia de pagamento em formato PDF

  Scenario: Realizando um pedido sem sucesso usando o documento de CPF inválido
    Given que eu tenha um produto no carrinho
    And que eu esteja na página de checkout
    And que eu preencha corretamente os detalhes de faturamento
    And que eu clique na opção de pagamento com o checkout ticket
    When eu preencher incorretamente o cpf como número do documento
    And selecionar a opção bolbradesco
    And clicar em finalizar a compra
    Then o campo de documento deve exibir a mensagem 'Número de documento inválido'
    And a página de checkout deve exibir um alerta vermelho sinalizando o erro

  Scenario: Realizando um pedido sem sucesso usando o documento de CNPJ inválido
    Given que eu tenha um produto no carrinho
    And que eu esteja na página de checkout
    And que eu preencha corretamente os detalhes de faturamento
    And que eu clique na opção de pagamento com o checkout ticket
    When eu preencher incorretamente o cnpj como número do documento
    And selecionar a opção bolbradesco
    And clicar em finalizar a compra
    Then o campo de documento deve exibir a mensagem 'Número de documento inválido'
    And a página de checkout deve exibir um alerta vermelho sinalizando o erro

  Scenario: Realizando um pedido sem sucesso usando o documento de CPF vazio
    Given que eu tenha um produto no carrinho
    And que eu esteja na página de checkout
    And que eu preencha corretamente os detalhes de faturamento
    And que eu clique na opção de pagamento com o checkout ticket
    When eu não preencher o cpf como número do documento
    And selecionar a opção bolbradesco
    And clicar em finalizar a compra
    Then o campo de documento deve exibir a mensagem 'Número de documento inválido'
    And a página de checkout deve exibir um alerta vermelho sinalizando o erro

  Scenario: Realizando um pedido sem sucesso usando o documento de CNPJ vazio
    Given que eu tenha um produto no carrinho
    And que eu esteja na página de checkout
    And que eu preencha corretamente os detalhes de faturamento
    And que eu clique na opção de pagamento com o checkout ticket
    When eu não preencher o cnpj como número do documento
    And selecionar a opção bolbradesco
    And clicar em finalizar a compra
    Then o campo de documento deve exibir a mensagem 'Número de documento inválido'
    And a página de checkout deve exibir um alerta vermelho sinalizando o erro

  Scenario: Realizando um pedido sem sucesso sem selecionar o meio de pagamento
    Given que eu tenha um produto no carrinho
    And que eu esteja na página de checkout
    And que eu preencha corretamente os detalhes de faturamento
    And que eu clique na opção de pagamento com o checkout ticket
    When eu preencher corretamente o cpf como número do documento
    And clicar em finalizar a compra
    Then a página de checkout deve exibir um alerta vermelho sinalizando o erro