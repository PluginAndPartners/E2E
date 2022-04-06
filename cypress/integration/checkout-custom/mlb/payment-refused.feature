Feature:  Payment Refused

    Scenario: Pagamento recusado
        Given um item no carrinho de compras
        When realizo o processo de checkout com OTHE OTHE
        Then na página do pedido devo visualizar uma mensagem dizendo que o pagamento foi recusado e deve ser feito uma retentativa