    Feature: Disponibilizar ao buyer o pagamento de sua compra através do Checkout Custom
    
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