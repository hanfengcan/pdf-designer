<template>
  <div class="home">
    <div class="left"><layerManager></layerManager></div>
    <div class="container">
      <div class="switch">
        <div
          @click="panel = 'design'"
          :class="{ 'switch-active': panel === 'design', 'switch-design': true}">设计</div>
        <div
          @click="panel = 'preview'"
          :class="{ 'switch-active': panel === 'preview', 'switch-preview': true}">预览</div>
      </div>
      <div class="panel">
        <designer v-show="panel === 'design'"></designer>
        <div id="pdf-viewer" v-show="panel === 'preview'"></div>
      </div>
    </div>
    <div class="right"><configPanel></configPanel></div>
  </div>
</template>

<script>
// @ is an alias to /src
import pdfobj from 'pdfobject';
import PdfDesign from '@/js/pdfDesign';
import designer from '@/components/designer.vue';
import layerManager from '@/components/layerManager.vue';
import configPanel from '@/components/configPanel.vue';

export default {
  name: 'home',
  components: {
    designer,
    layerManager,
    configPanel,
  },
  data() {
    return {
      panel: 'design',
    };
  },
  create() {
  },
  mounted() {
    const pdf = new PdfDesign();
    const cfg = pdf.getCfg();
    cfg.layer.lines = [{
      type: 'y', x: 20, y: 0, h: 580,
    }, {
      type: 'y', x: 40, y: 0, h: 580,
    }, {
      type: 'y', x: 60, y: 0, h: 580,
    }, {
      type: 'y', x: 80, y: 0, h: 580,
    }, {
      type: 'y', x: 100, y: 0, h: 580,
    }, {
      type: 'y', x: 120, y: 0, h: 580,
    }, {
      type: 'y', x: 140, y: 0, h: 580,
    }, {
      type: 'y', x: 160, y: 0, h: 580,
    }, {
      type: 'y', x: 180, y: 0, h: 580,
    }, {
      type: 'y', x: 200, y: 0, h: 580,
    }, {
      type: 'y', x: 210, y: 0, h: 580,
    }];
    // cfg.txts = [{
    //   text: 'hello', x: 10, y: 10,
    // }, {
    //   text: 'world', x: 10, y: 20, size: 16,
    // }];
    // pdf.setCfg(cfg);
    pdf.render();
    pdfobj.embed(pdf.update(), '#pdf-viewer');
  },
};
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
    display: flex;

    .left {
      background-color: white;
      width: 300px;
      box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      padding: 10px;
      overflow: auto;
    }

    .right {
      background-color: white;
      width: 300px;
      box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      padding: 10px;
      overflow: auto;
    }

    .container {
      flex: 1;
      background-color: white;
      margin: 0 10px;
      box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      padding: 10px;
      .switch {
        display: flex;
        justify-content: center;
        height: 34px;
        .switch-design {
          border-top-left-radius: 13px;
          border-bottom-left-radius: 13px;
          border: 1px solid #DCDFE6;
          width: 60px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1);
          transition: .5s;
        }
        .switch-design:hover {
          color: #409EFF;
          border-color: #c6e2ff;
          background-color: #ecf5ff;
        }
        .switch-preview {
          border-top-right-radius: 13px;
          border-bottom-right-radius: 13px;
          border: 1px solid #DCDFE6;
          width: 60px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          margin-left: -1px;
          box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1);
          transition: .5s;
        }
        .switch-preview:hover {
          color: #409EFF;
          border-color: #c6e2ff;
          background-color: #ecf5ff;
        }
        .switch-active {
          background-color: #409EFF;
          border: 1px solid #409EFF;
        }
      }
      .panel {
        height: calc(100% - 34px);
        #pdf-viewer {
          height: 100%;
        }
      }
    }
  }
</style>
