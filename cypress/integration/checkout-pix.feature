Feature: Disponibilizar ao buyer mlb o pagamento de sua compra através do Checkout PIX

    # Preconditions: mlb credentials
    Scenario: Realizando um pagamento com sucesso
        Given que eu tenha um produto no carrinho
        And que eu esteja na página de checkout
        And que preenchi corretamente os detalhes de faturamento
        And que cliquei na opção de pagamento com o checkout PIX
        And cliquei em finalizar a compra
        Then devo ser direcionado para a tela de pedido recebido
        And devo visualizar uma seção com o QR Code e o código do Pix
        And na página do pedido eu devo visualizar o status de pagamento aprovado