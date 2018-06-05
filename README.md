# react-native-provincecityarea

这是一个ReactNative版的省市区三级联动地址选择组件，在开发RN地址簿的时候用到地址选择，本来觉得这应该是一个很常用的功能，应该不用重复造轮子。但是几番搜索都没找到想要的，眼看找轮子的时间都快要超过新造轮子的时间了，于是果断放弃，自己写了一个，分享出来给需要的人。

## 使用说明

### 下载
```javascript
npm i react-native-province-city-area
```
### 导入 

```javascript
import ProvinceCityArea from 'react-native-province-city-area';
```

### 在组件引用并传入参数
```javascript
/**
 * 组件接受四个参数
 * color string，非必填，表示选择文本的颜色，默认浅蓝
 * callback 方法，必填，在组件内选择了地址后将选择的结果回调给父组件
 * initData 对象，非必填，默认为空
 * openProvinceCityArea 布尔，是否显示，非必填，默认false
 * */
<ProvinceCityArea
  color={"#ff6600"}
  callback={(x)=>{console.log(x)}}
  initData={{province:"浙江省",city:"衢州市",area:"柯城区"}}
  openProvinceCityArea={false}
 />
```

### 举个例子
  
```javascript  
import React, {Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import { ProvinceCityArea } from 'province-city-area';

class Example extends Component {
  constructor(props) {
        super(props);
        this.state={
            openProvinceCityArea:false,
        };
        this.updata=this.updata.bind(this);
        this.openAddressRegion=this.openAddressRegion.bind(this);
    }
    updata(x){
        console.log(x);
    }
    openProvinceCityArea(){
        this.setState({openProvinceCityArea:true});
    }
    render(){
        let initData={province:"浙江省",city:"衢州市",area:"柯城区"};
        return (<View>
            <TouchableOpacity onPress={()=>{this.openProvinceCityArea()}}>
              <Text>打开地址</Text>
            </TouchableOpacity>
            <ProvinceCityArea callback={this.updata} initData={initData} openProvinceCityArea={this.state.openProvinceCityArea} />
        </View>);
    }
}
export default Example;
```

#### 如有任何问题，欢迎在[issues](https://github.com/sunalwaysrise/province-city-area-cn/issues)页面中提出。

