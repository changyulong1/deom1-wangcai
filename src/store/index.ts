import Vue from 'vue';
import Vuex from 'vuex';
import createId from "@/lid/createId";
import clone from "@/lid/clone";
import router from "@/router";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        tagList: [],
        recordList:[],
        tag: undefined,
        tagName:undefined

    } as RootState,
    mutations: {
        //tag列表
        getLanguage(state) {
            store.commit('createTag','衣')
            store.commit('createTag','食')
            store.commit('createTag','住')
            store.commit('createTag','行')
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
            return state.tagList;
        },
        setLanguage(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },
        getTag(state, id: string) {
            state.tag = state.tagList.filter(data => data.id === id)[0];
        },
        createTag(state,name: string) {
            if (name) {
                const names = state.tagList.map(data => data.name);
                if (names.indexOf(name) >= 0) {
                    store.state.tagName=null
                } else {
                    const id = createId().toString();
                    state.tagList.push({id: id, name: name});
                    store.commit('setLanguage')
                    store.state.tagName=undefined
                }
            }
        },
        removeTag(state,id: string){
            let index = 0;
            const data = state.tagList;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    index = i;
                    break;
                }
            }
            if(index>=0){
                state.tagList.splice(index, 1);
                store.commit('setLanguage')
                router.back()
            }else{
                window.alert("没有这个标签")
            }

        },
        updateTag(state,payload:{id: string, name: string}){
            const {id,name} = payload
            const listId = state.tagList.map(data => data.id);
            if (listId.indexOf(id) >= 0) {
                const names = state.tagList.map(data => data.name);
                if (names.indexOf(name) >= 0) {
                    return "重复";
                } else {
                    const tag = state.tagList.filter(data => data.id === id)[0];
                    tag.name = name;
                    store.commit('setLanguage')
                    return "成功";
                }
            } else {
                return "没有标签";
            }
        },
        //recordList列表方法
        getRecordList(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordID[];
        },
        setRecordList(state) {
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
        },
        create(state,record: RecordID) {
            const record2: RecordID = clone(record);
            record2.createAt = new Date().toISOString();
            state.recordList.push(record2);
           store.commit('setRecordList')
        },
    },
    actions: {},
    modules: {}
});

export default store;
