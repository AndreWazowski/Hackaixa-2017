var Site = function () {

    $(document).ready(function () {


        $.extend(jQuery.fn.dataTableExt.oSort, {
            "portugues-pre": function (data) {
                var a = 'a';
                var e = 'e';
                var i = 'i';
                var o = 'o';
                var u = 'u';
                var c = 'c';
                var special_letters = {
                    "Á": a, "á": a, "Ã": a, "ã": a, "À": a, "à": a,
                    "É": e, "é": e, "Ê": e, "ê": e,
                    "Í": i, "í": i, "Î": i, "î": i,
                    "Ó": o, "ó": o, "Õ": o, "õ": o, "Ô": o, "ô": o,
                    "Ú": u, "ú": u, "Ü": u, "ü": u,
                    "ç": c, "Ç": c
                };
                for (var val in special_letters)
                    data = data.split(val).join(special_letters[val]).toLowerCase();
                return data;
            },
            "portugues-asc": function (a, b) {
                return ((a < b) ? -1 : ((a > b) ? 1 : 0));
            },
            "portugues-desc": function (a, b) {
                return ((a < b) ? 1 : ((a > b) ? -1 : 0));
            }
        });

        $.extend(true, $.fn.dataTable.defaults.oLanguage, {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        });

        $('.datatable').DataTable({
            "columnDefs": [{ type: 'portugues', targets: "_all" }]
        });

        jQuery.fn.dataTableExt.oSort['numeric-comma-asc'] = function (a, b) {
            var x = (a == "-") ? 0 : a.replace(/\./g, "").replace(/,/, ".");
            var y = (b == "-") ? 0 : b.replace(/\./g, "").replace(/,/, ".");
            x = parseFloat(x);
            y = parseFloat(y);
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        };

        jQuery.fn.dataTableExt.oSort['numeric-comma-desc'] = function (a, b) {
            var x = (a == "-") ? 0 : a.replace(/\./g, "").replace(/,/, ".");
            var y = (b == "-") ? 0 : b.replace(/\./g, "").replace(/,/, ".");
            x = parseFloat(x);
            y = parseFloat(y);
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        };


        function dateBrPre(a) {
            if (a == null || a == "") {
                return 0;
            }
            var brDatea = a.split('/');
            return (brDatea[2] + brDatea[1] + brDatea[0]) * 1;
        };

        jQuery.fn.dataTableExt.oSort['date-br-asc'] = function (a, b) {
            a = dateBrPre(a);
            b = dateBrPre(b);
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        }

        jQuery.fn.dataTableExt.oSort['date-br-desc'] = function (a, b) {
            a = dateBrPre(a);
            b = dateBrPre(b);
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        }

        function preCompetencia(a) {
            if (a == null || a == "") {
                return 0;
            }
            var vetor = a.split('/');
            return (vetor[1] + vetor[0]) * 1;
        }

        jQuery.fn.dataTableExt.oSort['competencia-asc'] = function (a, b) {
            a = preCompetencia(a);
            b = preCompetencia(b);
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        }

        jQuery.fn.dataTableExt.oSort['competencia-desc'] = function (a, b) {
            a = preCompetencia(a);
            b = preCompetencia(b);
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        }
        
    });

    //return _public;

}

site = new Site();