<template>
  <div class="design">
    <div
      class="designer"
      v-for="p in page" :key="p.id"
      :style="p">
      <canvas
        id="canvas-layer-shadow"
        :width="mm2px(p.width)"
        :height="mm2px(p.height)"
      ></canvas>
      <canvas
        id="canvas-layer-1"
        :width="mm2px(p.width)"
        :height="mm2px(p.height)"
      ></canvas>
      <canvas
        id="canvas-txt"
        :width="mm2px(p.width)"
        :height="mm2px(p.height)"
      ></canvas>
    </div>
  </div>
</template>

<script>
import CanvasDesign from '@/js/canvasDesign';
import util from '@/js/util';
import pageStyle from '@/js/pageStyle';

export default {
  name: 'designer',
  props: {
  },
  data() {
    return {
      canvasShadow: null,
      canvasLayer: null,
      canvasTxt: null,
    };
  },
  computed: {
    page() {
      return this.getDefaultPageSize(this.$store.state.cfg.page);
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    '$store.state.cfg.layer.lines': function () {
      if (this.canvasLayer === null) {
        this.canvasLayer = new CanvasDesign('canvas-layer-1');
      }
      this.canvasLayer.clearCanvas();
      this.canvasLayer.drawLines(this.$store.state.cfg.layer.lines);
    },
    // eslint-disable-next-line func-names
    '$store.state.cfg.txts': function () {
      if (this.canvasTxt === null) {
        this.canvasTxt = new CanvasDesign('canvas-txt');
      }
      this.canvasTxt.clearCanvas();
      this.canvasTxt.drawtxts(this.$store.state.cfg.txts);
    },
    // eslint-disable-next-line func-names
    '$store.state.nodeData': function () {
      if (this.canvasShadow === null) {
        this.canvasShadow = new CanvasDesign('canvas-layer-shadow');
      }
      this.canvasShadow.clearCanvas();
      this.canvasShadow
        .drawShadow(this.$store.state.nodeData.type, this.$store.state.nodeData.data);
    },
  },
  methods: {
    mm2px(mm) {
      return util.mm2px(mm);
    },
    getDefaultPageSize(page) {
      // 获取纸张, 如果没有就往store.state.editData加个默认值
      const { pageFormat } = pageStyle;
      if (page.length) {
        return page.map((p) => {
          if (p.format !== '自定义') {
            return pageFormat[p.format];
          }
          return { width: `${p.width}mm`, height: `${p.height}mm` };
        });
      }
      return [pageFormat.a4];
    },
  },
  mounted() {
    this.$nextTick(() => {
    });
  },
};
</script>

<style lang="scss" scoped>
  .design {
    height: 100%;
    width: 100%;
    padding: 60px 10px 10px 10px;
    text-align: center;
    background-color: #606266;
    overflow: auto;

    .designer {
      position: relative;
      background-color: white;
      display: inline-block;
      box-shadow: 4px 4px 10px 2px rgba(0, 0, 0, 0.1);
      canvas {
        position: absolute;
        top: 0px;
        left: 0px;
      }
      #canvas-layer-shadow {
        z-index: 1;
      }
      #canvas-layer-1 {
        z-index: 10;
      }
      #canvas-txt {
        z-index: 100;
      }
    }
    .designer + .designer {
      margin-top: 10px;
    }
  }
</style>
