(function (jsPDFAPI) {
var font = 'undefined';
var callAddFont = function () {
this.addFileToVFS('pdfDesign-italic.ttf', font);
this.addFont('pdfDesign-italic.ttf', 'pdfDesign', 'italic');
};
jsPDFAPI.events.push(['addFonts', callAddFont])
 })(jsPDF.API);