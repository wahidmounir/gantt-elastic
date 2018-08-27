export function TreeRowMilestone(prefix, self) {
  return self.wrapComponent({
    props : [ 'task', 'index' ],
    template :
        `<g class="elastigantt__tree-row-milestone-group" @mouseover="treeRowMouseOver" @mouseout="treeRowMouseOut">
      <svg class="elastigantt__tree-row"
        :x="task.x"
        :y="task.y"
        :width="task.width"
        :height="task.height"
        @click="treeRowClick"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon :points="getPoints" fill="#FF0000A0"></polygon>
        <${prefix}-tree-progress-bar :task="task"></${prefix}-tree-progress-bar>
        <${prefix}-tree-text :task="task" v-if="$root.$data.row.showText"></${prefix}-tree-text>
      </svg>
      <${prefix}-info :task="task" v-if="task.mouseOver"></${prefix}-info>
    </g>`,
    data() { return {}; },
    computed : {
      getViewBox() { return `0 0 ${this.task.width} ${this.task.height}`; },
      getGroupTransform() { return `translate(${this.task.x} ${this.task.y})`; },
      getPoints() {
        const task                               = this.task;
        const fifty                              = task.height / 2;
        const fourth                             = task.height / 8;
        const floor                              = task.height - fourth;
        const offset                             = 4;
        return `0,${fifty} 0,0 ${offset},0 ${offset * 2},${fourth} ${task.width - offset * 2},${fourth} ${
            task.width - offset},0 ${task.width},0 ${task.width},${fifty}  ${task.width},${task.height} ${
            task.width - offset},${task.height} ${task.width - offset * 2},${floor} ${offset * 2},${floor} ${offset},${
            task.height} 0,${task.height}`;
      },
    },
    methods : {
      treeRowClick() { this.task.tooltip.visible = !this.task.tooltip.visible; },
      treeRowMouseOver() { this.task.mouseOver   = true; },
      treeRowMouseOut() { this.task.mouseOver    = false; },
    }
  });
}
