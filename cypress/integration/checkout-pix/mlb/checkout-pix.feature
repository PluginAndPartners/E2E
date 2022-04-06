Feature: Disponibilizar ao buyer mlb o pagamento de sua compra através do Checkout PIX

	Scenario: Precondições
		Given a loja esteja configurada com o site mlb para testes de pix
		And esteja em modo teste
		Then o idioma deve ser configurado para 'Português do Brasil'
		And a moeda de operação da loja deve ser 'Real brasileiro (R$)'

    Scenario: Realizando um pagamento com sucesso
        Given que eu tenha um produto no carrinho
        And que eu esteja na página de checkout
        And que eu preenchi corretamente os detalhes de faturamento
        And que cliquei na opção de pagamento com o checkout Pix
        When cliquei em finalizar a compra
        Then devo ser direcionado para a tela de pedido recebido
        And devo visualizar uma seção com o QR Code e o código do Pix
        And na página do pedido eu devo visualizar o status de pagamento pendente do pix