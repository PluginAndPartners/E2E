Feature: Disponibilizar ao buyer o pagamento de sua compra através do Checkout Custom

	Scenario: Precondições
		Given a loja esteja configurada com o site mlb para testes de custom
		And esteja em modo teste
		Then o idioma deve ser configurado para 'Português do Brasil'
		And possua o endereço de operação 'BR:SP'
		And a moeda de operação da loja deve ser 'Real brasileiro (R$)'

	Scenario: Exibir campos de documento e parcela de acordo com o número do cartão
		Given que eu tenha um produto no carrinho
		And que eu esteja na página de checkout
		And que preenchi corretamente os detalhes de faturamento
		And que cliquei na opção de pagamento com o checkout custom
		When eu preencher corretamente o número do cartão
		Then a bandeira do cartão deve ser exibida no campo do número do cartão
		And o campo de código de segurança deve exibir logo abaixo uma mensagem com a quantidade e posição dos dígitos daquele cvv no cartão
		And deve ser exibido o campo de documento
		And deve ser exibido o campo de seleção de parcelas

	Scenario: Realizando um pagamento com sucesso
		Given que eu tenha um produto no carrinho
		And que eu esteja na página de checkout
		And que preenchi corretamente os detalhes de faturamento
		And que cliquei na opção de pagamento com o checkout custom
		When eu preencher corretamente o número do cartão
		Then a bandeira do cartão deve ser exibida no campo do número do cartão
		And preencher o nome do titular com 'APRO APRO'
		And o campo de código de segurança deve exibir logo abaixo uma mensagem com a quantidade e posição dos dígitos daquele cvv no cartão
		And deve ser exibido o campo de documento
		And deve ser exibido o campo de seleção de parcelas
		When eu preencher corretamente os campos de cvv, documento e parcela
		And clicar em finalizar pedido
		Then deve ser exibido que o pagamento foi realizado com sucesso

	Scenario: Realizando um pagamento sem sucesso
		Given que eu tenha um produto no carrinho
		And que eu esteja na página de checkout
		And que preenchi corretamente os detalhes de faturamento
		And que cliquei na opção de pagamento com o checkout custom
		And eu preencher corretamente o número do cartão
		Then a bandeira do cartão deve ser exibida no campo do número do cartão
		And o campo de código de segurança deve exibir logo abaixo uma mensagem com a quantidade e posição dos dígitos daquele cvv no cartão
		And deve ser exibido o campo de documento
		And deve ser exibido o campo de seleção de parcelas
		When eu preencher corretamente os campos de cvv, documento e parcela
		And preencher o nome do titular com 'OTHE OTHE'
		And clicar em finalizar pedido
		Then devo visualizar na tela uma mensagem de pedido recusado com um link para tentar novamente

	Scenario: Realizar um pagamento com sucesso pela retentativa de pagamento
		Given scenario Realizando um pagamento sem sucesso
		When eu clicar no link tente novamente
		Then devo ser redirecionado para a tela de retentativa de pagamento
		When eu preencher corretamente o número do cartão
		Then a bandeira do cartão deve ser exibida no campo do número do cartão
		And o campo de código de segurança deve exibir logo abaixo uma mensagem com a quantidade e posição dos dígitos daquele cvv no cartão
		And deve ser exibido o campo de documento
		And deve ser exibido o campo de seleção de parcelas
		When eu preencher corretamente os campos de cvv, documento e parcela
		And preencher o nome do titular com 'APRO APRO'
		And clicar em finalizar pedido
		Then eu devo ser redirecionado para a tela de pedido recebido

	Scenario: Realizar um pagamento com sucesso via wallet button
		Given que eu tenha um produto no carrinho
		And que eu esteja na página de checkout
		And que preenchi corretamente os detalhes de faturamento
		And que cliquei na opção de pagamento com o checkout custom
		And clicar em pagar com mercado pago
		Then devo visualizar um modal do mercado pago
		When eu preencher corretamente os campos do wallet button
		And clicar em pagar
		Then deve ser exibido que o pagamento foi realizado com sucesso

	Scenario: Validar campo de número do cartão com um cartão inválido
		Given que eu tenha um produto no carrinho
		And que eu esteja na página de checkout
		And que preenchi corretamente os detalhes de faturamento
		And que cliquei na opção de pagamento com o checkout custom
		When preencher o campo de 'cardNumber' com '2132 1534 5634'
		Then uma mensagem de erro deve ser exibida

	Scenario: Validar campo de número do cartão com caracteres especiais
		Given que eu tenha um produto no carrinho
		And que eu esteja na página de checkout
		And que preenchi corretamente os detalhes de faturamento
		And que cliquei na opção de pagamento com o checkout custom
		When preencher o campo de 'cardNumber' com 'ABC*-/+'
		Then o campo 'cardNumber' deve continuar vazio

	Scenario: Validar campo de data de vencimento com caracteres especiais
		Given que eu tenha um produto no carrinho
		And que eu esteja na página de checkout
		And que preenchi corretamente os detalhes de faturamento
		And que cliquei na opção de pagamento com o checkout custom
		When preencher o campo de 'expirationDate' com 'ABC*-/+'
		Then o campo 'expirationDate' deve continuar vazio

	Scenario: Validar campo de cvv com caracteres especiais
		Given que eu tenha um produto no carrinho
		And que eu esteja na página de checkout
		And que preenchi corretamente os detalhes de faturamento
		And que cliquei na opção de pagamento com o checkout custom
		When preencher o campo de 'securityCode' com 'ABC*-/+'
		Then o campo 'securityCode' deve continuar vazio

	Scenario: Submit do formulário com os campos vazios
		Given que eu tenha um produto no carrinho
		And que eu esteja na página de checkout
		And que preenchi corretamente os detalhes de faturamento
		And que cliquei na opção de pagamento com o checkout custom
		When eu clicar no botão submit
		Then uma mensagem de erro deve ser exibida

	Scenario: Submit com cvv de length inválido
		Given que eu tenha um produto no carrinho
		And que eu esteja na página de checkout
		And que preenchi corretamente os detalhes de faturamento
		And que cliquei na opção de pagamento com o checkout custom
		And preenchi corretamente de todos os campos exceto o campo de 'securityCode'
		And que o campo de 'securityCode' tenha sido preenchido com '123'
		When eu clicar no botão submit
		Then uma mensagem de erro deve ser exibida

	Scenario: Submit com mês de vencimento inválido
		Given que eu tenha um produto no carrinho
		And que eu esteja na página de checkout
		And que preenchi corretamente os detalhes de faturamento
		And que cliquei na opção de pagamento com o checkout custom
		And preenchi corretamente de todos os campos exceto o campo de 'expirationDate'
		And que o campo de 'expirationDate' tenha sido preenchido com '52/23'
		When eu clicar no botão submit
		Then uma mensagem de erro deve ser exibida

	Scenario: Submit com ano de vencimento inválido
		Given que eu tenha um produto no carrinho
		And que eu esteja na página de checkout
		And que preenchi corretamente os detalhes de faturamento
		And que cliquei na opção de pagamento com o checkout custom
		And preenchi corretamente de todos os campos exceto o campo de 'expirationDate'
		And que o campo de 'expirationDate' tenha sido preenchido com '12/18'
		When eu clicar no botão submit
		Then uma mensagem de erro deve ser exibida

	Scenario: Submit com installments sem preencher
		Given que eu tenha um produto no carrinho
		And que eu esteja na página de checkout
		And que preenchi corretamente os detalhes de faturamento
		And que cliquei na opção de pagamento com o checkout custom
		And preenchi corretamente de todos os campos exceto o campo de 'installments'
		When eu clicar no botão submit
		Then uma mensagem de erro deve ser exibida