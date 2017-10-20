
function run(what, RetornoAjax, tabela) {
    var delimiter = ",";
    var noMultiLines = true;
    var whichTable = tabela;
    var forceHeader = true;
    whichTable = whichTable || "0";
    var bQuotes = false;
    var removeTags = true;
	$("#divHtml").remove();
	$("body").append("<div id='divHtml' style='display:none'></div>");
    var html=document.getElementById('divHtml');
    html.innerHTML=RetornoAjax.replace(/<script/gmi,"<xxxxx");
    html.innerHTML=RetornoAjax.replace(/<style/gmi,"<yyyyy");

    var s="";
    var cells;
    var value;
    var tbl = html.getElementsByTagName('table');
    var cnt=tbl.length;
    var re = new RegExp("<\/?\\w+((\\s+\\w+(\\s*=\\s*(?:\".*?\"|'.*?'|[^'\">\\s]+))?)+\\s*|\\s*)\/?>",'igm');
    var headerFound=false;
    for(var j=0;j<tbl.length;j++) {
        if( (""+(j+1)) != whichTable && whichTable!="0") continue;
        rows=tbl[j].getElementsByTagName('tr');
        for(var k=0;k<rows.length;k++) {
            if (k==0) {
               cells=rows[k].getElementsByTagName('th'); 
               if(cells && cells.length>0)headerFound=true;
            }
            if ('querySelectorAll' in document) {
               cells=rows[k].querySelectorAll('td,th');
            } else {
               cells=rows[k].getElementsByTagName('td');
               if(!cells || cells.length==0) {
                  cells=rows[k].getElementsByTagName('th');
               }
            }

            for(var n=0;n<cells.length;n++) {
               value=cells[n].innerHTML;
               if(value==null)value="";else value+="";
               value = value.replace(/\r\n|\r|\n/gmi,' ');
               if(noMultiLines) value = value.replace(/\n|<br>|<br\/>|<br \/>/gmi,'\n');
               //else value = value.replace(/\r\n|\r|\n|<br>|<br\/>|<br \/>/gmi,'\n');
               if (removeTags) value=value.replace(re,''); 
               //value=_.unescape(value);
               value=value.replace(/&nbsp;/gmi," ");
               value=value.trim();
               if(bQuotes) {
                  s += '"' + value.replace(/"/gmi, '""') + '"' + delimiter; 
               }
               else {
                  s+=value.toCsv(delimiter,'"') + delimiter; 
               } 
           }
           s=s.slice(0, delimiter.length*-1); // remove last delimiter
           s += "\n"; 
        } 
    }
    // s contains csv, convert that to JSON.
    RetornoJson = s; 
    if(cnt<1 && RetornoJson.trim() != "") {
       console.log('Nao foram encontradas tabelas');
    }else{
		console.log('Foram encontratadas' + cnt + 'tabelas');
	}
	
    

    var options = {"global":[]};
    options.forceWrap  = false;
    options.nullIsNull = true;
    options.useFieldsData  = false;
    options.fldPropName    = "fields";
    options.dataPropName   = "data";

    CSV.isFirstRowHeader = headerFound || forceHeader;
    CSV.parse(RetornoJson);
    what = what || page.lastWhat;
        switch (what) {
          case 1: options.isKeyed    = false;
                  return csvToJSON(CSV,options);
                  break;
          case 2: options.isKeyed    = true;
                  return csvToJSON(CSV,options);
                  break;
          case 3: return csvToJSONArray(CSV,options);
                  break;
          case 4: return csvToJSONColumnArray(CSV,options);
                  break;
        }
        page.lastWhat = what;
}