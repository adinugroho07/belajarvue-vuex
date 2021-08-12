import { createStore } from 'vuex';
/*
di bawah ini adalah contoh dari pembuatan local module state yang nanti nya akan di gabungkan dengan global modules state.
di dalam global module state kita tidak bisa mengakses ke dalam local module state dan juga sebaliknya, jadi masing2 state tersebut
independent, berdiri sendiri. 
contoh -> di dalam local state terdapat variable counter dan di dalam global state terdapat global variable, kita tidah bisa membuat
          mutations,getters,actions yang mengarah kepada state global jika berada di local state, hanya bisa mengakses ke local state
          saja, begitu juga sebalik .

jika kita set namespace: true maka dalam pemanggilan module ini harus di rubah.
polanya adalah key namespace:module state .
ex -> getters -> $store.getters['namespace/nama getters'];
      mutations -> $store.commit('namespace/nama mutations');
      actions -> $store.commit('namespace/nama actions');
      state -> $store.state.namespace.namavariablenya
*/
const counterState = {
    namespaced: true,
    state() {
        return {
            counter: 0,

        }
    },
    mutations: {
        //ini adalah nama method yang nanti nya akan di panggil oleh method commit, ex -> $store.commit('increment');
        //untuk penamaannya bebas bisa di atur sesuai kita inginkan.
        increment(state) {
            state.counter = state.counter + 1;
        },
        //payload adalah parameter yang di gunakan untuk kita bisa memparssing data ke mutation.
        //cara untuk mengaksesnya adalah $store.commit('nama mutations', value payload and it can be an object);
        increase(state, payload) {
            state.counter = state.counter + payload.value;
        },
    },
    getters: {
        //ini adalah contoh pembuatan getters.
        //fungsi getters di dalam parameter function ini adalah jika value yang ingin kita olah di method ini berasal dari result 
        //getters yang lain.
        finalCounter(state) {
            return state.counter * 2;
        },
        //di bawah ini adalah contoh penggunaan getters dimana result dari other getters di gunakan di dalam method ini.
        //untuk perameter pertama (_ / underscore) adalah untuk memberitahu bahwa kita menggunakan argument tersebut tapi kita 
        //tidak gunakan gunanya adalah untuk menghindari error variables define but not used.
        normalizedCounter(_, getters) {
            const finalCounter = getters.finalCounter;
            if (finalCounter < 0) {
                return 0;
            }
            if (finalCounter > 100) {
                return 100;
            }
            return finalCounter;

        },
    },
    actions: {
        /*
        di bawah ini adalah contoh dari penggunaan actions dimana method di dalam sini bisa di buatkan menjadi method yang asynchronus
        cara pemanggilannya adalah sebagai berikut -> this.$store.dispatch('nama methoda ctions', payload); contoh nya silahkan
        di lihat pada file AsyncCounter.vue .

        pada method actions terdapat parameter context. isi dari parameter tersebut adalah sebagai berikut.
        1. commit --> di gunakan untuk mentrigger commit, ex -> context.commit('nama mutations');
        2. dispatch --> kita bisa dispatch actions yang lain di dalam actions. ex -> context.dispatch('nama action lain');
        3. getters --> kita juga bisa mengakses gettes jika kita memerlukan data dari state tapi dengna format yang berbeda.
                       ex -> context.getters['nama getters'];
        4. root getters --> 
        5. root state --> 
        6. state --> ini tidak boleh di update directly, harus lewat mutations. tapi jika kita membutuhkan data dari state langsungan
                     kita bisa mengakses nya.
        */
        incrementActions(context) {
            setTimeout(() => {
                context.commit('increment');
            }, 2000);
        },
        increaseActions(context, payload) {
            console.log(context, payload);
            context.commit('increase', payload);
        },
    }
}

/*
untuk menggunakan vuex kita perlu mengimport (createStore) library nya seperti impot di atas, untuk store semua state di apps ini.
dan kita hanya bisa membuat 1 store per aplikasi.

di bawah ini adalah contoh dalam pembuatan state global dimana data dalam counter tersebut bisa di akses di semua component yang
ada di apps ini. cara aksesnya adalah dengan menggunakan patter berikut -> $store.state.namastate -> $store.state.counter.
contoh pengaksesan nya ada di dalam App.vue.

mutation -> method yang di definisikan dan mempunyai login untuk mengupdate data pada state. method yang ada pada mutation ini
            harus synchronus(di execute step by step) karena supaya data store bisa selalu terupdate.
action -> method yang berjalan secara asynchronus dan akan berubah untuk men commit mutations. ini bisa di gunakan sebagai opsi lain
          biar pun dari component commit langsung ke mutations langsung juga bisa.            
gettes -> seperti computed properties yang berhubungan langsung dengan data di store state. ini berguna jika kita ingin mendapatkan
          data dengan value yang berbeda dengan sumber store state yang sama tanpa mengubah data store state original nya.

untuk flow perubahan data yang ada pada state adalah sebagai berikut :
1. state store -> data pada state 
2. component --> use and affect to user interface
3. Actions --> optional, jika kita ingin menambahkan method yang asynchronus dan mengcommit mutations.  
4. Mutation --> have logic to change data in state and method should be synchronus so data in state always up to date.
5. state store -> data yang ada di state sudah berubah.
*/
const store = createStore({
    //dibawah ini adalah cara untuk menggabungkan local module state (counterState) dengan global module state 
    modules: {
        statecounter: counterState
    },
    state() {
        return {
            isLogedIn: false,
        }
    },
    mutations: {
        setLogedIn(state) {
            state.isLogedIn = !state.isLogedIn;
        }

    },
    getters: {
        getIslogedIn(state) {
            return state.isLogedIn;
        }
    },

    actions: {
        loginAction(context, payload) {
            if (payload.username === 'adinugroho1' && payload.password === 'adisiub') {
                context.commit('setLogedIn');
            } else {
                console.log('login gagal');
            }

        },
        logoutActions(context) {
            context.commit('setLogedIn');
        }
    }
});

/*
vuex -> library untuk memanage global state.
state -> bisa di bilang sebagai data, data yang di butuhkan oleh aplikasi dan data mempengaruhi apa yang di lihat oleh user
         di screen. jadi bisa juga di bilang bahwa state adalah data yang reactive.
local state -> data yang di manage di dalam 1 component dimana hanya akan ber effect pada 1 component saja.
global state -> data yang ber impact pada multiple component atau berimbas pada banyak component atau di seluruh apps.
*/

export default store;
