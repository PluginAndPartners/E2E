Feature: Disponibilizar ao buyer o pagamento de sua compra através do Checkout Pro

    # Preconditions: mlb credentials
    Scenario: Realizando um pagamento com sucesso
        Given que eu tenha um produto no carrinho
        And que eu esteja na página de checkout
        And preenchi corretamente os detalhes de faturamento
        And que cliquei na opção de pagamento com o checkout PRO
        And cliquei em finalizar a compra
        Then devo ser redirecionado para o Mercado Pago
        And deve concluir o fluxo de pagamento
        And ao concluir o fluxo de pagamento, deve ser redirecionado de volta a loja, na tela de pedido recebido
        And na página do pedido eu devo visualizar o status de pagamento aprovado