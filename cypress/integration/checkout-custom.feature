Feature: Disponibilizar ao buyer o pagamento de sua compra através do Checkout Custom

    # Preconditions: mlb credentials
    Scenario: Exibir campos de documento e parcela de acordo com o número do cartão
        Given que eu tenha um produto no carrinho
        And que eu esteja na página de checkout
        And preencher corretamente os detalhes de faturamento
        And clicar na opção de pagamento com o checkout custom
        When eu preencher corretamente o número do cartão
        Then a bandeira do cartão deve ser exibida no campo do número do cartão
        And o campo de código de segurança deve exibir logo abaixo uma mensagem com a quantidade e posição dos dígitos daquele cvv no cartão
        And deve ser exibido o campo de documento
        And deve ser exibido o campo de seleção de parcelas

    # Preconditions: mla credentials
    Scenario: Exibir campos de documento e parcela de acordo com o número do cartão
        Given que eu tenha um produto no carrinho
        And que eu esteja na página de checkout
        And preenchi corretamente os detalhes de faturamento
        And que cliquei na opção de pagamento com o checkout custom
        When eu preencher corretamente o número do cartão
        Then a bandeira do cartão deve ser exibida no campo do número do cartão
        And o campo de código de segurança deve exibir logo abaixo uma mensagem com a quantidade e posição dos dígitos daquele cvv no cartão
        And deve ser exibido o campo de documento
        And deve ser exibido o campo de seleção de parcelas
        And deve ser exibido o texto para Costo Financiero Total (CFT)

    # Preconditions: mlb credentials
    Scenario: Realizando um pagamento com sucesso
        Dado que eu tenha um produto no carrinho
        And que eu esteja na página de checkout
        And preencher corretamente os detalhes de faturamento
        And clicar na opção de pagamento com o checkout custom
        And preencher corretamente o número do cartão
        Then a bandeira do cartão deve ser exibida no campo do número do cartão
        And o campo de código de segurança deve exibir logo abaixo uma mensagem com a quantidade e posição dos dígitos daquele cvv no cartão
        And deve ser exibido o campo de documento
        And deve ser exibido o campo de seleção de parcelas
        When eu preencher corretamente os campos de cvv, documento e parcela
        And clicar em finalizar pedido
        Then eu devo ser redirecionado para a tela de pedido recebido
        And na página do pedido eu devo visualizar o status de pagamento aprovado

    # Preconditions: mlb credentials
    Scenario: Realizando um pagamento sem sucesso
        Dado que eu tenha um produto no carrinho
        And que eu esteja na página de checkout
        And preencher corretamente os detalhes de faturamento
        And clicar na opção de pagamento com o checkout custom
        And preencher corretamente o número do cartão
        Then a bandeira do cartão deve ser exibida no campo do número do cartão
        And o campo de código de segurança deve exibir logo abaixo uma mensagem com a quantidade e posição dos dígitos daquele cvv no cartão
        And deve ser exibido o campo de documento
        And deve ser exibido o campo de seleção de parcelas
        When eu preencher corretamente os campos de cvv, documento e parcela
        And preencher o nome do titular com CALL CALL
        And clicar em finalizar pedido
        Then devo visualizar na tela uma mensagem de pedido recusado com um link para tentar novamente
        And na página do pedido eu devo visualizar o status de pagamento pendente

    # Preconditions: mlb credentials
    Scenario: Realizar um pagamento com sucesso pela retentativa de pagamento
        Dado scenario Realizando um pagamento sem sucesso
        When eu clicar no link tente novamente
        Then devo ser redirecionado para a tela de retentativa de pagamento
        When eu preencher corretamente os detalhes de faturamento
        And clicar na opção de pagamento com o checkout custom
        And preencher corretamente o número do cartão
        Then a bandeira do cartão deve ser exibida no campo do número do cartão
        And o campo de código de segurança deve exibir logo abaixo uma mensagem com a quantidade e posição dos dígitos daquele cvv no cartão
        And deve ser exibido o campo de documento
        And deve ser exibido o campo de seleção de parcelas
        When eu preencher corretamente os campos de cvv, documento e parcela
        And preencher o nome do titular com APRO APRO
        And clicar em finalizar pedido
        Then eu devo ser redirecionado para a tela de pedido recebido
        And na página do pedido eu devo visualizar o status de pagamento aprovado

    # Preconditions: mlb credentials
    Scenario: Realizar um pagamento com sucesso via wallet button
        Dado que eu tenha um produto no carrinho
        And que eu esteja na página de checkout
        And preencher corretamente os detalhes de faturamento
        And clicar na opção de pagamento com o checkout custom
        And clicar em pagar com mercado pago
        Then devo visualizar um modal do mercado pago
        When eu preencher corretamente os campos do wallet button
        And clicar em pagar
        And devo ser redirecionado de volta a loja, na tela de pedido recebido
        And na página do pedido eu devo visualizar o status de pagamento aprovado
