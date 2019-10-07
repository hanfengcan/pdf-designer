<template>
  <div>
    <el-collapse v-model="manager">
      <el-collapse-item title="纸张层" name="page">
        <el-tree
          :data="page"
          :props="managerProps"
          @node-click="nodeClick"></el-tree>
      </el-collapse-item>
      <el-collapse-item title="线条层" name="line">
        <el-tree
          :data="layer.lines"
          :props="managerProps"
          @node-click="nodeClick">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                v-if="node.label !== '新增'"
                type="text"
                size="mini"
                @click.stop="() => remove(node, data)">
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-collapse-item>
      <el-collapse-item title="文本层" name="txt">
        <el-tree
          :data="txt"
          :props="managerProps"
          @node-click="nodeClick"></el-tree>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'layerManager',
  data() {
    return {
      manager: 'page',
      managerProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  computed: {
    layer() {
      const obj = {};
      obj.lines = this.$store.state.cfg.layer.lines.map(line => ({
        label: `${line.type} ${line.x}*${line.y}*${line.h}`,
        data: line,
        type: 'lines',
      }));
      obj.lines.push({
        label: '新增',
        data: null,
        type: 'lines',
      });
      return obj;
    },
    txt() {
      const obj = this.$store.state.cfg.txts.map(txt => ({
        label: txt.text,
        data: txt,
        type: 'txts',
      }));
      obj.push({
        label: '新增',
        data: null,
        type: 'txts',
      });
      return obj;
    },
    page() {
      return this.$store.state.cfg.page.map(p => ({
        label: `${p.name || '纸张'} ${p.width}*${p.height}`,
        data: p,
        type: 'page',
      }));
    },
  },
  methods: {
    nodeClick(data) {
      this.$store.commit('setNodeData', data);
    },
    remove(node, value) {
      this.$store.commit('freshConfig', { isDelete: true, value });
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
