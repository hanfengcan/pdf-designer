import Jspdf from 'jspdf';
// import '@/assets/pdffont/pdfDesign-normal';
// import '@/assets/pdffont/pdfDesign-bold';
// import '@/assets/pdffont/pdfDesign-italic';
// import '@/assets/pdffont/pdfDesign-bolditalic';

class pdfDesign {
  constructor() {
    this.cfg = {
      page: {
        orientation: 'portrait',
        format: 'a4',
      },
      layer: {
        lines: [],
      },
      txts: [],
    };
  }

  /**
   * @returns {Object} 配置项 从get拿到的cfg可以不用set
   */
  getCfg() {
    // 使用getter, vscode的提示不够友好?
    return this.cfg;
  }

  /**
   * 设置配置项
   * @param {Object} cfg 配置项目
   * @param {Object} cfg.page 纸张参数
   * @param {string} cfg.page.orientation 纸张方向
   * @param {string} cfg.page.format 纸张格式
   * @param {Object} cfg.layer 层
   * @param {Array} cfg.layer.lines 线段层
   * @param {Array} cfg.txts 文本
   */
  setCfg(cfg) {
    this.cfg = cfg;
  }

  create(orientation = 'portrait', format = 'a4') {
    // this.pdf.setFont('pdfDesign'); // 导入字体
    this.pdf = new Jspdf({
      // unit: 'pt',
      orientation,
      format,
    });
  }

  /**
   * 画线段
   * @param {Object[]} lines 线段
   * @param {string} lines.type 线段类型 横线x 竖线y
   * @param {number} lines.x 起点x坐标
   * @param {number} lines.y 起点y坐标
   * @param {number} lines.h 起点长度
   * @param {string} lines.style 线段风格, 详见http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#line
   */
  drawLines(lines) {
    lines.forEach((line) => {
      if (line.type === 'x') {
        this.pdf.line(line.x, line.y, line.x + line.h, line.y, line.style || 'S');
      } else if (line.type === 'y') {
        this.pdf.line(line.x, line.y, line.x, line.y + line.h, line.style || 'S');
      } else {
        const msg = `type 不能为${line.type}`;
        const err = new Error(msg);
        throw err;
      }
    });
  }

  /**
   * 添加文本
   * @param {Object []} txts 文本
   * @param {string} txts.text 文本内容
   * @param {number} txts.x x位置
   * @param {number} txts.y y位置
   * @param {Object} txts.opt 具体参考http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#text
   * @param {string} txts.size 字号
   * @param {string} txts.style 斜体...
   */
  drawtxts(txts) {
    txts.forEach((text) => {
      if (text.size) {
        this.pdf.setFontSize(text.size);
      }
      if (text.style) {
        this.pdf.setFontStyle(text.style);
      }
      this.pdf.text(text.text, text.x, text.y, text.opt);
    });
  }

  /**
   * 渲染pdf
   * @param {function} bgnCb 渲染开始回调函数
   * @param {function} endCb 渲染结束回调函数
   */
  render(bgnCb, endCb) {
    if (typeof bgnCb === 'function') {
      bgnCb();
    }
    this.create(this.cfg.page.orientation, this.cfg.page.format);
    this.drawLines(this.cfg.layer.lines);
    this.drawtxts(this.cfg.txts);
    if (typeof endCb === 'function') {
      endCb();
    }
  }

  /**
   * 输出pdf
   */
  update() {
    // return this.pdf.output('datauristring');
    return this.pdf.output('bloburl');
  }
}

export default pdfDesign;
