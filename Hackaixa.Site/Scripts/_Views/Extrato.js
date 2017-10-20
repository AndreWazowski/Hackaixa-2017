function Extrato() {
    function desenharTabela() {
        $("#conteudo").html(`<div class="row">
                                <div class="form-group">
                                    <div class="col-md-12">
                                        <table id='movimentacoes' class="table display table-condensed"></table>
                                    </div>
                                </div>
                            </div>`
        );

        inicializarDataTable();
    }

    function inicializarDataTable() {
        tabela = $('#movimentacoes').DataTable({
            sDom: '<"top">rt<"bottom"ifp><"clear">',
            scrollY: "310px",
            scrollCollapse: true,
            paging: false,
            lengthChange: false,
            pageLength: 8,
            bSort: false,
            columns: [
                { data: "DataMov", title: "Data Mov.", class: "dt-center", width: "10%" },
                { data: "NrDoc", title: "Nr. Doc.", class: "dt-center", width: "15%" },
                { data: "Histórico", title: "Histórico", class: "dt-head-center", width: "25%" },
                { data: "Valor", title: "Valor", class: "dt-center", width: "20%" },
                { data: "Saldo", title: "Saldo", class: "dt-center", width: "5%" }
            ]
        });
    }

    var obterExtrato = function (url) {
        waitingDialog.show('Por favor, aguarde...', { dialogSize: 'sm' });

        console.log(url + " => " + "https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/SIIBC/extrato.processa");
        let movimentacoes = executarGetAjax(url, 2, '<tr>  <td class="txt-tit01" colspan="5">Extrato</td></tr>');
        let extrato = executarGetAjax(url, 3, '<tr>  <td class="txt-tit01" colspan="5">Lan&ccedil;amentos do Dia</td></tr><tr>');
        
        desenharTabela();
        //console.log(movimentacoes.replace(/\Data Mov./g, "DataMov").replace(/\Nr. Doc./g, "NrDoc"));
        tabela.rows.add(JSON.parse(movimentacoes.replace(/\Data Mov./g, "DataMov").replace(/\Nr. Doc./g, "NrDoc"))).draw(false);

        waitingDialog.hide();
    }

    function executarGetAjax(url, posicao, substituir) {
        let resultado = "";
        $.ajax({
            type: "GET",
            async: false,
            xhrFields: {
                withCredentials: true
            },
            url: url
        })
            .done(function (result) {
                result = result.replace(substituir, '');
                // console.log(result);
                resultado = run(1, result, posicao);
            })
            .fail(function (req, status, err) {
                console.log(`${JSON.stringify(req)} __ ${status} __ ${err}`);
            });

        return resultado;
    }


    var _public = {
        obterExtrato: obterExtrato
    }

    return _public;
}
//new Extrato();