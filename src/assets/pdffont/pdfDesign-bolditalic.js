(function (jsPDFAPI) {
var font = 'undefined';
var callAddFont = function () {
this.addFileToVFS('pdfDesign-bolditalic.ttf', font);
this.addFont('pdfDesign-bolditalic.ttf', 'pdfDesign', 'bolditalic');
};
jsPDFAPI.events.push(['addFonts', callAddFont])
 })(jsPDF.API);