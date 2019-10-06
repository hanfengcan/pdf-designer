(function (jsPDFAPI) {
var font = 'undefined';
var callAddFont = function () {
this.addFileToVFS('pdfDesign-normal.ttf', font);
this.addFont('pdfDesign-normal.ttf', 'pdfDesign', 'normal');
};
jsPDFAPI.events.push(['addFonts', callAddFont])
 })(jsPDF.API);