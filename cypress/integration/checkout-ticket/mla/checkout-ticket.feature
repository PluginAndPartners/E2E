Feature: Disponibilizar ao buyer o pagamento de sua compra através do Checkout Ticket

  # Preconditions: mla credentials and store in production mode
  Scenario: Exibindo o formulário do checkout ticket
    Given que eu tenha um produto no carrinho
    And que eu esteja na página de checkout
    And que eu preencha corretamente os detalhes de faturamento
    When eu clicar na opção de pagamento com o checkout ticket
    Then exibido uma tabela com opções de pagamento
    And exibido a mensagem de termos e condições

  Scenario: Realizando um pedido com sucesso usando o meio pagofacil
    Given que eu tenha um produto no carrinho
    And que eu esteja na página de checkout
    And que eu preencha corretamente os detalhes de faturamento
    And que eu clique na opção de pagamento com o checkout ticket
    When selecionar a opção pagofacil
    And clicar em finalizar a compra
    Then devo ser direcionado para a tela de pedido recebido
    And devo visualizar uma seção com a guia de pagamento em formato PDF

  Scenario: Realizando um pedido com sucesso usando o meio rapipago
    Given que eu tenha um produto no carrinho
    And que eu esteja na página de checkout
    And que eu preencha corretamente os detalhes de faturamento
    And que eu clique na opção de pagamento com o checkout ticket
    When selecionar a opção rapipago
    And clicar em finalizar a compra
    Then devo ser direcionado para a tela de pedido recebido
    And devo visualizar uma seção com a guia de pagamento em formato PDF

  Scenario: Realizando um pedido sem sucesso sem selecionar o meio de pagamento
    Given que eu tenha um produto no carrinho
    And que eu esteja na página de checkout
    And que eu preencha corretamente os detalhes de faturamento
    And que eu clique na opção de pagamento com o checkout ticket
    When clicar em finalizar a compra
    Then a página de checkout deve exibir um alerta vermelho sinalizando o erro