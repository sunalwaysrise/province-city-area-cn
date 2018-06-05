import React, {Component} from 'react';
import {View, Text, FlatList, Modal, TouchableOpacity} from 'react-native';
import CHINA_REGION from './china_region_last';
let style={
    selectBtn:{paddingLeft:10,paddingRight:10,},
    selectArea:{paddingBottom:50},
    selectStatusTrue:{color:"#05a5d1"},
    selectProvinceAreaTxt:{height:30,paddingLeft:15,lineHeight:30,paddingRight:15,},
    hide:{display:"none"},
    show:{},
    FashionAddLine: {
        height:60,
        borderBottomWidth:2,
        borderBottomColor:"rgba(224,224,224,0.50)",
        flexDirection:"row"
    },
    FashionAddLineLabel: {
        width:95,
        paddingLeft:15,
        justifyContent:"center",
        alignItems:"flex-start",
    },
    FashionAddLine2:{
        height:75,
        borderBottomColor:"#F8F8F8",
        borderBottomWidth:10,
    },
    sku: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,.5)"
    },
    skuBackImg: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    openProvinceCityAreaContentWarp:{
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        height:310,
        backgroundColor: "#ffffff",
    },
    skuTitle: {
        height: 50,
        position: "relative",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(224,224,224,0.50)",
        alignItems: "center",
        justifyContent: "center",
    },
    skuTitleTxt: {
        fontSize: 16,
        color: "#4f4f4f",
    },
    skuContentClose: {
        width: 48,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 0,
    },
    skuContentCloseIcon: {
        color: "#9B9B9B",
        fontSize: 12,
    },
    openProvinceCityAreaContent:{
        height:260,
    },
    openProvinceCityAreaContentA:{
        height:40,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        flexDirection:'row',
        justifyContent:"flex-start",
        alignItems:"center",
    },
};

class ProvinceCityArea extends Component{
    constructor(p) {
        super(p);
        let province = [];
        for (let code in CHINA_REGION) {
            province.push(code);
        }
        this.state={
            openProvinceCityArea:this.props.openProvinceCityArea||false,
            selectStatus:{s1:1,s2:0,s3:0},
            address:{
                province: "",
                city: "",
                area: "",
            },
            province:province,
            city:[],
            area:[],
        };
        if(this.props.color){
            style.selectStatusTrue.color=this.props.color;
        }
        this.setProvince=this.setProvince.bind(this);
        this.setCity=this.setCity.bind(this);
        this.setArea=this.setArea.bind(this);
    }
    setProvince(x){
        if(x!=this.state.address.province){
            let a=this.state.address;
            a.province=x;
            a.city='';
            a.area='';
            let city=[];
            for (let code in CHINA_REGION[x]) {
                city.push(code);
            }
            this.setState({
                address:a,
                city:city,
                area:[],
                selectStatus:{s1:0,s2:1,s3:0}
            },()=>{
                this.props.callback&&this.props.callback(this.state.address);
            });
        }
    }
    setCity(x){
        if(x!=this.state.address.city){
            let a=this.state.address;
            a.city=x;
            a.area='';
            let area=CHINA_REGION[a.province][x];
            this.setState({
                address:a,
                area:area,
                selectStatus:{s1:0,s2:0,s3:1}
            },()=>{
                this.props.callback&&this.props.callback(this.state.address);
            });
        }
    }
    setArea(x){
        if(x!=this.state.address.city){
            let a=this.state.address;
            a.area=x;
            this.setState({
                address:a,
                selectStatus:{s1:0,s2:0,s3:1},
                openProvinceCityArea:false,
            },()=>{
                this.props.callback&&this.props.callback(this.state.address);
            });
        }else{
            this.setState({
                openProvinceCityArea:false,
            });
        }
    }
    flatListKey(item, index) {
        return index.toString();
    }
    componentDidMount(){
        let initData=this.props.initData||{},address={
            province: initData.province||"",
            city: initData.city||"",
            area: initData.area||"",
        },city=[],area=[];
        if(initData.province){
            for(let x in CHINA_REGION[address.province]){
                city.push(x);
            }
        }
        if( initData.province && initData.city ){
            try{
                area=CHINA_REGION[initData.province][initData.city];
            }catch(e){}
        }
        this.setState({
            openProvinceCityArea:this.props.openProvinceCityArea,
            address:address,
            city:city,
            area:area,
        });
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            openProvinceCityArea:nextProps.openProvinceCityArea
        })
    }
    render (){
        let selectProvinceBtn=[style.selectBtn],selectCityBtn=[style.selectBtn],selectAreaBtn=[style.selectBtn],
            selectProvinceArea=[style.selectArea],selectCityArea=[style.selectArea],selectAreaArea=[style.selectArea];
        if(this.state.selectStatus.s1){
            selectProvinceBtn.push(style.selectStatusTrue);
            selectProvinceArea.push(style.show);
        }else{
            selectProvinceArea.push(style.hide);
        }
        if(this.state.selectStatus.s2){
            selectCityBtn.push(style.selectStatusTrue);
            selectCityArea.push(style.show);
        }else{
            selectCityArea.push(style.hide);
        }
        if(this.state.selectStatus.s3){
            selectAreaBtn.push(style.selectStatusTrue);
            selectAreaArea.push(style.show);
        }else{
            selectAreaArea.push(style.hide);
        }
        if(this.state.address.province){
            selectCityBtn.push(style.show);
        }else{
            selectCityBtn.push(style.hide);
        }
        if(this.state.address.province && this.state.address.city){
            selectAreaBtn.push(style.show);
        }else{
            selectAreaBtn.push(style.hide);
        }
        return <Modal transparent={true} visible={this.state.openProvinceCityArea}
                      onRequestClose={() => this.setState({openProvinceCityArea:false})}>
                <View style={style.sku}>
                    <TouchableOpacity style={style.skuBackImg} onPress={() => this.setState({openProvinceCityArea:false})}></TouchableOpacity>
                    <View style={style.openProvinceCityAreaContentWarp}>
                        <View style={style.skuTitle}>
                            <Text style={style.skuTitleTxt}>所在地区</Text>
                            <TouchableOpacity style={style.skuContentClose}
                                              onPress={() => this.setState({openProvinceCityArea:false})}>
                                <Text style={style.skuContentCloseIcon}>关闭</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={style.openProvinceCityAreaContent}>
                            <View style={style.openProvinceCityAreaContentA} >
                                <Text onPress={()=>{
                                    this.setState({selectStatus:{s1:1,s2:0,s3:0}});
                                }} style={selectProvinceBtn}>{this.state.address.province||'请选择'}</Text>
                                <Text onPress={()=>{
                                    this.setState({selectStatus:{s1:0,s2:1,s3:0}});
                                }} style={selectCityBtn}>{this.state.address.city||'请选择'}</Text>
                                <Text onPress={()=>{
                                    this.setState({selectStatus:{s1:0,s2:0,s3:1}});
                                }} style={selectAreaBtn}>{this.state.address.area||'请选择'}</Text>
                            </View>
                            <View style={selectProvinceArea}>
                                <FlatList
                                    extraData={this.state}
                                    keyExtractor={this.flatListKey}
                                    data={this.state.province}
                                    initialNumToRender={8}
                                    getItemLayout={(data, index) => ({length: 30, offset: 30 * index, index})}
                                    renderItem={({item, separators}) => {
                                        let s=[style.selectProvinceAreaTxt];
                                        if(item==this.state.address.province){
                                            s.push(style.selectStatusTrue);
                                        }
                                        return <Text numberOfLines={1} style={s} onPress={()=>{
                                            this.setProvince(item);
                                        }}>
                                            {item}
                                        </Text>
                                    }}
                                />
                            </View>
                            <View style={selectCityArea}>
                                <FlatList
                                    extraData={this.state}
                                    keyExtractor={this.flatListKey}
                                    data={this.state.city}
                                    initialNumToRender={8}
                                    getItemLayout={(data, index) => ({length: 30, offset: 30 * index, index})}
                                    renderItem={({item, separators}) => {
                                        let s=[style.selectProvinceAreaTxt];
                                        if(item==this.state.address.city){
                                            s.push(style.selectStatusTrue);
                                        }
                                        return <Text numberOfLines={1} style={s} onPress={()=>{
                                            this.setCity(item);
                                        }}>
                                            {item}
                                        </Text>
                                    }}
                                />
                            </View>
                            <View style={selectAreaArea}>
                                <FlatList
                                    extraData={this.state}
                                    keyExtractor={this.flatListKey}
                                    data={this.state.area}
                                    initialNumToRender={8}
                                    getItemLayout={(data, index) => ({length: 30, offset: 30 * index, index})}
                                    renderItem={({item, separators}) => {
                                        let s=[style.selectProvinceAreaTxt];
                                        if(item==this.state.address.area){
                                            s.push(style.selectStatusTrue);
                                        }
                                        return <Text numberOfLines={1} style={s} onPress={()=>{
                                            this.setArea(item);
                                        }}>
                                            {item}
                                        </Text>
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
    }
}
/**
 * 使用方法 import 之后直接加载本包
 * 接受四个参数
 * color string，非必填，表示选择文本的颜色，默认浅蓝
 * callback 方法，必填，在组件内选择了地址后回调给父组件
 * initData 对象{province:"浙江省",city:"衢州市",area:"柯城区",}，非必填，初始数据
 * openProvinceCityArea 布尔，是否显示，非必填，默认false
 * */
export default ProvinceCityArea;
