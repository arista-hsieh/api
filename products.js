import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
    data(){
        return{
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'arista',
            products: [],
            temp: {},
        }
    },
    methods:{
        checkAdmin(){
            const url = `${this.apiUrl}/api/user/check`
            axios.post(url)
            .then(()=>{
                this.getData();
            })
            .catch((err)=>{
                alert(err.data.message)
                window.location = 'index.html'
            })
        },
        getData(){
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
            axios.get(url)
            .then((response)=>{
                this.products = response.data.products;
            })
            .catch((err)=>{
                alert(err.data.mesage);
            })
        }
    },
    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        this.checkAdmin()
    }
}).mount('#app');
