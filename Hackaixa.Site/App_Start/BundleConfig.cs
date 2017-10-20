using System.Web;
using System.Web.Optimization;

namespace Hackaixa.Site {
    public class BundleConfig {
        // Para obter mais informações sobre o agrupamento, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles) {

            bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
                     "~/Scripts/jquery-{version}.js",
                     "~/Scripts/jquery-ui-{version}.js",
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/Site.js",
                      "~/Scripts/DataTables/media/js/jquery.dataTables.js",
                     "~/Scripts/DataTables/media/js/dataTables.bootstrap.min.js",
                     "~/Scripts/DataTables/extensions/FixedColumns/js/dataTables.fixedColumns.min.js",
                     "~/Scripts/DataTables/extensions/Buttons/js/dataTables.buttons.min.js",
                     "~/Scripts/DataTables/extensions/Buttons/js/buttons.flash.js",
                     "~/Scripts/DataTables/extensions/Buttons/js/buttons.html5.min.js",
                     "~/Scripts/DataTables/extensions/Buttons/js/buttons.print.min.js",
                     "~/Scripts/waitingfor.js",
                      "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/simple-sidebar.css",
                      "~/Content/jquery-ui/jquery-ui.css",
                      "~/Content/DataTables/media/css/jquery.dataTables.min.css",
                    "~/Content/DataTables/media/css/jquery.dataTables.min.css",
                    "~/Content/DataTables/extensions/Buttons/css/buttons.dataTables.css",
                    "~/Content/DataTables/extensions/FixedColumns/css/fixedColumns.dataTables.min.css"));
        }
    }
}
