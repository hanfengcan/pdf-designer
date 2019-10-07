export default {
  mm2px(mm) {
    // 96px = 25.4mm
    let result = mm;
    if (typeof mm === 'string') {
      result = mm.replace('mm', '');
    }
    result = Math.floor(result * 96 / 25.4);
    return result;
  },
  mm2pt(mm) {
    // 72pt = 25.4mm
    let result = mm;
    if (typeof mm === 'string') {
      result = mm.replace('mm', '');
    }
    result = Math.floor(result * 72 / 25.4);
    return result;
  },
  config2pdfConfig(cfg) {
    const pdf = {
      page: {},
      layer: {},
      txts: {},
      data: {},
    };
    pdf.page.orientation = cfg.page[0].orientation;
    pdf.page.format = cfg.page[0].format === '自定义' ? [this.mm2pt(cfg.page[0].width), this.mm2pt(cfg.page[0].height)] : cfg.page.format;
    pdf.layer = cfg.layer;
    pdf.txts = cfg.txts.map(t => ({
      text: t.isTxt ? t.text : pdf.data[t.text],
      x: t.x,
      y: t.y,
      size: t.size,
      opt: {
        align: t.textAlign,
      },
    }));
    return pdf;
  },
};
