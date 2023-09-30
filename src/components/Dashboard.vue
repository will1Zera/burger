<template>
    <div id="burger-table">
        <!-- Componente que usa a prop para passar a mensagem e usa o v-show para esconder/mostrar -->
        <Message :msg="msg" v-show="msg"/>
        <div>
            <div id="burger-table-heading">
                <div class="order-id">id</div>
                <div>Cliente</div>
                <div>Pão</div>
                <div>Carne</div>
                <div>Opcionais</div>
                <div>Ações</div>
            </div>
        </div>
        <div id="burger-table-rows">
            <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
                <div class="order-number">{{ burger.id }}</div>
                <div>{{ burger.nome }}</div>
                <div>{{ burger.pao }}</div>
                <div>{{ burger.carne }}</div>
                <div>
                    <ul>
                        <li v-for="(opcional, index) in burger.opcionais" :key="index">{{ opcional }}</li>
                    </ul>
                </div>
                <div>
                    <!-- Evento que dispara quando acontecer uma mudança no select, ele atualizar o status -->
                    <select name="status" class="status" @change="updatedBurger($event, burger.id)">
                        <option v-for="s in status" :key="s.id" :value="s.tipo" :selected="burger.status == s.tipo">{{ s.tipo }}</option>
                    </select>
                    <button class="delete-btn" @click="deleteBurger(burger.id)">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Message from "./Message.vue";

    export default{
        name: "Dashboard",
        components: {
            Message
        },
        data(){
            return{
                // Manipula e define os dados que serão usados na tabela
                burgers: null,
                burger_id: null,
                status: [],
                msg: null
            }
        },
        methods: {
            // Método que pega todos os pedidos do backend
            async getPedidos() {
                // Realiza a requisição e trás os dados do json
                const req = await fetch("http://localhost:3000/burgers");
                const data = await req.json();
                // Associa os dados com as variaveis de data
                this.burgers = data;
                // Chama o método de status
                this.getStatus();
            },
            // Método que pega todos os status do backend
            async getStatus() {
                // Realiza a requisição e trás os dados do json
                const req = await fetch("http://localhost:3000/status");
                const data = await req.json();
                this.status = data;
            },
            // Método que deleta o burger
            async deleteBurger(id){
                const req = await fetch(`http://localhost:3000/burgers/${id}`, {
                    method: "DELETE"
                });
                // Inserindo a mensagem
                this.msg = `O pedido Nº ${id} foi cancelado`;
                setTimeout(() => this.msg = "", 3000);
                this.getPedidos();
            },
            // Método que atualiza o status do burger
            async updatedBurger(event, id){
                const option = event.target.value;
                const dataJson = JSON.stringify({ status: option });
                const req = await fetch(`http://localhost:3000/burgers/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });
                // Inserindo a mensagem
                this.msg = `O status do pedido Nº ${id} foi atualizado`;
                setTimeout(() => this.msg = "", 3000);
            }
        },
        // Função ativada assim que o componente é montado
        mounted () {
            // Chamando a função para trazer todos os pedidos
            this.getPedidos()
        }
    }
</script>

<style scoped>
    #burger-table{
        max-width: 1200px;
        margin: 0 auto;
    }

    #burger-table-heading,
    #burger-table-rows,
    .burger-table-row{
        display: flex;
        flex-wrap: wrap;
    }

    #burger-table-heading{
        font-weight: bold;
        padding: 12px;
        border-bottom: 2px solid #333;
    }

    #burger-table-heading div,
    .burger-table-row div{
        width: 19%;
    }

    .burger-table-row{
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
    }

    #burger-table-heading .order-id,
    .burger-table-row .order-number{
        width: 5%;
    }

    select{
        padding: 12px 6px;
        margin-right: 12px;
    }

    .delete-btn{
        background-color: #222;
        color: #fcba03;
        font-weight: bold;
        border: 2px solid #222;
        padding: 10px;
        font-size: 16px;
        margin: 0 auto;
        cursor: pointer;
        transition: .5s;
    }

    .delete-btn:hover{
        color: #222;
        background-color: transparent;
    }
</style>