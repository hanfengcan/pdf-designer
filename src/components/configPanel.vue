<template>
  <div class="config-panel">
    <ncform
      id="ncform"
      :form-schema='configSchema'
      form-name="configPanel"
      v-model="configSchema.value"
      @submit="submit()"
      @change="onChange"
    ></ncform>
    <div style="padding: 10px 8px;">
      <el-button
        type="primary"
        @click="submit">{{ isNew ? '确定' : '更新' }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'configPanel',
  data() {
    return {
    };
  },
  computed: {
    isNew() {
      return this.$store.state.nodeData.data === null;
    },
    configSchema() {
      let properties = null;
      if (this.$store.state.nodeData.type === 'lines') {
        properties = this.getlinesSchema();
      } else if (this.$store.state.nodeData.type === 'txts') {
        properties = this.getTxtSchema();
      } else {
        properties = this.getPageSchema();
      }
      return {
        type: 'object',
        properties,
        value: this.$store.state.nodeData.data,
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
    });
  },
  methods: {
    async submit() {
      const data = await this.$ncformValidate('configPanel');
      if (data.result) {
        const { value } = this.configSchema;
        // 更新
        if (this.isNew === false) {
          this.$store.commit('freshConfig', { isDelete: false, value });
          return;
        }

        // 新增
        if (this.$store.state.nodeData.type === 'page') {
          this.$store.commit('addPage', value);
          return;
        }
        if (this.$store.state.nodeData.type === 'lines') {
          this.$store.commit('addLayer', {
            prop: 'lines',
            value,
          });
          return;
        }
        if (this.$store.state.nodeData.type === 'txts') {
          this.$store.commit('addTxts', value);
        }
      }
    },
    onChange() {
      // paths: 发生值变化的项的路径
      // itemValue：发生值变化的项的最新值
      // formVallue: 表单的最新值
      this.$store.commit('updateConfig', true);
    },
    pageFormat() {
      const format = ['dl',
        'letter',
        'government-letter',
        'legal',
        'junior-legal',
        'ledger',
        'tabloid',
        'credit-card'];
      for (let index = 0; index <= 10; index += 1) {
        format.push(`a${index}`);
      }
      for (let index = 0; index <= 10; index += 1) {
        format.push(`b${index}`);
      }
      for (let index = 0; index <= 10; index += 1) {
        format.push(`c${index}`);
      }
      format.push('自定义');
      return format.map(value => ({
        label: value,
        value,
      }));
    },
    // schema
    getPageSchema() {
      return {
        name: {
          type: 'string',
          ui: {
            widget: 'label',
            label: '纸张配置 (uint: mm)',
          },
        },
        orientation: {
          type: 'string',
          default: 'portrait',
          ui: {
            widget: 'select',
            label: '方向',
            widgetConfig: {
              enumSource: [
                {
                  value: 'portrait',
                  label: 'portrait',
                },
                {
                  value: 'landscape',
                  label: 'landscape',
                },
              ],
            },
          },
        },
        format: {
          type: 'string',
          default: '自定义',
          ui: {
            widget: 'select',
            label: '大小',
            widgetConfig: {
              enumSource: this.pageFormat(),
            },
          },
        },
        width: {
          type: 'number',
          default: '200',
          ui: {
            label: 'width',
            columns: '5',
            placeholder: 'width (mm)',
            hidden: 'dx: {{$root.format}} !== "自定义"',
          },
        },
        X: {
          type: 'string',
          default: 'X',
          ui: {
            showLabel: false,
            columns: '2',
            widget: 'label',
            itemClass: 'text-center',
            hidden: 'dx: {{$root.format}} !== "自定义"',
          },
        },
        height: {
          type: 'number',
          default: '200',
          ui: {
            label: 'height',
            columns: '5',
            placeholder: 'height (mm)',
            hidden: 'dx: {{$root.format}} !== "自定义"',
          },
        },
      };
    },
    getlinesSchema() {
      return {
        name: {
          type: 'string',
          ui: {
            widget: 'label',
            label: '线条',
          },
        },
        type: {
          type: 'string',
          default: 'x',
          ui: {
            widget: 'radio',
            label: '方向',
            widgetConfig: {
              enumSource: [
                {
                  value: 'x',
                  label: 'x',
                },
                {
                  value: 'y',
                  label: 'y',
                },
              ],
            },
          },
        },
        x: {
          type: 'number',
          default: 10,
          ui: {
            label: 'x',
            placeholder: 'width (mm)',
          },
        },
        y: {
          type: 'number',
          default: 10,
          ui: {
            label: 'y',
            placeholder: 'width (mm)',
          },
        },
        h: {
          type: 'number',
          default: 100,
          ui: {
            label: 'h (w)',
            placeholder: 'width (mm)',
          },
        },
      };
    },
    getTxtSchema() {
      return {
        name: {
          type: 'string',
          ui: {
            widget: 'label',
            label: '文本',
          },
        },
        x: {
          type: 'number',
          default: 10,
          ui: {
            label: 'x',
            placeholder: 'width (mm)',
          },
        },
        y: {
          type: 'number',
          default: 10,
          ui: {
            label: 'y',
            placeholder: 'width (mm)',
          },
        },
        size: {
          type: 'number',
          default: 16,
          ui: {
            label: 'font size(pt)',
            placeholder: 'font size(pt)',
          },
        },
        textAlign: {
          type: 'string',
          default: 'left',
          ui: {
            widget: 'select',
            label: '大小',
            widgetConfig: {
              enumSource: [
                { label: 'left', value: 'left' },
                { label: 'right', value: 'right' },
                { label: 'center', value: 'center' },
              ],
            },
          },
        },
        isTxt: {
          type: 'boolean',
          default: true,
          ui: {
            widget: 'radio',
            label: 'type',
            widgetConfig: {
              enumSource: [
                {
                  value: true,
                  label: '文本',
                },
                {
                  value: false,
                  label: '占位',
                },
              ],
            },
          },
        },
        text: {
          type: 'string',
          ui: {
            label: 'dx: {{$root.isTxt}} ? "文本" : "占位id"',
          },
        },
      };
    },
  },
};
</script>

<style lang="scss">
  #ncform {
    .text-center {
      text-align: center;
    }
    .el-input__inner {
      padding: 0 5px 0 10px;
    }
  }

</style>
