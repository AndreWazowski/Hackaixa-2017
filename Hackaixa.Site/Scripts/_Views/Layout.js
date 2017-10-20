function Layout() {
    
    var contas;
    var categorias;
    var arrayAutoComplete = new Array();

    $(document).ready(function () {
        
        carregarIcones();
        obterContas();
        inicializarCampos();

        waitingDialog.hide();

    });

    function executarGetAjax(url) {
        let resultado = "";

        $.ajax({
            type: "GET",
            async: false,
            xhrFields: {
                withCredentials: true
            },
            url: url
        })
            .done(function (data) {
                resultado = data;
            })
            .fail(function (req, status, err) {
                alert(err);
            });

        return resultado;
    }

    function carregarIcones() {
        let resultado = executarGetAjax("https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/sinbc/nb/carrossel/carregar?_=1499618377719");

        if (resultado != "") {
            desenharIcones(resultado);
        }
    }

    function obterContas() {
        let resultado = executarGetAjax("https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/sinbc/nb/contas/listarTodasXs?nocache=1499619456235");

        if (resultado) {
            contas = resultado.contas;

            desenharContaSelecionada();
        }
    }

    function desenharContaSelecionada() {
        contas.map(conta => {
            if (conta.selecionada) {
                $("#nomeConta").html(`<img src='https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/siibc-static/nb/img/menu-arrow-buttom_N17.png'> ${conta.nome}`);
                $("#dadosConta").html(` Agencia <b>${conta.agencia}</b> Tipo <b>${conta.tipo}</b> Numero <b>${conta.conta}</b> Saldo <b>R$ ${obterSaldo()}<b/>`);
            }
        })
    }

    function obterSaldo() {
        var resultado = executarGetAjax("https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/sinbc/nb/componentSaldo/atualizaSaldo?context=sinbc");

        if (resultado) {
            return resultado.saldo;
        }

        return "";
    }

    function desenharIcones(data) {
        var icones = "";
        var count = 0;

        console.log(data);

        categorias = data.categoriasCarrossel;
        criarArrayParaAutoComplete();

        icones += `
                        <li class="item-carrossel">
                            <div class="prev"></div>
                        </li>`;

        categorias.map(categoria => {
            if (count < 9) {
                icones += `
                        <li class="item-carrossel" >
                                <label class="lbIcone ${count == 0 ? "selected" : ""}" data-id="${categoria.id}"><img src="${rootUrlArquivosExternos}${categoria.imagemDesktop}">${categoria.titulo}</label>
                        </li>`;

                if (count == 0) {
                    desenharItensDoMenu(categoria.id);
                }

                count++;
            }
        })

        icones += `
                        <li class="item-carrossel">
                            <div class="next"></div>
                        </li>`;

        $("#icones").html(icones);
    }

    function criarArrayParaAutoComplete() {

        categorias.map(categoria => {
            categoria.submenus.map(submenu => {

                submenu.itens.map(item =>
                    arrayAutoComplete.push({
                        item: item.titulo,
                        label: `${categoria.titulo} > ${submenu.titulo} > ${item.titulo}`,
                        menu: categoria.titulo,
                        submenu: submenu.titulo,
                        url: `${rootUrlArquivosExternos}${item.urlAplicacaoString}`
                    })
                );
            });
        });
    }

    function inicializarCampos() {
        $(".lbIcone").on("click", function (event) {
            $(".lbIcone").removeClass("selected");
            $(event.currentTarget).addClass("selected");
            desenharItensDoMenu(parseInt($(event.currentTarget).data("id")));
        });

        //$(".menuItem").on("click", function (event) {
        //    let resultado = executarGetAjax($(event.currentTarget).data("url"));
        //    console.log(resultado);
        //});

        $("#pesquisa").autocomplete({
            source: arrayAutoComplete,
            appendTo: ".pesquisa"
        });
    }

    function desenharItensDoMenu(categoriaId) {
        var itens = "";

        categorias.filter(categoria => {

            if (categoria.id == categoriaId) {
                itens += `<li class="sidebar-brand">
                            <label>${categoria.titulo}</label>
                        </li>`;

                categoria.submenus.map(submenu => {
                    itens += `<li class="active">
                                 <a href="#subMenu${submenu.id}" data-toggle="collapse" aria-expanded="false">${truncarTextoMenu(submenu.titulo)}</a>
                                 <ul class="collapse list-unstyled" id="subMenu${submenu.id}">
                                 ${montarSubMenu(submenu)}
                                </ul>
                             </li>`});
            }
        });

        $(".sidebar-nav").html(itens);

    }

    function montarSubMenu(submenu) {
        return submenu.itens.map(item => {
            var url = `${rootUrlArquivosExternos}${item.urlAplicacaoString.replace(".br//", ".br/").replace("interna#!/","")}`;
            var onclik = "";

            if (item.titulo.toLowerCase() == "extrato") {
                onclik = `onclick='javascript:new Extrato().obterExtrato("${url}");' `;
            }

            return `<li class="menuItem" ${onclik} data-url="${url}"><a>${truncarTextoMenu(item.titulo)}</a></li>`
        }).join('');

    }

    function truncarTextoMenu(texto) {
        return texto.length > 28 ? texto.substr(0, 28) + "..." : texto;
    }
}

new Layout();