import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isUpdate: false,
    cfg: {
      page: [],
      layer: {
        lines: [],
      },
      txts: [],
    },
    nodeData: {
      type: 'page',
      data: null,
    }, // 选中节点数据
  },
  mutations: {
    addPage(state, page) {
      // page = {"name":"","orientation":"portrait","format":"自定义","width":200,"X":"X","height":200}
      state.cfg.page.push(page);
      state.nodeData = {
        label: '纸张',
        data: page,
        type: 'page',
      };
    },
    addLayer(state, payload) {
      state.cfg.layer[payload.prop].push(payload.value);
      state.nodeData = {
        type: payload.prop,
        data: payload.value,
      };
    },
    addTxts(state, txt) {
      state.cfg.txts.push(txt);
      state.nodeData = {
        label: `${txt.isTxt ? '' : 'id: '}${txt.text}`,
        data: txt,
        type: 'txts',
      };
    },
    updateConfig(state, isUpdate) {
      // todo: 刷新事件
      state.isUpdate = isUpdate;
    },

    // 选中某个元素
    setNodeData(state, data) {
      // data = {label, data, type}
      state.nodeData = data;
    },

    // 更新或删除选中的元素
    freshConfig(state, newVal) {
      // newVal = {isDelete, value}
      let nodeData;
      if (newVal.isDelete) {
        nodeData = newVal.value;
      } else {
        // eslint-disable-next-line prefer-destructuring
        nodeData = state.nodeData;
      }

      function cut(isDelete, source, target) {
        const index = source.findIndex(val => (
          val === target
        ));
        if (isDelete) {
          source.splice(index, 1);
        } else {
          source.splice(index, 1, newVal.value);
        }
      }

      if (nodeData.type === 'lines') {
        cut(newVal.isDelete, state.cfg.layer.lines, nodeData.data);
        return;
      }
      if (nodeData.type === 'page') {
        cut(newVal.isDelete, state.cfg.page, nodeData.data);
        return;
      }
      if (nodeData.type === 'txts') {
        cut(newVal.isDelete, state.cfg.txts, nodeData.data);
      }
    },
  },
  actions: {

  },
});
