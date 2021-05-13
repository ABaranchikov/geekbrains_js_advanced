Vue.component('search', {
    data: function () {
        return {
            searchText: '',
        }
    },

    template: ` <form action="#" class="search-form">
                    <input type="text" class="search-field"  v-model="searchText"> 
                        <button class="btn-search" type="submit" @click="$parent.filterGoods(searchText)"> 
                             <i class="fas fa-search"></i>
                        </button>
                </form> `,

})