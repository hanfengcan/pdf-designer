import util from '@/js/util';

class canvasDesign {
  constructor(id) {
    this.canvas = document.getElementById(id);
    if (this.canvas.getContext) {
      /** type {HTMLCanvasElement} */
      this.ctx = this.canvas.getContext('2d');
    }
  }

  /**
   * 画线段
   * @param {Object[]} lines 线段
   * @param {string} lines.type 线段类型 横线x 竖线y
   * @param {number} lines.x 起点x坐标
   * @param {number} lines.y 起点y坐标
   * @param {number} lines.h 起点长度
   * @param {string} lines.style 线段风格
   */
  drawLines(lines) {
    if (lines.length === 0) {
      return;
    }
    this.ctx.beginPath();
    this.ctx.lineJoin = 'round';
    lines.forEach((line) => {
      this.ctx.moveTo(util.mm2px(line.x), util.mm2px(line.y));
      if (line.type === 'x') {
        this.ctx.lineTo(util.mm2px(line.h + line.x), util.mm2px(line.y));
      } else if (line.type === 'y') {
        this.ctx.lineTo(util.mm2px(line.x), util.mm2px(line.h + line.y));
      } else {
        const msg = `type 不能为${line.type}`;
        const err = new Error(msg);
        throw err;
      }
    });
    this.ctx.closePath();
    this.ctx.stroke();
  }

  /**
   * 添加文本
   * @param {Object []} texts 文本
   * @param {string} texts.text 文本内容
   * @param {number} texts.x x位置
   * @param {number} texts.y y位置
   * @param {Object} texts.opt 具体参考http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#text
   * @param {string} texts.size 字号
   * @param {string} texts.style 斜体...
   */
  drawtxts(texts) {
    texts.forEach((text) => {
      // this.ctx.font
      if (text.opt && text.opt.baseline) {
        this.ctx.textBaseline = text.opt.baseline;
      }
      if (text.size) {
        this.ctx.font = `${text.size}pt sans-serif`;
      }
      if (text.textAlign) {
        this.ctx.textAlign = text.textAlign;
      }
      this.ctx.fillText(text.text, util.mm2px(text.x), util.mm2px(text.y));
    });
  }

  /**
   * 绘阴影
   * @param {string} type 类型 eg: line, txt
   * @param {Array} obj 阴影对象
   */
  drawShadow(type, obj) {
    this.ctx.shadowOffsetX = 2;
    this.ctx.shadowOffsetY = 2;
    this.ctx.shadowBlur = 2;
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    if (type === 'lines' && obj) {
      this.drawLines([obj]);
    } else if (type === 'txts' && obj) {
      this.drawtxts([obj]);
    }
  }

  /**
   * 清空画布
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default canvasDesign;
