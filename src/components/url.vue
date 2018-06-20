<template>
  <div class="url">
    <div class="header">
      横琴-产品url配置
    </div>
    <div class="env">
      <div class="url-title">环境配置</div>
      <div class="env-item">
        <span class="env-item-title">测试环境：</span>
        <input type="text" class="env-item-input" v-model="testEav">
      </div>
      <div class="env-item">
        <span class="env-item-title">uat环境：</span>
        <input type="text" class="env-item-input" v-model="uatEnv">
      </div>
      <div class="env-item">
        <span class="env-item-title">生产环境：</span>
        <input type="text" class="env-item-input" v-model="productEnv">
      </div>
    </div>
    <div class="product">
      <div class="url-title">活动及产品配置</div>
      <div class="product-set">
        <div class="activity-name">
          <span class="activity-title">活动名称：</span>
          <input type="text" class="activity-input" placeholder="请输入活动名称" v-model="activityName">
        </div>
        <div class="activity-name">
          <span class="activity-title">活动路径：</span>
          <input type="text" class="activity-input" placeholder="请输入活动路径" v-model="activityUrl">
        </div>
        <div class="activity-name">
          <span class="activity-title">活动id：</span>
          <input type="text" class="activity-input" placeholder="请输入活动Id" v-model="productId">
        </div>
        <div class="activity-name">
          <span class="activity-title">agent：</span>
          <input type="text" class="activity-input" placeholder="请输入agent" v-model="agent">
        </div>
        <div class="activity-name">
          <span class="activity-title">activity：</span>
          <input type="text" class="activity-input" placeholder="请输入activity" v-model="activity">
        </div>
        <div class="activity-activity">
          <div class="activity-activity-item">
            <span class="a-a-item-title">activityId:</span>
            <input type="text" v-model="activityId" class="a-a-item-input">
          </div>
          <div class="activity-activity-item">
            <span class="a-a-item-title">channelNo:</span>
            <input type="text" v-model="channelNo" class="a-a-item-input">
          </div>
          <div class="activity-activity-item">
            <span class="a-a-item-title">shareId:</span>
            <input type="text" v-model="shareId" class="a-a-item-input">
          </div>
          <div class="activity-activity-item">
            <span class="a-a-item-title">shareFrom:</span>
            <input type="text" v-model="shareFrom" class="a-a-item-input">
          </div>
          <input type="button" value="生成activity" class="a-a-button" @click="createActivity">
        </div>
      </div>

      <div class="product-content">
        <div class="product-detail">
          <div class="form-item" v-for="(item,index) in dataList" :key="index">
            <span>产品{{index + 1}}：</span>
            <input type="text" name="name" :value="item.name" placeholder="请输入产品名称"/>
            <input type="text" name="code" :value="item.productId" placeholder="请输入产品的productID"/>
          </div>
        </div>
        <div class="product-content-add" @click="onAdd">+</div>
        <div class="submit">
          <input type="button" class="submit-button" value="提交" @click="onSubmit">
          <input type="button" class="submit-clear" value="清除" @click="onClear">
        </div>
      </div>
    </div>
    <div class="result">
      <div class="url-title">配置结果</div>
      <div v-if="logs">
        <h3>活动名称：{{logs.title}}</h3>
        <div v-for="items in logs.data">
          <h3>{{items.env}}</h3>
          <div v-for="item in items.list">
            <div>{{item.name}}：{{item.productUrl}}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  //  "{"activityId":"p306180611","channelNo":"306","shareId":null,"shareFrom":null}"
  export default {
    name: 'url',
    data() {
      return {
        name: '',
        testEav: 'http://hengqinlife-test.e-hqins.com',
        uatEnv: 'http://hengqinlife-uat.e-hqins.com',
        productEnv: 'http://wechat.e-hqins.com',
        activityName: '',
        activityUrl: '',
        productId: '',
        activityId: 'p306180611',
        channelNo: '306',
        shareId: null,
        shareFrom: null,
        agent: 'WX00000003',
        activity: '',
        dataList: [
          {name: this.name, productId: this.productId}
        ],
        logs: null
      }
    },
    methods: {
      createActivity() {
        let activityId = this.activityId ? this.activityId.trim() : null;
        let channelNo = this.channelNo ? this.channelNo.trim() : null;
        let shareId = this.shareId ? this.shareId.trim() : null;
        let shareFrom = this.shareFrom ? this.shareFrom.trim() : null;
        let params = {activityId: activityId, channelNo: channelNo, shareId: shareId, shareFrom: shareFrom};
        this.activity = btoa(JSON.stringify(params));
        //生成base64 btoa()   解码atob()

      },
      onSubmit() {
        let formItem = document.getElementsByClassName('form-item');
        let inputValues = [];
        for (let i = 0; i < formItem.length; i++) {
          let formContent = formItem[i].getElementsByTagName('input');
          let name = formContent[0].value.trim();
          let productId = formContent[1].value.trim();
          inputValues.push({name: name, productId: productId});
        }
        if (!this.activityName) {
          alert('请输入活动名称');
          return;
        }
        if (!this.activity) {
          alert('请生成activity');
          return;
        }
        if (!this.activityUrl) {
          alert('请输入活动路径');
          return;
        }
        let objArray = [{
          title: this.activityName,
          productList: inputValues,
          path: this.activityUrl,
          params: {
            productId: this.productId,
            agent: this.agent,
            activity: this.activity,
          }
        }];
        var hostMap = {
          '测试环境': 'http://hengqinlife-test.e-hqins.com',
          'uat环境': 'http://hengqinlife-uat.e-hqins.com',
          '生产环境': 'http://wechat.e-hqins.com'
        }
        this.dealUrl(objArray, hostMap);
        this.onClear();
      },
      dealUrl(arr, hostMap) {
        var logs = '';
        var list = [];
        arr.forEach((item) => {
          for (let i in hostMap) {
            let host = hostMap[i];
            let name = i;
            list.push(this.createHostLinks(item, host, name));
          }
          this.logs = {title: item.title, data: list};
          console.log('this.logs');
          console.log(this.logs);
        });
      },
      createHostLinks(opt, host, EVNName) {
        let length_str = '';
        let title = opt.title;
        let list = opt.productList;
        let activity = opt.activity;
        let path = opt.path;
        let params = opt.params;
        let productList = [];
        let envObj = {};
        list.forEach((item) => {
          let url = '';
          params.productId = item.productId;
          url = this.createLink(host, path, params);
          productList.push({name: item.name, productUrl: url});
        })
        return {env: EVNName, list: productList}
      },
      createLink(host, pagePath, params) {
        let param = this.queryStringToParse(params);
        let link = `${host}${pagePath}?${param}`;
        return link
      },
      queryStringToParse(params) {
        let param = [];
        for (let i in params) {
          if (params[i].indexOf('=') > -1) {
            params[i] = encodeURIComponent(params[i])
          }
          let str = `${i}=${params[i]}`
          param.push(str)
        }
        return `${param.join('&')}`
      },
      onAdd() {
        let formItem = document.getElementsByClassName('form-item');
        let inputValues = [];
        for (let i = 0; i < formItem.length; i++) {
          let formContent = formItem[i].getElementsByTagName('input');
          let name = formContent[0].value;
          let productId = formContent[1].value;
          this.dataList[i].name = name;
          this.dataList[i].productId = productId;
        }
        this.dataList.push({name: '', productId: ''});
      },
      onClear() {
        this.dataList = [
          {name: this.name, productId: this.productId}
        ];
      }
    }
  }
</script>

<style lang="scss">
  input {
    border: 1px solid darkgrey;
    outline: none;
    border-radius: 4px;
  }

  .url {
    .header {
      line-height: 64px;
      padding: 0 30px;
      background: royalblue;
      font-size: 24px;
      color:#ffffff;
    }
    .url-title {
      font-size: 24px;
      margin-bottom: 30px;
    }
    .env {
      margin: 30px 30px 0;
      border-bottom: 1px solid grey;
      .env-item {
        /*margin: 0 0 20px 30px;*/
        font-size: 18px;
        width: 420px;
        display: inline-block;
        margin-bottom: 20px;
        .env-item-title {
          display: inline-block;
          width: 100px;
        }
        .env-item-input {
          font-size: 16px;
          width: 300px;
          line-height: 20px;
        }
      }
    }
    .product {
      margin: 20px;
      position: relative;
      padding-bottom: 30px;
      border-bottom: 1px solid grey;
      overflow: auto;
      zoom: 1;
      .product-set {
        float: left;
        width: 400px;
        font-size: 0;
        border: 1px dotted grey;
        padding: 20px 0 0 20px;
        .activity-name {
          margin-bottom: 20px;
          .activity-title {
            display: inline-block;
            font-size: 18px;
            width: 100px;
          }
          .activity-input {
            width: 280px;
            line-height: 20px;
          }
        }
        .activity-activity {
          border: 1px dotted grey;
          padding: 10px;
          margin-bottom: 10px;
          .activity-activity-item {
            width: 50%;
            display: inline-block;
            margin-bottom: 10px;
            .a-a-item-title {
              font-size: 12px;
              width: 66px;
              display: inline-block;
            }
            .a-a-item-input {
              width: 110px;
            }
          }
          .a-a-button {
            background: royalblue;
            color: #ffffff;
          }
          .a-a-button:hover {
            cursor: pointer;
          }
        }
      }

      .product-content {
        float: left;
        margin-left: 30px;
        position: relative;
        .product-content-title {
          margin-bottom: 20px;
          font-size: 18px;
        }
        .product-detail {
          margin-bottom: 16px;
          font-size: 16px;
          input {
            line-height: 24px;
            width: 200px;
            margin-right: 20px;
            margin-bottom: 20px;
          }
        }
        .product-content-add {
          position: absolute;
          right: -70px;
          bottom: 74px;
          text-align: center;
          /*margin:0 auto;*/
          font-size: 18px;
          width: 70px;
          line-height: 30px;
          border: 1px dotted grey;
        }
        .product-content-add:hover {
          cursor: pointer;
        }
      }
    }
    .submit {
      margin: 20px auto 0;
      text-align: center;
      .submit-button, .submit-clear {
        background: royalblue;
        width: 100px;
        line-height: 30px;
        color: #ffffff;
        font-size: 16px;
      }
      .submit-button:hover, .submit-clear:hover {
        cursor: pointer;
      }
      .submit-clear {
        margin-left: 10px;
        background: #ffffff;
        color: royalblue;
      }
    }
    .result {
      padding: 0 30px 30px;
    }
  }

</style>
