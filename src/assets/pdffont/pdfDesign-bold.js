(function (jsPDFAPI) {
var font = 'undefined';
var callAddFont = function () {
this.addFileToVFS('pdfDesign-bold.ttf', font);
this.addFont('pdfDesign-bold.ttf', 'pdfDesign', 'bold');
};
jsPDFAPI.events.push(['addFonts', callAddFont])
 })(jsPDF.API);