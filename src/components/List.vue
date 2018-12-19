<template>
  <div>
    <nav-bar title="主角清单">
      <span slot="right" @click="addListWindow">添加
        <icon size="30px" name="edit"/>
      </span>
    </nav-bar>
    <tag class="tag" round type="danger">等级:{{level}}</tag>
    <tag class="tag" round type="primary">经验:{{exp}}</tag>
    <Button @click="clearData" style=" margin-left: 20px;" round size="small" type="danger">重头来过</Button>
    <div v-if="list.length === 0">
      <p style="text-align:center">点击右上角添加任务~</p>
    </div>
    <div v-else>
      <cell style="height:50px" v-for="item in list" :key="item.id" :title="item.name">
        <div slot="right-icon">
          <icon size="25px" @click="finishItem(item)" name="success" color="green"/>
          <icon
            size="25px"
            @click="deleteItem(item)"
            style=" margin-left: 20px;"
            color="red"
            name="clear"
          />
        </div>
      </cell>
    </div>

    <popup v-model="editShowWindow">
      <div style="width:300px; height:136px">
        <cell-group>
          <field v-model="taskName" label="任务名" placeholder="请输入任务名称" required/>
          <field v-model="expNum" type="number" label="经验值" placeholder="请输入经验值" required/>
          <Button @click="addList" size="large" type="primary">添加</Button>
        </cell-group>
      </div>
    </popup>
  </div>
</template>

<script>
var store = require("store");
import { NavBar, Icon, Tag, Cell, CellGroup, Popup, Field, Button } from "vant";
import "vant/lib/nav-bar/style";
import "vant/lib/icon/style";
import "vant/lib/tag/style";
import "vant/lib/list/style";
import "vant/lib/cell/style";
import "vant/lib/popup/style";
import "vant/lib/field/style";
import "vant/lib/button/style";
import "vant/lib/cell-group/style";

export default {
  name: "list",
  components: {
    NavBar,
    Icon,
    Tag,
    Cell,
    Popup,
    Field,
    Button,
    CellGroup
  },
  data() {
    return {
      level: 1,
      exp: 1,
      list: [],
      editShowWindow: false,
      taskName: "",
      expNum: 10
    };
  },
  methods: {
    addListWindow() {
      this.editShowWindow = true;
    },

    addList() {
      let task = {
        id: Date.parse(new Date()),
        name: this.taskName,
        exp: this.expNum
      };
      let taskList = this.list;
      taskList.push(task);
      this.editShowWindow = false;
      this.taskName = "";
      store.remove("list");
      store.set("list", taskList);
    },

    deleteItem(itemData) {
      let list = this.list;
      list.map((item, index) => {
        if (item === itemData) {
          this.list.splice(index, 1);
        }
      });
      store.remove("list");
      store.set("list", this.list);
    },

    finishItem(itemData) {
      this.exp = this.exp + itemData.exp;
      while (this.exp >= 10 * this.level) {
        this.exp = this.exp - (10 * this.level);
        this.level = this.level + 1;
      }

      store.remove("exp");
      store.set("exp", this.exp);
      store.remove("level");
      store.set("level", this.level);
      this.deleteItem(itemData);
    },

    clearData() {
      store.clearAll();
      this.level = 1;
      this.exp = 0;
      this.list = [];
    }
  },
  created: function() {
    if (store.get("list") !== undefined) {
      this.list = store.get("list");
    }
    if (store.get("exp") !== undefined) {
      this.exp = store.get("exp");
    }
    if (store.get("level") !== undefined) {
      this.level = store.get("level");
    }
  }
};
</script>

<style scoped>
.tag {
  margin-left: 10px;
}
</style>


