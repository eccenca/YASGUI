var sparql = null;

jQuery.getJSON('sparql.json', function(data) {
  sparql = data;
  buildQrySelect();
});

jQuery('#test').click(function() {
    copyJsonToClipboard(JSON.stringify(sparql))
});


function copyJsonToClipboard(text) {
  var newText = window.prompt("Copy to clipboard: Cmd+C/Ctrl+C, Enter\nTo load queries from JSON: paste single line of JSON, Enter", text);
  if (newText > "" && newText != text) {
    console.log(sparql);
    console.log("replace json with: " + newText);
    sparql = JSON.parse(newText);
    console.log(sparql);
    buildQrySelect();
  }
}

function buildQrySelect() {
  jQuery('#queries_selector').find('option').remove().end();
  jQuery('#queries_selector').append(jQuery('<option></option>').val("-1").html("select to load query..."));
  var saveName = jQuery("#save_name").val();
  jQuery.each(sparql.queries, function(index, value) {
    jQuery('#queries_selector').append(jQuery('<option></option>').val(index).html(value.name));
  });
  jQuery("#queries_selector option").filter(function() {
    return this.text == saveName; 
  }).attr('selected', true);
  jQuery('#jsontxt').val();
}

function saveQry() {
  var saveName = jQuery("#save_name").val();
  console.log("Save as: " + saveName);
  if (saveName != null && saveName > "") {
    var curTab = yasgui.current(); 
    var qry = curTab.yasqe.getValue();
    console.log("Query: " + qry);
    var saved = false;
    jQuery.each(sparql.queries, function(index, value) {
      if (value.name == saveName) {
        console.log("replaces saved qry");
        sparql.queries[index].sparql = qry;
        saved = true;
      }
    });
    if (!saved) {
      var object = {
        "name": saveName,
        "sparql": qry
      };
      sparql['queries'].push(object);
      console.log("saved as new qry");
      console.log(sparql);
    } 
    buildQrySelect();
  }
}

function loadQry(event) {
  var selVal = jQuery('#queries_selector').val();
  if (selVal == "-1") {
    jQuery("#save_name").val("");
    return;
  }
  var text = jQuery("#queries_selector option:selected").text();
  jQuery("#save_name").val(text);
  console.log("select qry: " + selVal);
  var qry = sparql.queries[selVal].sparql;
  var curTab = yasgui.current(); 
  curTab.yasqe.setValue(qry);
}

function superclasses() {
  var qry = "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n\
SELECT DISTINCT ?class \n\
WHERE { [] rdfs:subClassOf ?class } \n\
ORDER BY ?class";

  var curTab = yasgui.current(); 
  curTab.yasqe.setValue(qry);
  curTab.yasqe.query();
}

function classes() {
  var qry = "\
SELECT DISTINCT ?class \n\
WHERE { [] a ?class } \n\
ORDER BY ?class";

  var curTab = yasgui.current(); 
  curTab.yasqe.setValue(qry);
  curTab.yasqe.query();
}

function properties() {
  var qry = "\
SELECT DISTINCT ?property \n\
WHERE { [] ?property [] } \n\
ORDER BY ?property";

  var curTab = yasgui.current(); 
  curTab.yasqe.setValue(qry);
  curTab.yasqe.query();
}

function descr(uri) {
  if (uri != null && uri != "") {
    var qry = "\
SELECT DISTINCT ?property ?hasValue ?isValueOf \n\
WHERE { \n\
    { <"+uri+"> ?property ?hasValue } \n\
  UNION \n\
    { ?isValueOf ?property <"+uri+"> } \n\
} ORDER BY (!BOUND(?hasValue)) ?property ?hasValue ?isValueOf";
    var curTab = yasgui.current(); 
    curTab.yasqe.setValue(qry);
    curTab.yasqe.query();
  }
}