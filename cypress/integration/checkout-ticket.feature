Feature: Disponibilizar ao buyer o pagamento de sua compra através do Checkout Ticket

    # Preconditions: mlb credentials and store in test mode
    Scenario: Exibindo o formulário do checkout ticket
        Given que eu tenha um produto no carrinho
        And que eu esteja na página de checkout
        When eu clicar na opção de pagamento com o checkout ticket
        Then deve ser exibido um alerta de modo teste
        And exibido um campo para ser inserido o documento (CPF/CNPJ)
        And exibido uma tabela com duas opções de pagamento: boleto e lotérica
        And exibido a mensagem de termos e condições

    # Preconditions: mlb credentials
    Scenario: Realizando um pagamento com sucesso usando o documento CPF e o meio boleto
        Given que eu tenha um produto no carrinho
        And que eu esteja na página de checkout
        And preenchi corretamente os detalhes de faturamento
        And que cliquei na opção de pagamento com o checkout ticket
        When eu preencher corretamente o número do documento
        And selecionar a opção boleto
        And clicar em finalizar a compra
        Then devo ser direcionado para a tela de pedido recebido
        And devo visualizar uma seção com o boleto em formato PDF
        And na página do pedido eu devo visualizar o status de pagamento aprovado

    # Preconditions: mlb credentials
    Scenario: Realizando um pagamento com sucesso usando o documento CNPJ e o meio boleto
        Given que eu tenha um produto no carrinho
        And que eu esteja na página de checkout
        And preenchi corretamente os detalhes de faturamento
        And que cliquei na opção de pagamento com o checkout ticket
        When eu preencher corretamente o número do documento
        And selecionar a opção boleto
        And clicar em finalizar a compra
        Then devo ser direcionado para a tela de pedido recebido
        And devo visualizar uma seção com o boleto em formato PDF
        And na página do pedido eu devo visualizar o status de pagamento aprovado

    # Preconditions: mlb credentials
    Scenario: Realizando um pagamento com sucesso usando o documento CPF e o meio lotérica
        Given que eu tenha um produto no carrinho
        And que eu esteja na página de checkout
        And preenchi corretamente os detalhes de faturamento
        And que cliquei na opção de pagamento com o checkout ticket
        When eu preencher corretamente o número do documento
        And selecionar a opção lotérica
        And clicar em finalizar a compra
        Then devo ser direcionado para a tela de pedido recebido
        And devo visualizar uma seção com o boleto em formato PDF
        And na página do pedido eu devo visualizar o status de pagamento aprovado

    # Preconditions: mlb credentials
    Scenario: Realizando um pagamento com sucesso usando o documento CNPJ e o meio lotérica
        Given que eu tenha um produto no carrinho
        And que eu esteja na página de checkout
        And preenchi corretamente os detalhes de faturamento
        And que cliquei na opção de pagamento com o checkout ticket
        When eu preencher corretamente o número do documento
        And selecionar a opção lotérica
        And clicar em finalizar a compra
        Then devo ser direcionado para a tela de pedido recebido
        And devo visualizar uma seção com o boleto em formato PDF
        And na página do pedido eu devo visualizar o status de pagamento aprovado

    # Preconditions: mlb credentials
    Scenario: Realizando um pagamento sem sucesso (preencher incorretamente o número do documento)
        Given que eu tenha um produto no carrinho
        And que eu esteja na página de checkout
        And preenchi corretamente os detalhes de faturamento
        And que cliquei na opção de pagamento com o checkout ticket
        When eu preencher incorretamente o número do documento
        And selecionar uma opção de pagamento
        And clicar em finalizar a compra
        Then o campo de documento deve exibir a mensagem de formato inválido
        And a página de checkout deve exibir um alerta vermelho com a mensagem de documento inválido

    # Preconditions: mlb credentials
    Scenario: Realizando um pagamento sem sucesso (não preencher o número do documento)
        Given que eu tenha um produto no carrinho
        And que eu esteja na página de checkout
        And preenchi corretamente os detalhes de faturamento
        And que cliquei na opção de pagamento com o checkout ticket
        When eu não preencher o número do documento
        And selecionar a uma opção de pagamento
        And clicar em finalizar a compra
        Then o campo de documento deve exibir a mensagem de documento inválido
        And a página de checkout deve exibir um alerta vermelho com a mensagem de documento inválido

    # Preconditions: mla credentials
    Scenario: Exibindo o formulário do checkout ticket
        Given que eu tenha um produto no carrinho
        And que eu esteja na página de checkout
        And preenchi corretamente os detalhes de faturamento
        When eu clicar na opção de pagamento com o checkout ticket
        Then deve ser exibido somente uma tabela com duas opções de pagamento: pago fácil e rapipago

    # Preconditions: mla credentials
    Scenario: Realizando um pagamento com sucesso
        Given que eu tenha um produto no carrinho
        And que eu esteja na página de checkout
        And preenchi corretamente os detalhes de faturamento
        And que cliquei na opção de pagamento com o checkout ticket
        When eu selecionar uma opção de pagamento
        And clicar em finalizar a compra
        Then devo ser direcionado para a tela de pedido recebido
        And devo visualizar uma seção com o boleto em formato PDF
        And na página do pedido eu devo visualizar o status de pagamento aprovado